import { apiVersion, dataset, projectId, useCdn } from './config'
import {
  postquery,
  limitquery,
  paginatedquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  getAll,
  searchquery,
  categorybycatslug,
} from './groq'
import { createClient, SanityClient } from 'next-sanity'

if (!projectId) {
  console.error(
    'The Sanity Project ID is not set. Check your environment variables.',
  )
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export const fetcher = async ([query, params]: [string, any]) => {
  return client ? client.fetch(query, params) : []
}
;(async () => {
  if (client) {
    const data = await client.fetch(getAll)
    if (!data || !data.length) {
      console.error(
        'Sanity returns empty array. Are you sure the dataset is public?',
      )
    }
  }
})()

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery)) || []
  }
  return []
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || []
  }
  return []
}

export async function getPostBySlug(slug: string) {
  if (client) {
    return (await client.fetch(singlequery, { slug })) || {}
  }
  return {}
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || []
    return slugs.map((slug: string) => ({ slug }))
  }
  return []
}
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery)) || []
    return slugs.map((slug: string) => ({ author: slug }))
  }
  return []
}

export async function getAuthorPostsBySlug(slug: string) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {}
  }
  return {}
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || []
  }
  return []
}

// Category

export async function getAllCategoriesSlugs() {
  if (client) {
    const slugs = (await client.fetch(catpathquery)) || []
    return slugs.map((slug: string) => ({ category: slug }))
  }
  return []
}
export async function getCategoryBySlug(slug: string) {
  if (client) {
    return (await client.fetch(categorybycatslug, { slug })) || {}
  }
  return {}
}

export async function getPostsByCategory(slug: string) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug })) || {}
  }
  return {}
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(catquery)) || []
  }
  return []
}

export async function getPaginatedPosts({
  pageIndex,
  limit,
}: {
  pageIndex: number
  limit: number
}) {
  if (client) {
    return (
      (await client.fetch(paginatedquery, {
        pageIndex: pageIndex,
        limit: limit,
      })) || {}
    )
  }
  return {}
}
