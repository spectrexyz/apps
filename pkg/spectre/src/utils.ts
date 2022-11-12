import type { BaseProvider } from "@ethersproject/providers"
import type { MutationStatus } from "@tanstack/react-query"
import type { Address, AddressOrEnsName } from "moire"
import type { ShortId, SignTxAndWaitStatus, SnftId } from "./types"

import { utils } from "ethers"
import { isAddress, isEnsName } from "moire"
import { useEffect, useState } from "react"
import { useTrail } from "react-spring"
import { useLocation } from "wouter"
import { CREATORS_BY_ENS_NAME } from "./demo-data"
import { CHAIN_ID } from "./environment"
import { springs } from "./styles"

export function randomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randChar(from: string[]) {
  return from[Math.floor(Math.random() * from.length)]
}

export function raf(
  callback: () => void,
  interval: number | (() => number) = 1000 / 60,
) {
  let rafId: ReturnType<typeof requestAnimationFrame>
  let lastUpdate = Date.now()

  const loop = () => {
    rafId = requestAnimationFrame(loop)

    // interval can be passed as a function, which allows
    // to change it on the fly
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

export function useAppear(items: number, opts = {}) {
  const [progress, setProgress] = useState(0)
  useEffect(() => setProgress(1), [])
  return useTrail(items, { progress, config: springs.appear, ...opts })
}

export function formatLineBreaks(value: string) {
  return value.trim().replace(/ {2,}/, " ").replace(/\n /, "\n")
}

export function kebabCase(value: string) {
  return value
    .replace("&", " ")
    .replace("?", "")
    .replace(/ +/g, "-")
    .toLowerCase()
}

export function usePath() {
  const [location, setLocation] = useLocation()
  return [location, setLocation]
}

export async function resolveAddress(
  provider: BaseProvider,
  address: AddressOrEnsName,
): Promise<Address> {
  // Fake resolve names used in the demo data (to be removed)
  if (isEnsName(address) && CREATORS_BY_ENS_NAME.has(address)) {
    address = CREATORS_BY_ENS_NAME.get(address)?.resolvedAddress as Address
  }

  const resolvedAddress = isEnsName(address)
    ? await provider.resolveName(address)
    : address

  if (!resolvedAddress) {
    throw new Error(`Couldn’t resolve to an address: ${address}`)
  }

  const normalizedAddress = utils.getAddress(resolvedAddress)

  if (!isAddress(normalizedAddress)) {
    throw new Error(`Couldn’t normalize the address: ${resolvedAddress}`)
  }

  return normalizedAddress
}

export async function addressesEqual(
  provider: BaseProvider,
  address1: AddressOrEnsName,
  address2: AddressOrEnsName,
) {
  const resolved = await Promise.all(
    [address1, address2].map((addr) => (
      resolveAddress(provider, addr)
    )),
  )
  return resolved[0] === resolved[1]
}

export function isMutationStatus(status: unknown): status is MutationStatus {
  return typeof status === "string"
    && (
      status === "idle"
      || status === "success"
      || status === "loading"
      || status === "error"
    )
}

export function isSignTxAndWaitStatus(
  status: unknown,
): status is SignTxAndWaitStatus {
  return typeof status === "string"
    && isMutationStatus(status.replace(/^(?:prepare|sign|tx):/, ""))
}

const SHORT_ID_CHARS = "0123456789"
  + "abcdefghijklmnopqrstuvwxyz"
  + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SHORT_ID_BASE = BigInt(SHORT_ID_CHARS.length)

export function toShortId(id: SnftId): ShortId {
  let result = ""
  let value = BigInt(id)
  while (value > 0n) {
    result = SHORT_ID_CHARS.charAt(Number(value % SHORT_ID_BASE)) + result
    value = value / SHORT_ID_BASE
  }
  return result || "0"
}

export function fromShortId(shortId: ShortId): SnftId {
  return String(
    shortId
      .split("")
      .reduce((value, char) => (
        value * SHORT_ID_BASE + BigInt(
          SHORT_ID_CHARS.indexOf(char),
        )
      ), 0n),
  )
}

export function parseId(id: string): SnftId {
  try {
    const parsedId = String(BigInt(id))
    // probably a long ID already
    if (parsedId === id) {
      return parsedId
    }
  } catch (_) {
    // nothing
  }
  return fromShortId(id)
}

const IPFS_PROTOCOL_RE = /^ipfs:\/\/(?:ipfs\/)?([^/]+)(\/.+)?$/
const IPFS_HASH_RE = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/

export function ipfsUrl(
  ipfsIsh: string,
  url = (cid: string, path = "") =>
    `https://${cid}.ipfs.nftstorage.link${path}`,
): string {
  // ipfs:// URI
  const ipfsProtocolMatch = IPFS_PROTOCOL_RE.exec(ipfsIsh)
  if (ipfsProtocolMatch) {
    const [, cid, path = ""] = ipfsProtocolMatch
    return url(cid, path)
  }

  // standalone cid, probably
  if (IPFS_HASH_RE.test(ipfsIsh)) {
    return ipfsUrl(ipfsIsh)
  }

  // URL, maybe
  return ipfsIsh
}

export function pagination(
  page: number,
  itemsPerPage: number,
  itemsTotal: number,
) {
  const pages = Math.ceil(itemsTotal / itemsPerPage)
  const prev = page > 0 ? page - 1 : null
  const next = page < pages - 1 ? page + 1 : null
  const pageItems = next === null ? itemsTotal % itemsPerPage : itemsPerPage
  return { next, page, pages, prev, pageItems }
}

export function explorerUrl(
  options: {
    type: "tokenId"
    contract: string
    tokenId: string
  } | {
    type: "tx"
    hash: string
  },
) {
  let base = "https://etherscan.io"
  if (CHAIN_ID === 5) base = "https://goerli.etherscan.io"

  if (options.type === "tokenId") {
    return `${base}/token/${options.contract}?a=${options.tokenId}`
  }

  return ""
}
