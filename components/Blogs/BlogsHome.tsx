import Link from 'next/link'
import PostList from './Postlist'
import { Container } from '@/components/ui'

export default function HomePage({ posts }: any) {
  return (
    <>
      {posts && (
        <>
        <div className="">
            {posts.slice(0, 1).map((post: any) => (
              <PostList
                key={post._id}
                post={post}
                aspect="video"
                preloadImage={true}
                minimal
              />
            ))}
          </div>
        <Container className='py-10'>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts.slice(1, 3).map((post: any) => (
              <PostList
                key={post._id}
                post={post}
                // aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(3, 14).map((post: any) => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/archive"
              className="relative inline-flex items-center gap-1 rounded-md border border-accent-3 bg-primary px-3 py-2 pl-4 text-sm font-medium text-accent-5 hover:bg-accent-0 focus:z-20 disabled:pointer-events-none disabled:opacity-40   "
            >
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
        </>
      )}
    </>
  )
}
