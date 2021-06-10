
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { useSpring, animated } from "react-spring"
import { useBaseUrl } from "../BaseUrl"

export type MoireSvgMode = "dark" | "light" | "dark-alt" | "light-alt"

export type MoireSvgProps = {
  animate?: boolean
  duration?: number
  mode?: MoireSvgMode
}

function circlePos(progress: number, radius: number) {
  const angle = progress * Math.PI * 2
  return [Math.cos(angle) * radius, Math.sin(angle) * radius]
}

function useMoireSvgTransform({
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

export function useMoireSvgImage(mode: MoireSvgMode = "dark") {
  return useBaseUrl(`MoireSvg/moire-${mode}.svg`)
}

export function MoireSvg({
  animate = true,
  duration = 6 * 60 * 1000,
  mode = "dark",
  ...props
}: MoireSvgProps) {
  const image = useMoireSvgImage(mode)
  const transform = useMoireSvgTransform({ duration, animate })
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
