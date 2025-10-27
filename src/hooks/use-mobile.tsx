import * as React from "react"

// Breakpoints consistentes com Tailwind
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const

// Breakpoint móvel padrão (md)
const MOBILE_BREAKPOINT = BREAKPOINTS.md

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Hook para detectar tamanhos específicos de tela
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isBreakpoint, setIsBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(min-width: ${breakpointValue}px)`)
    const onChange = () => {
      setIsBreakpoint(window.innerWidth >= breakpointValue)
    }
    mql.addEventListener("change", onChange)
    setIsBreakpoint(window.innerWidth >= breakpointValue)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isBreakpoint
}
