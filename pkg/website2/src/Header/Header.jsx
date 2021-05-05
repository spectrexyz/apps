import React from "react"
import { css } from "@emotion/react"
import { theme } from "uikit"
import { Link, Route } from "wouter"
import { useLayoutConstraints } from "../utils.js"
import { headerLinks } from "../content.js"

import logo from "./logo.png"
import discord from "./discord.svg"
import mail from "./mail.svg"
import twitter from "./twitter.svg"

const MENU_ITEMS = [
  ["About", "/about"],
  ["Litepaper", "/litepaper"],
]

const ACTIONS = [
  [headerLinks.discord.label, discord, headerLinks.discord.url],
  [headerLinks.twitter.label, twitter, headerLinks.twitter.url],
  [headerLinks.subscribe.label, mail, headerLinks.subscribe.url],
]

export function Header() {
  const [minWidth, maxWidth] = useLayoutConstraints()
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
      `}
    >
      <header
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: ${maxWidth}px;
          min-width: ${minWidth}px;
          height: 17gu;
          padding: 0 10gu;
          h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            img {
              display: block;
            }
          }
        `}
      >
        <h1>
          <Link href="/">
            <a>
              <img src={logo} alt="Spectre" width="52" height="52" />
            </a>
          </Link>
        </h1>
        <nav>
          <Menu items={MENU_ITEMS} />
        </nav>
        <Actions />
      </header>
    </div>
  )
}

function Actions() {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.5gu;
      `}
    >
      {ACTIONS.map(([label, icon, url], index) => {
        const targetProp = url.startsWith("#") ? {} : { target: "_blank" }
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

function Menu({ items }) {
  return (
    <ul
      css={css`
        display: flex;
        gap: 3.5gu;
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          list-style: none;
        }
        a {
          color: ${theme.content};
        }
      `}
    >
      {items.map(([label, path]) => (
        <li key={path}>
          <Link href={path}>{label}</Link>
        </li>
      ))}
    </ul>
  )
}
