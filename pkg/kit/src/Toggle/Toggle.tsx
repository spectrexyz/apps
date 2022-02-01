import {
  ComponentProps,
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react"
import { css } from "@emotion/react"
import useDimensions from "react-cool-dimensions"
import { a, useSpring } from "react-spring"
import { ButtonArea } from "../ButtonArea"
import { springs } from "../styles"

type TogglePropValue = 1 | 0

type ToggleProps = {
  labels: [start: string, end: string]
  onChange: (value: TogglePropValue) => void
  value: TogglePropValue
}

export function Toggle({ labels: [start, end], onChange, value }: ToggleProps) {
  const handleClick = useCallback(() => {
    onChange((1 - value) as TogglePropValue)
  }, [onChange, value])

  const boundsStart = useDimensions({ useBorderBoxSize: true })
  const boundsEnd = useDimensions({ useBorderBoxSize: true })

  const ready = boundsStart.width > 0
  const [animate, setAnimate] = useState(false)
  useLayoutEffect(() => {
    if (ready) setAnimate(true)
  }, [ready])

  const { clipPath } = useSpring({
    config: springs.swift,
    immediate: !animate,
    clipPath:
      value === 0
        ? `inset(0 0px 0 ${boundsStart.width}px)`
        : `inset(0 ${boundsEnd.width}px 0 0px)`,
  })

  return (
    <ButtonArea
      onClick={handleClick}
      css={css`
        position: relative;
        text-transform: uppercase;
        opacity: ${animate ? "1" : "0"};
      `}
    >
      <Container>
        <div ref={boundsStart.observe}>{start}</div>
        <div ref={boundsEnd.observe}>{end}</div>
      </Container>
      <a.div
        aria-hidden="true"
        style={{
          clipPath: clipPath,
        }}
        css={css`
          position: absolute;
          inset: 0;
        `}
      >
        <Container
          css={({ colors }) => css`
            color: ${colors.accentContent};
            background: ${colors.accent};
          `}
        >
          <div>{start}</div>
          <div>{end}</div>
        </Container>
      </a.div>
    </ButtonArea>
  )
}

function Container(props: ComponentProps<"div">) {
  return (
    <div
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        height: 3gu;
        color: ${colors.contentDimmed};
        background: ${colors.background};
        & > div {
          padding: 0 1.25gu;
          white-space: nowrap;
        }
      `}
      {...props}
    />
  )
}
