import type { Dnum } from "dnum"

import { useQuery } from "@tanstack/react-query"
import * as dnum from "dnum"
import { useCallback } from "react"
import { z } from "zod"

type PriceToken = "eth" | "usd"

const coingeckoPriceResultSchema = z.union([
  z.object({ "ethereum": z.object({ "usd": z.number() }) }),
  z.object({ "usd": z.object({ "ethereum": z.number() }) }),
])

function coinGeckoTokenId(tokenId: PriceToken) {
  return tokenId === "eth" ? "ethereum" : tokenId
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
    const result = coingeckoPriceResultSchema.parse(await response.json())
    if (!result) {
      throw new Error("Wrong result")
    }
    if (from === "eth" && "ethereum" in result && "usd" in result.ethereum) {
      return result.ethereum.usd
    }
    throw new Error("Cannot obtain the price")
  }, [from, to])
  return useQuery(["price", from, to], queryFn)
}

export function useEthToUsdFormat() {
  const ethUsdPrice = usePrice("eth", "usd")
  return (amountEth: Dnum) => {
    return (
      ethUsdPrice.data
        ? "$"
          + dnum.format(
            dnum.multiply(amountEth, ethUsdPrice.data),
            { digits: 2, trailingZeros: true },
          )
        : "−"
    )
  }
}
