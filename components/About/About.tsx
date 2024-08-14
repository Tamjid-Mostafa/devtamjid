'use client'
import React, { FC } from 'react'
import { Express } from '@/components/icons'
import {
  DiBootstrap,
  DiFirebase,
  DiMongodb,
  DiNodejs,
  DiReact,
} from 'react-icons/di'
import { FaCcStripe } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import s from './About.module.css'
import { motion } from 'framer-motion'
import { Button, Container, Grid, SectionHead, Text } from '@/components/ui'
import { fadeIn, slideIn, staggerContainer, zoomIn } from '@/lib/useAnimation'
import useWindowSize from '@/lib/hooks/useWindowSize'

export const Stacks = [
  {
    title: 'MongoDB',
    icon: <DiMongodb size="3rem" />,
  },
  {
    title: 'Express',
    icon: <Express />,
  },
  {
    title: 'React',
    icon: <DiReact size="3rem" />,
  },
  {
    title: 'Node',
    icon: <DiNodejs size="3rem" />,
  },

  {
    title: 'Firebase',
    icon: <DiFirebase size="3rem" />,
  },
  {
    title: 'Bootstrap',
    icon: <DiBootstrap size="3rem" />,
  },
  {
    title: 'Stripe',
    icon: <FaCcStripe size="3rem" />,
  },
]

interface Props {
  className?: string
  variant?: 'default' | 'full-width'
  bg: string[]
  authors?: any
  settings?: any
}
const About: FC<Props> = ({
  className,
  variant = 'default',
  bg,
  authors,
  settings,
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.default]: variant === 'default',
      [s.filled]: variant === 'full-width',
    },
    className,
  )
  const { isDesktop } = useWindowSize()
  return (
    <Container className={rootClassName}>
      <SectionHead
        // bg={bg}
        title="About Me"
        description="👋 Learn more about me, my skills, and tech expertise! Explore my
        programming journey and current abilities. 🚀💻"
        variant="center"
        className=""
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="flex lg:flex-row flex-col items-start gap-10"
      >
        <motion.div className="flex-1 space-y-5">
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.2, 0.7)}
            >
              <Text variant="sectionHeading">Peek into my life!</Text>
            </motion.div>
          </div>

          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeIn('', 'tween', 0.5, 0.7)}
            >
              <Text variant="body" className='text-accent-6'>
                <p>
                  👩‍💻 Welcome! I'm a Web Wizard 🧙‍♀️, conjuring up captivating
                  Front-end & Back-end magic 🌟 to bring Websites and Web
                  Applications to life 🌐. Discover my enchanting creations in
                  the Projects realm 🔮. Let's embark on a journey of innovation
                  and create wonders together! 🚀💡
                </p>

                <p>
                  📚🌱 Sharing knowledge is my passion! I love to spread the
                  wisdom 🌟 I've gathered during my Web Development journey,
                  empowering fellow Devs 🧙‍♂️ with valuable insights. Join me on{' '}
                  <a
                    href="https://www.linkedin.com/in/tamjid-mostafa/"
                    target="_blank"
                    className="text-blue"
                    rel="noopener"
                  >
                    LinkedIn
                  </a>{' '}
                  🤝 for a treasure trove of Web Development and Programming
                  gems 💎. Let's grow together as a thriving Dev Community! 🌐🚀
                </p>

                <p>
                  🌱🚀 Ready for the next adventure! I'm on the lookout for
                  exciting job opportunities 🌟 where I can contribute, learn,
                  and soar to new heights. If you have a great opportunity that
                  aligns with my skills and experience, I'm just a message away!
                  Let's connect and make great things happen together! 🤝💼
                </p>
              </Text>
            </motion.div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.7, 0.7)}
            >
              <Button
                Component={'a'}
                href="/contact"
                variant="slim"
                className="rounded"
              >
                Contact
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="">
          <Text variant="sectionHeading">My Skills</Text>
          {isDesktop && (
            <Grid variant="filled" layout="C">
              {Stacks.map(
                (
                  item: { title: string; icon: React.JSX.Element },
                  index: number,
                ) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="show"
                    whileTap="tap"
                    whileHover="hover"
                    variants={zoomIn('', '', index * 0.2, 0.5)}
                    className="bg-accent-2 shadow-xl flex items-center justify-center rounded-lg px-3 py-2 m-2"
                  >
                    <span>{item.icon}</span>
                    <span className="sr-only">{item.title}</span>
                  </motion.div>
                ),
              )}
            </Grid>
          )}
          {!isDesktop && (
            <div className="flex flex-wrap">
              {Stacks.map(
                (
                  item: { title: string; icon: React.JSX.Element },
                  index: number,
                ) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="show"
                    whileTap="tap"
                    whileHover="hover"
                    variants={zoomIn('', '', index * 0.2, 0.5)}
                    className="bg-accent-2 shadow-xl flex items-center justify-center rounded-lg px-3 py-2 m-2"
                  >
                    <span>{item.icon}</span>
                    <span className="sr-only">{item.title}</span>
                  </motion.div>
                ),
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </Container>
  )
}

export default About
