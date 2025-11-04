import React, { memo, useEffect, useState } from 'react'

interface ImagePreviewProps {
  file?: File | string | null
  size?: number
  full?: 'width' | 'height'
  fill?: 'contain' | 'cover'
}

const ImagePreviewComponent: React.FC<ImagePreviewProps> = ({
  file,
  size,
  full = 'width',
  fill = 'contain',
}) => {
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<{
    width?: number | string
    height?: number | string
  }>({
    width: size,
    height: size,
  })

  useEffect(() => {
    if (!file) {
      setImageURL(null)
    }

    let url: string | null = null

    if (file instanceof File) {
      url = URL.createObjectURL(file)
      setImageURL(url)
    } else if (typeof file === 'string') {
      url = file
      setImageURL(url)
    }

    if (url && size) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        const { width, height } = img
        const maxDim = Math.max(width, height)
        const scale = size / maxDim
        setDimensions({
          width: width * scale,
          height: height * scale,
        })
      }
    }
    if (!size) {
      setDimensions({
        width: full === 'width' ? 'auto' : '100%',
        height: full === 'height' ? 'auto' : '100%',
      })
    }

    return () => {
      if (file instanceof File && url) {
        // URL.revokeObjectURL(url)
      }
    }
  }, [file, size, full])

  return (
    <div
      className='border rounded-lg border-gray-200/75 bg-gray-100/50'
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundImage: imageURL ? `url(${imageURL})` : undefined,
        backgroundSize: fill,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}

export const ImagePreview = memo(ImagePreviewComponent)
