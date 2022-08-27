import { SUBGRAPH_ENDPOINT } from "./environment"

export function subgraphFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    if (SUBGRAPH_ENDPOINT === null) {
      throw new Error("Subgraph endpoint undefined")
    }

    const res = await fetch(SUBGRAPH_ENDPOINT, {
      method: "POST",
      body: new Blob([JSON.stringify({ query, variables })], {
        type: "application/json",
      }),
    })

    const data = await res.json()
    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    return data.data
  }
}
