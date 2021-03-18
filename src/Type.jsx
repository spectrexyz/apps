import React, { useEffect, useState, useRef } from "react"
import { css } from "@emotion/react"

function Type({
  text,
  cursor = "_",
  interval = 1000 / 30,
  keepCursor = false,
}) {
  const elRef = useRef()

  useEffect(() => {
    let rafId
    let lastUpdate = Date.now()
    let typed = 0
    let typingInterval = interval

    const loop = () => {
      if (typed === text.length) {
        if (!keepCursor) {
          elRef.current.innerHTML = text
        }
        return
      }

      rafId = requestAnimationFrame(loop)

      const now = Date.now()
      const elapsed = now - lastUpdate
      if (elapsed < typingInterval) return
      lastUpdate = now
      typingInterval = interval + Math.random() * interval

      elRef.current.innerHTML = text.slice(0, ++typed) + cursor
    }
    loop()

    return () => cancelAnimationFrame(rafId)
  }, [text])

  return <span ref={elRef}>{cursor}</span>
}

export default Type
