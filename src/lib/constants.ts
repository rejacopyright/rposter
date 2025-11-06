import type { TabGalleryProps } from '@ts/gallery'
import type { TabResultProps } from '@ts/poster'
import { GalleryGrid } from '@views/gallery/tab/GalleryGrid'
import { GalleryList } from '@views/gallery/tab/GalleryList'
import { TabCode } from '@views/poster/new/tab-result/TabCode'
import { TabGrid } from '@views/poster/new/tab-result/TabGrid'
import { TabList } from '@views/poster/new/tab-result/TabList'
import {
  AudioLines,
  Blend,
  CodeXml,
  Expand,
  GalleryHorizontalEnd,
  LayoutGrid,
  List,
  Spotlight,
  TextCursorInput,
  Wand,
} from 'lucide-react'

export const steps = [
  {
    id: 'transcription',
    icon: AudioLines,
    title: 'Transcribing Audio',
    desc: 'Converting speech to text using AI',
  },
  {
    id: 'copy_generation',
    icon: TextCursorInput,
    title: 'Generating Copy',
    desc: 'Creating marketing content in multiple languages',
  },
  {
    id: 'photoshoot_transform',
    icon: Spotlight,
    title: 'Studio Transformation',
    desc: 'Applying professional photography effects',
  },
  {
    id: 'sharp_expansion',
    icon: Expand,
    title: 'Canvas Expansion',
    desc: 'Intelligently expanding image canvas',
  },
  {
    id: 'image_blending',
    icon: Blend,
    title: 'Image Blending',
    desc: 'Merging elements for cohesive design',
  },
  {
    id: 'upscaling',
    icon: Wand,
    title: '4K Upscaling',
    desc: 'Enhancing resolution to 4K quality',
  },
  {
    id: 'html_generation',
    icon: CodeXml,
    title: 'Generating Designs',
    desc: 'Creating multiple design variations',
  },
  {
    id: 'html_to_image',
    icon: GalleryHorizontalEnd,
    title: 'Converting to Images',
    desc: 'Converting HTML designs to high-quality images',
  },
]

export const tabResultValue: Array<TabResultProps> = [
  { value: 'list', icon: List, content: TabList },
  { value: 'grid', icon: LayoutGrid, content: TabGrid },
  { value: 'code', icon: CodeXml, content: TabCode },
]

export const tabGallery: Array<TabGalleryProps> = [
  { value: 'list', icon: List, content: GalleryList },
  { value: 'grid', icon: LayoutGrid, content: GalleryGrid },
]

export const dashboardStats = [
  { value: '10K+', label: 'Posters Created' },
  { value: '95%', label: 'Success Rate' },
  { value: '30s', label: 'Avg. Processing' },
  { value: '4K', label: 'Resolution' },
]
