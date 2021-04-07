import React from "react"
import { Global, css } from "@emotion/react"
import { useViewport, ViewportProvider } from "use-viewport"
import { GU, colors, fonts, breakpoints } from "./styles"

function Base({ children }) {
  return (
    <ViewportProvider breakpoints={breakpoints}>
      <BaseStyles>
        <BaseLayout>{children}</BaseLayout>
      </BaseStyles>
    </ViewportProvider>
  )
}

function BaseStyles({ children }) {
  return (
    <>
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
          pre {
            margin: 0;
          }
          body,
          h1,
          h2,
          pre {
            font: ${fonts.sizes.normal} / ${fonts.line} ${fonts.family};
          }
          a {
            color: ${colors.cyan};
            text-decoration: none;
            padding: ${0.5 * GU}px;
            &:focus:not(:focus-visible) {
              outline: none;
            }
            &:focus-visible {
              outline: 2px solid ${colors.green};
            }
          }

          ${fonts.faces
            .map(
              (f) => `
                @font-face {
                  font-family: "${f.name}";
                  src: url(${f.src});
                  font-weight: ${f.weight || "400"};
                  font-style: ${f.style || "normal"};
                }
              `
            )
            .join("")}
        `}
      />
      {children}
    </>
  )
}

function BaseLayout({ children }) {
  const { above } = useViewport()
  return (
    <main
      css={css`
        overflow: auto;
        width: 100vw;
        height: 100vh;
        background: ${colors.challenger};
        color: ${colors.white};
      `}
    >
      <div
        css={css`
          position: relative;
          width: ${above("medium") ? "100vw" : `${breakpoints.small}px`};
          max-width: ${above("medium") ? `${60 * GU}px` : "none"};
          min-height: 100vh;
          margin: 0 auto;
          padding: ${above("medium") ? 2 * GU : 1 * GU}px;
        `}
      >
        {children}
      </div>
    </main>
  )
}

export default Base
