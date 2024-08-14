import PostList from '@/components/Blogs/Postlist'
import { Container, Text } from '@/components/ui'
import LoadingCircle from '@/components/ui/LoadingCircle/LoadingCircle'
import {
  getAllCategoriesSlugs,
  getCategoryBySlug,
  getPostsByCategory,
} from '@/lib/sanity/client'
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../layout'
export async function generateStaticParams() {
  const slugs = await getAllCategoriesSlugs()
  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const {category} = params
  const categories = await getCategoryBySlug(category as string)
  console.log("categories", categories);
  return { title: `${categories.title}` }
}

export default async function PostDefault({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params
  const posts = await getPostsByCategory(category as string)
  const cat = await getCategoryBySlug(category as string)

  if (!posts) {
    return {
      notFound: true,
    }
  }
  return (
    <>
      <Container className="">
        <div className="my-10">
          <Text className="text-center">
            <h1>{cat.title}</h1>
          </Text>
        </div>
        <div className="my-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
          {posts?.map((p: { _id: string }) => (
            <PostList key={p._id} post={p} aspect="square" />
          ))}
        </div>
      </Container>
    </>
  )
}
PostDefault.Layout = Layout
