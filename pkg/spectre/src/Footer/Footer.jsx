import { gu, ButtonArea } from "kit"
import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { useLayout } from "../styles.js"
import { SyncStatus } from "../SyncStatus"

function useStyles() {
  const { name } = useLayout()
  return useMemo(() => {
    if (name === "small") {
      return {
        slashes: 20,
      }
    }
    if (name === "medium") {
      return {
        slashes: 15,
      }
    }
    if (name === "large") {
      return {
        slashes: 25,
      }
    }
    return {
      slashes: 30,
    }
  }, [name])
}

export function Footer() {
  const layout = useLayout()
  const styles = useStyles()
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: ${layout.contentLarge
          ? `${layout.contentLarge}px`
          : "unset"};
        margin: 0 auto;
        padding: 0 ${layout.padding}px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <footer
          css={css`
            position: relative;
            display: flex;
            flex-direction: ${layout.name === "small" ? "column" : "row"};
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: ${layout.name === "small" ? "auto" : `${17 * gu}px`};
            padding-bottom: ${layout.name === "small" ? `${5 * gu}px` : "0"};
            gap: ${layout.name === "small" ? `${3 * gu}px` : "0"};
            img {
              display: block;
            }
          `}
        >
          <SyncStatus />
        </footer>
      </div>
    </div>
  )
}
