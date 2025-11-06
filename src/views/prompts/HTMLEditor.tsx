import { useEffect, useState } from 'react'

import { updatePrompt } from '@api/prompts'
import { ActionButton } from '@components/custom/button'
import { Button } from '@components/ui/button'
import { copyTextToClipboard } from '@lib/fn'
import { cn } from '@lib/utils'
import { langs } from '@uiw/codemirror-extensions-langs'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { CheckCircle, Copy, PencilLine } from 'lucide-react'
import { toast } from 'sonner'

export const HTMLEditor = ({ data, editId, onEditBtnClicked }) => {
  const { template = '', name = 'HTML Code', _id, updatedAt } = data || {}
  const relativeTime = formatDistanceToNow(parseISO(updatedAt), { addSuffix: true })

  const [value, setValue] = useState<string>('')
  const isEdit = editId === _id
  const [submitBtnIsLoading, setSubmitBtnIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setValue(template)
  }, [template])

  const { mutateAsync }: any = updatePrompt(_id)
  const handleSubmit = async () => {
    setSubmitBtnIsLoading(true)
    try {
      const res = await mutateAsync({ template: value })
      if (res?.data?.success) {
        toast.success(res?.data?.message || 'Prompt successfully updated')
        onEditBtnClicked('')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to create job')
    } finally {
      setSubmitBtnIsLoading(false)
    }
  }

  const handleCancelation = () => {
    onEditBtnClicked('')
    setValue(template)
  }

  return (
    <div
      className={cn(
        'border-2 rounded-lg px-2 pb-2 mt-5',
        isEdit ? 'bg-primary border-primary/20' : 'bg-gray-100/75 border-gray-200/75'
      )}>
      <div className='flex pt-3 items-start justify-between px-2'>
        <div className='mt-2'>
          <div className={cn('font-semibold text-[15px] mb-1', { 'text-white': isEdit })}>
            {name}
          </div>
          <div className={cn('flex text-sm gap-5', isEdit ? 'text-white/75' : 'text-gray-500')}>
            <div>{_id}</div>
            <div>Last Updated {relativeTime}</div>
          </div>
        </div>
        <div className=''>
          {isEdit ? (
            <div className='flex items-center'>
              <Button className='' onClick={handleCancelation}>
                <span className='ms-2 text-sm'>Cancel</span>
              </Button>
              <ActionButton
                isLoading={submitBtnIsLoading}
                className='border border-white/30'
                onClick={handleSubmit}>
                <CheckCircle size={16} />
                <span className='ms-2 text-sm'>Save</span>
              </ActionButton>
            </div>
          ) : (
            <ActionButton onClick={() => onEditBtnClicked(_id)}>
              <PencilLine size={16} />
              <span className='ms-2 text-sm'>Edit</span>
            </ActionButton>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4 text-balance pt-2 pb-0 relative'>
        <div className='bg-white border border-gray-200/75 rounded-lg w-auto relative overflow-hidden'>
          <CodeMirror
            minHeight='40px'
            maxHeight='40vh'
            value={value}
            extensions={[langs.html(), EditorView.lineWrapping]}
            readOnly={!isEdit}
            editable={isEdit}
            onChange={setValue}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              highlightSelectionMatches: false,
            }}
          />
          <div className='absolute top-1 right-5'>
            <Button
              variant='link'
              type='button'
              className='w-8 h-8 bg-white/30 backdrop-blur-sm backdrop-brightness-120 rounded'
              onClick={() => copyTextToClipboard(value)}>
              <Copy className='size-4 text-gray-500' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
