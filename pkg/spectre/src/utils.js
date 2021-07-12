import { useCallback, useEffect, useState } from "react"
import { useTrail } from "react-spring"
import { useLocation } from "wouter"
import { springs } from "./styles"

export function randomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

export function randChar(from) {
  return from[Math.floor(Math.random() * from.length)]
}

export function raf(callback, interval = 1000 / 60) {
  let rafId
  let lastUpdate = Date.now()

  const loop = () => {
    rafId = requestAnimationFrame(loop)

    // interval can be passed as a function, which allows
    // to change it on the fly (e.g. for Type.jsx)
    const _interval = typeof interval === "function" ? interval() : interval

    const now = Date.now()
    if (now - lastUpdate < _interval) {
      return
    }
    lastUpdate = now

    callback()
  }

  loop()

  return () => cancelAnimationFrame(rafId)
}

export function useAppear(items, opts = {}) {
  const [progress, setProgress] = useState(0)
  useEffect(() => setProgress(1), [])
  return useTrail(items, { progress, config: springs.appear, ...opts })
}

export function formatLineBreaks(value) {
  return value.trim().replace(/ {2,}/, " ").replace(/\n /, "\n")
}

export function kebabCase(value) {
  return value
    .replace("&", " ")
    .replace("?", "")
    .replace(/ +/g, "-")
    .toLowerCase()
}

export function usePath() {
  const [location, setLocation] = useLocation()
  return [
    location,
    useCallback(
      (path) => {
        setLocation(path)
        setTimeout(() => {
          window.document.documentElement.style.scrollBehavior = "auto"
          window.scrollTo(0, 0)
          window.document.documentElement.style.scrollBehavior = null
          setLocation(path)
        }, 100)
      },
      [setLocation]
    ),
  ]
}

export function isValidEmail(value) {
  return /(.+)@(.+){2,}\.(.+){2,}/.test(value)
}
