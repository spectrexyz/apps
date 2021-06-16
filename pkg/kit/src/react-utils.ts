import { useEffect, useRef } from "react"
import { uid } from "./utils"
import { KEY_ESC } from "./keys"

export function useEsc(callback: () => void, condition: boolean) {
  const _cb = useRef(callback)
  useEffect(() => {
    if (!condition) {
      return
    }

    const keydown = (event: KeyboardEvent) => {
      if (event.keyCode === KEY_ESC) {
        _cb.current()
      }
    }

    document.addEventListener("keydown", keydown)
    return () => document.removeEventListener("keydown", keydown)
  }, [condition])
}

export function useUid(prefix = "uid"): string {
  return useRef(uid(prefix)).current
}
