import type { ReactNode } from "react"

import useDimensions from "react-cool-dimensions"
import { Moire } from "../Moire/Moire"
import { gu } from "../styles"
import { useTheme } from "../Theme"

const PADDING_H = 1.5 * gu

type MoireLabelProps = {
  background?: string
  label: ReactNode
  labelColor?: string
  linesColor?: string
  title?: string
}

export function MoireLabel({
  background,
  label,
  labelColor,
  linesColor,
  title = "",
}: MoireLabelProps): JSX.Element {
  const { colors } = useTheme()
  const bounds = useDimensions()
  const ready = bounds.width > 0 && bounds.height > 0
  if (!title && typeof label === "string") {
    title = label
  }
  return (
    <span
      title={title}
      ref={bounds.observe}
      css={({ colors, fonts }) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: "4gu",
        fontFamily: fonts.sans,
        fontSize: "20px",
        fontWeight: "800",
        color: labelColor || colors.background,
        userSelect: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 150ms ease-in-out",
      })}
    >
      <span
        css={{
          position: "absolute",
          inset: "0",
          zIndex: "1",
          opacity: "0.75",
        }}
      >
        {ready && (
          <Moire
            width={bounds.width}
            height={bounds.height}
            linesColor={linesColor || colors.lightBackground}
            backgroundColor={background || colors.background}
            scale={0.2}
          />
        )}
      </span>
      <span
        css={{
          position: "relative",
          zIndex: "1",
          padding: `0 ${PADDING_H}px`,
        }}
      >
        {label}
      </span>
    </span>
  )
}
