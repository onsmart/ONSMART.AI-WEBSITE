
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./CarouselContext"
import { CarouselContentProps } from "./types"

export const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = "CarouselContent"
