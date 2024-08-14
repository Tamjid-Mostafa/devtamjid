import { Suspense } from 'react'

import { Container, LoadingDots } from '@/components/ui'
import Post from '@/components/Blogs/Archive'
import LoadingCircle from '@/components/ui/LoadingCircle'

export const dynamic = 'force-dynamic'

export const runtime = 'edge'

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Archive
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">See all posts we have ever written.</p>
        </div>
        <Suspense key={searchParams.page || '1'} fallback={<div className='min-h-[60vh] flex items-center justify-center'>
          <LoadingCircle className='text-accent-5'/>
        </div>}>
          <Post searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  )
}

// export const revalidate = 60;
