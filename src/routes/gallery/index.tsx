import { createFileRoute } from '@tanstack/react-router'

import { GalleryPage } from '@views/gallery'

export const Route = createFileRoute('/gallery/')({ component: GalleryPage })
