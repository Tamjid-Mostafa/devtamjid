import { Variants, Transition } from 'framer-motion'

export const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 1,
    },
  },
}
export const zoomIn = (direction: string, type: string, delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.2,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 900,
      damping: 130,
    },
  },
  tap: {
    scale: 1.5,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 900,
      damping: 130,
    },
  }
});

export const slideIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
}

export const textVariant = (delay: number): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.9,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

export const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
  exit: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 100,
    opacity: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const scrollVariants: Variants = {
  hidden: {
    opacity: 1,
    scale: 1,
    y: -10,
  },
  visible: {
    opacity: 0,
    scale: 1,
    y: 10,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror',
    },
  },
}
