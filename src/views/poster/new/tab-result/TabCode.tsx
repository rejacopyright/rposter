import { HTMLViewer } from '@components/custom/htmlViewer'
import { takeLast } from '@lib/fn'

export const TabCode = ({ data }) => {
  const designs = takeLast(data?.designs || [], 3)
  return (
    <div className=''>
      {designs.map(({ _id, html }, index: number) => {
        return (
          <div key={_id} className=''>
            <HTMLViewer label={`Variant ${index + 1}`} html={html} />
          </div>
        )
      })}
    </div>
  )
}
