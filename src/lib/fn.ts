import { toast } from 'sonner'

import axios from './axios'

export const snakeToCamel = (str?: string): string => {
  return str?.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) || 'white'
}

export const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    if (value instanceof File) {
      formData.append(key, value)
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      formData.append(key, String(value))
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })
  return formData
}

export const takeLast = (
  array?: Array<{ [key: string]: any }>,
  n: number = 1
): Array<{ [key: string]: any }> => {
  if (!array) return []
  return array.slice(-n)
}

export const urlToFile = async (url: string, name: string) => {
  const data = await fetch(url)
  const blob = await data.blob()
  const file = new File([blob], name, { type: blob.type })
  const buffer = await blob.arrayBuffer()
  const base64 = await new Promise((resolve: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      const base64data = reader.result
      resolve(base64data)
    }
  })
  const result: any = {
    file,
    blob,
    buffer,
    base64,
  }
  return result
}

export const downloadImage = async ({ url, fileName = 'downloaded-file' }) => {
  const { blob }: any = await urlToFile(url, fileName)
  let ext: any = 'txt'
  switch (blob?.type?.split(';')?.[0]) {
    case 'image/png':
      ext = 'png'
      break
    case 'image/jpeg':
      ext = 'jpg'
      break
  }
  const uri = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.href = uri
  link.download = `${fileName}.${ext}`
  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(uri)
}

export const downloadImageReady = async (id: string, variant: string | number = 1) => {
  if (id) {
    const res = await axios.get(`jobs/${id}/download/${variant}`)
    const downloadUrl = res.data?.downloadUrl
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }
}

export const copyImageToClipboard = async ({ url, fileName = 'downloaded-file' }) => {
  try {
    const { blob }: any = await urlToFile(url, fileName)

    const data = [new ClipboardItem({ [blob.type]: blob })]
    await navigator.clipboard.write(data)

    toast.success('Image copied to clipboard!')
  } catch {
    toast.error('Failed to copy image:')
  }
}

export const copyHtmlToClipboard = async (htmlString: string) => {
  try {
    const blob = new Blob([htmlString], { type: 'text/html' })
    const data = [new ClipboardItem({ 'text/html': blob })]
    await navigator.clipboard.write(data)

    toast.success('HTML copied to clipboard!')
  } catch {
    toast.error('Failed to copy HTML')
  }
}

export const downloadHtmlFile = (htmlString?: string, fileName: string = 'index.html') => {
  if (!htmlString) {
    toast.error('HTML string required')
    return
  }
  try {
    const blob = new Blob([htmlString], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`File "${fileName}" downloaded!`)
  } catch {
    toast.error('Failed to download HTML file')
  }
}

export const copyTextToClipboard = async (text: string = '') => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard!')
  } catch {
    toast.error('Failed to copy text')
  }
}

export const toSize = (bytes?: number, decimals: number = 2): string => {
  if (!bytes) return '-'
  const k = 1000
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = bytes / Math.pow(k, i)
  const displaySize = size < 1 && i > 0 ? size.toFixed(decimals) : Math.round(size).toString()
  return `${displaySize} ${sizes[i]}`
}
