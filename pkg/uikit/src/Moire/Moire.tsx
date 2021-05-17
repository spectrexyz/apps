/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { useSpring, animated } from "react-spring"
import { useBaseUrl } from "../BaseUrl"

export type MoireMode = "dark" | "light" | "dark-alt" | "light-alt"

export type MoireProps = {
  animate?: boolean
  duration?: number
  mode?: MoireMode
}

function circlePos(progress: number, radius: number) {
  const angle = progress * Math.PI * 2
  return [Math.cos(angle) * radius, Math.sin(angle) * radius]
}

function useMoireTransform({
  animate = true,
  duration = 6 * 60 * 1000,
}: { animate?: boolean; duration?: number } = {}) {
  const { progress } = useSpring({
    pause: !animate,
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

export function useMoireImage(mode: MoireMode = "dark") {
  return useBaseUrl(`Moire/moire-${mode}.svg`)
}

export function Moire({
  animate = true,
  duration = 6 * 60 * 1000,
  mode = "dark",
  ...props
}: MoireProps) {
  const image = useMoireImage(mode)
  const transform = useMoireTransform({ duration, animate })
  return (
    <span
      {...props}
      css={css`
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <animated.span
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
    </span>
  )
}
