import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/poster/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/poster/_layout"!</div>
}
