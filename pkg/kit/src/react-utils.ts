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
  condition: boolean = true,
) {
  const _cb = useRef(callback)
  useEffect(() => {
    if (!condition) {
      return
    }
    const keydown = (event: KeyboardEvent) => {
      if (event.key === key) {
        _cb.current()
      }
    }
    document.addEventListener("keydown", keydown)
    return () => document.removeEventListener("keydown", keydown)
  }, [condition, key])
}

export function useEsc(callback: () => void, condition: boolean = true): void {
  useKey("Escape", callback, condition)
}

export function useFocus() {
  const [focused, setFocused] = useState(false)
  return {
    bindEvents: {
      onFocus: (event: FocusEvent) => {
        if (event.target === event.currentTarget) {
          setFocused(true)
        }
      },
      onBlur: (event: FocusEvent) => {
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
  decimals: number = 18,
) {
  const [inputValue, setInputValue] = useState(
    fromDecimals(initialValue, decimals),
  )

  useEffect(() => {
    try {
      if (BigInt(toDecimals(inputValue, decimals)) !== initialValue) {
        setInputValue(fromDecimals(initialValue, decimals))
      }
    } catch (_) {}
  }, [decimals, initialValue, inputValue])

  const _save = useRef(save)

  const onChange = useCallback(
    (value) => {
      const re = new RegExp(`^[0-9]*(?:\.[0-9]{0,${decimals}})?$`)
      if (re.test(value)) {
        setInputValue(value)
        _save.current(toDecimals(value, decimals))
      }
    },
    [decimals],
  )

  return { value: inputValue, onChange }
}
