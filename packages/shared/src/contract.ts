import z from 'zod'

export const videoTranscodeQueue = 'video-transcode'

export const videoTranscodeJobNamesSchema = z.literal('transcode')

export type VideoTranscodeJobNames = z.infer<
  typeof videoTranscodeJobNamesSchema
>

export const videoTranscodeQueueDataSchema = z.object({
  videoId: z.string(),
})

export type VideoTranscodeQueueData = z.infer<
  typeof videoTranscodeQueueDataSchema
>
