import type { ComponentType, ReactNode } from "react"

import { createElement, useEffect, useRef } from "react"
import { uid } from "./utils"
import { KEY_ESC } from "./keys"

export function useEsc(callback: () => void, condition: boolean): void {
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

type FlatTreeItem = ComponentType | [ComponentType, Record<string, unknown>]

export function FlatTree({
  children,
  items,
}: {
  children: ReactNode
  items: FlatTreeItem[]
}): JSX.Element {
  return [...items].reverse().reduce((children, component) => {
    return Array.isArray(component)
      ? createElement(component[0], component[1], children)
      : createElement(component, null, children)
  }, children) as JSX.Element
}
