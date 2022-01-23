export function addSlash(path: string): string {
  return path.endsWith("/") ? path : path + "/"
}

export function stripTrailingSlashes(path: string): string {
  const startWithSlash = path.startsWith("/")
  path = path.replace(/\/+$/, "")
  return !path && startWithSlash ? "/" : path
}

type ListCb<T> = (index: number, steps: number) => T
function list(length: number): number[]
function list<T>(length: number, callback: ListCb<T>): T[]

function list(length: number, callback?: ListCb<unknown>) {
  const cb = callback || ((index, _) => index)
  return Array.from({ length }, (_, index) => cb(index, length))
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

export function norm(value: number, low: number, high: number) {
  return (value - low) / (high - low)
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

export function raf(
  callback: (time: number) => void,
  interval = 1000 / 60
): () => void {
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

export function shortenAddress(address: string, charsLength = 4): string {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ""
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address.toLowerCase()
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    "…" +
    address.slice(-charsLength)
  ).toLowerCase()
}

const addressRe = /^0x[0-9a-fA-F]{40}$/
export function isAddress(address: string): boolean {
  return addressRe.test(address)
}

const emailRe = /.+@.+/
export function isEmail(email: string): boolean {
  return emailRe.test(email)
}

export function uid(prefix = "uid"): string {
  return `${prefix}-${Math.round(Math.random() * 10 ** 8)}`
}

export function formatDate(date: string | Date, full = false): string {
  if (typeof date === "string") date = new Date(date)
  return date.toLocaleString(
    "en-US",
    full
      ? {
          dateStyle: "full",
          timeStyle: "medium",
        }
      : {
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }
  )
}

// This should be removed whenever Firefox supports backdrop-filter by
// default. As of Firefox 92.0a1, it is only available behind an about:config
// flag (layout.css.backdrop-filter.enabled = true).
// See https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#browser_compatibility
let supportsBackdropFilters: boolean
export function checkBackdropFilterSupport(): boolean {
  if (supportsBackdropFilters === undefined) {
    supportsBackdropFilters = CSS.supports("backdrop-filter", "blur(1px)")
  }
  return supportsBackdropFilters
}

export function noop(): void {
  // do nothing
}

export const dpr = devicePixelRatio ?? 1
