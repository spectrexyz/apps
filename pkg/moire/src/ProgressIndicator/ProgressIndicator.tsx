import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import { a, useTransition } from "react-spring"
import { match } from "ts-pattern"
import { IconCheckCircle, IconXCircle } from "../icons"
import { Loader } from "../Loader"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme"

export function ProgressIndicator(
  {
    background,
    status,
  }: {
    background?: string
    status: "error" | "success" | "loading"
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
        width: "6gu",
        height: "6gu",
        userSelect: "none",
        background: background ?? "transparent",
      }}
    >
      {transitions((styles, status) => (
        match(status)
          .with("error", () => (
            <StatusContainer title="Error" {...styles}>
              <IconXCircle color={colors.negative} size={6 * gu} />
            </StatusContainer>
          ))
          .with(
            "loading",
            () => (
              <StatusContainer title="Loading" {...styles}>
                <Loader
                  background={background}
                  padding={1}
                  size={40}
                  strokeWidth={2}
                />
              </StatusContainer>
            ),
          )
          .with("success", () => (
            <StatusContainer title="Success" {...styles}>
              <IconCheckCircle color={colors.positive} size={6 * gu} />
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
      }}
    >
      {children}
    </a.div>
  )
}
