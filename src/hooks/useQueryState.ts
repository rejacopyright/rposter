import { useNavigate, useSearch } from '@tanstack/react-router'

export function useQueryState<T extends string | number>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })

  const value = (search[key] as T) || defaultValue

  const setValue = (newValue: T) => {
    navigate({
      search: ((prev: unknown) => ({
        ...(prev as Record<string, string | number | undefined>),
        [key]: newValue,
      })) as any,
      replace: true,
    })
  }

  return [value, setValue]
}
