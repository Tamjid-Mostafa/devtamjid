import { urlForImage } from '@/lib/sanity/image'
import { PortableText } from '@/lib/sanity/plugins/portabletext'
import Image from 'next/image'
import Link from '@/components/ui/Link'

interface Author {
  name: string
  slug: { current: string }
  image?: any // Replace 'any' with the actual type of the 'image' property
  bio?: any // Replace 'any' with the actual type of the 'bio' property
}

interface AuthorCardProps {
  author: Author
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  const imageProps = author?.image ? urlForImage(author.image) : null
  return (
    <div className="mt-3 rounded-2xl bg-accent-2 px-8 py-8 text-accent-8 ">
      <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
        <div className="relative mt-1 h-24 w-24 flex-shrink-0">
          {imageProps && (
            <Link href={`/author/${author.slug.current}`}>
              <Image
                src={imageProps.src}
                alt={author.name}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-medium text-accent-8">
              <span className='text-xs'>About</span> {author.name}
            </h3>
          </div>
          <div>{author.bio && <PortableText value={author.bio} />}</div>
          <div className="mt-3 ">
            <Link href={`/author/${author.slug.current}`}>
              <span className="underline underline-offset-2 text-sm text-blue">
                View Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
