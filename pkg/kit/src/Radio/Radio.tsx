/** @jsx jsx */
import type { KeyboardEvent } from "react"

import { useEffect, useRef, useState } from "react"
import { css, jsx } from "@emotion/react"
import { a, useTransition } from "react-spring"
import { Moire } from "../Moire"
import { gu, springs } from "../styles"
import { useFocusVisible } from "../FocusVisible"
import { useRadioGroup } from "./RadioGroup"

const KEYS_PREV = ["ArrowUp", "ArrowLeft"]
const KEYS_NEXT = ["ArrowDown", "ArrowRight"]

type RadioProps = {
  checked?: boolean
  id?: string | number
  onChange?: (checked: boolean) => void
  tabIndex?: number
}

export function Radio({
  checked,
  id,
  onChange,
  tabIndex,
}: RadioProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false)
  const element = useRef<null | HTMLInputElement>(null)
  const radioGroup = useRadioGroup()
  const { focusVisible, onFocus } = useFocusVisible()
  const inRadioGroup = radioGroup !== null

  if (!onChange) {
    if (!inRadioGroup || id === undefined) {
      throw new Error(
        "Radio requires an onChange handler or to be in a RadioGroup with an id."
      )
    }
    onChange = (checked) => {
      if (checked) radioGroup.select(id)
    }
  }

  const handleChange = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  const handleClick = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inRadioGroup) return

    if (KEYS_PREV.includes(event.key)) {
      radioGroup.selectPrev()
      event.preventDefault()
    }

    if (KEYS_NEXT.includes(event.key)) {
      radioGroup.selectNext()
      event.preventDefault()
    }
  }

  const { addRadio, removeRadio } = radioGroup ?? {}
  useEffect(() => {
    if (id === undefined || !addRadio || !removeRadio) {
      return
    }
    addRadio(id)
    return () => removeRadio(id)
  }, [id, addRadio, removeRadio])

  const _checked = checked ?? (inRadioGroup && id === radioGroup?.selected)

  useEffect(() => {
    if (_checked && inRadioGroup) {
      element.current?.focus()
    }
  }, [_checked, inRadioGroup])

  const checkTransition = useTransition(_checked, {
    config: springs.swift,
    from: {
      opacity: 0,
      transform: "scale(0.5)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "scale(0.5)",
    },
  })

  return (
    <div
      onClick={handleClick}
      css={css`
        position: relative;
        display: inline-block;
        width: 2.25gu;
        height: 2.25gu;
      `}
    >
      <input
        ref={element}
        checked={_checked}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={() => {
          onFocus()
          setIsFocused(true)
        }}
        onKeyDown={handleKeyDown}
        tabIndex={
          tabIndex ??
          (radioGroup &&
          (radioGroup.focusableId === undefined ||
            id === radioGroup.focusableId)
            ? 0
            : -1)
        }
        type="radio"
        css={css`
          opacity: 0;
          pointer-events: none;
        `}
      />
      <div
        css={({ colors }) => css`
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: ${colors.background};
          border-radius: 50%;
          outline: ${isFocused && focusVisible ? "2px" : "0"} solid
            ${colors.focus};
          outline-offset: 0;
        `}
      >
        <Moire width={2.25 * gu} height={2.25 * gu} scale={0.8} speed={0.25} />
      </div>
      {checkTransition(
        (style, checked) =>
          checked && (
            <a.div
              style={style}
              css={css`
                position: absolute;
                inset: 50% auto auto 50%;
              `}
            >
              <div
                css={({ colors }) => css`
                  position: absolute;
                  inset: 50% auto auto 50%;
                  transform: translate(-50%, -50%);
                  width: 1.25gu;
                  height: 1.25gu;
                  background: ${colors.accent};
                  border-radius: 50%;
                `}
              />
            </a.div>
          )
      )}
    </div>
  )
}
