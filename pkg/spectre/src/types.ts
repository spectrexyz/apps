import type { MutationStatus } from "@tanstack/react-query"
import type { Dnum } from "dnum"
import type { Address, AddressOrEnsName } from "moire"

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
  priceHistory: Record<TimeScale, Dnum[]>
  mintHistory: Record<TimeScale, number[]>
  ethWeightHistory: Record<
    TimeScale,
    [ethWeightStart: Dnum, ethWeightEnd: Dnum]
  >
}

export type TokenId = string
export type TokenLocator = readonly [Address, TokenId]

export type SnftId = string
export type ShortId = string

export type Snft = Readonly<{
  id: SnftId
  shortId: ShortId
  buyoutMultiplier: number
  buyoutPrice: Dnum
  creator: Readonly<{
    address: AddressOrEnsName
    avatar: string
    bio: string
    name: string
    resolvedAddress: Address
    url: string
  }>
  description: string
  guardian: string
  history: SnftEvent[]
  image: string
  issuanceAllocation: Dnum
  issuanceFee: Dnum
  pool: {
    eth: Dnum
    token: Dnum
  }
  proposalTimeout: number
  title: string
  token: Readonly<Token>
  nft: Readonly<{
    contractAddress: Address
    tokenId: string
    tokenURI: string
  }>
}>

// A light version of the Snft type, used in cards for example.
export type SnftPreview = Readonly<{
  id: SnftId
  shortId: ShortId
  guardian: string
  image: string
  title: string
  tokenPriceEth: Dnum
  tokenSymbol: string
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

export type Proposal = {
  id: string
  action:
    | { type: "mint"; quantity: Dnum }
    | { type: "buyout"; amount: Dnum }
  duration: number
  endsOn: string
  snftId: string
  status: "approved" | "rejected" | "submitted"
  submitter: Address
  buyerOwnership: Dnum
}

export type NftMetadataToBeStored =
  & {
    name: string
    description: string
    image: File
  }
  & (
    // image
    | { properties: { type: "image" } }
    // video / audio
    | { animation_url: File; properties: { type: "video" | "audio" } }
  )

export type SignTxAndWaitStatus =
  | `prepare:${MutationStatus}`
  | `sign:${MutationStatus}`
  | `tx:${MutationStatus}`
