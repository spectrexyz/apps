import type { UseQueryResult } from "@tanstack/react-query"
import type { Address } from "moire"
import type { SpectreByIdQuery, SpectresQuery } from "../.graphclient"
import type { SnftId } from "./types"

import { useQuery } from "@tanstack/react-query"
import { isAddress } from "moire"
import { getBuiltGraphSDK } from "../.graphclient"

const queries = getBuiltGraphSDK()

export function useSpectres<T>(
  transform: (spectres: SpectresQuery["spectres"]) => T,
  {
    first = 12,
    skip = 0,
    fetchOptions: {
      enabled = true,
      retry = false,
      retryDelay = 1000,
    } = {},
  }: {
    first?: number
    skip?: number
    fetchOptions?: {
      enabled?: boolean
      retry?: boolean
      retryDelay?: number
    }
  } = {},
): UseQueryResult<[number, T]> {
  return useQuery(["SpectresQuery", first, skip], async () => {
    const result = await queries.Spectres({ first, skip })
    return [
      result.spectresCounter?.count ?? 0,
      transform(result.spectres ?? []),
    ]
  }, { enabled, retry, retryDelay })
}

export function useSpectre(
  id: SnftId,
  {
    fetchOptions: {
      enabled = true,
      retry = false,
      retryDelay = 1000,
    } = {},
  }: {
    fetchOptions?: {
      enabled?: boolean
      retry?: boolean
      retryDelay?: number
    }
  } = {},
): UseQueryResult<
  Omit<SpectreByIdQuery, "spectre"> & {
    spectre: SpectreByIdQuery["spectre"] & {
      NFT: NonNullable<SpectreByIdQuery["spectre"]>["NFT"] & {
        creator: Address
        collection: Address
      }
    }
  }
> {
  return useQuery(["SpectreByIdQuery", id], async () => {
    const result = await queries.SpectreById({ id })
    if (!result.spectre) {
      throw new Error(`Spectre ${id} not found`)
    }
    if (!isAddress(result.spectre.NFT.creator)) {
      throw new Error(
        `spectre.NFT.creator is not a valid address: ${result.spectre.NFT.creator}`,
      )
    }
    if (!isAddress(result.spectre.NFT.collection)) {
      throw new Error(
        `spectre.NFT.collection is not a valid address: ${result.spectre.NFT.collection}`,
      )
    }
    return result
  }, { enabled, retry, retryDelay })
}
