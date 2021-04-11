/** @jsx jsx */
import { useState } from "react"
import { jsx, css } from "@emotion/react"
import { useSpring, animated, to } from "react-spring"
import { useMoireBackground } from "../Moire"
import { colors } from "../styles"

type ButtonProps = {
  label: string
}

function moireEffectProps() {
  return {
    x: Math.random() * 20,
    y: Math.random() * 20,
    s: 0.9 + Math.random() * 0.2,
    r: -1 + Math.random() * 2,
  }
}

function useMoireEffect() {
  const [target, setTarget] = useState(moireEffectProps())

  const props = useSpring({
    from: moireEffectProps(),
    to: target,
    config: { mass: 500, tension: 500, friction: 500 },
    onRest: ({ finished }) => {
      if (finished) {
        setTarget(moireEffectProps())
      }
    },
  })

  return props
}

export function Button({ label }: ButtonProps) {
  const moireBackground = useMoireBackground()
  const moireEffect = useMoireEffect()
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
          transform: translate(2px, 2px);
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
        <animated.span
          style={{
            transform: to(
              [moireEffect.x, moireEffect.y, moireEffect.r, moireEffect.s],
              (x, y, r, s) => `
                translate3d(${x}px, ${y}px, 0)
                rotate3d(0, 0, 1, ${r * 10}deg)
                scale3d(${s}, ${s}, 1)
              `
            ),
          }}
          css={css`
            position: absolute;
            left: ${-moireBackground.width / 3}px;
            top: ${-moireBackground.height / 3}px;
            width: ${moireBackground.width}px;
            height: ${moireBackground.height}px;
            background: url(${moireBackground.url}) 0 0 no-repeat;
            transform-origin: 0 0;
          `}
        />
      </span>
    </button>
  )
}
