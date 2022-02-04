import { useCallback } from "react"
import { useQuery } from "react-query"

type PriceToken = "eth" | "usd"
type CoinGeckoTokens = "ethereum" | "usd"
type CoinGeckoPriceResult = Record<
  CoinGeckoTokens,
  Record<CoinGeckoTokens, number>
>

function coinGeckoTokenId(tokenId: PriceToken) {
  if (tokenId === "eth") return "ethereum"
  return tokenId
}

function parseCoinGeckoPriceResult(
  result: CoinGeckoPriceResult,
  from: PriceToken,
  to: PriceToken,
) {
  const price = result?.[coinGeckoTokenId(from)]?.[coinGeckoTokenId(to)] ?? null
  if (price === null) {
    throw new Error("Cannot parse the price result")
  }
  return price
}

function priceUrl(from: PriceToken, to: PriceToken) {
  return (
    `https://api.coingecko.com/api/v3/simple/price?`
    + `ids=${coinGeckoTokenId(from)}&vs_currencies=${coinGeckoTokenId(to)}`
  )
}
export function usePrice(from: "eth", to: "usd") {
  const queryFn = useCallback(async () => {
    const response = await fetch(priceUrl(from, to))
    const result = await response.json()
    return parseCoinGeckoPriceResult(result as CoinGeckoPriceResult, from, to)
  }, [from, to])
  return useQuery(`price${from}${to}`, queryFn)
}
