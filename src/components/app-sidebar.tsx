'use client'

import * as React from 'react'

import { FileSliders, Home, Images, Settings } from 'lucide-react'

import { NavProjects } from '@/components/nav-projects'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import { NavHeader } from './nav-header'
import { NavMenu } from './nav-menu'

const dataMenu = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Gallery', url: '/gallery', icon: Images },
  { name: 'Prompts', url: '/prompts', icon: FileSliders },
  { name: 'Settings', url: '/settings', icon: Settings },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu projects={dataMenu} />
        <NavProjects />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
