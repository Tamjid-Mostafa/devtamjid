import Link from 'next/link'
import PostList from './Postlist'
import { Container } from '@/components/ui'

export default function HomePage({ posts }: any) {
  const featuredPosts = posts.filter((post: any) => post.featured)
  const latestPosts = posts.filter((post: any) => !post.featured)

  return (
    <>
      {posts && (
        <>
          <div className="">
            {featuredPosts.slice(0, 1).map((post: any) => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
                minimal
              />
            ))}
          </div>
          <Container className="py-10">
            <h1 className="text-3xl font-bold text-accent-9 my-10 text-center">
              Featured <span className='font-light'>Posts</span>
            </h1>
            <div className="grid gap-10 md:grid-cols-4 lg:gap-10">
              <div className="md:col-span-2 md:row-span-2">
                {featuredPosts.slice(1, 2).map((post: any) => (
                  <PostList
                    key={post._id}
                    post={post}
                    aspect="square"
                    preloadImage={true}
                  />
                ))}
              </div>

              {featuredPosts.slice(2).map((post: any) => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-accent-9 text-center my-10">
              Latest <span className='font-light'>Posts</span>
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {latestPosts.slice(0, 12).map((post: any) => (
                <PostList key={post._id} post={post} aspect="square" />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                href="/archive"
                className="relative inline-flex items-center gap-1 rounded-md border border-accent-3 bg-primary px-3 py-2 pl-4 text-sm font-medium text-accent-5 hover:bg-accent-0 focus:z-20 disabled:pointer-events-none disabled:opacity-40"
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
