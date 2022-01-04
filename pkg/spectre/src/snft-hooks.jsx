import { SNFTS } from "./demo-data"

export function useSnft(_id) {
  return SNFTS.find(({ id }) => id === _id)
}

export function useSnftsByCreator(creatorAddress, { exclude = [] } = {}) {
  return SNFTS.filter(
    ({ id, creator }) =>
      !exclude.includes(id) && creator.address === creatorAddress
  )
}

export function useSnftsAdjacent(_id) {
  const index = SNFTS.findIndex(({ id }) => id === _id)
  return [SNFTS?.[index - 1], SNFTS?.[index + 1]]
}
