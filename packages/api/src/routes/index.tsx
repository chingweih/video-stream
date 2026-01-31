import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    return (
      <div>
        Hello, welcome to <span className='font-mono'>video-stream</span>
      </div>
    )
  },
})
