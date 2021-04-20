/** @jsx jsx */
import { jsx } from "@emotion/react"

import type { ReactNode } from "react"

import { Fragment } from "react"
import { Global, css } from "@emotion/react"
import { colors, fonts } from "../styles"
import { useBaseUrl } from "../BaseUrl"

type MainProps = {
  children: ReactNode
}

const fontName = "IBM Plex Mono"
const fontFamily = `"${fontName}", monospace`
const fontFaces = [
  { weight: "400", src: "IBMPlexMono-Light.ttf" },
  { weight: "600", src: "IBMPlexMono-Medium.ttf" },
]

export function Main({ children }: MainProps) {
  const assets = useBaseUrl("Main")
  return (
    <Fragment>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }
          body,
          html,
          h1,
          h2,
          pre,
          p,
          ul {
            margin: 0;
          }
          body,
          h1,
          h2,
          pre,
          button {
            font: ${fonts.sizes.normal} / ${fonts.line} ${fontFamily};
          }
          body {
            color: ${colors.primary};
            background: ${colors.background};
          }
          button {
            color: inherit;
          }
          ul {
            padding: 0;
          }
          a {
            color: ${colors.secondary};
            text-decoration: none;
            &:focus:not(:focus-visible) {
              outline: none;
            }
            &:focus-visible {
              outline: 2px solid ${colors.primary};
            }
          }

          ${fontFaces
            .map(
              ({ src, weight }) => `
                @font-face {
                  font-family: "${fontName}";
                  src: url(${assets}/${src});
                  font-weight: ${weight || "400"};
                  font-style: normal;
                }
              `
            )
            .join("")}
        `}
      />
      <main
        css={css`
          width: 100vw;
          height: 100vh;
        `}
      >
        {children}
      </main>
    </Fragment>
  )
}
