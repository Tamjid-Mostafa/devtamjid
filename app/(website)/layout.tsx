import { Footer, Navbar } from '@/components/common'
import { getSettings } from '@/lib/sanity/client'

import { urlForImage } from '@/lib/sanity/image'

async function sharedMetaData(params: any) {
  const settings = await getSettings()
console.log(settings);
  return {
    // enable this for resolving opengraph image
    metadataBase: new URL(settings.url),
    title: {
      default: settings?.title || 'Tamjid Mostafa - Full Stack Web Developer',
      template: '%s | Tamjid',
    },
    description:
      settings?.description || 'Tamjid Mostafa - Full Stack Web Developer.',
    keywords: ['Next.js', 'Sanity', 'Tailwind CSS', 'React'],
    authors: [{ name: 'Tamjid' }],
    alternates: {
      canonical: settings?.url,
    },
    openGraph: {
      images: [
        {
          url: urlForImage(settings?.openGraphImage)?.src || '/ogImage.png',
          width: 800,
          height: 600,
          alt: settings?.title || 'Tamjid Mostafa',
        },
      ],
    },
    twitter: {
      title: settings?.title || 't4mjid',
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateMetadata({ params }: any) {
  return await sharedMetaData(params)
}

export default async function Layout({ children, params }: any) {
  const settings = await getSettings()
  return (
    <>
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  )
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
