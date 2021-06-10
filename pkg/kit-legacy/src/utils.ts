import { useRef } from "react"

export function addSlash(path: string) {
  return path.endsWith("/") ? path : path + "/"
}

function list(count: number): number[]
function list<T extends unknown>(
  count: number,
  callback: (index: number, steps: number) => T
): T[]

function list<T extends unknown>(
  count: number,
  callback?: (index: number, steps: number) => T
): T[] {
  const _callback = callback || ((index) => index as T)
  return Array.from(Array(count), (_, index) => _callback(index, count))
}
export { list }

export function shuffle<T = unknown>(arr: T[]): T[] {
  const _arr = [...arr]
  for (let i = _arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}

export function lerp(progress: number, value1: number, value2: number): number {
  return (value2 - value1) * progress + value1
}

export function map(
  value: number,
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
): number {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
}

export function useUid(prefix = "uid") {
  return useRef(`${prefix}-${Math.round(Math.random() * 10 ** 8)}`).current
}

export function raf(callback: (time: number) => void, interval = 1000 / 60) {
  let rafId: number
  let lastUpdate = Date.now()

  const loop = (time: number) => {
    rafId = requestAnimationFrame(loop)

    const now = Date.now()
    if (now - lastUpdate < interval) {
      return
    }
    lastUpdate = now

    callback(time)
  }
  rafId = requestAnimationFrame(loop)

  return () => cancelAnimationFrame(rafId)
}
