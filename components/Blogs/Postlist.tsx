import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { parseISO, format } from 'date-fns';
import { PhotoIcon } from '@heroicons/react/24/outline';
import CategoryLabel from './Category';
import { urlForImage } from '@/lib/sanity/image';


interface PostListProps {
  post: any;
  aspect?: 'landscape' | 'square' | 'custom';
  minimal?: boolean;
  pathPrefix?: string;
  preloadImage?: boolean;
  fontSize?: 'small' | 'large';
  fontWeight?: 'normal' | 'bold';
}

export default function PostList({
  post,
  aspect = 'square',
  minimal = false,
  pathPrefix = '',
  preloadImage = false,
  fontSize = 'small',
  fontWeight = 'bold',
}: PostListProps) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;
  const AuthorImageProps = post?.author?.image && urlForImage(post.author.image);

  return (
    <div className={cn('group cursor-pointer', minimal && 'grid md:grid-cols-2 gap-5 md:gap-10 bg-accent-1')}>
      <div className={cn('', minimal ? '' : 'overflow-hidden rounded-md transition-all hover:scale-105')}>
        <Link
          className={cn(
            'relative block',
            aspect === 'landscape'
              ? 'aspect-video'
              : aspect === 'custom'
              ? 'aspect-[5/4]'
              : 'aspect-square',
          )}
          href={`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`}
        >
          {imageProps ? (
            <Image
              src={imageProps.src}
              {...(post.mainImage.blurDataURL && {
                placeholder: 'blur',
                blurDataURL: post.mainImage.blurDataURL,
              })}
              alt={post.mainImage.alt || 'Thumbnail'}
              priority={preloadImage}
              className="object-cover transition-all"
              fill
              sizes="(max-width: 768px) 30vw, 33vw"
            />
          ) : (
            <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-accent-2">
              <PhotoIcon />
            </span>
          )}
        </Link>
      </div>

      <div className={cn(minimal && 'self-center px-5 pb-10')}>
        <div>
          {!minimal && <CategoryLabel categories={post.categories} nomargin={minimal} />}
          <h2
            className={cn(
              fontSize === 'large'
                ? 'text-2xl'
                : minimal
                ? 'text-4xl'
                : 'text-lg',
              fontWeight === 'normal'
                ? 'line-clamp-2 font-medium  tracking-normal text-accent-9'
                : 'font-semibold leading-snug tracking-tight',
              'mt-2 text-accent-9',
            )}
          >
            <Link href={`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`}>
              <span className="bg-gradient-to-r from-blue to-pink-light bg-[length:0px_3px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_3px]">
                {post.title}
              </span>
            </Link>
          </h2>

          <div className="hidden">
            {post.excerpt && (
              <p className="mt-2 line-clamp-3 text-sm text-accent-5">
                <Link href={`/blogs/${pathPrefix ? `${pathPrefix}/` : ''}${post.slug.current}`}>
                  {post.excerpt}
                </Link>
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center space-x-3 text-accent-5">
            <Link href={`/author/${post?.author?.slug?.current}`}>
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  {post?.author?.image && (
                    <Image
                      src={AuthorImageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="20px"
                    />
                  )}
                </div>
                <span className="truncate text-sm">{post?.author?.name}</span>
              </div>
            </Link>
            <span className="text-xs text-accent-6">&bull;</span>
            <time className="truncate text-sm" dateTime={post?.publishedAt || post._createdAt}>
              {format(parseISO(post?.publishedAt || post._createdAt), 'MMMM dd, yyyy')}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
