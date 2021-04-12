/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useSpring, animated } from "react-spring"
import { useMoireBackground } from "../Moire"
import { colors } from "../styles"

type ButtonProps = {
  label: string
}

function circlePos(progress: number, radius: number) {
  const angle = progress * Math.PI * 2
  return [Math.cos(angle) * radius, Math.sin(angle) * radius]
}

export function Button({ label }: ButtonProps) {
  const moireBackground = useMoireBackground()

  const { progress } = useSpring({
    loop: true,
    from: { progress: 0 },
    to: { progress: 1 },
    config: { duration: 6 * 60 * 1000 },
  })

  return (
    <button
      type="button"
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: 5gu;
        cursor: pointer;
        outline: 0;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
        padding: 0;
        border: 0;
        background: none;
        &::-moz-focus-inner {
          border: 0;
        }
        &:active .label {
          transform: translate(2.5px, 2.5px);
        }
        &:active .shadow-active {
          opacity: 1;
        }
      `}
    >
      <span
        className="label"
        css={css`
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          height: 100%;
          padding: 0 1.5gu;
          background: ${colors.background};
          border: 1px solid ${colors.accent};
        `}
      >
        {label}
      </span>
      <span
        css={css`
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(5px, 5px);
          pointer-events: none;
          overflow: hidden;
        `}
      >
        <span
          className="shadow-active"
          css={css`
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${colors.accent};
            opacity: 0;
          `}
        />
        <animated.span
          style={{
            transform: progress.to((p) => {
              const [x, y] = circlePos(p, 50)
              return `
                translate3d(${x}px, calc(-50% + ${y}px), 0)
                rotate3d(0, 0, 1, ${p * -360}deg)
              `
            }),
          }}
          css={css`
            position: absolute;
            z-index: 1;
            left: -50%;
            top: 50%;
            width: 200%;
            height: 0;
            padding-top: 200%;
            background: url(${moireBackground.url}) 0 0 no-repeat;
            transform-origin: 50% 50%;
          `}
        />
      </span>
    </button>
  )
}
