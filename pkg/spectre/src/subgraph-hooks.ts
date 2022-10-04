import type { UseQueryResult } from "@tanstack/react-query"
import type { AllSpectresQuery, SpectreByIdQuery } from "../.graphclient"
import type { SnftId } from "./types"

import { useQuery } from "@tanstack/react-query"
import {
  AllSpectresDocument,
  execute,
  SpectreByIdDocument,
} from "../.graphclient"

export function useAllSpectres(): UseQueryResult<AllSpectresQuery> {
  return useQuery(["AllSpectresQuery"], async () => {
    const result = await execute(AllSpectresDocument, {})
    if (result.errors && result.errors.length > 0) {
      throw result.errors[0]
    }
    return result.data
  })
}

export function useSpectre(
  id: SnftId,
  options: {
    retry?: boolean
    retryDelay?: number
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
  }, options)
}

// export function useAllSpectres(): UseQueryResult<AllSpectresQuery> {
//   return useQuery(["AllSpectresQuery"], async () => {
//     const result = await execute(AllSpectresDocument, {})
//     if (result.errors && result.errors.length > 0) {
//       throw result.errors[0]
//     }
//     return result.data
//   })
// }
