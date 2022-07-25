import type { Address, AddressOrEnsName } from "kit"
import type { UseQueryResult } from "react-query"
import type { Snft } from "./types"

import uniqBy from "lodash.uniqby"
import { useQuery } from "react-query"
import { useProvider } from "wagmi"
import {
  FRACTIONS_BY_ACCOUNT,
  POOLS_BY_ACCOUNT,
  REWARDS_BY_ACCOUNT,
  SNFTS,
} from "./demo-data"
import { resolveAddress } from "./utils"

function fakeDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500 + Math.random() * 2000)
  })
}

// TODO: replace useSnft() by useSnft2() everywhere, then rename
export function useSnft(_id: string): Snft | undefined {
  return SNFTS.find(({ id }) => id === _id)
}
export function useSnft2(id_: string): UseQueryResult<Snft | undefined> {
  return useQuery(["snft", id_], async () => {
    await fakeDelay()
    return SNFTS.find(({ id }) => id === id_)
  })
}

export function useSnfts({
  first = 10,
  skip = 0,
}: {
  first?: number
  skip?: number
} = {}) {
  return useQuery(["snfts", skip, first], async () => {
    await fakeDelay()
    return SNFTS.slice(skip, skip + first)
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
) {
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
) {
  return useQuery(
    ["snfts-adjacent", snftId],
    async () => {
      await fakeDelay()

      const index = SNFTS.findIndex(({ id }) => id === snftId)
      const result: [Snft | undefined, Snft | undefined] = [
        SNFTS?.[index - 1],
        SNFTS?.[index + 1],
      ]
      return result
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

export function useToken(
  token: [
    contractAddress: AddressOrEnsName,
    tokenId: string,
  ],
): UseQueryResult<Snft["token"]> {
  const [contractAddress, tokenId] = token
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

export function useFractionsByAddress(account: AddressOrEnsName) {
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
): UseQueryResult<ReturnType<typeof POOLS_BY_ACCOUNT.get>> {
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
): UseQueryResult<ReturnType<typeof REWARDS_BY_ACCOUNT.get>> {
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
