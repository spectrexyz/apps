import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import { raf, randomArbitrary } from "./utils"

function Type({
  text,
  cursor = "_",
  keepCursor = false,

  // use a range for the typing interval, to create a “natural” feel
  interval = () => randomArbitrary(1000 / 10, 1000 / 30),
}) {
  const elRef = useRef()

  useEffect(() => {
    let typed = 0

    const stop = raf(() => {
      if (typed !== text.length) {
        elRef.current.innerHTML = text.slice(0, ++typed) + cursor

        // keep going
        return
      }

      stop()

      if (!keepCursor) {
        elRef.current.innerHTML = text
      }
    }, interval)

    return stop
  }, [text])

  return <span ref={elRef}>{cursor}</span>
}

export default Type
