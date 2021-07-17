/** @jsx jsx */
import type { ReactNode } from "react"

import useDimensions from "react-cool-dimensions"
import { jsx, css } from "@emotion/react"
import { useTheme } from "../Theme"
import { Moire } from "../Moire"
import { gu } from "../styles"

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
    <span title={title}>
      <span
        ref={bounds.observe}
        css={({ colors }) => css`
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 4gu;
          padding: 0 2.5gu;
          font-size: 20px;
          font-weight: 600;
          color: ${labelColor || colors.background};
          user-select: none;
          opacity: ${ready ? 1 : 0};
          transition: opacity 150ms ease-in-out;
        `}
      >
        <span
          css={css`
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.75;
          `}
        >
          {ready && (
            <Moire
              width={bounds.width + 2.5 * gu * 2}
              height={bounds.height}
              linesColor={linesColor || colors.lightBackground}
              backgroundColor={background || colors.background}
              scale={0.5}
            />
          )}
        </span>
        <span
          css={css`
            position: relative;
            z-index: 1;
          `}
        >
          {label}
        </span>
      </span>
    </span>
  )
}
