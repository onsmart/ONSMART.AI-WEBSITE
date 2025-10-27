
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./CarouselContext"
import { CarouselItemProps } from "./types"

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"
