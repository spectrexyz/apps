import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { GU, colors, fonts } from "./styles"
import { randChar, raf } from "./utils"

const CHARS_SHORT = "0123456789abcdefghijklmnopqrstuvwxyz"
const CHARS_LONG =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const PX_RATIO = window.devicePixelRatio

function Square({
  word = "spectre",
  placeholder = "`",
  wordPosition = 0.53, // 0 to 1
  size = 18.5 * GU,
  lineHeight = 0.75 * GU,
  updateInterval = 1000 / 60, // ms
}) {
  const canvasRef = useRef()

  useEffect(() => {
    const ctx = initContext(canvasRef.current, size)

    const { width: charWidth } = ctx.measureText("_")
    const columns = Math.floor(size / charWidth)
    const lines = Math.floor(size / lineHeight)
    const wordIndex = Math.floor(columns * lines * wordPosition)

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
      if (gridJson === finalGridJson) {
        stop()
        return
      }

      grid = updateGrid(grid, finalGrid, placeholder, word, wordIndex)
      gridJson = JSON.stringify(grid)

      if (canvasRef.current) {
        clearContext(ctx, size)
        drawGrid(ctx, splitGrid(grid, columns), lineHeight)
      }
    }, updateInterval)

    return stop
  }, [word, placeholder, wordPosition, size, lineHeight, updateInterval])

  return (
    <canvas
      ref={canvasRef}
      width={size * PX_RATIO}
      height={size * PX_RATIO}
      css={css`
        display: block;
        width: ${size}px;
        height: ${size}px;
        opacity: 0.4;
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
  ctx.fillStyle = colors.challenger
  ctx.fillRect(0, 0, size, size)
}

function initContext(canvas, size) {
  const ctx = canvas.getContext("2d", { alpha: false })

  ctx.font = `${fonts.sizes.small} ${fonts.family}`

  // resets the scale
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(PX_RATIO, PX_RATIO)

  clearContext(ctx, size)

  return ctx
}

function drawGrid(ctx, grid, lineHeight) {
  ctx.fillStyle = colors.cyan
  grid.forEach((row, index) => {
    ctx.fillText(row, 0, (index + 1) * lineHeight)
  })
}

export default Square