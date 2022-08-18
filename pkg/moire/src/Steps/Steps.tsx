import useDimensions from "react-cool-dimensions"
import { a, useSpring, useTransition } from "react-spring"
import { IconCheckBold } from "../icons"
import { Moire } from "../Moire/Moire"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme/Theme"

type StepsProps = {
  current: number
  direction?: "horizontal" | "vertical"
  steps: number
}

const NUMBER_SIZE = 3 * gu
const BAR_THICKNESS = 0.5 * gu
const BAR_SPACING = 1.75 * gu

export function Steps({
  current,
  direction = "horizontal",
  steps,
}: StepsProps): JSX.Element {
  steps = Math.round(steps)
  if (steps < 2) {
    throw new Error(
      `Steps: the number of steps should be greater than 1 (received ${steps}).`,
    )
  }

  const bounds = useDimensions()

  // Bar length = its width or height, depending on direction
  const barLength = ((direction === "vertical" ? bounds.height : bounds.width)
        - NUMBER_SIZE * steps)
      / (steps - 1)
    - BAR_SPACING * 2

  return (
    <div
      ref={bounds.observe}
      css={{
        display: "flex",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: direction === "horizontal" ? "row" : "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: direction === "horizontal" ? "auto" : `${NUMBER_SIZE}px`,
          height: direction === "horizontal" ? `${NUMBER_SIZE}px` : "auto",
        }}
      >
        {Array.from({ length: steps * 2 - 1 }).map((_, index) => {
          const bar = index % 2 === 1
          const step = index - Math.floor(index / 2)
          const active = step <= current
          return bar
            ? (
              <StepBar
                key={index}
                active={active}
                direction={direction}
                length={barLength}
              />
            )
            : (
              <StepNumber
                key={index}
                active={active}
                checked={step < current}
                label={String(step + 1)}
              />
            )
        })}
      </div>
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
      css={({ fonts }) => ({
        flexShrink: "0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${NUMBER_SIZE}px`,
        height: `${NUMBER_SIZE}px`,
        fontFamily: fonts.sans,
        fontWeight: "400",
        fontSize: "15px",
        userSelect: "none",
      })}
    >
      <div
        css={({ colors }) => ({
          position: "absolute",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          color: colors.accentInvertedContent,
          background: colors.accentInverted,
          borderRadius: "50%",
        })}
      >
        {label}
      </div>
      {activeVisibility(
        ({ opacity, transform }, visible) =>
          visible && (
            <a.div
              style={{ opacity, transform }}
              title={label}
              css={({ colors }) => ({
                position: "absolute",
                inset: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                color: colors.accentContent,
                background: colors.accent,
                borderRadius: "50%",
              })}
            >
              {labelTransition(({ opacity, transform }, checked) => (
                <a.span
                  style={{ opacity, transform }}
                  css={{
                    position: "absolute",
                    inset: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {checked ? <IconCheckBold size={2 * gu} /> : label}
                </a.span>
              ))}
            </a.div>
          ),
      )}
    </div>
  )
}

function StepBar({
  active,
  direction,
  length,
}: {
  active: boolean
  direction: "horizontal" | "vertical"
  length: number
}) {
  const { colors } = useTheme()
  const visibility = useSpring({
    config: springs.lazy,
    transform: (direction === "horizontal" ? "translateX" : "translateY")
      + `(${active ? 0 : -50}%)`,
    opacity: Number(active),
  })
  return (
    <div
      css={{
        display: "flex",
        flexShrink: "1",
        width: direction === "horizontal"
          ? `${length}px`
          : `${BAR_THICKNESS}px`,
        height: direction === "horizontal"
          ? `${BAR_THICKNESS}px`
          : `${length}px`,
        background: colors.accentInverted,
        borderRadius: "0.25gu",
        margin: direction === "horizontal" ? "0 1.75gu" : "1.75gu 0",
        overflow: "hidden",
      }}
    >
      <a.div
        style={{
          opacity: visibility.opacity,
          transform: visibility.transform,
        }}
      >
        <Moire
          backgroundColor={colors.accentInverted}
          height={direction === "horizontal" ? BAR_THICKNESS : length}
          linesColor={colors.accentInvertedContent}
          scale={0.8}
          width={direction === "vertical" ? BAR_THICKNESS : length}
        />
      </a.div>
    </div>
  )
}
