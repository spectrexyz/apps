/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { useSpring, animated } from "react-spring"
import { useBaseUrl } from "../BaseUrl"

type MoireProps = {
  duration?: number
  height: number
  mode?: "dark" | "light"
  width: number
}

export function Moire({
  duration = 6 * 60 * 1000,
  height,
  mode = "dark",
  width,
}: MoireProps) {
  const image = useMoireImage(mode)
  const transform = useMoireTransform({ duration })
  return (
    <div
      css={css`
        overflow: hidden;
        width: ${width}px;
        height: ${height}px;
        position: relative;
      `}
    >
      <animated.div
        style={{ transform }}
        css={css`
          position: absolute;
          z-index: 1;
          left: -50%;
          top: 50%;
          width: 200%;
          height: 0;
          padding-top: 200%;
          background: url(${image}) 0 0 repeat;
          transform-origin: 50% 50%;
        `}
      />
    </div>
  )
}

function circlePos(progress: number, radius: number) {
  const angle = progress * Math.PI * 2
  return [Math.cos(angle) * radius, Math.sin(angle) * radius]
}

export function useMoireTransform({ duration }: { duration: number }) {
  const { progress } = useSpring({
    loop: true,
    from: { progress: 0 },
    to: { progress: 1 },
    config: { duration },
  })
  return progress.to((p) => {
    const [x, y] = circlePos(p, 50)
    return `
      translate3d(${x}px, calc(-50% + ${y}px), 0)
      rotate3d(0, 0, 1, ${p * -360}deg)
    `
  })
}

export function useMoireImage(mode: "dark" | "light" = "dark") {
  return useBaseUrl(`Moire/moire-${mode}.svg`)
}
