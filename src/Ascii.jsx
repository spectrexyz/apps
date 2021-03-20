import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { GU, colors, fonts } from "./styles"
import { raf, randChar } from "./utils"

const CHARS = "0123456789ABCDEFGHIJKLMONOPRSTUVWXYZ-_)()><*$%`"

function asciiStep(currentText, text) {
  return (currentText = [...currentText]
    .map((char, index) => (char === text[index] ? char : randChar(CHARS)))
    .join(""))
}

function Ascii({ text = "", updateInterval = 1000 / 60 }) {
  const elRef = useRef()

  useEffect(() => {
    let textCurrent = " ".repeat(text.length)

    const stop = raf(() => {
      textCurrent = asciiStep(textCurrent, text)

      if (elRef.current) {
        elRef.current.textContent = textCurrent
      }

      if (text === textCurrent) {
        stop()
      }
    }, updateInterval)

    return stop
  }, [updateInterval])

  return (
    <span
      ref={elRef}
      css={css`
        margin: 0;
        padding: 0 calc(1em / 3);
        background: ${colors.green};
        color: ${colors.black};
        font-weight: ${colors.bold};
      `}
    >
      {" "}
    </span>
  )
}

export default Ascii
