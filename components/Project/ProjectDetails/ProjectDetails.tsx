'use client'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Button, MouseScrollIcon, Text } from '@/components/ui'
import { slideIn, staggerContainer } from '@/lib/useAnimation'
import { cn } from '@/lib/utils'
import s from './ProjectDetails.module.css'
import { ProjectType } from '@/lib/types'
const ProjectDetails = ({
  title,
  slug,
  subTitle,
  description,
  image,
  tags,
  source,
  visit,
  id,
  features,
  technologies,
  status,
}: ProjectType) => {
  return (
    <div className={s.root}>
      <motion.div
        className={s.default}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div>
          <div className={s.title}>
            <motion.div variants={slideIn('up', 'tween', 0.4, 0.5)}>
              <Text variant="heroHeading">{title}</Text>
            </motion.div>
          </div>
        </div>
        <div className="min-h-min overflow-hidden">
          <motion.div
            variants={slideIn('up', 'tween', 0.6, 0.5)}
            className={s.description}
          >
            <Text variant="heroBody">{description}</Text>
          </motion.div>
        </div>
        <div className="min-h-min overflow-hidden">
          <motion.div variants={slideIn('up', 'tween', 0.8, 0.5)}>
            <Button variant="ghost" className={s.btn}>
              {status}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectDetails
