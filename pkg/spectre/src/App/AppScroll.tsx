import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import { useLocation } from "wouter"

type AppScrollRef = RefObject<HTMLDivElement>

type AppScrollContext = {
  animateOnPathChange: MutableRefObject<boolean>
  appScrollRef: AppScrollRef
  updateAppScroll: (scrollY: number) => void
  addCallback: (cb: (scrollY: number) => void) => void
  removeCallback: (cb: (scrollY: number) => void) => void
}

const AppScrollContext = createContext<AppScrollContext>({} as AppScrollContext)

type AppScrollProps = { children: ReactNode }

export function AppScroll({ children }: AppScrollProps) {
  const callbacks = useRef<((scrollY: number) => void)[]>([])

  const addCallback = useCallback((cb) => {
    callbacks.current.push(cb)
  }, [])
  const removeCallback = useCallback((cb) => {
    callbacks.current = callbacks.current.filter((_cb) => _cb !== cb)
  }, [])
  const updateAppScroll = useCallback((value) => {
    callbacks.current.forEach((cb) => cb(value))
  }, [])

  // keep a reference to the scrollable element so it can be shared
  const appScrollRef = useRef<HTMLDivElement>(null)

  const animateOnPathChange = useRef(true)

  return (
    <AppScrollContext.Provider
      value={{
        addCallback,
        animateOnPathChange,
        appScrollRef,
        removeCallback,
        updateAppScroll,
      }}
    >
      <ResetScrollOnPathChange>{children}</ResetScrollOnPathChange>
    </AppScrollContext.Provider>
  )
}

function ResetScrollOnPathChange({ children }: { children: ReactNode }) {
  const [pathname] = useLocation()
  const { animateOnPathChange, appScrollRef } = useContext(AppScrollContext)

  useEffect(() => {
    if (appScrollRef.current && animateOnPathChange.current) {
      appScrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
    animateOnPathChange.current = true
  }, [animateOnPathChange, appScrollRef, pathname])

  return <>{children}</>
}

export function usePreventNextScrollReset() {
  const { animateOnPathChange } = useContext(AppScrollContext)
  return useCallback(() => {
    animateOnPathChange.current = false
  }, [animateOnPathChange])
}

export function useAppScroll(callback: (scrollY: number) => void) {
  const _callback = useRef(callback)
  const { addCallback, removeCallback } = useContext(AppScrollContext)

  useEffect(() => {
    if (!_callback.current) {
      return
    }
    addCallback(_callback.current)
    return () => {
      removeCallback(_callback.current)
    }
  }, [addCallback, removeCallback])
}

export function useResetScroll() {
  const { appScrollRef } = useAppScrollUpdater()
  return useCallback(() => {
    if (appScrollRef.current) {
      appScrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [appScrollRef])
}

export function useAppScrollUpdater(): {
  appScrollRef: AppScrollRef
  updateAppScroll: (scrollY: number) => void
} {
  const { appScrollRef, updateAppScroll } = useContext(AppScrollContext)
  return { appScrollRef, updateAppScroll }
}
