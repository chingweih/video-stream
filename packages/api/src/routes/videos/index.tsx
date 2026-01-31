import { createRoute, Link } from '@tanstack/react-router'
import { rootRoute } from '../../layout'
import { api } from '../../fetchers/api'
import { useQuery } from '@tanstack/react-query'

export const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos',
  component: () => {
    const { data, isLoading } = useQuery({
      queryKey: ['GET /videos'],
      queryFn: async () => {
        return (await api.videos.$get()).json()
      },
    })

    return (
      <div>
        <h1>Videos</h1>
        {isLoading
          ? 'Loading....'
          : data?.videos.map(({ id }) => (
              <div>
                <p>{id}</p>
                <Link
                  to='/videos/$videoId'
                  params={{
                    videoId: id,
                  }}
                >
                  Watch
                </Link>
              </div>
            ))}
      </div>
    )
  },
})
