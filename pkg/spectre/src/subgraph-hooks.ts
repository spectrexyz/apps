import type { UseQueryResult } from "@tanstack/react-query"
import type { AllSpectresQuery } from "../.graphclient"

import { useQuery } from "@tanstack/react-query"
import { AllSpectresDocument, execute } from "../.graphclient"

export function useAllSpectres(): UseQueryResult<AllSpectresQuery> {
  return useQuery(["AllSpectresQuery"], async () => {
    const result = await execute(AllSpectresDocument, {})
    if (result.errors && result.errors.length > 0) {
      throw result.errors[0]
    }
    return result.data
  })
}
