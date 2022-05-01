import {
  rand,
  randCatchPhrase,
  randFloat,
  randNumber,
  random,
  randUser,
  seed as falsoSeed,
} from "@ngneat/falso"
import { Address, list } from "kit"
import { Snft } from "../types"

falsoSeed("123")

function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h}, ${s}%, ${l}%, ${a}%)`
}

function nftImage(style: ReturnType<typeof nftStyle>) {
  const background = hsla(
    randNumber({ min: style.backgroundHueMin, max: style.backgroundHueMax }),
    30,
    70,
    100,
  )
  const items = list<[number, number, string]>(
    randNumber({
      min: style.elementsMin,
      max: style.elementsMax,
    }),
    () => [
      randNumber({ min: style.posMin, max: style.posMax }),
      randNumber({ min: style.sizeMin, max: style.sizeMax }),
      hsla(randNumber({ min: 0, max: 360 }), style.s, style.l, style.a),
    ],
  )
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
    >
      <rect width="100%" height="100%" fill="${background}"/>`
    + items.map(([xy, size, fill]) => `
      <rect 
        fill="${fill}"
        height="${size}%"
        rx="${style.radius}"
        ry="${style.radius}"
        width="${size}%"
        x="${xy - size / 2}%"
        y="${xy - size / 2}%"
      />
    `).join("")
    + `
    </svg>
  `

  return "data:image/svg+xml," + encodeURIComponent(svg)
}

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
  return "0x" + list(40, () => rand([...chars])).join("")
}

function randomDistribution(minted: bigint) {
  const distribution: Array<{ address: Address | null; quantity: bigint }> = []

  let qtyToAssign = minted
  while (qtyToAssign > 0) {
    const quantity = 10_000n + BigInt(Math.round(
      random() * random() * random() * Number(qtyToAssign),
    ))
    distribution.push({ address: randomAddress(), quantity })
    qtyToAssign -= quantity
  }

  distribution.sort((a, b) => Number(b.quantity - a.quantity))

  distribution[0].address = null

  return distribution
}

function randomCreator() {
  const user = randUser()
  const nickname = user.email.split("@")[0]
    .replace(/[-\+\.]/g, "_")
    .replace(/[0-9]+/g, "")
  return {
    address: `${nickname}.eth`,
    resolvedAddress: randomAddress(),
    name: user.firstName + " " + user.lastName,
    url: `https://example.org/${nickname}`,
  }
}

let nftIndex = 0

function randomNft(
  creator: ReturnType<typeof randomCreator>,
  style: ReturnType<typeof nftStyle>,
) {
  const supply = 1_000_000n
  const minted = 500_000n + BigInt(Math.round(random() * 500_000))
  const title = randCatchPhrase().split(" ").slice(
    0,
    randNumber({ min: -2, max: -1 }),
  ).join(" ")
  const distribution = randomDistribution(minted)
  const image = nftImage(style)
  nftIndex++

  return ({
    id: `${nftIndex}`,
    image: {
      url: image,
      width: 500,
      height: 500,
    },
    title,
    description: NFT_DESCRIPTION_1,
    token: {
      distribution,
      minted,
      name: `TOKEN${nftIndex}`,
      priceEth: 0.001 + random() * 0.01,
      supply: BigInt(supply),
      symbol: `TKN${nftIndex}`,
    },
    creator: { ...creator },
    guardian: nftIndex % 2
      ? "0xfabe062eb33af3e68eb3329818d0507949c14142"
      : "0x32dd41219f6a74f739466e6c86091500e81beaa8",
    history: [
      { ...EVENT_1, date: "2021-04-29T15:19" },
      { ...EVENT_2, date: "2021-04-25T20:37" },
      { ...EVENT_3, date: "2021-04-22T21:31" },
      { ...EVENT_2, date: "2021-04-15T01:22" },
      { ...EVENT_2, date: "2021-04-14T11:38" },
      { ...EVENT_3, date: "2021-04-11T14:47" },
    ],
  })
}

function nftStyle() {
  const elementsMin = randNumber({ min: 1, max: 2 })
  const elementsMax = elementsMin + randNumber({ min: 1, max: 6 })

  const sizeMin = randNumber({ min: 2, max: 30 })
  const sizeMax = sizeMin + randNumber({ min: 2, max: 20 })

  const posMin = randNumber({ min: sizeMax / 2, max: 50 })
  const posMax = posMin + randNumber({ min: 0, max: 50 - sizeMax / 2 })

  const backgroundHueMin = randNumber({ min: 0, max: 360 - 80 })
  const backgroundHueMax = backgroundHueMin + 80

  const radius = randNumber({ min: 0, max: sizeMin })

  return {
    backgroundHueMax,
    backgroundHueMin,
    elementsMax,
    elementsMin,
    posMax,
    posMin,
    radius,
    sizeMax,
    sizeMin,
    s: randNumber({ min: 40, max: 80 }),
    l: randNumber({ min: 40, max: 80 }),
    a: randNumber({ min: 30, max: 100 }),
  }
}

export const SNFTS: Snft[] = list(16, randomCreator).flatMap((creator) => {
  const style = nftStyle()
  return list(
    randNumber({ min: 2, max: 8 }),
    () => randomNft(creator, style),
  )
})

export const poolEthWeights: Record<
  "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY",
  [ethWeightStart: number, ethWeightEnd: number]
> = {
  "DAY": [0.7, 0.8],
  "WEEK": [0.5, 0.8],
  "MONTH": [0.4, 0.8],
  "YEAR": [0.3, 0.8],
  "ALL": [0.2, 0.8],
}

export const minted: Record<
  "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY",
  number[]
> = {
  "DAY": [
    0.49,
    0.49,
    0.49,
    0.66,
  ],
  "WEEK": [
    0.47,
    0.47,
    0.49,
    0.49,
    0.49,
    0.66,
  ],
  "MONTH": [
    0.45,
    0.45,
    0.45,
    0.45,
    0.47,
    0.47,
    0.49,
    0.49,
    0.49,
    0.66,
  ],
  "YEAR": [
    0.2,
    0.3,
    0.3,
    0.4,
    0.45,
    0.45,
    0.45,
    0.45,
    0.47,
    0.47,
    0.49,
    0.49,
    0.49,
    0.66,
  ],
  "ALL": [
    0.2,
    0.3,
    0.3,
    0.4,
    0.45,
    0.45,
    0.45,
    0.45,
    0.47,
    0.47,
    0.49,
    0.49,
    0.49,
    0.66,
  ],
}

export const buyoutMultiplier = 1.1
