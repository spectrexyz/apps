/** @jsx jsx */
import type { ReactNode } from "react"

import { Fragment } from "react"
import { Global, css, jsx } from "@emotion/react"
import { theme, fonts } from "../styles"
import { useBaseUrl } from "../BaseUrl"

type MainProps = {
  children: ReactNode
}

const FONT_NAME_MONO = "IBM Plex Mono"
const FONT_NAME_SANS = "Inter"

const FONT_FILE_MONO_REGULAR = "IBMPlexMono-Regular-Latin1.woff2"
const FONT_FILE_MONO_MEDIUM = "IBMPlexMono-Medium-Latin1.woff2"
const FONT_FILE_SANS = "Inter-Regular.woff2"

const UNICODE_RANGE_LATIN1 =
  "U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, " +
  "U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, " +
  "U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, " +
  "U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02"

export function Main({ children }: MainProps) {
  const assets = useBaseUrl("Main")
  return (
    <Fragment>
      <Global
        styles={css`
          @font-face {
            font-family: "${FONT_NAME_MONO}";
            font-weight: 400;
            font-style: normal;
            src: url("${assets}/${FONT_FILE_MONO_REGULAR}") format("woff2");
            unicode-range: ${UNICODE_RANGE_LATIN1};
          }
          @font-face {
            font-family: "${FONT_NAME_MONO}";
            font-weight: 600;
            font-style: normal;
            src: url("${assets}/${FONT_FILE_MONO_MEDIUM}") format("woff2");
            unicode-range: ${UNICODE_RANGE_LATIN1};
          }
          @font-face {
            font-family: "${FONT_NAME_SANS}";
            font-weight: 400;
            font-style: normal;
            src: url("${assets}/${FONT_FILE_SANS}") format("woff2");
            unicode-range: ${UNICODE_RANGE_LATIN1};
          }
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
          html {
            scroll-behavior: smooth;
          }
          body,
          h1,
          h2,
          pre,
          button,
          svg,
          input {
            font: ${fonts.sizes.normalMono} / ${fonts.line}
              ${fonts.families.mono};
          }
          strong,
          b {
            font-weight: 600;
          }
          body {
            color: ${theme.primary};
            background: ${theme.background};
          }
          button {
            color: inherit;
          }
          button,
          [rel="button"] {
            cursor: pointer;
          }
          ul {
            padding: 0;
          }
          a {
            color: ${theme.link};
            text-decoration: none;
            &:focus:not(:focus-visible) {
              outline: none;
            }
            &:focus-visible {
              outline: 2px solid ${theme.link};
            }
          }
        `}
      />
      {children}
    </Fragment>
  )
}
