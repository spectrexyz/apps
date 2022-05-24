import type { Dnum } from "dnum"
import type { Address, EnsName } from "kit"

export type TimeScale = "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY"

export type SnftEvent = {
  address: Address
  date: string
  description: string
}

export type Distribution = Array<{
  address: Address | null
  quantity: bigint
}>

export type Snft = {
  id: string
  image: { url: string; width: number; height: number }
  title: string
  description: string
  token: {
    distribution: Distribution
    minted: bigint
    name: string
    priceEth: number
    supply: bigint
    symbol: string
  }
  creator: {
    avatar: string
    address: string
    bio: string
    name: string
    resolvedAddress: Address
    url: string
  }
  history: SnftEvent[]
  guardian: string
}
