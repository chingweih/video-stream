import { Hono } from 'hono'
import { Queue } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type {
  VideoTranscodeQueueData,
  VideoTranscodeJobNames,
} from '@video-stream/shared/contract'
import { v7 as uuid } from 'uuid'
import { s3 } from 'bun'

const app = new Hono()

const api = new Hono()

const queue = new Queue<VideoTranscodeQueueData, void, VideoTranscodeJobNames>(
  videoTranscodeQueue,
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  },
)

api.post('/videos', async (c) => {
  const videoId = uuid()
  await s3.write(`/videos/original/${videoId}`, c.req.raw)
  queue.add('transcode', { videoId })

  return c.json({
    success: true,
    message: 'Transcoding job sent',
    id: videoId,
  })
})

api.get('/videos/:videoId')

const fe = new Hono()

fe.get('/upload')
fe.get('/videos')
fe.get('/videos/:videoId')

app.route('/api/v1', api)
app.route('/', fe)

export default app
