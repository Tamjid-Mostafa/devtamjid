import PostList from '@/components/Blogs/Postlist'
import { Container, Text } from '@/components/ui'
import LoadingCircle from '@/components/ui/LoadingCircle/LoadingCircle'
import {
  getAllAuthors,
  getAllAuthorsSlugs,
  getAuthorPostsBySlug,
} from '@/lib/sanity/client'
import { urlForImage } from '@/lib/sanity/image'
import { PortableText } from '@/lib/sanity/plugins/portabletext'
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../layout'

export async function generateStaticParams() {
  const slugs = await getAllAuthorsSlugs()
  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: { author: string }
}) {
  const allAuthors = await getAllAuthors()
  const authorData = allAuthors.find(
    (a: { slug: string }) => a.slug === params.author,
  )

  if (!authorData) {
    return {
      title: 'Author Not Found - Dev Tamjid',
      description: 'No information available for this author.',
    }
  }

  const AuthorImageProps = authorData.image
    ? urlForImage(authorData.image)
    : null

  return {
    title: `Author - ${authorData.name}`,
    description: authorData.bio ? authorData.bio[0]?.children[0]?.text : '',
    openGraph: {
      type: 'website',
      title: authorData.name,
      description: authorData.bio ? authorData.bio[0]?.children[0]?.text : '',
      images: AuthorImageProps
        ? [
            {
              url: AuthorImageProps.src,
              width: AuthorImageProps.width,
              height: AuthorImageProps.height,
              alt: authorData.name,
            },
          ]
        : [],
    },
  }
}

export default async function AuthorDefault({
  params,
}: GetStaticPropsContext<{ author: string }>) {
  const { author } = params as ParsedUrlQuery
  const posts = await getAuthorPostsBySlug(author as string)

  const allAuthors = await getAllAuthors()
  const authorData = allAuthors.find(
    (a: { slug: string | string[] | undefined }) => a?.slug === author,
  )

  if (!posts || !authorData) {
    return {
      notFound: true,
    }
  }

  const AuthorImageProps = authorData?.image && urlForImage(authorData.image)

  return (
    <Container>
      <div className="my-10 flex flex-col items-center justify-center">
        <div className="relative h-20 w-20 flex-shrink-0">
          {authorData?.image && (
            <Image
              src={AuthorImageProps.src}
              alt={authorData?.name}
              className="rounded-full object-cover"
              fill
              sizes="20px"
            />
          )}
        </div>
        <Text className="text-center">
          <h1>{authorData.name}</h1>
        </Text>
        <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue text-center">
          {authorData?.bio && <PortableText value={authorData?.bio} />}
        </div>
      </div>
      <div className="my-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map((post: { _id: string }) => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>
    </Container>
  )
}

AuthorDefault.Layout = Layout
