import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

import useMeasure from "react-use-measure"
import { Moire } from "../Moire"
import { theme } from "../styles"

type ButtonMode = "outline" | "filled" | "outline-alt" | "filled-alt"

type ButtonProps =
  & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
  & {
    label: string
    mode: ButtonMode
  }

export function Button({ mode = "outline", label, ...props }: ButtonProps) {
  const baseColor = mode.endsWith("-alt") ? theme.secondary : theme.primary
  const filled = mode.startsWith("filled")
  const [buttonRef, buttonBounds] = useMeasure()

  return (
    <button
      type="button"
      ref={buttonRef}
      {...props}
      css={{
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
        height: "5.5gu",
        cursor: "pointer",
        outline: "0",
        textAlign: "center",
        textDecoration: "none",
        whiteSpace: "nowrap",
        padding: "0",
        border: "0",
        background: "none",
        "&::-moz-focus-inner": {
          border: "0",
        },
        "&:active": {
          ".label": {
            transform: "translate(2.5px, 2.5px)",
          },
          ".active-shadow": {
            opacity: "1",
          },
          "&:disabled": {
            ".label": {
              transform: "none",
            },
            ".active-shadow": {
              opacity: "0",
            },
          },
        },
      }}
    >
      <div
        className="label"
        css={{
          position: "relative",
          zIndex: "2",
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "100%",
          padding: "0 1.5gu",
          color: filled ? theme.background : theme.content,
          background: filled ? baseColor : theme.background,
          border: `1px solid ${baseColor}`,
        }}
      >
        {label}
      </div>
      <div
        css={{
          position: "absolute",
          zIndex: "1",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          transform: "translate(5px, 5px)",
          pointerEvents: "none",
        }}
      >
        <div
          className="active-shadow"
          css={{
            position: "absolute",
            zIndex: "2",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: baseColor,
            opacity: "0",
          }}
        />
        <Moire
          height={buttonBounds.height}
          linesColor={theme.secondary}
          scale={0.8}
          width={buttonBounds.width}
        />
      </div>
    </button>
  )
}
