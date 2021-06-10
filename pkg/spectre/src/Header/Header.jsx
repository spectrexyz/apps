import { gu, useTheme } from "kit"
import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { useLocation, Link } from "wouter"
import { useLayout } from "../styles.js"
import { Actions } from "../Actions/Actions.jsx"

import logo from "./assets/logo.png"

function useStyles() {
  const { name } = useLayout()
  return useMemo(() => {
    if (name === "small") {
      return { headerHeight: 12 * gu, logoSize: 48 }
    }
    if (name === "medium") {
      return { headerHeight: 15 * gu, logoSize: 48 }
    }
    if (name === "large") {
      return { headerHeight: 15 * gu, logoSize: 48 }
    }
    return { headerHeight: 17 * gu, logoSize: 64 }
  }, [name])
}

export function Header() {
  const layout = useLayout()
  const styles = useStyles()
  return (
    <div
      id="main"
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
          max-width: ${layout.content ? `${layout.content}px` : "unset"};
          height: ${styles.headerHeight}px;
          padding: 0 ${layout.padding}px;
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
              <img
                src={logo}
                alt="Spectre"
                width={styles.logoSize}
                height={styles.logoSize}
              />
            </a>
          </Link>
        </h1>
      </header>
    </div>
  )
}

function Menu({ items }) {
  const theme = useTheme()

  const [location] = useLocation()

  const matchLocation = (path) =>
    (location === "/" ? "/" : location.replace(/\/$/, "")) === path

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
        .current a {
          color: ${theme.accent};
        }
      `}
    >
      {items.map(([label, path], index) => (
        <li key={index} className={matchLocation(path) ? "current" : ""}>
          <Link href={path}>{label}</Link>
        </li>
      ))}
    </ul>
  )
}
