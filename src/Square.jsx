import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { GU, colors, fonts } from "./styles"
import { randChar, raf } from "./utils"

const CHARS_SHORT = "0123456789abcdefghijklmnopqrstuvwxyz"
const CHARS_LONG =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

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

// convert a grid to string + add line breaks
function gridToHtml(grid, columns) {
  return grid.reduce((html, char, index) => {
    return html + (index > 0 && index % columns === 0 ? "\n" : "") + char
  }, "")
}

function Square({
  word = "spectre",
  placeholder = "`",
  wordPosition = 0.5, // 0 to 1
  width = 18.5 * GU,
  height = 18.5 * GU,
  updateInterval = 1000 / 60, // ms
}) {
  const gridRef = useRef()
  const measureRef = useRef()

  useEffect(() => {
    const {
      width: charWidth,
      height: charHeight,
    } = measureRef.current.getBoundingClientRect()

    const columns = Math.ceil(width / charWidth)
    const lines = Math.ceil(height / charHeight)
    const wordIndex = Math.ceil(columns * lines * wordPosition)
    const finalGrid = createFinalGrid(
      lines * columns,
      placeholder,
      word,
      wordIndex
    )

    let gridHtml = ""
    let grid = createEmptyGrid(lines * columns)
    const finalGridHtml = gridToHtml(finalGrid, columns)

    const stop = raf(() => {
      if (gridHtml === finalGridHtml) {
        stop()
        return
      }

      grid = updateGrid(grid, finalGrid, placeholder, word, wordIndex)
      gridHtml = gridToHtml(grid, columns)
      if (gridRef.current) {
        gridRef.current.innerHTML = gridHtml
      }
    }, updateInterval)

    return stop
  }, [word, placeholder, wordPosition, width, height, updateInterval])

  return (
    <pre
      css={css`
        width: ${width}px;
        height: ${height}px;
        font-size: 12px;
        line-height: 12px;
        user-select: none;
        color: ${colors.cyan};
        opacity: 0.4;
      `}
    >
      <span
        ref={measureRef}
        css={css`
          position: absolute;
          opacity: 0;
        `}
      >
        m
      </span>
      <span ref={gridRef} />
    </pre>
  )
}

export default Square
