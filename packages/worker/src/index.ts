import { Worker } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type { VideoTranscodeQueueData } from '@video-stream/shared/contract'
import type { VideoTranscodeJobNames } from '@video-stream/shared/contract'
import { mkdir, readdir, rm } from 'node:fs/promises'
import { s3 } from 'bun'

const worker = new Worker<
  VideoTranscodeQueueData,
  void,
  VideoTranscodeJobNames
>(
  videoTranscodeQueue,
  async ({ data: { videoId } }) => {
    const dir = `.tmp/videos/${videoId}`
    await mkdir(`${dir}/output`, { recursive: true })

    const originalVideo = s3.file(`/videos/original/${videoId}`)
    await Bun.write(`${dir}/original`, await originalVideo.arrayBuffer())

    const ffmpegProc = Bun.spawn({
      cmd: [
        'ffmpeg',
        '-i',
        'original',
        '-hls_time',
        '10',
        '-hls_list_size',
        '0',
        '-f',
        'hls',
        'output/master.m3u8',
      ],
      cwd: dir,
    })

    await ffmpegProc.exited

    const processedFiles = await readdir(`${dir}/output`)

    await Promise.all(
      processedFiles.map((file) =>
        s3.write(
          `/videos/${videoId}/${file}`,
          Bun.file(`${dir}/output/${file}`),
        ),
      ),
    )

    await rm(dir, { recursive: true })
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  },
)

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`)
})
