import type { ReactNode } from "react"

import { a, useTransition } from "react-spring"
import { Loader } from "../Loader"
import { springs } from "../styles"

export function LoadingBox({
  visible = true,
  label = "Loading",
}: {
  visible?: boolean
  label?: ReactNode
}) {
  const appearTransitions = useTransition(visible, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1.2)" },
    config: springs.swift,
  })
  return appearTransitions((styles, visible) =>
    visible && (
      <a.div
        style={styles}
        css={{ position: "absolute" }}
      >
        <div
          css={{
            position: "absolute",
            inset: "50% 0 0 50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "25gu",
            height: "17.5gu",
            paddingTop: "4gu",
            background: "colors.background",
            border: "1px solid colors.layer2",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Loader mode="moire" />
          <div
            css={{
              paddingTop: "2gu",
              font: "16px/1.5 fonts.mono",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>
      </a.div>
    )
  )
}
