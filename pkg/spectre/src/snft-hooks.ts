import { useQueries, UseQueryResult } from "@tanstack/react-query"
import type { Dnum } from "dnum"
import type { Address, AddressOrEnsName } from "moire"
import type {
  PoolShare,
  Reward,
  Snft,
  SnftId,
  SnftPreview,
  TokenLocator,
} from "./types"

import { useQuery } from "@tanstack/react-query"
import * as dnum from "dnum"
import uniqBy from "lodash.uniqby"
import { DAY_MS, isAddress } from "moire"
import { useMemo } from "react"
import { useProvider } from "wagmi"
import { z } from "zod"
import { SERC20_DECIMALS } from "./constants"
import {
  FRACTIONS_BY_ACCOUNT,
  POOLS_BY_ACCOUNT,
  PROPOSALS_BY_ACCOUNT,
  REWARDS_BY_ACCOUNT,
  SELECTED_SNFTS,
  SNFTS,
} from "./demo-data"
import { useSpectre, useSpectres } from "./subgraph-hooks"
import { ipfsUrl, resolveAddress, toShortId } from "./utils"

const metadataSchema = z.object({
  "description": z.string().trim().min(1),
  "image": z.string().trim().min(1),
  "name": z.string().trim().min(1),
  "properties": z.object({
    "type": z.union([
      z.literal("audio"),
      z.literal("image"),
      z.literal("video"),
    ]),
  }).optional(),
})

function fakeDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500 + Math.random() * 2000)
  })
}

function isDemoSnft(id: SnftId) {
  return Boolean(SNFTS.find((snft) => snft.id === id))
}

const RETRY_DELAY = 1000

function buildPriceHistory(
  values: Array<readonly [Date, Dnum]>,
): Snft["token"]["priceHistory"] {
  const history: Snft["token"]["priceHistory"] = {
    "ALL": [],
    "YEAR": [],
    "MONTH": [],
    "WEEK": [],
    "DAY": [],
  }

  const now = Date.now()
  const latestValue = values.at(-1)?.[1]
  if (!latestValue) return history

  values.forEach(([time, value]) => {
    const _time = time.getTime()
    if (_time > now - DAY_MS * 1) history.DAY.push(value)
    if (_time > now - DAY_MS * 7) history.WEEK.push(value)
    if (_time > now - DAY_MS * 30) history.MONTH.push(value)
    if (_time > now - DAY_MS * 365) history.YEAR.push(value)
    history.ALL.push(value)
  })

  if (history.DAY.length < 2) history.DAY = [latestValue, latestValue]
  if (history.WEEK.length < 2) history.WEEK = [latestValue, latestValue]
  if (history.MONTH.length < 2) history.MONTH = [latestValue, latestValue]
  if (history.YEAR.length < 2) history.YEAR = [latestValue, latestValue]

  return history
}

// Returns the mint history as percentages
function buildMintHistory(
  values: Array<readonly [Date, Dnum]>,
  totalSupply: Dnum,
): Snft["token"]["mintHistory"] {
  const history: Snft["token"]["mintHistory"] = {
    "ALL": [],
    "YEAR": [],
    "MONTH": [],
    "WEEK": [],
    "DAY": [],
  }

  const now = Date.now()
  const latestValue = values.at(-1)?.[1]
  if (!latestValue) return history

  values.forEach(([time, value]) => {
    const _time = time.getTime()
    const share = dnum.toNumber(dnum.divide(value, totalSupply))
    if (_time > now - DAY_MS * 1) history.DAY.push(share)
    if (_time > now - DAY_MS * 7) history.WEEK.push(share)
    if (_time > now - DAY_MS * 30) history.MONTH.push(share)
    if (_time > now - DAY_MS * 365) history.YEAR.push(share)
    history.ALL.push(share)
  })

  const latestShare = dnum.toNumber(dnum.divide(latestValue, totalSupply))
  if (history.DAY.length < 2) history.DAY = [latestShare, latestShare]
  if (history.WEEK.length < 2) history.WEEK = [latestShare, latestShare]
  if (history.MONTH.length < 2) history.MONTH = [latestShare, latestShare]
  if (history.YEAR.length < 2) history.YEAR = [latestShare, latestShare]

  return history
}

export function useSnft(
  id: SnftId,
  {
    fetchOptions: {
      retry = false,
    } = {},
  }: {
    fetchOptions?: {
      retry?: boolean
    }
  } = {},
): UseQueryResult<Snft | null> {
  const demoMode = useMemo(() => (
    isDemoSnft(id)
  ), [id])

  const spectreResult = useSpectre(id, {
    fetchOptions: {
      retry,
      retryDelay: RETRY_DELAY,
      enabled: !demoMode,
    },
  })

  const tokenURI = spectreResult.data?.spectre.NFT.tokenURI
  const metadataQuery = useQuery(["nft-metadata", id], async () => {
    if (!tokenURI) {
      return null // type guard
    }
    const response = await fetch(ipfsUrl(tokenURI))
    return metadataSchema.parse(await response.json())
  }, {
    enabled: Boolean(tokenURI),
  })

  const spectre = spectreResult.data?.spectre
  const metadata = metadataQuery.data

  const snft = useMemo(() => {
    if (!spectre || !metadata) {
      return null
    }

    const serc20 = spectre?.sERC20
    const sale = serc20?.sale
    const issuance = serc20?.issuance
    const nft = spectre?.NFT

    if (!serc20 || !sale || !issuance) {
      return null
    }

    // We only need one digit precision for the multiplier
    const buyoutMultiplier = Number(BigInt(sale.multiplier) / 10n ** 17n) / 10

    const supply: Dnum = [BigInt(serc20.cap), SERC20_DECIMALS]
    const minted: Dnum = [BigInt(serc20.minted), SERC20_DECIMALS]

    const initialBuyoutPrice: Dnum = [BigInt(serc20.sale?.reserve), 18]
    const initialMarketCapEth: Dnum = dnum.divide(
      initialBuyoutPrice,
      buyoutMultiplier,
    )
    const initialTokenPriceEth: Dnum = dnum.divide(
      initialMarketCapEth,
      supply,
    )

    const poolStates = serc20.pool?.states ?? []
    const lastPoolState = poolStates.at(-1)

    const priceEth = lastPoolState
      ? dnum.from(lastPoolState.price, SERC20_DECIMALS)
      : initialTokenPriceEth
    const marketCapEth = dnum.multiply(priceEth, supply)
    const buyoutPrice = dnum.multiply(marketCapEth, buyoutMultiplier)

    // TODO: replace with actual values
    const pooledEth: Dnum = [10_000000000000000000n, 18]
    const pooledToken: Dnum = [10_000000000000000000n, SERC20_DECIMALS]

    const priceHistory = buildPriceHistory(poolStates.map((state) => ([
      new Date(parseInt(String(state.timestamp), 10) * 1000),
      dnum.from(state.price, SERC20_DECIMALS),
    ] as const)))

    const mintHistory = buildMintHistory(
      serc20.issuance.issues?.map(({ timestamp, amount }) => ([
        new Date(parseInt(String(timestamp), 10) * 1000),
        [BigInt(amount), SERC20_DECIMALS],
      ] as const)) ?? [],
      supply,
    )

    const snft: Snft = {
      id,
      shortId: toShortId(id),
      buyoutMultiplier,
      buyoutPrice,
      creator: {
        address: nft?.creator,
        avatar: "",
        bio: "",
        name: nft?.creator,
        resolvedAddress: nft?.creator,
        url: "",
      },
      description: metadata.description,
      guardian: issuance.guardian,
      history: [],
      image: ipfsUrl(metadata.image),
      pool: {
        eth: pooledEth,
        token: pooledToken,
      },
      proposalTimeout: 2,
      title: metadata.name,
      nft: {
        contractAddress: nft.collection,
        tokenId: String(nft.tokenId),
        tokenURI: nft.tokenURI,
      },
      token: {
        contractAddress: serc20.address,
        decimals: SERC20_DECIMALS,
        distribution: serc20.holders.map((holder) => ({
          quantity: [BigInt(holder.amount), SERC20_DECIMALS] as const,
          address: isAddress(holder.address) ? holder.address : null,
        })),
        holdersCount: 10,
        marketCapEth,
        mintHistory,
        minted,
        name: serc20.name ?? "",
        priceEth,
        priceHistory,
        supply,
        symbol: serc20.symbol ?? "",
        tokenId: "",
        topHolders: [],
      },
    }
    return snft
  }, [id, metadata, spectre])

  return useQuery(
    ["snft", id, spectreResult.isSuccess, demoMode],
    async () => {
      if (!demoMode) {
        return snft
      }

      const snftDemo = SNFTS.find((snft) => snft.id === id)
      if (!snftDemo) {
        throw new Error(`NFT not found: ${id}`)
      }
      await fakeDelay()
      return snftDemo
    },
    {
      enabled: demoMode || (
        spectreResult.status !== "loading" && metadataQuery.status !== "loading"
      ),
      retry,
      retryDelay: RETRY_DELAY,
    },
  )
}

export function useSnfts({
  first = 12,
  skip = 0,
  fetchOptions: {
    retry = false,
  } = {},
}: {
  first?: number
  skip?: number
  fetchOptions?: {
    retry?: boolean
  }
} = {}): [
  total: number | null,
  prefetchStatus: UseQueryResult["status"],
  snfts: UseQueryResult<SnftPreview>[],
] {
  const spectresResult = useSpectres(
    ({ id, sERC20, NFT }): [string, Omit<SnftPreview, "image" | "title">] => [
      NFT.tokenURI,
      {
        id: id,
        shortId: toShortId(id),
        guardian: sERC20.sale.guardian,
        tokenPriceEth: [0n, 0],
        tokenSymbol: sERC20.symbol,
      },
    ],
    {
      first,
      skip,
      fetchOptions: {
        retry,
        retryDelay: RETRY_DELAY,
      },
    },
  )

  const [total, spectres] = spectresResult.data ?? [null, null]
  const spectresFullResult = useQueries({
    queries: spectres?.map(([tokenURI, spectre]) => ({
      queryKey: ["use-snfts", spectre.id],
      async queryFn() {
        const response = await fetch(ipfsUrl(tokenURI))
        const { image, name } = metadataSchema.parse(await response.json())
        return {
          ...spectre,
          image: ipfsUrl(image),
          title: name,
        }
      },
    })) ?? [],
  })

  return [
    total,
    spectresResult.status,
    spectresFullResult,
  ]
}

export function useHighlightedSnfts(): UseQueryResult<Snft[]> {
  return useQuery(["highlighted-snfts"], async () => {
    await fakeDelay()
    return SELECTED_SNFTS
  })
}

export function useSnftCreator(address: string) {
  return useQuery(["snft-creator", address], async () => {
    await fakeDelay()

    return SNFTS.find((snft) => (
      address.endsWith(".eth")
        ? snft.creator.address === address
        : snft.creator.resolvedAddress === address
    ))?.creator
  })
}

export function useSnftCreators({ first = 10, skip = 0 }: {
  first?: number
  skip?: number
} = {}) {
  return useQuery(["snft-creators", skip, first], async () => {
    await fakeDelay()

    return uniqBy(
      SNFTS.map((snft) => snft.creator),
      (creator) => creator.resolvedAddress,
    )
  })
}

export function useSnftsByCreator(
  creatorAddress: string,
  { exclude = [], first }: {
    exclude?: string[]
    first?: number
  } = {},
): UseQueryResult<Snft[]> {
  return useQuery(
    ["snfts-by-creator", creatorAddress, exclude.join(""), first],
    async () => {
      await fakeDelay()

      const snfts = SNFTS.filter(
        ({ id, creator }) => {
          if (exclude.includes(id)) return false
          return creator.address === creatorAddress
            || creator.resolvedAddress === creatorAddress
        },
      )
      return first === undefined ? snfts : snfts.slice(0, first)
    },
  )
}

export function useSnftsAdjacent(
  snftId: string,
): UseQueryResult<[Snft | undefined, Snft | undefined]> {
  return useQuery(
    ["snfts-adjacent", snftId],
    async () => {
      await fakeDelay()
      const index = SNFTS.findIndex(({ id }) => id === snftId)
      return [
        SNFTS?.[index - 1],
        SNFTS?.[index + 1],
      ]
    },
  )
}

export function usePoolShare(
  token: [
    contractAddress: AddressOrEnsName,
    tokenId: string,
  ],
): UseQueryResult<Snft["pool"]> {
  const [contractAddress, tokenId] = token
  return useQuery(
    ["pool", contractAddress, tokenId],
    async () => {
      await fakeDelay()
      const pool = SNFTS.find(({ token }) => (
        token.contractAddress === contractAddress && token.tokenId === tokenId
      ))?.pool

      if (!pool) {
        throw new Error("Pool not found")
      }

      return pool
    },
  )
}

export function usePool(
  token: [
    contractAddress: AddressOrEnsName,
    tokenId: string,
  ],
): UseQueryResult<Snft["pool"]> {
  const [contractAddress, tokenId] = token
  return useQuery(
    ["pool", contractAddress, tokenId],
    async () => {
      await fakeDelay()
      const pool = SNFTS.find(({ token }) => (
        token.contractAddress === contractAddress && token.tokenId === tokenId
      ))?.pool

      if (!pool) {
        throw new Error("Pool not found")
      }

      return pool
    },
  )
}

export function useToken(token?: TokenLocator): UseQueryResult<Snft["token"]> {
  const [contractAddress, tokenId] = token ?? ["", ""]
  return useQuery(
    ["token", contractAddress, tokenId],
    async () => {
      await fakeDelay()
      const token = SNFTS.find(({ token }) => (
        token.contractAddress === contractAddress && token.tokenId === tokenId
      ))?.token

      if (!token) {
        throw new Error("Token not found")
      }

      return token
    },
  )
}

export function useResolveAddress(
  account: AddressOrEnsName,
): UseQueryResult<Address> {
  const provider = useProvider()
  return useQuery(
    ["resolve-address", account],
    () => resolveAddress(provider, account),
    { enabled: Boolean(provider) },
  )
}

export function useFractionsByAddress(
  account: AddressOrEnsName,
): UseQueryResult<ReturnType<typeof FRACTIONS_BY_ACCOUNT.get>> {
  const address = useResolveAddress(account)
  return useQuery(
    ["fractions-by-account", account],
    async () => {
      await fakeDelay()
      return address.data
        && FRACTIONS_BY_ACCOUNT.get(`0x${address.data.slice(2).toLowerCase()}`)
    },
    { enabled: Boolean(address.data) },
  )
}

export function usePoolsByAddress(
  account: AddressOrEnsName,
): UseQueryResult<PoolShare[]> {
  const address = useResolveAddress(account)
  return useQuery(
    ["pools-by-account", account],
    async () => {
      await fakeDelay()
      return address.data
        && POOLS_BY_ACCOUNT.get(`0x${address.data.slice(2).toLowerCase()}`)
    },
    { enabled: Boolean(address.data) },
  )
}

export function useRewardsByAddress(
  account: AddressOrEnsName,
): UseQueryResult<Reward[]> {
  const address = useResolveAddress(account)
  return useQuery(
    ["rewards-by-account", account],
    async () => {
      await fakeDelay()
      return address.data
        && REWARDS_BY_ACCOUNT.get(`0x${address.data.slice(2).toLowerCase()}`)
    },
    { enabled: Boolean(address.data) },
  )
}

export function useProposalsByAddress(
  account: AddressOrEnsName,
): UseQueryResult<Reward[]> {
  const address = useResolveAddress(account)
  return useQuery(
    ["proposals-by-account", account],
    async () => {
      await fakeDelay()
      return address.data
        && PROPOSALS_BY_ACCOUNT.get(`0x${address.data.slice(2).toLowerCase()}`)
    },
    { enabled: Boolean(address.data) },
  )
}
