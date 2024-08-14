'use client'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/Project/ProjectCard'
import { fadeIn, staggerContainer } from '@/lib/useAnimation'
import SwiperComponent from '@/components/SwiperComponent'
import { SectionHead } from '@/components/ui'
import { ProjectType } from '@/lib/types'

const Projects: React.FC<{
  projectsData: ProjectType[]
  variant?: 'default' | 'slider' | 'fade'
  bg: string
}> = ({ projectsData, variant = 'default', bg }) => {
  const renderProjectCard = (project: ProjectType) => (
    <ProjectCard
      project={project}
      imgProps={{
        alt: project.title,
        priority: true,
      }}
      className="mb-20 lg:flex-row-reverse"
    />
  )
  return (
    <>
      {variant === 'default' && (
        <>
          <SectionHead
            title="Projects"
            description="Here, you'll discover a collection of my personal and client projects, each accompanied by its own detailed case study. Let's dive into the world of creativity and innovation together! 🚀💡"
            variant={'center'}
            className={''}
            // bg={bg}
          />
          <motion.div
            className="w-full"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {projectsData?.map((project: ProjectType, i: number) => (
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeIn('up', 'tween', i * 0.1, 0.7)}
                key={i}
                className="my-20"
              >
                <ProjectCard
                  project={project}
                  imgProps={{
                    alt: project.title,
                    priority: true,
                  }}
                  className={i % 2 === 1 ? 'lg:flex-row-reverse' : ''}
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
      {variant === 'fade' && (
        <>
          <SectionHead
            title="Projects"
            description="Here, you'll discover a collection of my personal and client projects, each accompanied by its own detailed case study. Let's dive into the world of creativity and innovation together! 🚀💡"
            variant={'center'}
            className={''}
            // bg={bg}
          />
          <SwiperComponent
            items={projectsData}
            renderItem={renderProjectCard}
          />
        </>
      )}
      {variant === 'slider' && (
        <>
          <SectionHead
            title="Projects"
            description="Here, you'll discover a collection of my personal and client projects, each accompanied by its own detailed case study. Let's dive into the world of creativity and innovation together! 🚀💡"
            variant={'simple'}
            className={''}
            // bg={bg}
          />
          <SwiperComponent
            items={projectsData}
            renderItem={(project: ProjectType, i: number) => (
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeIn('up', 'tween', i * 0.1, 0.7)}
                className="my-20"
              >
                <ProjectCard
                  variant="retro"
                  project={project}
                  imgProps={{
                    alt: project.title,
                    priority: true,
                  }}
                  className={'lg:flex-row-reverse'}
                />
              </motion.div>
            )}
            navigationButtonVariant="left"
          />
        </>
      )}
    </>
  )
}

export default Projects
