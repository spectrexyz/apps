import type { FocusEvent } from "react"

import {
  createElement,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { fromDecimals, toDecimals, uid } from "./utils"

export function useKey(
  key: string,
  callback: () => void,
  condition = true,
) {
  useEffect(() => {
    if (!condition) return

    const keydown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    document.addEventListener("keydown", keydown)
    return () => {
      document.removeEventListener("keydown", keydown)
    }
  }, [callback, condition, key])
}

export function useFocus<T = HTMLElement>() {
  const [focused, setFocused] = useState(false)
  return {
    bindEvents: {
      onFocus: (event: FocusEvent<T, Element>) => {
        if (event.target === event.currentTarget) {
          setFocused(true)
        }
      },
      onBlur: (event: FocusEvent<T, Element>) => {
        if (event.target === event.currentTarget) {
          setFocused(false)
        }
      },
    },
    focused,
  }
}

export function useUid(prefix = "uid"): string {
  return useRef(uid(prefix)).current
}

export function FlatTree({
  children,
  items,
}: {
  children: ReactNode
  items: FC<{ children: ReactNode }>[]
}): JSX.Element {
  return [...items]
    .reverse()
    .reduce(
      (children, component) => createElement(component, null, children),
      children,
    ) as JSX.Element
}

export function useEvery(cb: () => void, delay: number) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      cb()
      timer = setTimeout(update, delay)
    }
    update()
    return () => clearTimeout(timer)
  }, [cb, delay])
}

export function useAmountInput(
  initialValue: bigint,
  save: (value: bigint) => void,
  decimals = 18,
) {
  const [inputValue, setInputValue] = useState(
    fromDecimals(initialValue, decimals),
  )

  useEffect(() => {
    try {
      if (BigInt(toDecimals(inputValue, decimals)) !== initialValue) {
        setInputValue(fromDecimals(initialValue, decimals))
      }
    } catch (_) {
      // todo
    }
  }, [decimals, initialValue, inputValue])

  const _save = useRef(save)

  const onChange = useCallback(
    (value: string) => {
      const re = new RegExp(`^[0-9]*(?:\\.[0-9]{0,${decimals}})?$`)
      if (re.test(value)) {
        setInputValue(value)
        _save.current(toDecimals(value, decimals))
      }
    },
    [decimals],
  )

  return { value: inputValue, onChange }
}
