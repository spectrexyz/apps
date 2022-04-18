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
  itemArray: T[],
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
  value: T,
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
  ostop: number,
): number {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
}

export function raf(
  callback: (time: number) => void,
  interval = 1000 / 60,
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
    address.slice(0, charsLength + prefixLength)
    + "…"
    + address.slice(-charsLength)
  ).toLowerCase()
}

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/
export function isAddress(address: string): boolean {
  return ADDRESS_RE.test(address)
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
      },
  )
}

// Format any number
export function formatNumber(
  value: bigint | number | string,
  digits: number | bigint = 2,
  { trailingZeros = false, compact = false }: {
    compact?: boolean
    trailingZeros?: boolean
  } = {},
): string {
  digits = Number(digits)
  return (
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: trailingZeros ? digits : 0,
      maximumFractionDigits: digits,
      notation: compact ? "compact" : "standard",
    }).format as (value: bigint | number | string) => string
  )(String(value))
}

// Format an amount represented by a bigint and a number of decimals.
export function formatAmount(
  amount: bigint,
  decimals: number | bigint,
  optionsOrDigits:
    | { compact?: boolean; digits?: number | bigint; trailingZeros?: boolean }
    | number
    | bigint = {},
): string {
  decimals = BigInt(decimals)

  // options.digits can also be passed directly as the third argument
  if (
    typeof optionsOrDigits === "number"
    || typeof optionsOrDigits === "bigint"
  ) {
    optionsOrDigits = { digits: optionsOrDigits }
  }

  const {
    compact = false,
    digits = decimals,
    trailingZeros = false,
  } = optionsOrDigits

  const _digits = BigInt(digits)

  if (decimals === 0n) {
    return formatNumber(amount, _digits, { compact })
  }

  const decimalsDivisor = 10n ** decimals

  const whole = String(amount / decimalsDivisor)
  let fraction = String(amount % decimalsDivisor)

  const zeros = "0".repeat(
    Math.max(0, String(decimalsDivisor).length - fraction.length - 1),
  )

  fraction = zeros
    + divideRoundBigInt(BigInt(fraction), 10n ** (decimals - _digits))

  if (!trailingZeros) {
    fraction = fraction.replace(/0+$/, "")
  }

  return formatNumber(
    fraction === "" || BigInt(fraction) === 0n ? whole : `${whole}.${fraction}`,
    _digits,
    { compact, trailingZeros },
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
      .slice(0, whole.length + decimals),
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

export const dpr = typeof devicePixelRatio !== "undefined"
  ? devicePixelRatio
  : 1

export const MINUTE_MS = 60 * 1000
export const HOUR_MS = MINUTE_MS * 60
export const DAY_MS = HOUR_MS * 24
export const WEEK_MS = DAY_MS * 7

export function pick<T extends object, U extends keyof T>(
  obj: T,
  paths: U[],
): Pick<T, U> {
  const values = Object.create(null)
  for (const k of paths) values[k] = obj[k]
  return values
}

export type Share = {
  amount: bigint | null
  index: number
  percentage: number
  type: "amount" | "rest"
}

export function calculateShares(
  balances: bigint[],
  {
    total: _total,
    limit = balances.length,
  }: {
    total?: bigint
    limit?: number
  } = {},
): Share[] {
  const total = _total === undefined
    ? balances.reduce((t, v) => t + v, 0n)
    : _total

  // percentage + two digits (only used to sort by closest to the next integer)
  const pctPrecision = 10000

  // Calculate the percentages of all the shares
  const shares: Share[] = balances
    .filter((amount) => amount > 0n)
    .map((amount, index) => ({
      amount,
      index,
      percentage: Number(amount * BigInt(pctPrecision) / total),
      type: "amount" as "amount",
    }))
    .sort((a, b) => Number(b.percentage - a.percentage))

  const hasRest = balances.length > limit

  // convert the percentage back to a number
  const stakePercentageAsNumber = (stake: Share) => ({
    ...stake,
    percentage: (stake.percentage / pctPrecision) * 100,
  })

  // Add the “Rest” item or update an existing one
  const addRest = (
    shares: Share[],
    restPercentage: number,
  ) => {
    if (restPercentage === 0) return shares

    let rest = shares.find((s) => s.amount === null)
    if (!rest) {
      rest = {
        amount: null,
        index: -1,
        percentage: 0,
        type: "rest",
      }
      shares.push(rest)
    }

    rest.percentage += restPercentage
    return shares
  }

  const addCalculatedRest = (
    includedShares: Share[],
    excludedShares: Share[],
  ) => {
    return addRest(
      includedShares,
      excludedShares.reduce((total, s) => total + s.percentage, 0),
    )
  }

  // the shares to be included (not adjusted yet)
  const includedShares = (
    hasRest
      ? addCalculatedRest(
        shares.slice(0, limit - 1),
        shares.slice(limit - 1),
      )
      : shares
  ).map(stakePercentageAsNumber)

  // Round to the next integer some stake percentages until we get to 100%.
  // Start with the percentages that are the closest to the next integer.
  const missingPct = includedShares.reduce(
    (total, stake) => total - Math.floor(stake.percentage),
    100,
  )
  const sharesToAdjust = includedShares
    .map((stake, index) => [index, stake.percentage])
    .sort((a, b) => (b[1] % 1) - (a[1] % 1))
    .slice(0, missingPct)
    .map(([index]) => index)

  const adjustStakePercentage = (stake: Share, index: number) => ({
    ...stake,
    percentage: sharesToAdjust.includes(index)
      ? Math.ceil(stake.percentage)
      : Math.floor(stake.percentage),
  })

  const adjustedShares = includedShares.map(adjustStakePercentage)

  // If the total is higher than the provided balances
  const addMissingPercentage = (shares: Share[]) => {
    const total = shares.reduce((t, s) => t + s.percentage, 0)
    return total < 100 ? addRest(shares, 100 - total) : shares
  }

  // Check if there is any 0% item in the list
  const firstZeroIndex = adjustedShares.findIndex(
    ({ percentage }) => percentage === 0,
  )

  if (firstZeroIndex === -1) {
    return addMissingPercentage(adjustedShares)
  }

  return addMissingPercentage(
    // Remove the 0% items and group them in a “Rest” item.
    hasRest
      ? // A “Rest” item already exists, we can remove the 0% items.
        adjustedShares.slice(0, firstZeroIndex)
      : // A “Rest” item needs to be added and can not be zero,
      // so we replace the first non-zero percentage by “Rest”.
        addRest(
          adjustedShares.slice(0, firstZeroIndex - 1),
          adjustedShares[firstZeroIndex - 1].percentage,
        ),
  )
}

export function clamp(value: number, min: number = 0, max: number = 1) {
  return Math.min(Math.max(value, min), max)
}
