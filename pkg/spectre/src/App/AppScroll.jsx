import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

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

  return (
    <AppScrollContext.Provider
      value={{ updateAppScroll, addCallback, removeCallback }}
    >
      {children}
    </AppScrollContext.Provider>
  )
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
  return useContext(AppScrollContext).updateAppScroll
}
