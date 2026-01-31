import { Hono } from 'hono'
import { Queue } from 'bullmq'
import { videoTranscodeQueue } from '@video-stream/shared/contract'
import type {
  VideoTranscodeQueueData,
  VideoTranscodeJobNames,
} from '@video-stream/shared/contract'
import { v7 as uuid } from 'uuid'
import { s3 } from 'bun'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod/v4'
import { db } from './../db'
import { videos } from './db/schema'

const api = new Hono()

const queue = new Queue<VideoTranscodeQueueData, void, VideoTranscodeJobNames>(
  videoTranscodeQueue,
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  },
)

const apiRoute = api
  .get('/videos', async (c) => {
    const videos = await db.query.videos.findMany()

    return c.json({ videos })
  })
  .post('/videos', async (c) => {
    const videoId = uuid()
    await s3.write(`/videos/original/${videoId}`, c.req.raw)
    queue.add('transcode', { videoId })
    await db.insert(videos).values({
      id: videoId,
    })

    return c.json({
      success: true,
      message: 'Transcoding job sent',
      id: videoId,
    })
  })
  .get(
    '/videos/:videoId',
    zValidator(
      'param',
      z.object({
        videoId: z.string(),
      }),
    ),
    (c) => {
      const { videoId } = c.req.valid('param')
      const videoMasterM3U8 = s3.file(`/videos/${videoId}/master.m3u8`)
      return new Response(videoMasterM3U8)
    },
  )

export type APIClient = typeof apiRoute

export { api }
