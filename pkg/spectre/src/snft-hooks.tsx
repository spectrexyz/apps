import type { Snft } from "./types"

import { groupBy } from "kit"
import uniqBy from "lodash.uniqby"
import { useQuery } from "react-query"
import { SNFTS } from "./demo-data"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    await wait(1000)
    return SNFTS.slice(skip, skip + first)
  })
}

export function useSnftCreators({ first = 10, skip = 0 }: {
  first?: number
  skip?: number
} = {}) {
  return useQuery("snft-creators-" + skip + first, async () => {
    await wait(1000)
    return uniqBy(
      SNFTS.map((snft) => snft.creator),
      (creator) => creator.resolvedAddress,
    )
  })
}

export function useSnftsByCreator(
  creatorAddress: string,
  { exclude = [], limit }: {
    exclude?: string[]
    limit?: number
  } = {},
) {
  return useQuery(
    "snfts-by-creator" + creatorAddress + exclude.join("") + limit,
    async () => {
      const snfts = SNFTS.filter(
        ({ id, creator }) => {
          if (exclude.includes(id)) return false
          return creator.address === creatorAddress
            || creator.resolvedAddress === creatorAddress
        },
      )
      return limit === undefined ? snfts : snfts.slice(0, limit)
    },
  )
}

export function useSnftsAdjacent(
  _id: string,
): [Snft | undefined, Snft | undefined] {
  const index = SNFTS.findIndex(({ id }) => id === _id)
  return [SNFTS?.[index - 1], SNFTS?.[index + 1]]
}
