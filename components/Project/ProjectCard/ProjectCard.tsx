'use client'
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import s from './ProjectCard.module.css'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'
import { Button, SwiperButton } from '@/components/ui'
import { ArrowRight } from 'lucide-react'
import { slugify } from '@/lib/utils'

interface Props {
  className?: string
  project: any
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'retro'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProjectCard: FC<Props> = ({
  project,
  imgProps,
  className,
  noNameTag = false,
  variant = 'simple',
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.slim]: variant === 'slim',
      [s.simple]: variant === 'simple',
      [s.retro]: variant === 'retro',
    },
    className,
  )
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  return (
    <>
      {variant === 'default' && (
        <>
          {project?.image && (
            <div
              className="max-h-[720px] overflow-hidden rounded-lg relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.175, 0.885, 0.32, 1.275], // Customize the ease values here
                }}
              >
                <motion.button
                  className="bg-accent-0 p-10 rounded-full"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0 }}
                >
                  View
                  <br />
                  Details
                </motion.button>
              </motion.div>
              <motion.div
                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.175, 0.885, 0.32, 1.275], // Customize the ease values here
                }}
              >
                <Image
                  quality="85"
                  src={project.image || placeholderImg}
                  alt={project.name || 'Project Image'}
                  height={320}
                  width={1920}
                  {...imgProps}
                />
              </motion.div>
            </div>
          )}
          <div className="flex flex-none flex-nowrap items-center mt-5 mb-10">
            <div className={s.header}>
              <span>{project.title}</span>
            </div>
            <div className="font-normal text-2xl">
              <span>{project.subTitle}</span>
            </div>
            <div className="w-[20%]" />
            <div className="gap-2 hidden lg:flex font-normal text-2xl">
              {project?.tags.map((tag: string, i: any) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </>
      )}
      {variant === 'simple' && (
        <>
          <div className={rootClassName}>
            <div className="relative w-full lg:w-[620px] mb-8">
              {project?.image && (
                <>
                  <Image
                    quality="85"
                    src={project.image || placeholderImg}
                    alt={project.name || 'Project Image'}
                    height={320}
                    width={620}
                    {...imgProps}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col justify-center  items-start gap-5 max-w-lg">
              <div className="text-4xl font-semibold">
                <span>{project.title}</span>
              </div>
              <div className="font-normal text-xl">
                <span>{project.subTitle}</span>
              </div>
              <div className="font-normal text-xl">
                <span>{project.description.slice(0, 100)}...</span>
              </div>
              <div className="flex flex-wrap gap-2 font-semibold text-lg text-white">
                {project?.tags.map((tag: string, i: any) => (
                  <span key={i} className="bg-accent-3 px-3 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                Component="a"
                href={`/projects/${slugify(project.slug)}`}
                variant="slim"
                className="rounded"
              >
                Case Study
              </Button>
            </div>
          </div>
        </>
      )}

      {variant === 'retro' && (
        <>
          <div className={rootClassName}>
            <div className="relative w-full lg:w-[720px]  mb-8 flex-grow">
              {project?.image && (
                <>
                  <Image
                    quality="85"
                    src={project.image || placeholderImg}
                    alt={project.name || 'Project Image'}
                    height={620}
                    width={1080}
                    {...imgProps}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col justify-start  items-start gap-5 ">
              <div className="space-y-5 max-w-lg">
                <div className="text-4xl font-semibold">
                  <span>{project.title}</span>
                </div>
                <div className="font-normal text-xl">
                  <span>{project.subTitle}</span>
                </div>
                <div className="font-normal text-xl">
                  <span>{project.description}</span>
                </div>
                <div className="flex flex-wrap gap-2 font-semibold text-lg text-white">
                  {project?.tags.map((tag: string, i: any) => (
                    <span key={i} className="bg-accent-3 px-3 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/projects/${slugify(project.slug)}`}
                className="border-b border-accent-7 flex items-center w-fit my-10"
              >
                <span className="font-bold mr-4">Case Study</span>
                <ArrowRight />
              </Link>
              <SwiperButton variant="left" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProjectCard
