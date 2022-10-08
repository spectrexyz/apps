import type { UseQueryResult } from "@tanstack/react-query"
import type { SpectreByIdQuery, SpectresQuery } from "../.graphclient"
import type { SnftId } from "./types"

import { useQuery } from "@tanstack/react-query"
import { execute, SpectreByIdDocument, SpectresDocument } from "../.graphclient"

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
    const result = await execute(SpectresDocument, { first, skip })
    if (result.errors && result.errors.length > 0) {
      throw result.errors[0]
    }
    return [
      result.data.spectresCounter.count,
      transform(result.data.spectres || []),
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
): UseQueryResult<SpectreByIdQuery> {
  return useQuery(["SpectreByIdQuery", id], async () => {
    const result = await execute(SpectreByIdDocument, { id })
    if (result.errors && result.errors.length > 0) {
      throw result.errors[0]
    }
    if (!result.data?.spectre) {
      throw new Error(`Spectre ${id} not found`)
    }
    return result.data
  }, { enabled, retry, retryDelay })
}
