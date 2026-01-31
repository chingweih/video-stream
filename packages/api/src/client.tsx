import { Hono } from 'hono'

const client = new Hono()

client.get('/upload')
client.get('/videos/:videoId')

export { client }
