import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useLocation } from "wouter"

const AppScrollContext = createContext()

export function AppScroll({ children }) {
  const callbacks = useRef([])

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
  const appScrollRef = useRef()

  return (
    <AppScrollContext.Provider
      value={{ appScrollRef, updateAppScroll, addCallback, removeCallback }}
    >
      <ResetScrollOnPathChange>{children}</ResetScrollOnPathChange>
    </AppScrollContext.Provider>
  )
}

function ResetScrollOnPathChange({ children }) {
  const [pathname] = useLocation()
  const { appScrollRef } = useAppScrollUpdater()

  useEffect(() => {
    appScrollRef.current.scrollTo(0, 0)
  }, [appScrollRef, pathname])

  return children
}

export function useAppScroll(callback) {
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

export function useAppScrollUpdater() {
  const { appScrollRef, updateAppScroll } = useContext(AppScrollContext)
  return { appScrollRef, updateAppScroll }
}
