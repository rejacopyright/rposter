import { useParams } from '@tanstack/react-router'

export const PosterDetail = () => {
  const { id } = useParams({ strict: false })
  return (
    <div className=''>
      <div>Hello /poster/{id}/detail!</div>
    </div>
  )
}
