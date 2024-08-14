"use client"
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Button, Text } from '@/components/ui'
import { fadeIn, slideIn, staggerContainer } from '@/lib/useAnimation'
import { cn } from "@/lib/utils";
import s from './Hero.module.css'
import { ImageProps } from 'next/image'
import MouseScrollIcon from '@/components/ui/MouseScrollIcon'

interface Props {
  className?: string
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'middle' | 'simple'
  bg: string[]
}
const Hero: FC<Props> = ({
  imgProps,
  className,
  variant = 'default',
  bg
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.default]: variant === 'default',
      [s.middle]: variant === 'middle',
      [s.simple]: variant === 'simple',
    },
    className
  )
  const textItems = ['Tamjid Mostafa', 'Full Stack Developer']
  const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`

  return (
    <>
      {variant === 'middle' && (
        <motion.div
          className={rootClassName}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div>
            {textItems.map((text, index) => (
              <div className={s.title} key={index}>
                <motion.div variants={slideIn('up', 'tween', index * 0.2, 0.5)}>
                  <Text variant="heroHeading">{text}</Text>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div
              variants={fadeIn('', 'tween', 0.5, 0.5)}
              className={s.description}
            >
              <Text variant="heroBody">
                Full Stack Developer crafting exceptional web apps with Nextjs,
                React, Node.js, MongoDB, Firebase, and more. Let's build
                something amazing together! 🚀
              </Text>
            </motion.div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div variants={slideIn('up', 'tween', 0.5, 0.2)}>
              <Button variant="flat" className={s.btn}>
                tamjid430@gmail.com
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
      {variant === 'default' && (
        <motion.div
          className={rootClassName}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div>
            <div
              className={cn(
                s.title,
                'px-5 py-1 mb-2 text-white rounded-lg drop-shadow-md w-fit mx-auto'
              )}
              style={{
                backgroundImage: value,
              }}
            >
              <motion.div variants={slideIn('up', 'tween', 0.2, 0.5)}>
                <Text variant="heading">Full Stack Developer</Text>
              </motion.div>
            </div>
            <div className={s.title}>
              <motion.div variants={slideIn('up', 'tween', 0.4, 0.5)}>
                <Text variant="heroHeading">HEY, I'M Tamjid Mostafa</Text>
              </motion.div>
            </div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div
              variants={slideIn('up', 'tween', 0.6, 0.5)}
              className={s.description}
            >
              <Text variant="heroBody">
                Crafting exceptional web apps with Nextjs, React, Node.js,
                MongoDB, Firebase, and more. Let's build something amazing
                together! 🚀
              </Text>
            </motion.div>
          </div>
          <div className="min-h-min overflow-hidden">
            <motion.div variants={slideIn('up', 'tween', 0.8, 0.5)}>
              <Button Component={"a"} href='/contact' variant="flat" className={s.btn}>
                Contact Me
              </Button>
            </motion.div>
          </div>
          <MouseScrollIcon />
        </motion.div>
      )}
    </>
  )
}

export default Hero
