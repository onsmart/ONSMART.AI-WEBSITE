
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { HTMLAttributes, ComponentProps } from "react"
import { Button } from "@/components/ui/button"

export type CarouselApi = UseEmblaCarouselType[1]
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

export interface CarouselCoreProps extends HTMLAttributes<HTMLDivElement>, CarouselProps {}

export interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {}

export interface CarouselNavigationProps extends ComponentProps<typeof Button> {}
