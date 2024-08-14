'use client'
import React from 'react'
import Text from '../Text/Text'
import { getRandomPairOfColors } from '@/lib/colors'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import s from './SectionHead.module.css'
import { fadeIn, slideIn, staggerContainer } from '@/lib/useAnimation'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
interface SectionHeadProps {
  title: string
  description: string
  variant: 'center' | 'left' | 'simple'
  className: string
  bg?: string[]
}

const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  description,
  variant = 'center',
  className,
  // bg
}) => {
  const bg = getRandomPairOfColors()
  const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
  const rootClassName = cn(
    s.root,
    {
      [s.center]: variant === 'center',
      [s.left]: variant === 'left',
      [s.simple]: variant === 'simple',
    },
    className,
  )
  return (
    <>
      {variant === 'center' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={cn(rootClassName, 'flex flex-col items-center')}
        >
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.1, 0.7)}
            >
              <Text variant="heading" className="text-center">
                {title}
              </Text>
            </motion.div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.3, 0.7)}
              className={`h-2 w-28 rounded-full`}
              style={{ backgroundImage: value }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeIn('up', 'tween', 0.5, 0.7)}
          >
            <Text variant="body" className={s.description}>
              {description}
            </Text>
          </motion.div>
        </motion.div>
      )}

      {variant === 'left' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={cn(rootClassName, 'flex flex-col items-start')}
        >
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.1, 0.7)}
            >
              <Text variant="heading" className="text-start">
                {title}
              </Text>
            </motion.div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={slideIn('up', 'tween', 0.3, 0.7)}
              className={`h-2 w-28 rounded-full`}
              style={{ backgroundImage: value }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeIn('up', 'tween', 0.5, 0.7)}
          >
            <Text variant="body" className={s.description}>
              {description}
            </Text>
          </motion.div>
        </motion.div>
      )}

      {variant === 'simple' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={cn(rootClassName, '')}
        >
          <div>
            <div className="min-h-min overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={slideIn('up', 'tween', 0.1, 0.7)}
              >
                <Text variant="heading" className="text-start">
                  {title}
                </Text>
              </motion.div>
            </div>
            <div className="min-h-min overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={slideIn('up', 'tween', 0.3, 0.7)}
                className={`h-2 w-28 rounded-full`}
                style={{ backgroundImage: value }}
              />
            </div>
          </div>
          <Link
            href={'/projects'}
            className="flex items-center gap-4 border-b border-accent-7"
          >
            <span className="font-bold">View all projects</span>
            <ArrowRight />
          </Link>
        </motion.div>
      )}
    </>
  )
}

export default SectionHead
