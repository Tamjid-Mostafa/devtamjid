// components/SwiperComponent.tsx

import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectFade,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { SwiperButton } from '@/components/ui'

interface SwiperComponentProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  navigationButtonVariant?: 'default' | 'center' | 'left' | 'right'
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  items,
  renderItem,
  navigationButtonVariant
}) => {
  return (
    <Swiper
      modules={[Navigation, EffectFade, A11y, Autoplay]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 5500,
        disableOnInteraction: false,
      }}
    >
      {items?.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
      ))}
      
    </Swiper>
  )
}

export default SwiperComponent
