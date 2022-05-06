import type { Snft } from "./types"

import uniqBy from "lodash.uniqby"
import { useQuery } from "react-query"
import { SNFTS } from "./demo-data"

async function fakeDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500 + Math.random() * 2000)
  })
}

// TODO: make async
export function useSnft(_id: string): Snft | undefined {
  return SNFTS.find(({ id }) => id === _id)
}

export function useSnfts({
  first = 10,
  skip = 0,
}: {
  first?: number
  skip?: number
} = {}) {
  return useQuery("snfts" + skip + first, async () => {
    await fakeDelay()
    return SNFTS.slice(skip, skip + first)
  })
}

export function useSnftCreator(address: string) {
  return useQuery("snft-creator-" + address, async () => {
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
  return useQuery("snft-creators-" + skip + first, async () => {
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
    "snfts-by-creator" + creatorAddress + exclude.join("") + first,
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
    "snfts-adjacent" + snftId,
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
