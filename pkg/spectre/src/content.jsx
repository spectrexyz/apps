export const tagline = "Where one becomes multitude"

const twitter = { label: "Twitter", url: "https://twitter.com/spectrexyz" }
const discord = { label: "Discord", url: "https://discord.gg/JzaM5RSg7Q" }
const github = { label: "GitHub", url: "https://github.com/spectrexyz" }
const subscribe = {
  label: "Get notified",
  url: "https://spectre.xyz/#subscribe",
}

export const headerLinks = { discord, twitter, subscribe }
export const footerLinks = [twitter, discord, github]

export const menuLinks = [
  { label: "Litepaper", url: "https://spectre.xyz/litepaper" },
  { label: "FAQ", url: "https://spectre.xyz/faq" },
  { label: "App", url: "https://spectre.xyz/app", active: true },
  // { label: "Website", url: "https://spectre.xyz/" },
  // { label: "Blog", url: "https://spectre.xyz/blog" },
]
