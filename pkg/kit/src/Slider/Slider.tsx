/* eslint jsx-a11y/no-noninteractive-tabindex: "off" */
/* eslint jsx-a11y/click-events-have-key-events: "off" */
/* eslint jsx-a11y/no-static-element-interactions: "off" */

import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react"
import type { Direction } from "../types"

import { useCallback, useEffect, useRef, useState } from "react"
import useDimensions from "react-cool-dimensions"
import { a, useSpring } from "react-spring"
import { Moire } from "../Moire"
import { springs } from "../styles"

const BAR_HEIGHT = 4
const HANDLE_OUTLINE = 5
const HANDLE_SIZE = 10 + HANDLE_OUTLINE * 2
const PADDING = 5
const MIN_WIDTH = HANDLE_SIZE * 10
const HEIGHT = Math.max(HANDLE_SIZE, BAR_HEIGHT) + PADDING * 2

type SliderProps = {
  keyboardStep?: (value: number, direction: Direction) => number
  labels?: [start: string, end: string]
  onChange: (value: number) => void
  onLabelClick?: (value: "start" | "end") => void
  value: number
}

export function Slider({
  keyboardStep = (value, dir) => Math.round((value + 0.1 * dir) * 10) / 10,
  labels,
  onChange,
  onLabelClick,
  value,
}: SliderProps): JSX.Element {
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
    lastRect.current = mainElement.current?.getBoundingClientRect()
      ?? new window.DOMRect()

    return lastRect.current
  }, [])

  const clientXFromEvent = (
    event: ReactTouchEvent | ReactMouseEvent | TouchEvent | MouseEvent,
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
    [onChange, getRect],
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
  }, [pressed, updateValueFromClientX])

  const moveSpring = useSpring({
    config: springs.snappy,
    activeBarTransform: `scaleX(${value}) translateZ(0)`,
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
        event.preventDefault()
        onChange(Math.max(0, keyboardStep(value, -1)))
      }
      if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        event.preventDefault()
        onChange(Math.min(1, keyboardStep(value, 1)))
      }
    }

    doc.addEventListener("keydown", onKeyDown)
    return () => {
      doc.removeEventListener("keydown", onKeyDown)
    }
  }, [focused, keyboardStep, onChange, value])

  return (
    <div
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      css={({ colors }) => ({
        position: "relative",
        minWidth: `${MIN_WIDTH}px`,
        padding: `0 0 ${labels ? "1.5gu" : "0"}`,
        userSelect: "none",
        "&:focus-visible": {
          outline: `${focused ? "2px" : "0"} solid ${colors.focus}`,
        },
      })}
    >
      <div
        ref={handleRef}
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        css={{
          position: "relative",
          height: HEIGHT,
          cursor: "pointer",
        }}
      >
        <div
          css={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            height: BAR_HEIGHT,
          }}
        >
          <div
            css={{
              position: "absolute",
              inset: "0",
              overflow: "hidden",
              borderRadius: BAR_HEIGHT / 2,
            }}
          >
            <div
              ref={barBounds.observe}
              css={({ colors }) => ({
                position: "absolute",
                inset: "0",
                background: colors.accentInverted,
              })}
            />
            <a.div
              style={{ transform: moveSpring.activeBarTransform }}
              css={({ colors }) => ({
                position: "absolute",
                inset: "0",
                transformOrigin: "0 0",
                background: colors.accent,
              })}
            />
          </div>
        </div>

        <div
          css={{
            overflow: "hidden",
            pointerEvents: "none",
            width: `calc(100% + ${HANDLE_SIZE}px)`,
            height: "100%",
            transformOrigin: "50% 50%",
            transform: `translate(-${HANDLE_SIZE / 2}px, 0)`,
          }}
        >
          <a.div
            style={{ transform: moveSpring.handleTransform }}
            css={{
              width: `calc(100% - ${HANDLE_SIZE}px)`,
              height: "100%",
              transformOrigin: "50% 50%",
            }}
          >
            <div
              css={({ colors }) => ({
                overflow: "hidden",
                position: "absolute",
                inset: `calc(50% - ${HANDLE_SIZE / 2}px) 0 0`,
                width: `${HANDLE_SIZE}px`,
                height: `${HANDLE_SIZE}px`,
                borderRadius: "50%",
                background: colors.layer2,
              })}
            >
              <Moire
                width={HANDLE_SIZE}
                height={HANDLE_SIZE}
                scale={0.8}
                css={{
                  position: "absolute",
                  inset: "0",
                }}
              />
            </div>
            <div
              css={({ colors }) => ({
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: HANDLE_OUTLINE,
                width: HANDLE_SIZE - HANDLE_OUTLINE * 2,
                height: HANDLE_SIZE - HANDLE_OUTLINE * 2,
                borderRadius: "50%",
                background: colors.accent,
                cursor: "pointer",
                pointerEvents: "auto",
              })}
            />
          </a.div>
        </div>
      </div>

      {labels && (
        <div
          css={({ colors, fonts }) => ({
            position: "absolute",
            inset: "auto 0 0",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            fontFamily: fonts.sans,
            color: colors.contentDimmed,
            "div": {
              cursor: onLabelClick ? "pointer" : "default",
            },
          })}
        >
          <div onClick={onLabelClick && (() => onLabelClick("start"))}>
            {labels[0]}
          </div>
          <div onClick={onLabelClick && (() => onLabelClick("end"))}>
            {labels[1]}
          </div>
        </div>
      )}
    </div>
  )
}

function isTouchEvent(
  event: ReactTouchEvent | ReactMouseEvent | TouchEvent | MouseEvent,
): event is TouchEvent | ReactTouchEvent {
  return "touches" in event
}
