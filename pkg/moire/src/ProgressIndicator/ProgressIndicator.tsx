import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import { a, useTransition } from "react-spring"
import { match } from "ts-pattern"
import { IconCheckBold, IconXBold } from "../icons"
import { Loader } from "../Loader"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme"

const SIZE = 8 * gu
const ICON_SIZE = SIZE - 3 * gu

export function ProgressIndicator(
  {
    background,
    number,
    status,
  }: {
    background?: string
    number?: number
    status: "error" | "success" | "loading" | "idle"
  },
) {
  const { colors } = useTheme()

  const transitions = useTransition(status, {
    from: { opacity: 0, transform: "scale(0.4)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1.5)" },
    config: (_, __, state) => (
      state === "leave" ? springs.snappy : springs.bouncy
    ),
  })

  return (
    <div
      css={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        userSelect: "none",
        background: background ?? "transparent",
      }}
    >
      {transitions((styles, status) => (
        match(status)
          .with("error", () => (
            <StatusContainer title="Error" {...styles}>
              <Circle color={colors.negative} />
              <IconXBold color={colors.negative} size={ICON_SIZE} />
            </StatusContainer>
          ))
          .with(
            "loading",
            () => (
              <StatusContainer title="Loading" {...styles}>
                <div
                  css={{
                    position: "absolute",
                    inset: "0",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Loader
                    background={background}
                    padding={1}
                    size={SIZE}
                    strokeWidth={4}
                  />
                </div>
                {number !== undefined && (
                  <div
                    css={{
                      position: "absolute",
                      inset: "0 0 2px",
                      display: "grid",
                      placeItems: "center",
                      font: "500 33px fonts.sans",
                      color: "colors.positive",
                    }}
                  >
                    {number}
                  </div>
                )}
              </StatusContainer>
            ),
          )
          .with("success", () => (
            <StatusContainer title="Success" {...styles}>
              <Circle color={colors.positive} />
              <IconCheckBold color={colors.positive} size={ICON_SIZE} />
            </StatusContainer>
          ))
          .with("idle", () => (
            <StatusContainer title="" {...styles}>
              <Circle color={colors.positive} />
              <div
                css={{
                  position: "absolute",
                  inset: "0 0 2px",
                  display: "grid",
                  placeItems: "center",
                  font: "500 33px fonts.sans",
                  color: "colors.positive",
                }}
              >
                {number}
              </div>
            </StatusContainer>
          ))
          .otherwise(() => null)
      ))}
    </div>
  )
}

function StatusContainer(
  {
    children,
    opacity,
    title,
    transform,
  }: {
    children: ReactNode
    opacity: SpringValue<number>
    title: string
    transform: SpringValue<string>
  },
) {
  return (
    <a.div
      style={{ opacity, transform }}
      title={title}
      css={{
        position: "absolute",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: SIZE,
        height: SIZE,
      }}
    >
      {children}
    </a.div>
  )
}

function Circle({ color }: { color: string }) {
  return (
    <div
      css={{
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        border: `4px solid ${color}`,
      }}
    />
  )
}
