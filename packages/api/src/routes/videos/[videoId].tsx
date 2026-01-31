import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../layout'

export const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos/$videoId',
  component: () => {
    const { videoId } = videoRoute.useParams()
    return <>{videoId}</>
  },
})
