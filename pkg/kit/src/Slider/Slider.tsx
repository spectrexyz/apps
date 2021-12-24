import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react"

import { useCallback, useRef, useEffect, useState } from "react"
import { css } from "@emotion/react"
import { colord } from "colord"
import useDimensions from "react-cool-dimensions"
import { a, useSpring } from "react-spring"
import { springs } from "../styles"
import { Moire } from "../Moire"

const BAR_HEIGHT = 6
const HANDLE_OUTLINE = 6
const HANDLE_SIZE = 18 + HANDLE_OUTLINE * 2
const PADDING = 5
const MIN_WIDTH = HANDLE_SIZE * 10
const HEIGHT = Math.max(HANDLE_SIZE, BAR_HEIGHT) + PADDING * 2

type SliderProps = {
  value: number
  onChange: (value: number) => void
}

function isTouchEvent(
  event: ReactTouchEvent | ReactMouseEvent | TouchEvent | MouseEvent
): event is TouchEvent | ReactTouchEvent {
  return "touches" in event
}

export function Slider({ value, onChange }: SliderProps): JSX.Element {
  const [pressed, setPressed] = useState(false)

  const lastRect = useRef<DOMRect | null>(null)
  const lastRectTime = useRef(-1)
  const mainElement = useRef<HTMLElement | null>(null)
  const document = useRef<Document | null>(null)

  const barBounds = useDimensions()

  const getRect = useCallback(() => {
    const now = Date.now()

    // Cache the rect if the last poll was less than a second ago
    if (lastRect.current && now - lastRectTime.current < 1000) {
      return lastRect.current
    }

    lastRectTime.current = now
    lastRect.current =
      mainElement.current?.getBoundingClientRect() ?? new window.DOMRect()

    return lastRect.current
  }, [])

  const clientXFromEvent = (
    event: ReactTouchEvent | ReactMouseEvent | TouchEvent | MouseEvent
  ) => {
    if (isTouchEvent(event)) {
      return event.touches.item(0)?.clientX ?? 0
    }
    return event.clientX
  }

  const updateValueFromClientX = useCallback(
    (clientX: number) => {
      const rect = getRect()
      const x = Math.min(rect.width, Math.max(0, clientX - rect.x))
      onChange(x / rect.width)
    },
    [onChange, getRect]
  )

  const dragStart = (event: ReactMouseEvent | ReactTouchEvent) => {
    setPressed(true)
    updateValueFromClientX(clientXFromEvent(event))
  }

  const handleRef = (element: HTMLDivElement) => {
    mainElement.current = element
    document.current = element && element.ownerDocument
  }

  useEffect(() => {
    const doc = document.current
    if (!doc || !pressed) return

    const dragMove = (event: MouseEvent | TouchEvent) => {
      updateValueFromClientX(clientXFromEvent(event))
    }

    const dragStop = () => {
      setPressed(false)
    }

    doc.addEventListener("mouseup", dragStop)
    doc.addEventListener("touchend", dragStop)
    doc.addEventListener("mousemove", dragMove)
    doc.addEventListener("touchmove", dragMove)

    return () => {
      doc.removeEventListener("mouseup", dragStop)
      doc.removeEventListener("touchend", dragStop)
      doc.removeEventListener("mousemove", dragMove)
      doc.removeEventListener("touchmove", dragMove)
    }
  }, [pressed])

  const moveSpring = useSpring({
    config: springs.swift,
    activeBarTransform: `scaleX(${1 - value}) translateZ(0)`,
    handleTransform: `translate3d(${value * 100}%, 0, 0)`,
    pressProgress: Number(pressed),
    value: Math.max(0, Math.min(1, value)),
  })

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const doc = document.current
    if (!doc || !focused) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
        onChange(Math.max(0, Math.round((value - 0.1) * 10) / 10))
      }
      if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        onChange(Math.min(1, Math.round((value + 0.1) * 10) / 10))
      }
    }

    doc.addEventListener("keydown", onKeyDown)
    return () => {
      doc.removeEventListener("keydown", onKeyDown)
    }
  }, [focused, value, onChange])

  return (
    <div
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      css={({ colors }) => css`
        min-width: ${MIN_WIDTH}px;
        padding: 0 ${HANDLE_SIZE / 2 + PADDING}px;
        user-select: none;
        &:focus-visible {
          outline: ${focused ? "2px" : "0"} solid ${colors.focus};
        }
      `}
    >
      <div
        ref={handleRef}
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        css={css`
          position: relative;
          height: ${HEIGHT}px;
          cursor: pointer;
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: ${BAR_HEIGHT}px;
          `}
        >
          <div
            ref={barBounds.observe}
            css={({ colors }) => css`
              position: absolute;
              inset: 0;
              background: ${colors.background};
            `}
          />
          <Moire
            width={barBounds.width}
            height={BAR_HEIGHT}
            scale={0.5}
            css={css`
              position: absolute;
              inset: 0;
            `}
          />
          <a.div
            style={{ transform: moveSpring.activeBarTransform }}
            css={({ colors }) => css`
              position: absolute;
              inset: 0;
              transform-origin: 100% 0;
              background: ${colors.background};
            `}
          />
        </div>

        <div
          css={css`
            pointer-events: none;
            width: calc(100% + ${HANDLE_SIZE}px);
            height: 100%;
            transform-origin: 50% 50%;
            transform: translate(-${HANDLE_SIZE / 2}px, 0);
          `}
        >
          <a.div
            style={{ transform: moveSpring.handleTransform }}
            css={css`
              width: calc(100% - ${HANDLE_SIZE}px);
              height: 100%;
              transform-origin: 50% 50%;
            `}
          >
            <div
              css={({ colors }) => css`
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: ${HANDLE_OUTLINE}px;
                width: ${HANDLE_SIZE - HANDLE_OUTLINE * 2}px;
                height: ${HANDLE_SIZE - HANDLE_OUTLINE * 2}px;
                border-radius: 50%;
                background: ${colors.accent};
                outline: ${HANDLE_OUTLINE}px solid
                  ${colord(colors.accent).alpha(0.2).toHex()};
                cursor: pointer;
                pointer-events: auto;
              `}
            />
          </a.div>
        </div>
      </div>
    </div>
  )
}
