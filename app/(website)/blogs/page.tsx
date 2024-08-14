import { Container, Text } from '@/components/ui'
import { fetcher, getAllPosts } from '@/lib/sanity/client'
import React from 'react'
import HomePage from '@/components/Blogs/BlogsHome'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <>
      <HomePage posts={posts} />
    </>
  )
}

export const revalidate = 60
