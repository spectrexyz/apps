import {
  FC,
  ReactNode,
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { fromDecimals, toDecimals, uid } from "./utils"

export function useEsc(callback: () => void, condition: boolean): void {
  const _cb = useRef(callback)
  useEffect(() => {
    if (!condition) {
      return
    }

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
      children
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
  decimals: number = 18
) {
  const [inputValue, setInputValue] = useState(
    fromDecimals(initialValue, decimals)
  )

  const _save = useRef(save)

  const onChange = useCallback((value) => {
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value)
      _save.current(toDecimals(value, decimals))
    }
  }, [])

  return { value: inputValue, onChange }
}
