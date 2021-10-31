import type { ReactNode } from "react"

import React, { createContext, useCallback, useContext, useState } from "react"
import { noop } from "../utils"

const RadioGroupContext = createContext<null | {
  addRadio: (id: RadioId) => void
  focusableId: RadioId
  select: (id: RadioId) => void
  removeRadio: (id: RadioId) => void
  selectNext: () => void
  selectPrev: () => void
  selected: RadioId
}>(null)

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

export function useRadioGroup() {
  return useContext(RadioGroupContext)
}
