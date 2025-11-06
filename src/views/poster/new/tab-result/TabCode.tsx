import { HTMLViewer } from '@components/custom/htmlViewer'
import { randomString, takeLast } from '@lib/fn'

export const TabCode = ({ data }) => {
  const designs = takeLast(data?.designs || [], 3)
  return (
    <div className=''>
      {designs.map(({ html }, index: number) => {
        return (
          <div key={randomString()} className=''>
            <HTMLViewer label={`Variant ${index + 1}`} html={html} />
          </div>
        )
      })}
    </div>
  )
}
