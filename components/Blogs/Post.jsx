
import { Container } from "@/components/ui";
import Link from "@/components/ui/Link";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import NotFound from "pages/404";
import AuthorCard from "./AuthorCard";
import CategoryLabel from "./Category";


export default function Post(props) {
  const { loading, post } = props;
  const slug = post?.slug;

  if (!loading && !slug) {
    NotFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <div className="space-y-10">
      <>
        <div className="mx-auto max-w-screen-md ">
          <div className="flex justify-center">
            <CategoryLabel categories={post?.categories} />
          </div>

          <h1 className="mb-3 mt-2 text-center text-3xl font-semibold tracking-tight text-accent-9 lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-accent-6 ">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {AuthorimageProps && (
                  <Link href={`/author/${post.author.slug.current}`}>
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="40px"
                    />
                  </Link>
                )}
              </div>
              <div>
                <p className="text-accent-8">
                  <Link href={`/author/${post.author.slug.current}`}>
                    {post.author.name}
                  </Link>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-accent-5"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
          // <MainImage image={post.mainImage}/>
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-screen-md">
          <div className="prose mx-auto my-3 prose-a:text-blue prose-h2:text-accent-9 prose-h3:text-accent-9 prose-h4:text-accent-9 prose-h4:font-semibold prose-code:text-green text-accent-9">
            {post.body && <PortableText value={post.body} />}
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue ">
              ← View all posts
            </Link>
          </div>
          {post.author && <AuthorCard author={post.author} />}
        </article>
      </Container>
    </div>
  );
}

const MainImage = ({ image }) => {
  // console.log(image)
  return (
    <div className="mb-12 mt-12 ">
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
