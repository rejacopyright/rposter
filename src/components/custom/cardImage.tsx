import { useState } from 'react'
import { useSearch } from '@tanstack/react-router'

import { Button } from '@components/ui/button'
import { copyImageToClipboard, downloadImageReady } from '@lib/fn'
import { cn } from '@lib/utils'
import { Copy, Download } from 'lucide-react'

import { ActionButton } from './button'

export const CardImage = ({ url, ext = 'png', grid = false, variant = 1 }) => {
  const { id }: any = useSearch({ from: '/poster/new' })
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [downloadBtnIsLoading, setDownloadBtnIsLoading] = useState<boolean>(false)

  return (
    <div className='flex flex-col min-h-[35vh]'>
      <div className='bg-gray-50 rounded-lg p-4'>
        <div
          className={cn(
            'bg-white rounded-xl shadow-2xl mb-5 mt-2 mx-auto overflow-hidden',
            grid ? 'w-[calc(100%-10px)]' : 'md:w-1/2 xl:w-1/3'
          )}>
          {!isLoaded && (
            <div className='bg-gray-100 relative overflow-hidden aspect-square'>
              <div className='absolute inset-0 shimmer z-0' />
            </div>
          )}
          <img
            src={url}
            alt=''
            className={cn('w-full', { hidden: !isLoaded })}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className='flex-1' />
        <div className='flex items-center justify-between'>
          <Button variant='outline' type='button' onClick={() => copyImageToClipboard({ url })}>
            <Copy size={20} />
            <span className='text-xs'>Copy{!grid && ' Image'}</span>
          </Button>
          <ActionButton
            isLoading={downloadBtnIsLoading}
            onClick={async () => {
              setDownloadBtnIsLoading(true)
              await downloadImageReady(id, variant)
              setDownloadBtnIsLoading(false)
            }}>
            <Download size={20} />
            <span className='ms-2 text-xs'>
              {!grid && 'Download '}
              {ext.toString().toUpperCase()}
            </span>
          </ActionButton>
        </div>
      </div>
    </div>
  )
}
