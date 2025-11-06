import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { copyImageToClipboard, downloadImage, downloadImageReady } from '@lib/fn'
import { cn } from '@lib/utils'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { CodeXml, Copy, Download, Image, ImageUp, Star } from 'lucide-react'
import { toast } from 'sonner'

import { ActionButton } from './button'

export const CardImage = ({ url, ext = 'png', grid = false, variant = 1, id = '' }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [downloadBtnIsLoading, setDownloadBtnIsLoading] = useState<boolean>(false)

  return (
    <div className='flex flex-col min-h-[30vh]'>
      <div className='bg-gray-50 rounded-lg p-4 flex flex-col flex-1'>
        <div
          className={cn(
            'bg-white rounded-xl shadow-2xl mb-5 mt-2 mx-auto overflow-hidden',
            grid ? 'w-[calc(100%-10px)]' : 'md:w-1/2 xl:w-1/3'
          )}>
          {url && !isLoaded && (
            <div className='bg-gray-100 relative overflow-hidden aspect-square'>
              <div className='absolute inset-0 shimmer z-0' />
            </div>
          )}
          {url ? (
            <img
              src={url}
              alt=''
              className={cn('w-full', { hidden: !isLoaded })}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)}
            />
          ) : (
            <div className='bg-gray-100 aspect-square flex flex-col items-center justify-center'>
              <Image size={50} className='opacity-10' />
              <div className='text-gray-300 mt-2'>No image found</div>
            </div>
          )}
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

export const GalleryCardGrid = ({ data }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const { id, transcription, designCount } = data || {}
  const imageUrl = data?.originalImage?.url
  const relativeTime = formatDistanceToNow(parseISO(data?.updatedAt), { addSuffix: true })
  return (
    <div
      className='relative group cursor-pointer'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Image wrapper */}
      <div className='aspect-square overflow-hidden rounded-xl relative'>
        <img
          src={imageUrl}
          alt=''
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        {/* Hover icons */}
        <div
          onClick={() => navigate({ to: '/poster/$id/detail', params: { id } })}
          className={cn(
            'absolute inset-0 flex items-end justify-between p-2 opacity-0 transition-all duration-200 bg-linear-to-t from-black/25 via-black/10 to-transparent',
            hovered && 'opacity-100'
          )}>
          {/* Left side: Download dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='link' size='icon' className='cursor-pointer'>
                <Download className='h-4 w-4 text-white' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  downloadImage({ url: imageUrl })
                }}
                className='text-xs'>
                <ImageUp className='h-4 w-4' /> Download as PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  toast.error("HTML isn't provided")
                }}
                className='text-xs'>
                <CodeXml className='h-4 w-4' /> Download as HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Right side: Star button */}
          <Button
            variant='link'
            size='icon'
            className='cursor-pointer'
            onClick={(e) => e.stopPropagation()}>
            <Star className='h-4 w-4 text-white' />
          </Button>
        </div>
      </div>

      {/* Title & subtitle */}
      <div className='mt-2'>
        <p className='text-sm font-medium leading-tight truncate text-center'>{transcription}</p>
        <div className='text-xs text-muted-foreground truncate text-center flex flex-wrap justify-center'>
          <div className=''>{relativeTime}</div>
          {designCount > 1 && <div className='ms-1'>- {designCount} variants</div>}
        </div>
      </div>
    </div>
  )
}

export const GalleryCardList = ({ data }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const { id, transcription, designCount } = data || {}
  const imageUrl = data?.originalImage?.url
  const relativeTime = formatDistanceToNow(parseISO(data?.updatedAt), { addSuffix: true })
  return (
    <div
      className='relative group cursor-pointer flex gap-4 py-2 hover:bg-gray-50'
      onClick={() => navigate({ to: '/poster/$id/detail', params: { id } })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Image wrapper */}
      <div className='aspect-square overflow-hidden rounded-xl relative'>
        <img
          src={imageUrl}
          alt=''
          className='h-15 w-15 object-cover transition-transform duration-300 group-hover:scale-120'
        />
      </div>

      {/* Title & subtitle */}
      <div className='flex flex-col justify-center'>
        <p className='text-sm font-medium leading-tight truncate'>{transcription}</p>
        <div className='text-xs text-muted-foreground truncate flex flex-wrap'>
          <div className=''>{relativeTime}</div>
          {designCount > 1 && <div className='ms-1'>- {designCount} variants</div>}
        </div>
      </div>

      {/* Action icons */}
      <div
        className={cn(
          'ms-auto flex items-end justify-between p-2 opacity-100 transition-all duration-200',
          hovered && 'opacity-100'
        )}>
        {/* Right side: Star button */}
        <Button
          variant='ghost'
          size='icon'
          className='cursor-pointer'
          onClick={(e) => e.stopPropagation()}>
          <Star className='size-5 text-gray-400 group-hover:text-black' />
        </Button>
        {/* Left side: Download dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <Download className='size-5 text-gray-400 group-hover:text-black' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                downloadImage({ url: imageUrl })
              }}
              className='text-xs'>
              <ImageUp className='h-4 w-4' /> Download as PNG
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                toast.error("HTML isn't provided")
              }}
              className='text-xs'>
              <CodeXml className='h-4 w-4' /> Download as HTML
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
