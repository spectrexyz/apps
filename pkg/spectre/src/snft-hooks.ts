import type { UseQueryResult } from "@tanstack/react-query"
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
import { isAddress } from "moire"
import { useMemo } from "react"
import { useProvider } from "wagmi"
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

function fakeDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500 + Math.random() * 2000)
  })
}

function isDemoSnft(id: SnftId) {
  return Boolean(SNFTS.find((snft) => snft.id === id))
}

const RETRY_DELAY = 1000

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

  const spectre = spectreResult.data?.spectre
  const metadata = spectre?.NFT.metadata

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

    const buyoutMultiplier = Number(
      dnum.setDecimals(
        [BigInt(sale.multiplier), 18],
        0,
      )[0],
    )

    const marketCapEth: Dnum = [100_000000000000000000n, 18]
    const pooledEth: Dnum = [10_000000000000000000n, 18]
    const pooledToken: Dnum = [10_000000000000000000n, 18]
    const supply = dnum.from(1_000_000, 18)
    const minted = dnum.divide(supply, 3)
    const priceEth = dnum.from(1, 18)

    const snft: Snft = {
      id,
      shortId: toShortId(id),
      buyoutMultiplier,
      buyoutPrice: dnum.multiply(marketCapEth, buyoutMultiplier),
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
        contractAddress: "0xabc",
        decimals: SERC20_DECIMALS,
        distribution: [],
        holdersCount: 10,
        marketCapEth,
        minted,
        name: serc20.name ?? "",
        priceEth,
        supply,
        symbol: serc20.symbol ?? "",
        tokenId: "",
        topHolders: [],
      },
    }
    return snft
  }, [id, metadata, spectre])

  return useQuery(["snft", id, spectreResult.isSuccess, demoMode], async () => {
    if (!demoMode) {
      return snft
    }

    const snftDemo = SNFTS.find((snft) => snft.id === id)
    if (!snftDemo) {
      throw new Error(`NFT not found: ${id}`)
    }
    await fakeDelay()
    return snftDemo
  }, {
    enabled: demoMode || spectreResult.status !== "loading",
    retry,
    retryDelay: RETRY_DELAY,
  })
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
} = {}): UseQueryResult<[number, SnftPreview[]]> {
  return useSpectres((spectres) => {
    return spectres.map((spectre) => {
      const snft: SnftPreview = {
        id: spectre.id,
        shortId: toShortId(spectre.id),
        guardian: spectre.sERC20.sale?.guardian,
        image: ipfsUrl(spectre.NFT.metadata.image),
        title: spectre.NFT.metadata.name,
        tokenPriceEth: [0n, 0],
        tokenSymbol: spectre.sERC20.symbol,
      }
      return snft
    })
  }, {
    first,
    skip,
    fetchOptions: {
      retry,
      retryDelay: RETRY_DELAY,
    },
  })
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
