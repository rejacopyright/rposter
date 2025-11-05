import imageCompression, { type Options } from 'browser-image-compression'

export const compressImage = async (file: File, opt?: Options) => {
  const options: Options = {
    maxSizeMB: 1,
    // maxWidthOrHeight: 800,
    useWebWorker: true,
    ...opt,
  }
  try {
    const compressedFile = await imageCompression(file, options)
    return new File([compressedFile], compressedFile.name, { type: compressedFile.type })
  } catch {
    return undefined
  }
}
