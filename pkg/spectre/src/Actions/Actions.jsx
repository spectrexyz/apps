import React from "react"
import { css } from "@emotion/react"
import { headerLinks } from "../content.jsx"

import discord from "./assets/discord.svg"
import envelope from "./assets/envelope.svg"
import twitter from "./assets/twitter.svg"

const ACTIONS = [
  [headerLinks.subscribe.label, envelope, headerLinks.subscribe.url],
  [headerLinks.discord.label, discord, headerLinks.discord.url],
  [headerLinks.twitter.label, twitter, headerLinks.twitter.url],
]

export function Actions() {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.5gu;
      `}
    >
      {ACTIONS.map(([label, icon, url], index) => {
        const anchor = url.startsWith("#")
        const targetProp = anchor ? {} : { target: "_blank" }
        return (
          <a key={index} href={url} {...targetProp}>
            <img
              alt={label}
              src={icon}
              width="32"
              height="32"
              css={css`
                display: block;
              `}
            />
          </a>
        )
      })}
    </div>
  )
}
