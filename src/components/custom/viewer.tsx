import React, { memo, useEffect, useState } from 'react'

interface ImagePreviewProps {
  file: File | string | null
  size?: number
}

const ImagePreviewComponent: React.FC<ImagePreviewProps> = ({ file, size = 150 }) => {
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
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

    if (url) {
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

    return () => {
      if (file instanceof File && url) {
        // URL.revokeObjectURL(url)
      }
    }
  }, [file, size])

  return (
    <div
      className='border rounded-lg bg-gray-100/10'
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundImage: imageURL ? `url(${imageURL})` : undefined,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}

export const ImagePreview = memo(ImagePreviewComponent, (prev, next) => prev.file === next.file)
