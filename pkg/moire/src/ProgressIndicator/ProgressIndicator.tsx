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
    status,
  }: {
    status: "error" | "success" | "loading"
  },
) {
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
      }}
    >
      {transitions((styles, status) => (
        match(status)
          .with("error", () => (
            <StatusContainer title="Error" {...styles}>
              <Error />
            </StatusContainer>
          ))
          .with(
            "loading",
            () => (
              <StatusContainer title="Loading" {...styles}>
                <Loading />
              </StatusContainer>
            ),
          )
          .with("success", () => (
            <StatusContainer title="Success" {...styles}>
              <Success />
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

function Loading() {
  return <Loader size={39} strokeWidth={1.5} />
}

function Error() {
  const { colors } = useTheme()
  return <IconXCircle color={colors.negative} size={6 * gu} />
}

function Success() {
  const { colors } = useTheme()
  return <IconCheckCircle color={colors.positive} size={6 * gu} />
}
