import { createFileRoute } from '@tanstack/react-router'

import { PosterDetail } from '@views/poster/detail'

export const Route = createFileRoute('/poster/$id/detail')({ component: PosterDetail })
