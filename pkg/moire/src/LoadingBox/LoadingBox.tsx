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

const loaderOpening = 30

export function LoadingBox() {
  const circleSize = 5 * gu
  const circleStrokeWidth = 5
  const circleRadius = circleSize / 2 - circleStrokeWidth / 2
  const circleCircumference = 2 * circleRadius * Math.PI

  const { colors } = useTheme()
  const uid = useUid()

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

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "25gu",
        height: "17.5gu",
        background: "colors.background",
        border: "1px solid colors.layer2",
      }}
    >
      <a.div
        css={{
          position: "relative",
          width: circleSize,
          height: circleSize,
        }}
      >
        <Moire
          width={circleSize}
          height={circleSize}
          scale={0.5}
          css={{ position: "absolute", inset: "0" }}
        />
        <a.svg
          fill="none"
          height={circleSize}
          width={circleSize}
          xmlns="http://www.w3.org/2000/svg"
          css={{
            position: "absolute",
            inset: "0",
          }}
        >
          <mask id={uid}>
            <rect width={circleSize} height={circleSize} fill="white" />
            <g
              css={{
                transformOrigin: "50% 50%",
                animation: `${rotateKeyframes} 2s linear infinite`,
              }}
            >
              <a.circle
                cx="50%"
                cy="50%"
                r={circleRadius}
                stroke="black"
                strokeWidth={circleStrokeWidth}
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference / 2}
                strokeLinecap="round"
                style={{
                  transform: rotateAnim.progress
                    .to(
                      [0, 0.2, 0.5, 1],
                      [0, 0.5, 0.8, 1],
                    )
                    .to((v) => `rotate(${-90 + v * 360 + loaderOpening}deg)`),
                }}
                css={{ transformOrigin: "50% 50%" }}
              />
              <a.circle
                cx="50%"
                cy="50%"
                r={circleRadius}
                stroke="black"
                strokeWidth={circleStrokeWidth}
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference / 2}
                strokeLinecap="round"
                style={{
                  transform: rotateAnim.progress.to((v) =>
                    `rotate(${90 + 360 * v - loaderOpening}deg)`
                  ),
                }}
                css={{ transformOrigin: "50% 50%" }}
              />
            </g>
          </mask>
          <rect
            width={circleSize}
            height={circleSize}
            fill={colors.background}
            mask={`url(#${uid})`}
          />
        </a.svg>
      </a.div>
      <div
        css={{
          paddingTop: "2gu",
          font: "16px/1.5 fonts.mono",
          textTransform: "uppercase",
        }}
      >
        Loading
      </div>
    </div>
  )
}
