import type { ReactNode } from "react"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { noop } from "../utils"

// Implements a behavior similar to :focus-visible for browsers that are not
// supporting it yet.
//
// It follows the Chrome implementation, checking for a pointer device rather
// than a keyboard event.
//
// Resources:
//  - https://caniuse.com/#search=%3Afocus-visible
//  - https://github.com/WICG/focus-visible/issues/88#issuecomment-363227219
//  - https://chromium-review.googlesource.com/c/chromium/src/+/897002<Paste>

type FocusVisibleContext = {
  focusVisible: boolean
  onFocus: () => void
}

const FocusVisibleContext = createContext<FocusVisibleContext>({
  focusVisible: false,
  onFocus: noop,
})

type FocusVisibleProps = {
  children: ReactNode
}

export function FocusVisible({ children }: FocusVisibleProps) {
  const element = useRef<HTMLSpanElement>(null)
  const pointerActive = useRef(true)
  const [focusVisible, setFocusVisible] = useState(false)
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onPointerEvent = () => {
      pointerActive.current = true

      timer = setTimeout(() => {
        // It doesn’t seem to be specified in HTML5, but pointer-related events
        // happen before the focus-related events on every modern browser. It
        // means that between the moment where onPointerEvent gets called and
        // the this setTimeout() callback gets executed, the onFocus() function
        // (see below) might be executed and see pointerActive.current being
        // set to true.
        pointerActive.current = false
      }, 0)

      setFocusVisible(false)
    }

    setHasRendered(true)

    const document = element.current?.ownerDocument

    if (document) {
      document.addEventListener("mousedown", onPointerEvent)
      document.addEventListener("mouseup", onPointerEvent)
      document.addEventListener("touchstart", onPointerEvent)
      document.addEventListener("touchend", onPointerEvent)
    }

    return () => {
      clearTimeout(timer)

      if (document) {
        document.removeEventListener("mousedown", onPointerEvent)
        document.removeEventListener("mouseup", onPointerEvent)
        document.removeEventListener("touchstart", onPointerEvent)
        document.removeEventListener("touchend", onPointerEvent)
      }
    }
  }, [])

  const onFocus = useCallback(() => {
    setFocusVisible(!pointerActive.current)
  }, [])

  return (
    <FocusVisibleContext.Provider value={{ focusVisible, onFocus }}>
      {children}
      {!hasRendered && <span ref={element} />}
    </FocusVisibleContext.Provider>
  )
}

export function useFocusVisible(): FocusVisibleContext {
  return useContext(FocusVisibleContext)
}
