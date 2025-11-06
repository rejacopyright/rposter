import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { copyTextToClipboard, downloadHtmlFile } from '@lib/fn'
import { langs } from '@uiw/codemirror-extensions-langs'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { Copy, Download } from 'lucide-react'

export const HTMLViewer = ({ html, label = 'HTML Code' }: { html: string; label?: string }) => {
  return (
    <div className='bg-gray-50 rounded-lg px-2 mt-5'>
      <Accordion type='single' collapsible className='w-full pb-5' defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='text-md px-5 pb-0'>{label}</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-4 text-balance pt-4 pb-0'>
            <div className='bg-white rounded-lg w-auto relative overflow-hidden'>
              <CodeMirror
                height='30vh'
                value={html}
                extensions={[langs.html(), EditorView.lineWrapping]}
                readOnly
                editable={false}
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                  highlightActiveLine: false,
                  highlightActiveLineGutter: false,
                }}
              />
              <div className='absolute top-0 right-0 pe-5 pt-1'>
                <div className='flex'>
                  <Button
                    variant='ghost'
                    type='button'
                    className='w-8 h-8'
                    onClick={() => downloadHtmlFile(html)}>
                    <Download size={20} />
                  </Button>
                  <Button
                    variant='ghost'
                    type='button'
                    className='w-8 h-8'
                    onClick={() => copyTextToClipboard(html)}>
                    <Copy size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
