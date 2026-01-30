import { Worker } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type { VideoTranscodeQueueData } from '@video-stream/shared/contract'
import type { VideoTranscodeJobNames } from '@video-stream/shared/contract'

const worker = new Worker<
  VideoTranscodeQueueData,
  void,
  VideoTranscodeJobNames
>(
  videoTranscodeQueue,
  async ({ data: { videoId } }) => {
    console.log(videoId)
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
