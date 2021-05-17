import React from "react"
import { css } from "@emotion/react"
import { ViewportProvider } from "use-viewport"
import { Uikit, theme } from "uikit"
import { breakpoints } from "./styles"

const viewportBreakpoints = Object.entries(breakpoints).reduce(
  (o, [key, value]) => ({ ...o, [key]: value.width }),
  {}
)

function Base({ children }) {
  return (
    <Uikit baseUrl="/uikit/">
      <ViewportProvider breakpoints={viewportBreakpoints}>
        <BaseLayout>{children}</BaseLayout>
      </ViewportProvider>
    </Uikit>
  )
}

function BaseLayout({ children }) {
  return (
    <div
      css={css`
        background-color: #050e1f;
        background-image: url(/background.webp);
        background-size: 100% auto;
        background-repeat: repeat-y;
        background-position: 0 0;
        color: ${theme.content};
      `}
    >
      <div
        css={css`
          position: relative;
          min-width: ${breakpoints.small.width}px;
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
