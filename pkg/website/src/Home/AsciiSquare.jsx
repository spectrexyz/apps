import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { gu, theme, fonts } from "kit-legacy"
import { randChar, raf } from "../utils"

const CHARS_SHORT = "0123456789abcdefghijklmnopqrstuvwxyz"
const CHARS_LONG =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const PX_RATIO = window.devicePixelRatio

export function AsciiSquare({
  word = "",
  placeholder = "`",
  wordPosition = 0.53, // 0 to 1
  size = 18.5 * gu,
  lineHeight = 2 * gu,
  updateInterval = 1000 / 60, // ms
  animate = true,
  fontSize = 18,
}) {
  const canvasRef = useRef()

  const _firstFrameRendered = useRef(false)
  const _animate = useRef(animate)
  useEffect(() => {
    _animate.current = animate
  }, [animate])

  useEffect(() => {
    const ctx = initContext(canvasRef.current, size, fontSize)

    const { width: charWidth } = ctx.measureText("_")
    const columns = Math.floor(size / charWidth)
    const lines = Math.floor(size / lineHeight)
    const wordIndex = Math.floor(columns * lines * wordPosition)

    const xShift = (size - charWidth * columns) / 2
    const yShift = (size - lineHeight * lines) / 2

    const finalGrid = createFinalGrid(
      lines * columns,
      placeholder,
      word,
      wordIndex
    )

    let grid = createEmptyGrid(lines * columns)
    let gridJson = JSON.stringify(grid)
    const finalGridJson = JSON.stringify(finalGrid)

    const stop = raf(() => {
      if (!_animate.current && _firstFrameRendered.current) {
        return
      }

      if (gridJson === finalGridJson) {
        stop()
        return
      }

      grid = updateGrid(grid, finalGrid, placeholder, word, wordIndex)
      gridJson = JSON.stringify(grid)

      if (canvasRef.current) {
        clearContext(ctx, size)
        drawGrid(ctx, splitGrid(grid, columns), lineHeight, xShift, yShift)
      }

      _firstFrameRendered.current = true
    }, updateInterval)

    return stop
  }, [
    fontSize,
    lineHeight,
    placeholder,
    size,
    updateInterval,
    word,
    wordPosition,
  ])

  return (
    <canvas
      ref={canvasRef}
      width={size * PX_RATIO}
      height={size * PX_RATIO}
      css={css`
        display: block;
        width: ${size}px;
        height: ${size}px;
        opacity: 1;
      `}
    />
  )
}

function createEmptyGrid(size) {
  return [...Array(size)].fill(" ")
}

// create the final grid
function createFinalGrid(size, placeholder, word, wordIndex) {
  return [...Array(size)].map(
    (_, index) => word[index - wordIndex] || placeholder
  )
}

// update the grid with random chars
function updateGrid(grid, finalGrid, placeholder, word, wordIndex) {
  return grid.map((char, index) => {
    if (finalGrid[index] === char) return char

    // the word is using the longer set of chars
    const isWord = index >= wordIndex && index < wordIndex + word.length
    return randChar(isWord ? CHARS_LONG + word : CHARS_SHORT + placeholder)
  })
}

// split a grid into rows
function splitGrid(grid, columns) {
  return grid.reduce((rows, char, index) => {
    if (index % columns === 0) {
      rows.push("")
    }
    rows[rows.length - 1] += char
    return rows
  }, [])
}

function clearContext(ctx, size) {
  ctx.fillStyle = theme.contrast
  ctx.fillRect(0, 0, size, size)
}

function initContext(canvas, size, fontSize) {
  const ctx = canvas.getContext("2d", { alpha: false })

  ctx.font = `${fontSize}px ${fonts.families.mono}`

  // resets the scale
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(PX_RATIO, PX_RATIO)

  clearContext(ctx, size)

  return ctx
}

function drawGrid(ctx, grid, lineHeight, xShift, yShift) {
  ctx.fillStyle = theme.primary
  grid.forEach((row, index) => {
    ctx.fillText(row, xShift, (index + 1) * lineHeight + yShift)
  })
}
