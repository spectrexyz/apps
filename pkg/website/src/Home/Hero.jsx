import { css } from "@emotion/react"
import { Button, gu } from "kit-legacy"
import React, { useMemo } from "react"
import { useInView } from "react-cool-inview"
import { Actions } from "../Actions.jsx"
import { readLitepaper, tagline } from "../content.jsx"
import { useLayout } from "../styles.js"
import { usePath } from "../utils.js"
import { Spectre } from "./Spectre.jsx"

function useStyles() {
  const { name } = useLayout()
  return useMemo(() => {
    if (name === "small") {
      return {
        padding: [3 * gu, 6 * gu],
        taglineFontSize: 16,
        taglineSpacing: 3 * gu,
      }
    }
    if (name === "medium") {
      return {
        padding: [5 * gu, 11.5 * gu],
        taglineFontSize: 20,
        taglineSpacing: 10 * gu,
      }
    }
    if (name === "large") {
      return {
        padding: [5 * gu, 11.5 * gu],
        taglineFontSize: 24,
        taglineSpacing: 10 * gu,
      }
    }
    return {
      padding: [16 * gu, 22 * gu],
      taglineFontSize: 24,
      taglineSpacing: 10 * gu,
    }
  }, [name])
}

export const Hero = React.memo(function Hero() {
  const layout = useLayout()
  const styles = useStyles()
  const [, setPath] = usePath()
  const { observe, inView } = useInView()
  return (
    <div
      ref={observe}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: ${
        layout.contentLarge
          ? `${layout.contentLarge}px`
          : "unset"
      };
        padding: ${styles.padding[0]}px ${layout.padding}px
          ${styles.padding[1]}px;
      `}
    >
      <Spectre animate={inView} />

      <h2
        css={css`
          padding: ${styles.taglineSpacing}px 0 4gu;
          font-size: ${styles.taglineFontSize}px;
          text-align: center;
        `}
      >
        {tagline}
      </h2>

      <Button
        mode="filled-alt"
        label={readLitepaper}
        onClick={() => setPath("/litepaper")}
      />

      {layout.name === "small" && (
        <div
          css={css`
            padding-top: 3gu;
          `}
        >
          <Actions />
        </div>
      )}
    </div>
  )
})
