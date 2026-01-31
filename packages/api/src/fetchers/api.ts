import { hc } from 'hono/client'
import { APIClient } from '../../server/api'

export const api = hc<APIClient>('/api/v1')
