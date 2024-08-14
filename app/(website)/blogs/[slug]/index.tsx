import Post from '@components/Blogs/Post'
import { Layout, SEO } from '@components/common'
import { Container, Text } from '@components/ui'
import LoadingCircle from '@components/ui/LoadingCircle/LoadingCircle'
import { getAllPostsSlugs, getPostBySlug } from '@lib/sanity/client'
import { urlForImage } from '@lib/sanity/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

interface PostDefaultProps {
  post: any
}

export default function PostDefault({ post }: PostDefaultProps) {
  const router = useRouter()
  // console.log(post)
  const imageProps = post?.mainImage && urlForImage(post?.mainImage)
  // console.log(imageProps)
  return router.isFallback ? (
    <div className="h-[80vh] flex items-center justify-center">
      <LoadingCircle className="" />
    </div>
  ) : (
    <>
      <SEO
        title={post?.title}
        description={post?.excerpt}
        openGraph={{
          type: 'website',
          title: post?.title,
          description: post?.excerpt,
          images: [
            {
              url: imageProps.src,
              width: imageProps.width,
              height: imageProps.height,
              alt: post?.title,
            },
          ],
        }}
      />
      <Container className="my-10">
        <Post post={post} />
      </Container>
    </>
  )
}
PostDefault.Layout = Layout

export const getStaticProps: GetStaticProps<PostDefaultProps> = async ({
  params,
}: any) => {
  try {
    const post = await getPostBySlug(params?.slug as string)
    return {
      props: { post },
      revalidate: 10,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        post: null,
      },
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await getAllPostsSlugs()
    const paths = slugs.map((slug: string) => ({
      params: slug,
    }))
    // console.log('\x1b[32m', 'slugs checking:', paths, '\x1b[0m')
    return {
      paths,
      fallback: true,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      paths: [],
      fallback: false,
    }
  }
}
