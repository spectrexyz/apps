/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import useDimensions from "react-cool-dimensions"
import { a, useSpring, useTransition } from "react-spring"
import { Moire } from "../Moire/Moire"
import { useTheme } from "../Theme/Theme"
import { IconCheckBold } from "../icons"
import { gu, springs } from "../styles"

type StepsProps = {
  current: number
  direction?: "horizontal" | "vertical"
  steps: number
}

export function Steps({
  current,
  direction = "horizontal",
  steps,
}: StepsProps): JSX.Element {
  steps = Math.round(steps)
  if (steps < 2) {
    throw new Error(
      `Steps: the number of steps should be greater than 1 (received ${steps}).`
    )
  }
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction === "horizontal" ? "row" : "column"};
        justify-content: space-between;
        align-items: center;
        width: ${direction === "horizontal" ? "100%" : css`8gu`};
        height: ${direction === "horizontal" ? css`8gu` : "100%"};
        padding: ${direction === "horizontal" ? css`0 2gu` : css`2gu 0`};
      `}
    >
      {Array.from({ length: steps * 2 - 1 }).map((_, index) => {
        const bar = index % 2 === 1
        const step = index - Math.floor(index / 2)
        const active = step <= current
        return bar ? (
          <StepBar key={index} active={active} direction={direction} />
        ) : (
          <StepNumber
            key={index}
            active={active}
            checked={step < current}
            label={String(step + 1)}
          />
        )
      })}
    </div>
  )
}

function StepNumber({
  active,
  checked,
  label,
}: {
  active: boolean
  checked: boolean
  label: string
}) {
  const labelTransition = useTransition(checked, {
    config: springs.appear,
    from: {
      opacity: 1,
      transform: "rotate(-20deg)",
    },
    enter: {
      opacity: 1,
      transform: "rotate(0deg)",
    },
    leave: {
      opacity: 0,
      transform: "rotate(0deg)",
    },
  })

  const activeVisibility = useTransition(active, {
    config: springs.appear,
    from: {
      opacity: 0,
      transform: "scale(1.5)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "scale(0.5)",
    },
  })

  return (
    <div
      css={({ fonts }) => css`
        flex-shrink: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3gu;
        height: 3gu;
        font-family: ${fonts.families.sans};
        font-weight: 800;
        font-size: 15px;
        user-select: none;
      `}
    >
      <div
        css={({ colors }) => css`
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: ${colors.accentInvertedContent};
          background: ${colors.accentInverted};
          border-radius: 50%;
        `}
      >
        {label}
      </div>
      {activeVisibility(
        ({ opacity, transform }, visible) =>
          visible && (
            <a.div
              style={{ opacity, transform }}
              title={label}
              css={({ colors }) => css`
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                color: ${colors.accentContent};
                background: ${colors.accent};
                border-radius: 50%;
              `}
            >
              {labelTransition(({ opacity, transform }, checked) => (
                <a.span
                  style={{ opacity, transform }}
                  css={css`
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  {checked ? <IconCheckBold size={2 * gu} /> : label}
                </a.span>
              ))}
            </a.div>
          )
      )}
    </div>
  )
}

function StepBar({
  active,
  direction,
}: {
  active: boolean
  direction: "horizontal" | "vertical"
}) {
  const { colors } = useTheme()
  const bounds = useDimensions()
  const visibility = useSpring({
    config: springs.lazy,
    transform:
      (direction === "horizontal" ? "translateX" : "translateY") +
      `(${active ? 0 : -50}%)`,
    opacity: Number(active),
  })
  return (
    <div
      ref={bounds.observe}
      css={css`
        display: flex;
        width: ${direction === "horizontal" ? "100%" : css`0.5gu`};
        height: ${direction === "horizontal" ? css`0.5gu` : "100%"};
        background: ${colors.accentInverted};
        border-radius: 0.25gu;
        margin: ${direction === "horizontal" ? css`0 1.75gu` : css`1.75gu 0`};
        overflow: hidden;
      `}
    >
      <a.div
        style={{
          opacity: visibility.opacity,
          transform: visibility.transform,
        }}
      >
        <Moire
          animate={true}
          backgroundColor={colors.accentInverted}
          height={bounds.height}
          linesColor={colors.accentInvertedContent}
          width={bounds.width}
          scale={0.75}
        />
      </a.div>
    </div>
  )
}
