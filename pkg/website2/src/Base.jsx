import React from "react"
import { Global, css } from "@emotion/react"
import { ViewportProvider } from "use-viewport"
import { Uikit, gu, theme } from "uikit"
import * as a from "uikit"
import { breakpoints } from "./styles"

function Base({ children }) {
  return (
    <Uikit baseUrl="/uikit/">
      <ViewportProvider breakpoints={breakpoints}>
        <BaseLayout>{children}</BaseLayout>
      </ViewportProvider>
    </Uikit>
  )
}

function BaseLayout({ children }) {
  return (
    <div
      css={css`
        overflow: auto;
        width: 100vw;
        height: 100vh;
        background: ${theme.background};
        color: ${theme.content};
      `}
    >
      <div
        css={css`
          position: relative;
          min-width: ${breakpoints.small}px;
          min-height: 100vh;
          margin: 0 auto;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default Base
