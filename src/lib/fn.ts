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
