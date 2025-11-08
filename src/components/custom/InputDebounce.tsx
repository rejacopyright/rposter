import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@components/ui/input-group'
import type { SearchboxProps } from '@ts/components'
import debounce from 'lodash/debounce'
import { Loader2, Search, XCircle } from 'lucide-react'

export const InputDebounce = (props: SearchboxProps) => {
  const {
    onChange = () => '',
    isBouncing = () => '',
    defaultValue = '',
    delay = 1000,
    placeholder = 'Search...',
    controlled = false,
    bounceOnEmpty = false,
  } = props

  const [val, setVal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  const debounced = debounce(
    ({ target: { value } }: ChangeEvent & { target: HTMLInputElement }) => {
      setLoading(false)
      isBouncing(false)
      onChange(value)
    },
    delay,
    { leading: false, trailing: true }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(debounced, [])

  return (
    <InputGroup>
      {controlled ? (
        <InputGroupInput
          placeholder={placeholder}
          value={val}
          onChange={(e: ChangeEvent & { target: HTMLInputElement }) => {
            setLoading(true)
            isBouncing(true)
            const target: any = e.target
            setVal(target?.value)
            if (!bounceOnEmpty && target?.value) {
              onSearch(e)
            } else {
              setLoading(false)
              isBouncing(false)
              onChange(target?.value)
            }
          }}
        />
      ) : (
        <InputGroupInput
          placeholder={placeholder}
          defaultValue={val}
          onChange={(e: ChangeEvent & { target: HTMLInputElement }) => {
            setLoading(true)
            isBouncing(true)
            const target: any = e.target
            // setVal(target?.value)
            if (!bounceOnEmpty && target?.value) {
              onSearch(e)
            } else {
              setLoading(false)
              isBouncing(false)
              onChange(target?.value)
            }
          }}
        />
      )}
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align='inline-end'>
        {loading ? (
          <Loader2 className='size-5 animate-spin text-gray-300' />
        ) : val ? (
          <XCircle
            className='size-5 cursor-pointer'
            fill='#000'
            color='#fff'
            onClick={() => {
              setVal('')
              onChange('')
            }}
          />
        ) : (
          <XCircle className='size-5' color='transparent' />
        )}
      </InputGroupAddon>
    </InputGroup>
  )
}
