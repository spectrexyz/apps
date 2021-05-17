import { shuffle } from "uikit"
import { nfts } from "./nfts.js"

export const tagline = "Where one becomes multitude"

export const readLitepaper = "Read the litepaper"

const twitter = { label: "Twitter", url: "https://twitter.com/spectrexyz" }
const discord = { label: "Discord", url: "https://discord.gg/JzaM5RSg7Q" }
const github = { label: "GitHub", url: "https://github.com/spectrexyz" }
const subscribe = { label: "Get notified", url: "#subscribe" }

export const headerLinks = { discord, twitter, subscribe }
export const footerLinks = [twitter, discord, github]

export const steps = [
  {
    title: "Mint & Lock your NFT",
    description: `
      To spectralize an NFT, one must renounce their exclusive ownership and
      become its guardian.
    `,
  },
  {
    title: "Spectralize your art",
    description: `
      Fragment the non-fungible into a multitude with Spectres AMMs (Automated
      Market Makers).
    `,
  },
  {
    title: "Distribute fragments",
    description: `
      Distribute your sERC20s to experiment with new modes of attribution and
      community formation.
    `,
  },
  {
    title: "Unlock NFTs",
    description: `
      Play the game of Flash Buyout to recuperate the NFTs by compensating its
      creators and token holders.
    `,
  },
]

export const partnership = {
  title: "Spectre x Balancer",
  description: (
    <p>
      <span>
        Custom <abbr title="Automated Market Maker">AMM</abbr> design for
        efficient and simple fractionalization built on{" "}
      </span>
      <a
        href="https://balancer.gitbook.io/balancer/smart-contracts/smart-pools/configurable-rights-pool"
        target="_blank"
        rel="noreferrer"
      >
        Balancer V2 CRP architecture
      </a>
      .
    </p>
  ),
}

export const nftCardsSection = {
  title: "Explore our friends NFTs",
  description: `Our pre-launch gallery from friends of Spectre`,
  nfts: shuffle(nfts),
}

export const subscribeSection = {
  title: "Spectre is launching this summer",
  description: `
    Let’s morph art ownership into a collective form.
    Drop us your email to get a shout out when we launch!
  `,
  placeholder: "your@email.com",
  submit: "Submit",
}

export const litepaper = {
  title: "Spectre Litepaper",
  subtitle: `
    Use Spectre to allow creative works to be collectively owned.
    Tokenomics made easy and fun.
  `,
}

export const team = [
  {
    name: "Alex Rouxel",
    picture: "/team/alex.svg",
    description: (
      <p>
        Former Phd in Communication Sciences at Rennes2 University & co-founder
        of Pando Network, Distributed Gallery and Aragon Black.
      </p>
    ),
    web: null,
    email: "alex@spectre.xyz",
    twitter: "alexandreroxel",
  },
  {
    name: "Cem F Dagdelen",
    picture: "/team/cem.webp",
    description: (
      <p>
        Building coordination games at Curve Labs. Past: Pando Network and
        Aragon Black.
      </p>
    ),
    web: null,
    email: "cem@spectre.xyz",
    twitter: "CemFDagdelen",
  },
  {
    name: "Olivier Sarrouy",
    picture: "/team/olivier.webp",
    description: (
      <p>
        Hacking web3 stuff | Former co-founder & tech lead Pando Network,
        Distributed Gallery and Aragon Black | Former professor in Communication
        Sciences at Rennes2 University.
      </p>
    ),
    web: "https://www.osarrouy.xyz/",
    email: "olivier@spectre.xyz",
    twitter: "osarrouy",
  },
  {
    name: "Paty Davila",
    picture: "/team/paty.webp",
    description: (
      <p>
        Ethical design, technology & people{" "}
        <span className="nowrap">(^人&lt;)〜☆</span> Prev. Aragon, Farfetch &
        Canonical.
      </p>
    ),
    web: null,
    email: "paty@spectre.xyz",
    twitter: "dizzypaty",
  },
  {
    name: "Pierre Bertet",
    picture: "/team/pierre.webp",
    description: <p>UI & JS. Prev. Aragon, Canonical.</p>,
    web: "https://pierre.world/",
    email: "pierre@spectre.xyz",
    twitter: "bpierre",
  },
]
