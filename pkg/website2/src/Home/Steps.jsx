import React from "react"
import { css } from "@emotion/react"
import { GLMoire, fonts, theme, gu } from "uikit"
import useInView from "react-cool-inview"
import { steps } from "../content.js"
import { AsciiSquare } from "./AsciiSquare.jsx"

import asciiArrows from "./ascii-arrows.svg"

export function Steps() {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        padding: 0 10gu 22gu;
        gap: 17gu;
      `}
    >
      {steps.map((step, index) => {
        const side = index % 2 === 0 ? "end" : "start"

        return (
          <Step
            key={index}
            description={step.description}
            step={`${String(index + 1).padStart(2, "0")} step`}
            title={step.title}
            visual={(() => {
              if (index === 0) {
                return <Visual1 />
              }
              if (index === 1) {
                return <Visual2 />
              }
              if (index === 2) {
                return <Visual3 />
              }
              if (index === 3) {
                return <Visual3 />
              }
            })()}
            side={index % 2 === 0 ? "end" : "start"}
          />
        )
      })}
    </div>
  )
}

function Step({ title, step, description, visual, side }) {
  return (
    <section
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
      `}
    >
      {side === "start" && (
        <div
          css={css`
            align-self: flex-end;
            padding-bottom: 10gu;
          `}
        >
          {visual}
        </div>
      )}
      <div
        css={css`
          font-size: ${fonts.sizes.largeMono};
          color: ${theme.contentAlt};
        `}
      >
        {step}
      </div>
      <h1
        css={css`
          padding: 2gu 0 3gu;
          font-size: ${fonts.sizes.xlarge};
          white-space: nowrap;
        `}
      >
        {title}
      </h1>
      <p
        css={css`
          font-family: ${fonts.families.sans};
          font-size: ${fonts.sizes.largeSans};
          color: ${theme.contentAlt};

          position: relative;
          overflow: hidden;
          &:after {
            content: "${"/".repeat(80)}";
            position: absolute;
            bottom: 0;
            padding-left: 1gu;
            color: ${theme.secondary};
          }
        `}
      >
        {description}
      </p>
      {side === "end" && (
        <div
          css={css`
            align-self: flex-start;
            padding-top: 10gu;
          `}
        >
          {visual}
        </div>
      )}
    </section>
  )
}

function Visual1() {
  return (
    <div
      css={css`
        display: grid;
        place-items: center;
        width: 51gu;
        height: 51gu;
        background: ${theme.contrast};
      `}
    >
      <img src={asciiArrows} alt="" width="406" height="407" />
    </div>
  )
}

function Visual2() {
  const { observe, inView } = useInView()
  return (
    <div
      ref={observe}
      css={css`
        position: relative;
        width: 51gu;
        height: 51gu;
      `}
    >
      <GLMoire
        animate={inView}
        width={51 * 1.5 * gu}
        height={51 * 1.5 * gu}
        speed={0.5}
        css={css`
          transform: scale(${1 / 1.5}, ${1 / 1.5});
          transform-origin: 0 0;
        `}
      />
      <div
        css={css`
          position: absolute;
          width: 40gu;
          height: 40gu;
          top: calc((51gu - 40gu) / 2);
          left: calc((51gu - 40gu) / 2);
          background: ${theme.contrast};
        `}
      />
    </div>
  )
}

function Visual3() {
  const { observe, inView } = useInView()
  return (
    <div
      ref={observe}
      css={css`
        display: grid;
        place-items: center;
        position: relative;
        width: 51gu;
        height: 51gu;
        background: ${theme.contrast};
      `}
    >
      <AsciiSquare word="" size={50 * gu} animate={inView} />
    </div>
  )
}
