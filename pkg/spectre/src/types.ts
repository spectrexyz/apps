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
  quantity: Dnum
}>

export type Token = {
  contractAddress: Address
  decimals: number
  distribution: Distribution
  holdersCount: number
  marketCapEth: Dnum
  minted: Dnum
  name: string
  priceEth: Dnum
  supply: Dnum
  symbol: string
  tokenId: string
  topHolders: Array<readonly [name: string, picture: string]>
}

export type TokenId = string
export type TokenLocator = readonly [Address, TokenId]

export type Snft = Readonly<{
  id: string
  buyoutPrice: Dnum
  creator: Readonly<{
    address: EnsName
    avatar: string
    bio: string
    name: string
    resolvedAddress: Address
    url: string
  }>
  description: string
  guardian: string
  history: SnftEvent[]
  image: Readonly<{
    height: number
    url: string
    width: number
  }>
  pool: {
    eth: Dnum
    token: Dnum
  }
  title: string
  token: Readonly<Token>
}>

export type PoolShare = {
  pool: Snft["pool"]
  share: Dnum
  snftId: string
  token: TokenLocator
}

export type Reward = {
  amount: Dnum
  rewardType: "creators" | "community" | "buyout"
  share?: Dnum
  snftId: string
  token: TokenLocator | "ETH"
}
