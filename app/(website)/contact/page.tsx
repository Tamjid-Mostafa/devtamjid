import Contact from "@/components/Contact";
import { getRandomPairOfColors } from "@/lib/colors";
import { getSettings } from "@/lib/sanity/client";

export default async function ContactPage() {
  const settings = await getSettings();
  const bg = getRandomPairOfColors()
  return <Contact bg={bg} settings={settings} />;
}

// export const revalidate = 60;
