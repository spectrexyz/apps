import type { KeyboardEvent, ReactNode } from "react"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { noop } from "../utils"

type RadioGroupContext = {
  addRadio: (id: RadioId) => void
  focusableId: RadioId
  select: (id: RadioId) => void
  removeRadio: (id: RadioId) => void
  selectNext: () => void
  selectPrev: () => void
  selected: RadioId
}

const RadioGroupContext = createContext<RadioGroupContext>(
  {} as RadioGroupContext,
)

type RadioId = string | number

type RadioGroupProps = {
  children: ReactNode
  selected: RadioId
  onChange: (id: RadioId) => void
}

function findSiblingId(radios: Set<RadioId>, selected: RadioId, diff: -1 | 1) {
  const _radios = [...radios]
  const selectedIndex = _radios.indexOf(selected)
  const newSelectedIndex = selectedIndex + diff

  // no radios
  if (_radios.length === 0) {
    return null
  }

  // previous checkbox when the first one is selected: cycle to the last one
  if (newSelectedIndex === -1) {
    return _radios[_radios.length - 1]
  }

  // next checkbox when the last one is selected: cycle to the first one
  if (newSelectedIndex === _radios.length) {
    return _radios[0]
  }

  // return the found checkbox
  if (selectedIndex > -1 && _radios[newSelectedIndex]) {
    return _radios[newSelectedIndex]
  }

  // return the first checkbox found by default
  return _radios[0] === undefined ? null : _radios[0]
}

export function RadioGroup({
  children,
  selected,
  onChange = noop,
}: RadioGroupProps) {
  const [radios, setRadios] = useState<Set<RadioId>>(new Set())

  const addRadio = useCallback((id: RadioId) => {
    setRadios((radios) => {
      const _radios = new Set(radios)
      _radios.add(id)
      return _radios
    })
  }, [])

  const removeRadio = useCallback((id: RadioId) => {
    setRadios((radios) => {
      const _radios = new Set(radios)
      _radios.delete(id)
      return _radios
    })
  }, [])

  const selectPrev = () => {
    const id = findSiblingId(radios, selected, -1)
    if (id !== null) {
      onChange(id)
    }
  }

  const selectNext = () => {
    const id = findSiblingId(radios, selected, 1)
    if (id !== null) {
      onChange(id)
    }
  }

  const focusableId = radios.has(selected) ? selected : [...radios][0]

  return (
    <RadioGroupContext.Provider
      value={{
        addRadio,
        focusableId,
        select: onChange,
        removeRadio,
        selectNext,
        selectPrev,
        selected,
      }}
    >
      <div role="radiogroup">{children}</div>
    </RadioGroupContext.Provider>
  )
}

const KEYS_PREV = ["ArrowUp", "ArrowLeft"]
const KEYS_NEXT = ["ArrowDown", "ArrowRight"]

type RadioGroupValue = RadioGroupContext & {
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

export function useRadioGroup(
  id: string | number | undefined,
): RadioGroupValue | null {
  const radioGroup = useContext(RadioGroupContext) as RadioGroupValue

  const { addRadio, removeRadio } = radioGroup ?? {}
  useEffect(() => {
    if (id === undefined || !addRadio || !removeRadio) {
      return
    }
    addRadio(id)
    return () => removeRadio(id)
  }, [id, addRadio, removeRadio])

  if (!radioGroup) {
    return null
  }

  // Handles key events and trigger changes in the RadioGroup as needed.
  radioGroup.onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.metaKey || event.ctrlKey) {
      return
    }

    if (KEYS_PREV.includes(event.key)) {
      radioGroup.selectPrev()
      event.preventDefault()
    }

    if (KEYS_NEXT.includes(event.key)) {
      radioGroup.selectNext()
      event.preventDefault()
    }
  }

  return radioGroup
}
