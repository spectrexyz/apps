import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import { a, useSpring, useTransition } from "react-spring"
import { match } from "ts-pattern"
import { IconCheckCircle, IconXCircle } from "../icons"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme"

import loadingImage from "./progress-indicator-loading.svg"

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
    leave: { opacity: 0, transform: "scale(2)" },
    config: springs.bouncy,
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
  const style = useSpring({
    loop: true,
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    config: {
      mass: 0.8,
      tension: 200,
      friction: 60,
      precision: 0.025,
    },
  })
  return (
    <a.img
      src={loadingImage}
      alt=""
      width={6 * gu}
      height={6 * gu}
      style={style}
    />
  )
}

function Error() {
  const { colors } = useTheme()
  return <IconXCircle color={colors.negative} size={6 * gu} />
}

function Success() {
  const { colors } = useTheme()
  return <IconCheckCircle color={colors.positive} size={6 * gu} />
}
