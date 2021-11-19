import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import { a, useTransition } from "react-spring"
import { Moire } from "../Moire"
import { gu, springs } from "../styles"
import { useFocusVisible } from "../FocusVisible"
import { useRadioGroup } from "./RadioGroup"

type RadioProps = {
  checked?: boolean
  focusOnCheck?: boolean
  id?: string | number
  onChange?: (checked: boolean) => void
  tabIndex?: number
}

export function Radio({
  checked: checkedProp,
  focusOnCheck,
  id,
  onChange,
  tabIndex,
}: RadioProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false)
  const input = useRef<null | HTMLInputElement>(null)
  const focusVisible = useFocusVisible()
  const radioGroup = useRadioGroup(id)
  const inRadioGroup = radioGroup !== null
  const checked = checkedProp ?? (inRadioGroup && id === radioGroup.selected)

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

  if (focusOnCheck === undefined) {
    focusOnCheck = inRadioGroup
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

  useEffect(() => {
    if (checked && focusOnCheck) {
      input.current?.focus()
    }
  }, [checked, focusOnCheck])

  const checkTransition = useTransition(checked, {
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

  // Note: we disable some rules here, because ESLint doesn’t seem to see that
  // while the click event is on the div, the keyboard events & implicit role
  // are on the input itself.
  /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
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
        ref={input}
        checked={checked}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onKeyDown={radioGroup?.onKeyDown}
        tabIndex={
          tabIndex ??
          (radioGroup &&
          (radioGroup.focusableId === undefined ||
            id === radioGroup.focusableId)
            ? 0
            : -1)
        }
        type="radio"
        css={({ colors }) => css`
          opacity: 0;
          pointer-events: none;
          &:active div:after {
            content: "";
            position: absolute;
            inset: 1gu;
            background: ${colors.accent};
            border-radius: 50%;
          }
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
        <Moire width={2.25 * gu} height={2.25 * gu} scale={0.8} speed={0.75} />
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
  /* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
}
