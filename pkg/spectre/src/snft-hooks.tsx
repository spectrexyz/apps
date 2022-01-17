import { SNFTS } from "./demo-data"
import { Snft } from "./types"

export function useSnft(_id: string): Snft | undefined {
  return SNFTS.find(({ id }) => id === _id)
}

export function useSnftsByCreator(
  creatorAddress: string,
  { exclude = [] }: { exclude?: string[] } = {}
): Snft[] {
  return SNFTS.filter(
    ({ id, creator }) =>
      !exclude.includes(id) && creator.address === creatorAddress
  )
}

export function useSnftsAdjacent(
  _id: string
): [Snft | undefined, Snft | undefined] {
  const index = SNFTS.findIndex(({ id }) => id === _id)
  return [SNFTS?.[index - 1], SNFTS?.[index + 1]]
}
