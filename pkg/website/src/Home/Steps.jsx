import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { useSpring, animated, config as springConfig } from "react-spring"
import { GLMoire, fonts, theme, gu } from "uikit"
import useInView from "react-cool-inview"
import { useLayout } from "../styles.js"
import { steps } from "../content.jsx"
import { AsciiSquare } from "./AsciiSquare.jsx"

import asciiArrows from "./ascii-arrows.png"
import dots from "./dots.png"

function useStyles() {
  const { name } = useLayout()
  return useMemo(() => {
    if (name === "small") {
      return {
        fonts: [16, 28, 16],
        gap: 4 * gu,
        paddingBottom: 15 * gu,
        spacing: [1 * gu, 1.5 * gu, 5 * gu],
        visualsSize: 312,
        cols: 1,
      }
    }
    if (name === "medium") {
      return {
        fonts: [18, 32, 20],
        gap: 10 * gu,
        paddingBottom: 15 * gu,
        spacing: [1 * gu, 1.5 * gu, 5 * gu],
        visualsSize: 260,
        cols: 1,
      }
    }
    if (name === "large") {
      return {
        fonts: [18, 32, 20],
        gap: 10 * gu,
        paddingBottom: 15 * gu,
        spacing: [1 * gu, 1.5 * gu, 5 * gu],
        visualsSize: 304,
        cols: 2,
      }
    }
    return {
      fonts: [20, 44, 22],
      gap: 10 * gu,
      paddingBottom: 20 * gu,
      spacing: [2 * gu, 3 * gu, 10 * gu],
      visualsSize: 408,
      cols: 2,
    }
  }, [name])
}

export function Steps() {
  const layout = useLayout()
  const styles = useStyles()
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${styles.cols}, minmax(0, 1fr));
        align-items: flex-start;
        padding: 0 ${layout.padding}px ${styles.paddingBottom}px;
        gap: ${styles.gap}px 0;
        max-width: ${layout.content
          ? `${layout.content}px`
          : layout.name === "small"
          ? `${styles.visualsSize + layout.padding * 2}px`
          : "unset"};
      `}
    >
      {steps.map((step, index) => (
        <Step
          key={index}
          description={step.description}
          step={String(index + 1).padStart(2, "0")}
          title={step.title}
          position={index}
          visual={(() => {
            if (index === 0) {
              return <VisualImage src={asciiArrows} />
            }
            if (index === 1) {
              return <VisualMoire />
            }
            if (index === 2) {
              return <VisualImage src={dots} />
            }
            if (index === 3) {
              return <VisualAscii />
            }
          })()}
        />
      ))}
    </div>
  )
}

function Step({ title, step, description, visual, position }) {
  const layout = useLayout()
  const styles = useStyles()

  const flexDirection = useMemo(() => {
    if (layout.name === "medium") {
      return position % 2 ? "row-reverse" : "row"
    }
    if (layout.name === "large" || layout.name === "xlarge") {
      return position % 2 ? "column" : "column-reverse"
    }
    return "column"
  }, [layout, position])

  return (
    <section
      css={css`
        position: relative;
        display: grid;
        grid-auto-flow: ${layout.name === "medium" ? "column" : "row"};
        align-items: center;
        gap: ${styles.gap}px ${styles.gap}px;
      `}
    >
      <div
        css={css`
          ${layout.name === "small"
            ? ""
            : layout.name === "medium"
            ? css`
                grid-column-start: ${position % 2 ? 2 : 1};
              `
            : css`
                grid-row-start: ${position % 2 ? 1 : 2};
              `};

          justify-self: ${position % 2 ? "end" : "start"};
        `}
      >
        {visual}
      </div>
      <div>
        <div
          css={css`
            font-size: ${styles.fonts[0]}px;
            color: ${theme.contentAlt};
            text-transform: uppercase;
          `}
        >
          {step}
        </div>
        <h1
          css={css`
            padding: ${styles.spacing[0]}px 0 ${styles.spacing[1]}px;
            font-size: ${styles.fonts[1]}px;
            white-space: ${layout.name === "small" ? "unset" : "nowrap"};
          `}
        >
          {title}
        </h1>
        <p
          css={css`
            font-family: ${fonts.families.sans};
            font-size: ${styles.fonts[2]}px;
            color: ${theme.contentAlt};
          `}
        >
          {description}
        </p>
      </div>
    </section>
  )
}

function VisualImage({ src }) {
  const { observe, inView } = useInView()
  const styles = useStyles()

  const transition = useSpring({
    cancel: !inView,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: springConfig.gentle,
  })

  return (
    <div
      ref={observe}
      css={css`
        display: grid;
        place-items: center;
        width: ${styles.visualsSize}px;
        height: ${styles.visualsSize}px;
        background: ${theme.contrast};
      `}
    >
      <animated.img
        style={transition}
        src={src}
        alt=""
        width={styles.visualsSize}
        height={styles.visualsSize}
      />
    </div>
  )
}

function VisualMoire() {
  const { observe, inView } = useInView()
  const styles = useStyles()
  return (
    <div
      ref={observe}
      css={css`
        position: relative;
        width: ${styles.visualsSize}px;
        height: ${styles.visualsSize}px;
      `}
    >
      <GLMoire
        animate={inView}
        width={styles.visualsSize * 1.5}
        height={styles.visualsSize * 1.5}
        speed={0.5}
        backgroundColor={theme.contrast}
        css={css`
          transform: scale(${1 / 1.5}, ${1 / 1.5});
          transform-origin: 0 0;
        `}
      />
      <div
        css={css`
          position: absolute;
          width: ${styles.visualsSize * 0.75}px;
          height: ${styles.visualsSize * 0.75}px;
          top: calc(
            (${styles.visualsSize}px - ${styles.visualsSize * 0.75}px) / 2
          );
          left: calc(
            (${styles.visualsSize}px - ${styles.visualsSize * 0.75}px) / 2
          );
          background: ${theme.contrast};
        `}
      />
    </div>
  )
}

function VisualAscii() {
  const { observe, inView } = useInView()
  const styles = useStyles()
  return (
    <div
      ref={observe}
      css={css`
        display: grid;
        place-items: center;
        position: relative;
        width: ${styles.visualsSize}px;
        height: ${styles.visualsSize}px;
        background: ${theme.contrast};
      `}
    >
      <AsciiSquare
        word=""
        size={styles.visualsSize}
        fontSize={16}
        animate={inView}
      />
    </div>
  )
}
