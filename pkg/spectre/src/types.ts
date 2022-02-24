import { Address } from "kit"

export type SnftEvent = {
  date: string
  subject: Address
  description: string
}

export type Distribution = Array<{
  address: Address | null
  quantity: bigint
}>

export type Snft = {
  id: string
  image: string
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
  creator: { address: string; name: string; url: string }
  history: SnftEvent[]
  guardian: string
}
