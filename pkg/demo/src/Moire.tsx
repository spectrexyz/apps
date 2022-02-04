import { css } from "@emotion/react"
import { map, Moire as KitMoire, springs, useEvery } from "kit"
import { useEffect, useState } from "react"
import { a, useTransition } from "react-spring"

type Settings = [number, number, number, string]

function settings(): Settings {
  // const size = 100 + Math.random() * 400
  const size = Math.random() > 0.5 ? 500 : 50
  const x = Math.random() * (window.innerWidth - size)
  const y = Math.random() * (window.innerHeight - size)
  const color = `rgb(${
    [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ].join(",")
  })`
  return [size, x, y, color]
}

export function Moire() {
  const [count, setCount] = useState(1)
  const [scale, setScale] = useState(1)
  return (
    <div
      css={css`
        position: absolute;
        z-index: 1;
        inset: 0;
      `}
    >
      <div
        css={css`
          position: absolute;
          z-index: 2;
          inset: 1gu 2gu auto auto;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 1gu;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 1gu;
            a {
              cursor: pointer;
            }
          `}
        >
          <div>instances: {count}</div>
          <a role="button" onClick={() => setCount((v) => Math.max(0, v - 1))}>
            rm
          </a>
          <a role="button" onClick={() => setCount((v) => v + 1)}>
            add
          </a>
          {" "}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            div {
              padding-right: 1gu;
            }
            input {
              width: 100px;
            }
          `}
        >
          <div>scale:</div>
          {scale}
        </div>
        <div css={css``}>
          <input
            type="range"
            step="1"
            min="0"
            max="10"
            value={Math.round(map(scale, 0.5, 1.5, 0, 10))}
            onChange={(e) =>
              setScale(map(Number(e.target.value), 0, 10, 0.5, 1.5))}
          />
        </div>
      </div>
      {Array.from({ length: count }).map((_, index) => (
        <MoireRandom key={index} scale={scale} />
      ))}
    </div>
  )
}

function useRandomizeSettings(setSettings: (settings: Settings) => void) {
  // useEvery(
  //   useCallback(() => {
  //     setSettings(settings())
  //   }, []),
  //   1000
  // )
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      timer = setTimeout(update, 1000)
    }
    update()
    return () => clearTimeout(timer)
  }, [])
}

export function MoireRandom({ scale }: { scale: number }) {
  const [[size, x, y, color], setSettings] = useState(settings())

  useRandomizeSettings(setSettings)

  const transition = useTransition(true, {
    config: springs.appear,
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "scale(0.8)",
    },
  })

  return transition(
    ({ opacity, transform }, show) =>
      show && (
        <a.div
          style={{ opacity, transform }}
          css={css`
            position: absolute;
            top: ${y}px;
            left: ${x}px;
          `}
        >
          <KitMoire
            width={size}
            height={size}
            linesColor={color}
            scale={scale}
            css={css`
              border-radius: 50%;
            `}
          />
        </a.div>
      ),
  )
}
