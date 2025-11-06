import { Link } from '@tanstack/react-router'

import { ActionButton } from '@components/custom/button'
import { Button } from '@components/ui/button'
import { dashboardStats } from '@lib/constants'
import {
  ArrowRight,
  BrickWall,
  CheckCircle2,
  ImagePlus,
  Mic,
  Plus,
  Sparkles,
  UploadCloud,
  WandSparkles,
} from 'lucide-react'

export const Home = () => {
  return (
    <div className='min-h-screen text-gray-800 mb-20 md:w-8/9 mx-auto'>
      {/* Header */}
      <header className='flex flex-col items-center pt-16 px-4 text-center'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm'>
          <WandSparkles className='h-4 w-4' />
          <span>
            Powered by
            <span className='shimmer-text ms-2 text-transparent bg-clip-text bg-[linear-gradient(to_right,#1C57A8,#1CA869,#C40FB8,#1C57A8)]'>
              Gemini 2.5 Flash
            </span>
          </span>
        </div>

        <h1 className='text-4xl md:text-5xl font-bold mb-2'>
          Hamah
          <span className='shimmer-text mx-2 text-transparent bg-clip-text bg-[linear-gradient(to_right,#1C57A8,#1CA869,#C40FB8,#1C57A8)]'>
            Intelligence
          </span>
          Designer
        </h1>
        <p className='text-gray-500 max-w-2xl text-center'>
          Transform your product images and audio descriptions into stunning marketing posters with
          advanced AI technology. Professional results in seconds.
        </p>
      </header>

      {/* Upload Section */}
      <section className='mx-auto mt-10 w-full max-w-3xl px-4'>
        <Link
          to='/poster/new'
          className='flex flex-col items-center justify-center border-3 border-gray-100 rounded-lg p-1 w-full h-[30vh] shadow-sm bg-gray-100/10'>
          <div className='cursor-pointer flex flex-col flex-1 w-full items-center justify-center p-5'>
            <UploadCloud size={25} className='text-gray-500 mb-2' />
            <div className=''>Upload your product image</div>
            <div className='text-[10pt] text-gray-500 text-center'>
              Drag and drop your file here or click to browse. Supports JPG & PNG up to 10 MB.
            </div>
          </div>
          <div className='flex w-full h-auto items-center rounded-lg border border-input bg-background p-1 shadow-sm'>
            <Button type='button' variant='ghost' size='icon' className='text-muted-foreground'>
              <Plus className='h-4 w-4' />
            </Button>

            <input
              type='text'
              readOnly
              placeholder='Press the mic and start describing your image, or simply upload it...'
              className='flex-1 bg-transparent px-3 text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/70'
            />

            <Button type='button' variant='ghost' size='icon' className='text-muted-foreground'>
              <Mic className='w-4 h-4' />
            </Button>
            <div className='ms-1'>
              <ActionButton>
                <span className='mr-2'>Next</span>
                <ArrowRight size={20} />
              </ActionButton>
            </div>
          </div>
        </Link>

        {/* Stats */}
        <div className='bg-gray-50 rounded-xl flex flex-col sm:flex-row justify-evenly items-center shadow-xs border border-gray-200 mt-5 py-5 text-primary'>
          {dashboardStats.map((item, index) => (
            <div key={index} className='flex flex-col flex-1 items-center text-center relative'>
              <h2 className='text-2xl font-semibold'>{item.value}</h2>
              <p className='text-gray-400 text-xs'>{item.label}</p>
              {index !== dashboardStats.length - 1 && (
                <div className='hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 h-full border-r border-gray-200' />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <hr className='border-t border-gray-200 mx-5 mt-15 mb-20' />
      <section className='mt-10 px-4'>
        <h2 className='text-2xl font-semibold'>Powerful Features</h2>
        <p className='text-gray-500 mb-10'>Everything you need to create stunning posters</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Card 1 */}
          <div className='rounded-xl border border-gray-200 bg-white p-4'>
            <div className='mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600'>
              <Sparkles className='h-5 w-5' />
            </div>
            <h3 className='font-semibold text-lg'>Smart AI Processing</h3>
            <p className='text-gray-500 text-sm truncate'>
              7-step pipeline with Gemini 2.5 Flash for intelligent content generation and
              optimization.
            </p>
            <hr className='border-t border-gray-200 my-4' />
            <div className='mt-4 text-sm text-gray-600 list-disc list-inside space-y-1'>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Audio transcription with
                AI
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Multi-language copy
                generation
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Smart image optimization
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className='rounded-xl border border-gray-200 bg-white p-4'>
            <div className='mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white'>
              <ImagePlus className='h-5 w-5' />
            </div>
            <h3 className='font-semibold text-lg'>Studio-Quality Images</h3>
            <p className='text-gray-500 text-sm truncate'>
              Transform product photos into professional marketing visuals effortlessly.
            </p>
            <hr className='border-t border-gray-200 my-4' />
            <div className='mt-4 text-sm text-gray-600 list-disc list-inside space-y-1'>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Professional photoshoot
                effects
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> 4K resolution upscaling
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Background removal &
                blending
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className='rounded-xl border border-gray-200 bg-white p-4'>
            <div className='mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white'>
              <BrickWall className='h-5 w-5' />
            </div>
            <h3 className='font-semibold text-lg'>Multiple Designs</h3>
            <p className='text-gray-500 text-sm truncate'>
              Generate 3 unique design variations for every poster.
            </p>
            <hr className='border-t border-gray-200 my-4' />
            <div className='mt-4 text-sm text-gray-600 list-disc list-inside space-y-1'>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> HTML-based templates
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Validation scoring
              </div>
              <div className='flex items-center gap-1'>
                <CheckCircle2 fill='limeGreen' stroke='white' size={18} /> Export in multiple
                formats
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
