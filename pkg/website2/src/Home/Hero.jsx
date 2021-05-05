import React from "react"
import { css } from "@emotion/react"
import { Button } from "uikit"
import useInView from "react-cool-inview"
import { Spectre } from "./Spectre.jsx"
import { tagline, readLitepaper } from "../content.js"

export function Hero() {
  const { observe, inView } = useInView()
  return (
    <div
      ref={observe}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 14.5gu 0 22gu;
      `}
    >
      <Spectre animate={inView} />

      <h2
        css={css`
          padding: 10gu 0 4gu;
          &:before {
            content: "» ";
          }
        `}
      >
        {tagline}
      </h2>

      <Button mode="filled-alt" label={readLitepaper} />
    </div>
  )
}
