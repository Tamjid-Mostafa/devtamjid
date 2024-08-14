'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import s from './SwiperButton.module.css'
import { useSwiper } from 'swiper/react'
import { cn } from '@/lib/utils'

const SwiperButton: React.FC<{
  className?: string
  variant?: 'default' | 'center' | 'left' | 'right'
}> = ({ className, variant = 'default' }) => {
  const swiper = useSwiper()

  const rootClassName = cn(
    s.root,
    {
      [s.default]: variant === 'default',
      [s.center]: variant === 'center',
      [s.left]: variant === 'left',
      [s.right]: variant === 'right',
    },
    className,
  )

  return (
    <div className={rootClassName}>
      <button onClick={() => swiper.slidePrev()} className={s.custom_prev}>
        <ChevronLeft />
        <span className="sr-only">Prev</span>
      </button>
      <button onClick={() => swiper.slideNext()} className={s.custom_next}>
        <ChevronRight />
        <span className="sr-only">Next</span>
      </button>
    </div>
  )
}

export default SwiperButton
