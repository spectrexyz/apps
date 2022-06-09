import type { ReactNode } from "react"

import { a, useTransition } from "react-spring"
import { Loading } from "../Loading"
import { springs } from "../styles"
import { useTheme } from "../Theme"

export function Card({
  children,
  height,
  loading = false,
  radius = 0,
}: {
  children: ReactNode
  height: number
  loading?: boolean
  radius?: number
}) {
  const theme = useTheme()
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
    <div css={{ height }}>
      <div
        css={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          height,
        }}
      >
        {loadingTransition((styles, loading) => (
          loading
            ? (
              <a.div
                style={{
                  opacity: styles.progress,
                  transform: styles.loaderTransform,
                }}
                css={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  textTransform: "uppercase",
                  color: "colors.contentDimmed",
                  background: "colors.layer1",
                  userSelect: "none",
                  borderRadius: radius,
                }}
              >
                <Loading background={theme.colors.layer1} />
              </a.div>
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
