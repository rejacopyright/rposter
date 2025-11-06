import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { getPrompts } from '@api/prompts'
import { Button } from '@components/ui/button'
import { randomString } from '@lib/fn'

import { HTMLEditor } from './HTMLEditor'

export const PromptsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({})

  const [editId, setEditId] = useState<string>('')

  const scrollToSection = (key: string) => {
    const section = sectionsRef.current[key]
    if (section) {
      navigate({
        to: location.pathname,
        hash: key,
        replace: false,
      })
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { data = [] } = getPrompts()

  useEffect(() => {
    setTimeout(() => {
      scrollToSection(location.hash)
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='lg:px-10 flex flex-wrap gap-5'>
      {/* LEFT SIDE */}
      <div className='sticky top-0 pt-5 pb-2 bg-white z-10 h-min md:flex-2 lg:flex-2 min-w-0'>
        <div className='mb-4'>
          <div className='font-medium'>Prompt Management</div>
          <div className='text-sm text-gray-500'>View and manage your Al prompts</div>
        </div>
        <div className='flex flex-col'>
          {data.map(({ name }) => (
            <Button
              variant={location.hash === name?.replaceAll(' ', '_') ? 'secondary' : 'ghost'}
              key={randomString()}
              onClick={() => scrollToSection(name?.replaceAll(' ', '_'))}
              className='justify-start'>
              <div className='truncate text-[11pt] font-normal'>{name}</div>
            </Button>
          ))}
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className='flex flex-col flex-auto md:flex-3 lg:flex-6 mt-2 mb-10'>
        {data.map((item) => (
          <div
            key={randomString()}
            ref={(el) => {
              sectionsRef.current[item?.name?.replaceAll(' ', '_')] = el
            }}
            className='max-h-[500px]'>
            <HTMLEditor data={item} editId={editId} onEditBtnClicked={setEditId} />
          </div>
        ))}
      </div>
    </div>
  )
}
