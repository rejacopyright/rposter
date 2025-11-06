import { Link, useRouter } from '@tanstack/react-router'

import Error404 from '@lottie/Error404.json'
import Lottie from 'lottie-react'
import { ArrowLeft } from 'lucide-react'

import { Button } from './ui/button'

export const NotFound = () => {
  const { history } = useRouter()
  return (
    <div className='flex flex-col items-center justify-center h-full text-center'>
      <div className='opacity-25 scale-75'>
        <Lottie animationData={Error404} loop={true} />
      </div>
      <div className='flex gap-4'>
        <Button variant='outline' asChild>
          <div className='cursor-pointer' onClick={() => history.back()}>
            <ArrowLeft />
            <div className=''>Back</div>
          </div>
        </Button>
        <Button asChild>
          <Link to='/'>Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
