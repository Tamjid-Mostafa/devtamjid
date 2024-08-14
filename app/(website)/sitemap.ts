import {
  getAllAuthorsSlugs,
  getAllCategoriesSlugs,
  getAllPosts,
} from '@/lib/sanity/client'
import { MetadataRoute } from 'next'

// Base URLs for different environments
const baseUrlDev = "http://localhost:3000"; // Development
const baseUrlProd = process.env.NEXT_PUBLIC_DOMAIN || "https://devtamjid.com"; // Production

// Determine the current environment and select the appropriate base URL
const currentEnv = process.env.NODE_ENV || 'production';
const rootUrl = currentEnv === 'development' ? baseUrlDev : baseUrlProd;

// Function to generate dynamic routes
async function generateDynamicRoutes() {
  const authors = await getAllAuthorsSlugs();
  const categories = await getAllCategoriesSlugs();
  const blogs = await getAllPosts();

  const authorRoutes = authors.map((item: { author: string }) => ({
    url: `${rootUrl}/author/${item.author}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.64,
  }));

  const categoryRoutes = categories.map((item: { category: string }) => ({
    url: `${rootUrl}/category/${item.category}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.64,
  }));

  const blogRoutes = blogs.map((blog: { slug: { current: string }, updated_date: string }) => ({
    url: `${rootUrl}/blogs/${blog.slug.current}`,
    lastModified: new Date(blog.updated_date || new Date()).toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...authorRoutes, ...categoryRoutes, ...blogRoutes];
}

// Sitemap generation function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await generateDynamicRoutes();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: rootUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${rootUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${rootUrl}/blogs`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${rootUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${rootUrl}/archive`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${rootUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...dynamicRoutes];
}
