import About from "@/components/About";
import { getRandomPairOfColors } from "@/lib/colors";
import { getAllAuthors, getSettings } from "@/lib/sanity/client";

export default async function AboutPage() {
  const authors = await getAllAuthors();
  const settings = await getSettings();
  const bg = getRandomPairOfColors()
  return <About bg={bg} settings={settings} authors={authors} className="mb-10" />;
}

// export const revalidate = 60;
