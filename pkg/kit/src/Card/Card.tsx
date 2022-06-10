import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import { a, useTransition } from "react-spring"
import { Loading } from "../Loading"
import { springs } from "../styles"
import { useTheme } from "../Theme"

export function Card({
  children,
  className,
  loading = false,
  radius = 0,
}: {
  children: ReactNode
  className?: string
  loading?: boolean
  radius?: number
}) {
  const loadingTransition = useTransition(loading, {
    config: springs.snappy,
    from: {
      loaderTransform: "scale(0.95)",
      childrenTransform: "scale(0.95)",
      progress: 0,
    },
    enter: {
      loaderTransform: "scale(0.95)",
      childrenTransform: "scale(1)",
      progress: 1,
    },
    leave: {
      loaderTransform: "scale(1)",
      childrenTransform: "scale(0.95)",
      progress: 0,
    },
  })

  return (
    <div className={className}>
      <div
        css={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          height: "100%",
        }}
      >
        {loadingTransition((styles, loading) => (
          loading
            ? (
              <LoadingContent
                opacity={styles.progress}
                transform={styles.loaderTransform}
                radius={radius}
              />
            )
            : (
              <a.div
                style={{
                  opacity: styles.progress,
                  transform: styles.childrenTransform,
                }}
                css={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: radius,
                }}
              >
                {children}
              </a.div>
            )
        ))}
      </div>
    </div>
  )
}

function LoadingContent(
  {
    opacity,
    radius,
    transform,
  }: {
    opacity: SpringValue<number>
    radius: number
    transform: SpringValue<string>
  },
) {
  const theme = useTheme()
  return (
    <a.div
      style={{ opacity, transform }}
      css={{
        position: "absolute",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "colors.layer1",
        userSelect: "none",
        borderRadius: radius,
      }}
    >
      <Loading background={theme.colors.layer1} />
    </a.div>
  )
}
