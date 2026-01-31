import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../layout'
import { api } from '../../fetchers/api'

export const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos/$videoId',
  component: () => {
    const { videoId } = videoRoute.useParams()
    return (
      <div>
        <p>{videoId}</p>
        <video
          src={api.videos[':videoId']
            .$url({
              param: {
                videoId,
              },
            })
            .toString()}
          controls
        />
      </div>
    )
  },
})
