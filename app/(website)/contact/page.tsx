import Contact from '@/components/Contact'
import { Container, SectionHead } from '@/components/ui'
import { getRandomPairOfColors } from '@/lib/colors'
import { getSettings } from '@/lib/sanity/client'

export default async function ContactPage() {
  const settings = await getSettings()
  const bg = getRandomPairOfColors()
  return (
    <Container>
      <SectionHead
        title="Contact"
        description="I am here to help."
        variant="center"
        className={''}
        bg={bg}
      />
      <Contact settings={settings} />;
    </Container>
  )
}

// export const revalidate = 60;
