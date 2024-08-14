import About from "@/components/About";
import Hero from "@/components/Hero";
import { Container } from "@/components/ui";
import { getRandomPairOfColors } from "@/lib/colors";
import { getAllPosts } from "@/lib/sanity/client";

export default async function IndexPage() {
  const posts = await getAllPosts();
  const bg = getRandomPairOfColors();
  return (
    <Container clean className="max-w-8xl mx-auto px-6 md:px-20">
      <div>
        <div className="">
          <Hero variant="default" bg={bg} />
        </div>
        {/* <Container className="p-10">
      <FeaturedPost posts={blogs} />
    </Container> */}
        <div className="my-10">
          <About bg={bg} />
        </div>
        {/* <div className="">
      <Projects
        projectsData={objectData}
        variant={isMobile ? 'fade' : 'slider'}
        bg={bg}
      />
    </div> */}
        {/* <div className="fit">
      <Contact bg={bg} settings={settings} />
    </div> */}
      </div>
    </Container>
  );
}

// export const revalidate = 60;
