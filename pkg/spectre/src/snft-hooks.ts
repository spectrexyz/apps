import type { UseQueryResult } from "@tanstack/react-query"
import type { Dnum } from "dnum"
import type { Address, AddressOrEnsName } from "moire"
import type {
  PoolShare,
  Reward,
  Snft,
  SnftId,
  SnftPreview,
  TimeScale,
  TokenLocator,
} from "./types"

import { useQueries, useQuery } from "@tanstack/react-query"
import * as dn from "dnum"
import uniqBy from "lodash.uniqby"
import { DAY_MS, isAddress } from "moire"
import { useMemo } from "react"
import { useContractRead, useProvider } from "wagmi"
import { z } from "zod"
import { ISSUER_ABI_PRICE_OF } from "./abis"
import { SERC20_DECIMALS } from "./constants"
import {
  FRACTIONS_BY_ACCOUNT,
  POOLS_BY_ACCOUNT,
  PROPOSALS_BY_ACCOUNT,
  REWARDS_BY_ACCOUNT,
  // SELECTED_SNFTS,
  SNFTS,
} from "./demo-data"
import { ADDRESS_ISSUER } from "./environment"
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

function buildEthWeightHistory(
  values: Array<readonly [Date, Dnum]>,
): Snft["token"]["ethWeightHistory"] {
  const now = Date.now()

  const todaysValue: [Date, Dnum] = [
    new Date(),
    // 0.2 is the default used in use-spectralize.ts
    // values.at(-1) ?? dn.from(0.2, 18),
    values.at(-1)?.[1] ?? dn.from(0.2, 18),
  ]

  const groups: Record<
    TimeScale,
    [[Date, Dnum], [Date, Dnum]]
  > = {
    "ALL": [todaysValue, todaysValue],
    "YEAR": [todaysValue, todaysValue],
    "MONTH": [todaysValue, todaysValue],
    "WEEK": [todaysValue, todaysValue],
    "DAY": [todaysValue, todaysValue],
  }

  values.forEach(([time, ethWeight]) => {
    const durations = [
      [DAY_MS * 1, groups.DAY],
      [DAY_MS * 7, groups.WEEK],
      [DAY_MS * 30, groups.MONTH],
      [DAY_MS * 365, groups.YEAR],
      [DAY_MS * 365, groups.YEAR],
      [null, groups.ALL],
    ] as const

    durations.forEach(([groupDuration, group]) => {
      if (!(groupDuration === null || time.getTime() > (now - groupDuration))) {
        return
      }
      if (time < group[0][0]) {
        group[0] = [time, ethWeight]
      }
      if (time > group[1][0]) {
        group[1] = [time, ethWeight]
      }
    })
  })

  return Object.entries(groups)
    .reduce((result, [groupName, values]) => ({
      ...result,
      [groupName]: values.map(([, weight]) => weight),
    }), {}) as Record<TimeScale, [Dnum, Dnum]> // we can safely use “as” here since we created this record right above
}

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
    const share = dn.toNumber(dn.divide(value, totalSupply))
    if (_time > now - DAY_MS * 1) history.DAY.push(share)
    if (_time > now - DAY_MS * 7) history.WEEK.push(share)
    if (_time > now - DAY_MS * 30) history.MONTH.push(share)
    if (_time > now - DAY_MS * 365) history.YEAR.push(share)
    history.ALL.push(share)
  })

  const latestShare = dn.toNumber(dn.divide(latestValue, totalSupply))
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
    const initialMarketCapEth: Dnum = dn.divide(
      initialBuyoutPrice,
      buyoutMultiplier,
    )
    const initialTokenPriceEth: Dnum = dn.divide(
      initialMarketCapEth,
      supply,
    )

    const latestPoolState = serc20.pool?.latestState[0]
    const poolStates = serc20.pool?.states ?? []
    const lastPoolState = poolStates.at(-1)

    const priceEth = lastPoolState
      ? dn.from(lastPoolState.price, SERC20_DECIMALS)
      : initialTokenPriceEth
    const marketCapEth = dn.multiply(priceEth, supply)
    const buyoutPrice = dn.multiply(marketCapEth, buyoutMultiplier)

    const pooledEth: Dnum = [
      BigInt(latestPoolState ? latestPoolState.balances[1] : 0),
      18,
    ]
    const pooledToken: Dnum = [
      BigInt(latestPoolState ? latestPoolState.balances[0] : 0),
      SERC20_DECIMALS,
    ]

    const priceHistory = buildPriceHistory(poolStates.map((state) => ([
      new Date(parseInt(String(state.timestamp), 10) * 1000),
      dn.from(state.price, SERC20_DECIMALS),
    ] as const)))

    const ethWeightHistory = buildEthWeightHistory(poolStates.map((state) => ([
      new Date(parseInt(String(state.timestamp), 10) * 1000),
      [BigInt(state.weights[0]), SERC20_DECIMALS],
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
      buyoutFlash: Boolean(sale.flash),
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
      issuanceFee: [BigInt(issuance.fee), 18],
      issuanceAllocation: [BigInt(issuance.allocation), 18],
      issuanceFlash: Boolean(issuance.flash),
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
        ethWeightHistory,
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

export function useHighlightedSnfts(): ReturnType<typeof useSnfts> {
  // return useQuery(["highlighted-snfts"], async () => {
  //   await fakeDelay()
  //   return SELECTED_SNFTS
  // })

  // TODO: filter by highlighted
  const [
    total,
    spectresResultStatus,
    spectresFullResult,
  ] = useSnfts({ first: 9, fetchOptions: { retry: true } })

  return [
    Math.min(9, total ?? 9),
    spectresResultStatus,
    spectresFullResult,
  ]
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

// price is in token qty per ETH
export function useTokenPrice(serc20Address?: Address) {
  const tokenIssuingPriceBigNumber = useContractRead({
    address: ADDRESS_ISSUER,
    abi: ISSUER_ABI_PRICE_OF,
    functionName: "priceOf",
    args: serc20Address && [serc20Address],
    enabled: Boolean(serc20Address),
  })

  const tokenIssuingPrice = useMemo<Dnum | null>(
    () => {
      return tokenIssuingPriceBigNumber.data
        ? [BigInt(String(tokenIssuingPriceBigNumber.data)), SERC20_DECIMALS]
        : null
    },
    [tokenIssuingPriceBigNumber.data],
  )

  return {
    ...tokenIssuingPriceBigNumber,
    data: tokenIssuingPrice,
  }
}
