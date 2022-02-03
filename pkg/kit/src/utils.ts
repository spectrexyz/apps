import ms from "ms"
import prettyBytes from "pretty-bytes"

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

export function progressToItem<T extends unknown>(
  progress: number,
  itemArray: T[]
): T | null {
  if (itemArray.length === 0) return null
  return itemArray[Math.round(lerp(progress, 0, itemArray.length - 1))]
}

export function indexToProgress(index: number, itemArray: unknown[]): number {
  return norm(index, 0, itemArray.length - 1)
}

export function abs(value: bigint | number): typeof value {
  if (typeof value === "bigint") {
    return value < 0n ? -value : value
  }
  return Math.abs(value)
}

export function min<T extends bigint | number>(...values: T[]): T {
  let value = values[0]
  for (const v of values) if (v < value) value = v
  return value
}

export function max<T extends bigint | number>(...values: T[]): T {
  let value = values[0]
  for (const v of values) if (v > value) value = v
  return value
}

// Find the closest number in a sorted array
export function closestIndexFromSortedNumbers<T extends bigint | number>(
  sortedNumbers: T[],
  value: T
): number {
  const diffs = sortedNumbers.map((v) => abs(value - v))
  const minValue = min(...diffs)
  return diffs.findIndex((v) => v === minValue)
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

export function formatDuration(duration: number): string {
  return ms(duration, { long: true })
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

// Format any number
export function formatNumber(
  value: bigint | number | string,
  digits: number | bigint = 2,
  { trailingZeros = false }: { trailingZeros?: boolean } = {}
): string {
  digits = Number(digits)
  return (
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: trailingZeros ? digits : 0,
      maximumFractionDigits: digits,
    }).format as (value: bigint | number | string) => string
  )(String(value))
}

// Format an amount represented by a bigint and a number of decimals.
export function formatAmount(
  amount: bigint,
  decimals: number | bigint,
  optionsOrDigits:
    | { digits?: number | bigint; trailingZeros?: boolean }
    | number
    | bigint = {}
): string {
  decimals = BigInt(decimals)

  // options.digits can also be passed directly as the third argument
  if (
    typeof optionsOrDigits === "number" ||
    typeof optionsOrDigits === "bigint"
  ) {
    optionsOrDigits = {
      digits: optionsOrDigits,
      trailingZeros: false,
    }
  }

  const { digits = decimals, trailingZeros = false } = optionsOrDigits
  const _digits = BigInt(digits)

  if (decimals === 0n) {
    return formatNumber(amount, _digits)
  }

  const decimalsDivisor = 10n ** decimals

  const whole = String(amount / decimalsDivisor)
  let fraction = String(amount % decimalsDivisor)

  const zeros = "0".repeat(
    Math.max(0, String(decimalsDivisor).length - fraction.length - 1)
  )

  fraction =
    zeros + divideRoundBigInt(BigInt(fraction), 10n ** (decimals - _digits))

  if (!trailingZeros) {
    fraction = fraction.replace(/0+$/, "")
  }

  return formatNumber(
    fraction === "" || BigInt(fraction) === 0n ? whole : `${whole}.${fraction}`,
    _digits,
    { trailingZeros }
  )
}

export function formatBytes(value: number) {
  return prettyBytes(value)
}

// Divide a BigInt by another with rounding
export function divideRoundBigInt(dividend: bigint, divisor: bigint): bigint {
  return (dividend + divisor / 2n) / divisor
}

// From https://github.com/aragon/aragon-apps
export function splitDecimalNumber(value: string) {
  const [whole = "", dec = ""] = value.split(".")
  return [
    whole.replace(/^0*/, ""), // trim leading zeroes
    dec.replace(/0*$/, ""), // trim trailing zeroes
  ]
}

// Convert a bigint value padded with decimals into a decimal number
// represented as a string.
// From https://github.com/aragon/aragon-apps
export function fromDecimals(value: bigint, decimals: number) {
  const paddedWhole = String(value).padStart(decimals + 1, "0")
  const decimalIndex = paddedWhole.length - decimals
  const wholeWithoutBase = paddedWhole.slice(0, decimalIndex)
  const decWithoutBase = paddedWhole.slice(decimalIndex)

  // Trim any trailing zeroes from the new decimals
  const decWithoutBaseTrimmed = decWithoutBase.replace(/0*$/, "")

  return decWithoutBaseTrimmed
    ? `${wholeWithoutBase}.${decWithoutBaseTrimmed}`
    : wholeWithoutBase
}

// Convert a decimal number, represented as a string to prevent any precision
// issue, into a bigint padded with a given number of decimals.
// From https://github.com/aragon/aragon-apps
export function toDecimals(value: string, decimals: number): bigint {
  const [whole, dec] = splitDecimalNumber(value)
  if (!whole && (!dec || !decimals)) return 0n
  return BigInt(
    (whole + dec)
      .padEnd(whole.length + decimals, "0")
      .slice(0, whole.length + decimals)
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

export const dpr =
  typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1

export const MINUTE_MS = 60 * 1000
export const HOUR_MS = MINUTE_MS * 60
export const DAY_MS = HOUR_MS * 24
export const WEEK_MS = DAY_MS * 7
