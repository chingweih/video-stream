import { Hono } from 'hono'
import { Queue } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type {
  VideoTranscodeQueueData,
  VideoTranscodeJobNames,
} from '@video-stream/shared/contract'

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

api.post('/videos', (c) => {
  queue.add('transcode', { videoId: 'hello' })
  return c.text('Job Sent')
})

api.get('/videos/:videoId')

const fe = new Hono()

fe.get('/upload')
fe.get('/videos')
fe.get('/videos/:videoId')

app.route('/api/v1', api)
app.route('/', fe)

export default app
