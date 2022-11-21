import type { Dnum } from "dnum"
import type { Address } from "moire"
import type { PoolShare, Proposal, Reward, Snft, SnftId } from "../types"

import {
  rand,
  randBoolean,
  randCatchPhrase,
  randNumber,
  random,
  randSentence,
  randUser,
  seed,
} from "@ngneat/falso"
import * as dnum from "dnum"
import { DAY_MS, list, WEEK_MS } from "moire"
import { toShortId } from "../utils"
import { minted as mintHistory } from "./minted"
import { tokenPrices } from "./token-prices"

seed("123")

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => -0.5 + random())
}

const dn = (v: number) => dnum.from(v, 18)

export const buyoutMultiplier = 1.1

const TIMELOCK_OPTIONS = [
  DAY_MS * 1,
  DAY_MS * 2,
  DAY_MS * 3,
  DAY_MS * 4,
  DAY_MS * 5,
  DAY_MS * 6,
  WEEK_MS * 1,
  WEEK_MS * 2,
  WEEK_MS * 3,
  WEEK_MS * 4,
]

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
    `<text
       alignment-baseline="top"
       dominant-baseline="hanging"
       fill="white"
       font-family="sans"
       font-size="3"
       text-anchor="end"
       x="99"
       y="1"
     >demo</text>`,
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

const tokenIndexes = shuffle(list(999))
function randomToken(nftName: string): Snft["token"] {
  const index = tokenIndexes.pop()
  if (!index) {
    throw new Error("All tokenIndexes have been used")
  }
  const capNumber = randNumber({ min: 100, max: 100_000 })
  const cap = dnum.from(capNumber, 18)
  const minted = dnum.from(
    randNumber({
      min: Math.ceil(capNumber / 4),
      max: capNumber,
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
    holdersCount,
    marketCapEth: dnum.multiply(priceEth, cap),
    mintHistory,
    minted,
    name: nftName,
    priceEth,
    priceHistory: tokenPrices,
    ethWeightHistory: {
      "DAY": [dn(0.7), dn(0.79)],
      "WEEK": [dn(0.5), dn(0.8)],
      "MONTH": [dn(0.4), dn(0.8)],
      "YEAR": [dn(0.3), dn(0.8)],
      "ALL": [dn(0.2), dn(0.8)],
    },
    cap,
    symbol,
    tokenId: "1",
    topHolders,
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

export function random160bits() {
  return BigInt(
    "0x" + list(20, () =>
      randNumber({ min: 0, max: 255 })
        .toString(16)
        .padStart(2, "0")).join(""),
  )
}

function randomSnftId(): SnftId {
  return String(random160bits())
}

function randomNft(
  creator: ReturnType<typeof randomCreator>,
  style: ReturnType<typeof nftStyle>,
): Snft {
  const title = randomTitle()
  const token = randomToken(title)

  const pooledToken = dnum.divide(token.minted, 2 + random() * 2)
  const pooledEth = dnum.multiply(
    dnum.multiply(
      pooledToken,
      token.priceEth,
    ),
    0.9 + random() * 0.2, // deviate between -10% and +10%
  )

  const id = randomSnftId()
  const shortId = toShortId(id)

  return {
    id,
    shortId,
    buyoutFlash: true,
    buyoutMultiplier,
    buyoutOpening: BigInt(
      Date.now() + randNumber({ min: -7, max: 7 }) * DAY_MS,
    ),
    buyoutPrice: dnum.multiply(token.marketCapEth, buyoutMultiplier),
    issuanceAllocation: [17500000000000000000n, 18],
    issuanceFee: [5000000000000000000n, 18],
    issuanceFlash: true,
    creator: { ...creator },
    description: randomDescription(),
    guardian: randBoolean()
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
    image: nftImage(style),
    pool: { eth: pooledEth, token: pooledToken },
    title,
    token,
    nft: {
      contractAddress: randomAddress(),
      tokenId: randomSnftId(),
      tokenURI: "",
    },
  }
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

export const SELECTED_SNFTS = shuffle(SNFTS).reduce<Snft[]>(
  (selected, snft) =>
    (
        selected.length >= 8
        || selected.find((snft_) => (
          snft_.creator.address === snft.creator.address
        ))
      )
      ? selected
      : [...selected, snft],
  [],
)

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
                snft.token.cap,
                snft.token.holdersCount,
              )[0] / 10n ** BigInt(snft.token.cap[1]),
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
    (address) => [
      address,
      list<PoolShare>(
        randNumber({ min: 1, max: 8 }), // between 1 and 8 pools
        () => {
          const { pool, token, id } = rand(SNFTS)
          return {
            pool,
            share: dnum.from(random() * 0.1, 18), // 0% to 10%
            snftId: id,
            token: [token.contractAddress, token.tokenId] as const,
          }
        },
      ),
    ],
  ),
)

function randomReward(rewardType: Reward["rewardType"]): Reward {
  const snft = rand(SNFTS)

  const amount = rewardType === "buyout"
    ? dnum.from(random() * 4, true) // 0 to 4 ETH
    : dnum.divide(snft.token.cap, randNumber({ min: 1000, max: 2000 }))

  const token: Reward["token"] = rewardType === "buyout"
    ? "ETH"
    : [snft.token.contractAddress, snft.token.tokenId]

  const share = rewardType === "buyout"
    ? undefined
    : dnum.from(0.01 + random() * 0.05, 18) // 1% to 5%

  return {
    amount,
    rewardType,
    share,
    snftId: snft.id,
    token,
  }
}

export const REWARDS_BY_ACCOUNT = new Map<Address, Reward[]>(
  Array.from(CREATORS_BY_ADDRESS.keys()).map(
    (address) => [
      address,
      shuffle(
        (["creators", "community", "buyout"] as Reward["rewardType"][]).flatMap(
          (type) => (
            list(
              randNumber({ min: 1, max: 2 }),
              () => randomReward(type),
            )
          ),
        ),
      ),
    ],
  ),
)

let proposalIndex = 0

function randomProposal(): Proposal {
  proposalIndex++

  const snft = rand(SNFTS)
  const endsOn = new Date(
    Date.now() + DAY_MS + Math.floor(DAY_MS * random() * 6),
  )

  return {
    id: `${proposalIndex}`,
    action: rand([
      {
        type: "mint",
        quantity: dnum.multiply(
          dnum.subtract(snft.token.cap, snft.token.minted),
          0.1 + random() * 0.9, // mint between 10% and 90% of the remaining
        ),
      },
      {
        type: "buyout",
        amount: snft.buyoutPrice,
      },
    ]),
    duration: DAY_MS * 7,
    endsOn: endsOn.toISOString(),
    snftId: snft.id,
    status: rand(["approved", "rejected", "submitted"]),
    submitter: rand(Array.from(CREATORS_BY_ADDRESS.values())).resolvedAddress,
    buyerOwnership: dnum.from(random() * 0.25, 18),
  }
}

export const PROPOSALS_BY_ACCOUNT = new Map<Address, Proposal[]>(
  Array.from(CREATORS_BY_ADDRESS.keys()).map(
    (address) => [
      address,
      list(
        randNumber({ min: 1, max: 5 }),
        () => randomProposal(),
      ),
    ],
  ),
)

export const TOKENS = SNFTS.map((snft) => snft.token)

export { tokenPrices }
