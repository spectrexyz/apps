import { Snft, SnftEvent } from "../types"

import nft1 from "../demo-data/nft-1.jpg"
import nft2 from "../demo-data/nft-2.jpg"
import nft3 from "../demo-data/nft-3.jpg"
import nft4 from "../demo-data/nft-4.jpg"
import nft5 from "../demo-data/nft-5.jpg"
import nft6 from "../demo-data/nft-6.jpg"
import nft7 from "../demo-data/nft-7.jpg"
import nft8 from "../demo-data/nft-8.jpg"
import nft9 from "../demo-data/nft-9.jpg"

const NFT_IMAGES = [nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9]

const NFT_DESCRIPTION_1 = `
In 2018, during the twilight of Hong Kong's neon era, stfeyes could frequently be found on the streets of Mong Kok, taking photos of signs that would be forever lost.

When I (Anocam) saw this image, I felt the need to immortalise these lights in my own way. These Lost Nights.

The first collaboration between Anocam x stfeyes

https://twitter.com/stfeyes
https://twitter.com/anocam_

[1638x2048 MP4 available for collector]
`

const EVENT_1: SnftEvent = [
  ["@non-subjective", "https://example.org/@non-subjective"],
  " channeled 400 $TOKEN to liquidity pool.",
]

function randomDistribution() {
  const { random, floor, max } = Math
  let distribution = []
  let remaining = 100

  while (remaining > 0) {
    const size = max(1, floor(random() * random() * random() * remaining))
    distribution.push(size)
    remaining -= size
  }

  distribution.sort((a, b) => b - a)

  return distribution
}

export const SNFTS: Snft[] = NFT_IMAGES.map((image, index) => ({
  id: `${index + 1}`,
  image,
  title: `Untitled #${index + 1}`,
  description: NFT_DESCRIPTION_1,
  token: { name: `$TOKEN${index + 1}`, distribution: randomDistribution() },
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
  authenticity: [
    { name: "Etherscan", url: "https://example.org/etherscan" },
    { name: "IPFS", url: "https://example.org/ipfs" },
  ],
  history: [
    {
      date: "2021-04-29T15:19",
      event: EVENT_1,
    },
    {
      date: "2021-04-25T20:37",
      event: EVENT_1,
    },
    {
      date: "2021-04-22T21:31",
      event: EVENT_1,
    },
    {
      date: "2021-04-15T01:22",
      event: EVENT_1,
    },
    {
      date: "2021-04-14T11:38",
      event: EVENT_1,
    },
    {
      date: "2021-04-11T14:47",
      event: EVENT_1,
    },
  ],
}))
