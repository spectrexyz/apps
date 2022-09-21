import { keyframes } from "@emotion/react"
import { a, useSpring } from "react-spring"
import { Moire } from "../Moire"
import { useUid } from "../react-utils"
import { gu } from "../styles"
import { useTheme } from "../Theme"

const rotateKeyframes = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`

const OPENING_ANGLE = 30

export function Loader({
  background,
  color,
  mode = "normal",
  padding,
  size = 5 * gu,
  strokeWidth = 5,
}: {
  background?: string
  color?: string
  // Some inner padding can be needed to prevent rounding
  // issues when using the Loader with animated transforms.
  padding?: number
  mode: "moire" | "normal"
  size?: number
  strokeWidth?: number
}) {
  const { colors } = useTheme()
  const uid = useUid()

  const maskMode = mode === "moire" || (mode === "normal" && background)

  padding ??= mode === "moire" ? 1 : 0
  color ??= colors.positive
  background ??= colors.background

  const rotateAnim = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    loop: true,
    config: {
      mass: 4,
      tension: 300,
      friction: 200,
      precision: 0.05,
    },
  })

  const radius = size / 2 - padding - strokeWidth / 2
  const circumference = 2 * radius * Math.PI

  const circles = (
    <g
      css={{
        transformOrigin: "50% 50%",
        animation: `${rotateKeyframes} 2s linear infinite`,
      }}
    >
      <a.circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke={maskMode ? "black" : color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference / 2}
        strokeLinecap="round"
        style={{
          transform: rotateAnim.progress
            .to(
              [0, 0.2, 0.5, 1],
              [0, 0.5, 0.8, 1],
            )
            .to((v) =>
              `rotate3d(0, 0, 1, ${-90 + v * 360 + OPENING_ANGLE}deg)`
            ),
        }}
        css={{ transformOrigin: "50% 50%" }}
      />
      <a.circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke={maskMode ? "black" : color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference / 2}
        strokeLinecap="round"
        style={{
          transform: rotateAnim.progress.to((v) =>
            `rotate3d(0, 0, 1, ${90 + 360 * v - OPENING_ANGLE}deg)`
          ),
        }}
        css={{ transformOrigin: "50% 50%" }}
      />
    </g>
  )

  return (
    <div
      css={{
        position: "relative",
        width: size,
        height: size,
        background: maskMode ? background : "none",
      }}
    >
      {mode !== "moire" && maskMode && (
        <div
          css={{
            position: "absolute",
            inset: padding,
            background: color,
          }}
        />
      )}
      {mode === "moire" && (
        <Moire
          height={size - padding * 2}
          linesColor={color}
          scale={0.5}
          width={size - padding * 2}
          css={{ position: "absolute", inset: padding }}
        />
      )}
      <svg
        fill="none"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        css={{ position: "absolute", inset: "0" }}
      >
        {maskMode
          ? (
            <>
              <mask id={uid}>
                <rect width={size} height={size} fill="white" />
                {circles}
              </mask>
              <rect
                width={size}
                height={size}
                fill={background}
                mask={`url(#${uid})`}
              />
            </>
          )
          : circles}
      </svg>
    </div>
  )
}
