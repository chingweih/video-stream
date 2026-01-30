import z from "zod";

export const videoTranscodeQueueDataSchema = z.object({
  videoId: z.string(),
})

export type VideoTranscodeQueueData = z.infer<typeof videoTranscodeQueueDataSchema>
