'use client'

import { Link } from '@tanstack/react-router'

import { PencilLine } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type ItemProps = {
  id?: string
  name?: string
}

export function NavProjects() {
  const projects: Array<ItemProps> = [
    { id: '1', name: 'Lorem ipsum is placeholder text commonly used in the graphic' },
    { id: '2', name: 'Lorem ipsum is placeholder text commonly used in the graphic' },
  ]
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel className='pb-4'>GENERATED POSTER</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to='/poster/new' className='h-9 cursor-pointer'>
              <PencilLine />
              <span className=''>Create new poster</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild>
              <div className='h-9 cursor-pointer'>
                <span className=''>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
