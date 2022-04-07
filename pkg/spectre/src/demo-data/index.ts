import { Address, list } from "kit"
import Rand from "rand-seed"
import { Snft } from "../types"

import nft1 from "../demo-data/nft-1.jpg"
import nft2 from "../demo-data/nft-2.jpg"
import nft3 from "../demo-data/nft-3.jpg"
import nft4 from "../demo-data/nft-4.jpg"
import nft5 from "../demo-data/nft-5.jpg"
import nft6 from "../demo-data/nft-6.jpg"
import nft7 from "../demo-data/nft-7.jpg"
import nft8 from "../demo-data/nft-8.jpg"
import nft9 from "../demo-data/nft-9.jpg"

const randFn = new Rand("1234")
const rand = (value = 1) => value * randFn.next()

const NFT_IMAGES = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9]

const NFT_DESCRIPTION_1 = `
Artworks have always been powerful vectors of collectives structuration and we now see that the internet of money could make us pass from the status of consumer of artworks to a world where artworks are, in their inner form, the organizational layer of tomorrow’s collectives.

Artwork specs:

- 1024 × 1024px
- 15 sec loop MP4
- Created Aug 2021
`

const event1Address = randomAddress()
const EVENT_1 = {
  address: event1Address,
  description: "NFT fractionalized by nft.eth",
}
const event2Address = randomAddress()
const EVENT_2 = {
  address: event2Address,
  description: `NFT bought out for 432 ETH by ${event2Address}`,
}
const event3Address = randomAddress()
const EVENT_3 = {
  address: event3Address,
  description: `NFT minted & fractionalized by ${event3Address}`,
}

function randomAddress() {
  const chars = "abcdefABCDEF1234567890"
  return "0x" + list(40, () => (
    chars[Math.floor(rand(chars.length))]
  )).join("")
}

function randomDistribution(minted: bigint) {
  const { floor } = Math
  const distribution: Array<{ address: Address | null; quantity: bigint }> = []

  let qtyToAssign = minted
  while (qtyToAssign > 0) {
    const quantity = 10_000n + BigInt(
      floor(rand(rand(rand(Number(qtyToAssign))))),
    )
    distribution.push({ address: randomAddress(), quantity })
    qtyToAssign -= quantity
  }

  distribution.sort((a, b) => Number(b.quantity - a.quantity))

  distribution[0].address = null

  return distribution
}

export const SNFTS: Snft[] = NFT_IMAGES.map((image, index) => {
  const supply = 1_000_000n
  const minted = 500_000n + BigInt(Math.round(rand(500_000)))
  return ({
    id: `${index + 1}`,
    image: {
      url: image,
      width: 500,
      height: 500,
    },
    title: `Untitled #${index + 1}`,
    description: NFT_DESCRIPTION_1,
    token: {
      distribution: randomDistribution(minted),
      minted: BigInt(minted),
      name: `TOKEN${index + 1}`,
      priceEth: 0.001 + rand(0.01),
      supply: BigInt(supply),
      symbol: `TKN${index + 1}`,
    },
    creator: [0, 5, 6, 7, 8].includes(index)
      ? {
        address: "0xfabe062eb33af3e68eb3329818d0507949c14142",
        name: "@raxacoricofallapatorius",
        url: "https://example.org/@raxacoricofallapatorius",
      }
      : {
        address: "0x32dd41219f6a74f739466e6c86091500e81beaa8",
        name: "@someone",
        url: "https://example.org/@someone",
      },
    guardian: index % 2
      ? "0xfabe062eb33af3e68eb3329818d0507949c14142"
      : "0x32dd41219f6a74f739466e6c86091500e81beaa8",
    history: [
      {
        ...EVENT_1,
        date: "2021-04-29T15:19",
      },
      {
        ...EVENT_2,
        date: "2021-04-25T20:37",
      },
      {
        ...EVENT_3,
        date: "2021-04-22T21:31",
      },
      {
        ...EVENT_2,
        date: "2021-04-15T01:22",
      },
      {
        ...EVENT_2,
        date: "2021-04-14T11:38",
      },
      {
        ...EVENT_3,
        date: "2021-04-11T14:47",
      },
    ],
  })
})

export const poolEthWeights: Record<
  "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY",
  [ethWeightStart: number, ethWeightEnd: number]
> = {
  "DAY": [0.2, 0.3],
  "WEEK": [0.2, 0.5],
  "MONTH": [0.2, 0.6],
  "YEAR": [0.2, 0.7],
  "ALL": [0.2, 0.8],
}
