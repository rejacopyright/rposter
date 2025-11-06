import { createFileRoute } from '@tanstack/react-router'

import { PromptsPage } from '@views/prompts'

export const Route = createFileRoute('/prompts/')({ component: PromptsPage })
