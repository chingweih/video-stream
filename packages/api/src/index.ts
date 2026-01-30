import { Hono } from 'hono'
import { Queue } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type {
  VideoTranscodeQueueData,
  VideoTranscodeJobNames,
} from '@video-stream/shared/contract'

const app = new Hono()

const queue = new Queue<VideoTranscodeQueueData, void, VideoTranscodeJobNames>(
  videoTranscodeQueue,
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  },
)

app.get('/', (c) => {
  queue.add('transcode', { videoId: 'hello' })
  return c.text('Job Sent')
})

export default app
