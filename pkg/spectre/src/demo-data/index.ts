import type { Dnum } from "dnum"
import type { Address } from "kit"
import type { Snft } from "../types"

import {
  rand,
  randCatchPhrase,
  randNumber,
  random,
  randSentence,
  randUser,
  seed,
} from "@ngneat/falso"
import dnum from "dnum"
import { list } from "kit"
import { minted } from "./minted"
import { tokenPrices } from "./token-prices"

seed("123")

export const buyoutMultiplier = 1.1

function toSvg(source: string) {
  return "data:image/svg+xml," + encodeURIComponent(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
    >
      ${source}
    </svg>
  `)
}

function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h}, ${s}%, ${l}%, ${a}%)`
}

function authorPicture(style: ReturnType<typeof nftStyle>, letter: string) {
  const background = hsla(
    randNumber({ min: style.backgroundHueMin, max: style.backgroundHueMax }),
    30,
    70,
    100,
  )
  return toSvg([
    `<rect width="100%" height="100%" fill="${background}"/>`,
    `<text
       dominant-baseline="central"
       fill="white"
       text-anchor="middle"
       x="50%"
       y="50%"
       style="font:40px sans-serif"
     >${letter.toUpperCase()}</text>`,
  ].join(""))
}

function authorBio() {
  return rand([
    `Co-founder @DistribGallery / Former Phd in communication sciences #Rennes2 \\\\ @spectrexyz //`,
    `coordination games @curvelabs @spectrexyz`,
    `Ethical design, technology & people /// @spectrexyz /// Big list-maker, daydreamer & sci-fi nerd ✫ Prev. @AragonProject , @farfetch & @Canonical.`,
    `Hacking web3 stuff | Former co-founder & tech lead @pando_network @distribgallery @AragonBlackTeam | Former professor in communication sciences @UnivRennes_2`,
    `WWW · OSS · P2P · GUI · @spectrexyz`,
  ])
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
  return toSvg([
    `<rect width="100%" height="100%" fill="${background}"/>`,
    items.map(([xy, size, fill]) => `
      <rect 
        fill="${fill}"
        height="${size}%"
        rx="${style.radius}"
        ry="${style.radius}"
        width="${size}%"
        x="${xy - size / 2}%"
        y="${xy - size / 2}%"
      />
    `).join(""),
  ].join(""))
}

function randomDescription() {
  return `
${randSentence()}

Artwork specs:

- 1024 × 1024px
- 15 sec loop MP4
- Created Aug 2021
`
}

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

function randomAddress(): Address {
  const chars = "abcdefabcdef1234567890"
  return `0x${list(40, () => rand([...chars])).join("")}`
}

function randomDistribution(minted: Dnum) {
  const distribution: Array<{
    address: Address | null
    quantity: Dnum
  }> = []

  let qtyToAssign: bigint = minted[0]
  while (qtyToAssign > 0n) {
    const quantity = 10_000n + BigInt(Math.round(
      random() * random() * random() * Number(qtyToAssign),
    ))
    distribution.push({
      address: randomAddress(),
      quantity: [quantity, 18],
    })
    qtyToAssign -= quantity
  }

  distribution.sort((a, b) => Number(dnum.subtract(b.quantity, a.quantity)))

  distribution[0].address = null

  return distribution
}

const tokenIndexes = list(999).sort(() => -0.5 + random())
function randomToken(nftName: string): Snft["token"] {
  const index = tokenIndexes.pop()
  if (!index) {
    throw new Error("All tokenIndexes have been used")
  }
  const supplyNumber = randNumber({ min: 100, max: 100_000 })
  const supply = dnum.from(supplyNumber, 18)
  const minted = dnum.from(
    randNumber({
      min: Math.ceil(supplyNumber / 4),
      max: supplyNumber,
    }),
    18,
  )

  const distribution = randomDistribution(minted)

  let symbol = nftName.split(/[- ]/).map((word) => word[0]).join("")
  if (symbol.length < 3) {
    symbol += nftName.slice(1, 4 - symbol.length)
  }
  symbol = symbol.toUpperCase()

  const holdersCount = randNumber({ min: 2, max: 20_000 })

  const topHolders = list(9, () => {
    const style = nftStyle()
    const { name } = randomCreator(style)
    const picture = authorPicture(style, name[0])
    return [name, picture] as const
  })

  const priceEth = dnum.from(0.001 + random() * 0.0001, 18)

  return {
    contractAddress: randomAddress(),
    decimals: 18,
    distribution,
    topHolders,
    holdersCount,
    marketCapEth: dnum.multiply(priceEth, supply),
    minted,
    name: nftName,
    priceEth,
    supply,
    symbol,
    tokenId: "1",
  }
}

function randomTitle() {
  return randCatchPhrase()
    .split(" ")
    .slice(0, randNumber({ min: -2, max: -1 }))
    .join(" ")
}

function randomCreator(style: ReturnType<typeof nftStyle>): Snft["creator"] {
  const user = randUser()
  const avatar = authorPicture(style, user.firstName[0])
  const bio = authorBio()
  const nickname = user.email.split("@")[0]
    .replace(/[-+.]/g, "_")
    .replace(/[0-9]+/g, "")
  return {
    address: `${nickname}.eth`,
    avatar,
    bio,
    name: user.firstName + " " + user.lastName,
    resolvedAddress: randomAddress(),
    url: `https://example.org/${nickname}`,
  }
}

let nftIndex = 0

function randomNft(
  creator: ReturnType<typeof randomCreator>,
  style: ReturnType<typeof nftStyle>,
) {
  nftIndex++

  const title = randomTitle()
  const token = randomToken(title)

  const pooledToken = dnum.divide(token.minted, 3)
  const pooledEth = dnum.multiply(
    dnum.multiply(pooledToken, token.priceEth),
    random() * 3,
  )

  return ({
    id: `${nftIndex}`,
    buyoutPrice: dnum.multiply(token.marketCapEth, buyoutMultiplier),
    creator: { ...creator },
    description: randomDescription(),
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
    image: {
      url: nftImage(style),
      width: 500,
      height: 500,
    },
    pool: {
      eth: pooledEth,
      token: pooledToken,
    },
    title,
    token,
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

export const SNFTS: Snft[] = list(16).flatMap(() => {
  const style = nftStyle()
  const creator = randomCreator(style)
  return list(
    randNumber({ min: 2, max: 8 }),
    () => randomNft(creator, style),
  )
})

export const CREATORS_BY_ADDRESS = new Map(
  SNFTS.map((snft) => [snft.creator.resolvedAddress, snft.creator]),
)

export const CREATORS_BY_ENS_NAME = new Map(
  SNFTS.map((snft) => [snft.creator.address, snft.creator]),
)

export const FRACTIONS_BY_ACCOUNT = new Map(
  Array.from(CREATORS_BY_ADDRESS.keys()).map(
    (address) => {
      return [
        address,
        list(
          randNumber({ min: 2, max: 8 }),
          () => {
            const snft = rand(SNFTS)
            const min = randNumber({ min: 10, max: 40 })
            const max = Number(
              dnum.divide(
                snft.token.supply,
                snft.token.holdersCount,
              )[0] / 10n ** BigInt(snft.token.supply[1]),
            )
            const quantity = dnum.multiply(
              randNumber({ min, max: max < min ? min + max : max }),
              randNumber({ min: 4, max: snft.token.holdersCount / 3 }), // max owned: 33%
              18,
            )

            return {
              quantity,
              snftId: snft.id,
              token: [snft.token.contractAddress, snft.token.tokenId] as const,
            }
          },
        ),
      ]
    },
  ),
)

export const POOLS_BY_ACCOUNT = new Map(
  Array.from(CREATORS_BY_ADDRESS.keys()).map(
    (address) => {
      return [
        address,
        list(
          randNumber({ min: 2, max: 8 }),
          () => {
            const { pool, token } = rand(SNFTS)
            const poolShare = []
            return {
              pool,
              token: [token.contractAddress, token.tokenId] as const,
            }
          },
        ),
      ]
    },
  ),
)

export const TOKENS = SNFTS.map((snft) => snft.token)

export const poolEthWeights: Record<
  "ALL" | "YEAR" | "MONTH" | "WEEK" | "DAY",
  [ethWeightStart: number, ethWeightEnd: number]
> = {
  "DAY": [0.7, 0.79],
  "WEEK": [0.5, 0.8],
  "MONTH": [0.4, 0.8],
  "YEAR": [0.3, 0.8],
  "ALL": [0.2, 0.8],
}

export { minted }
export { tokenPrices }
