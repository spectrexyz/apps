import type { Ref, ReactNode } from "react"

import { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { useFocusVisible } from "../FocusVisible"
import { useRadioGroup } from "./RadioGroup"
import { Radio } from "./Radio"

type RadioBoxProps = {
  checked?: boolean
  error?: string
  id?: string | number
  label: ReactNode
  onChange?: (checked: boolean) => void
  secondary?: ReactNode
}

export function RadioBox({
  checked: checkedProp,
  error,
  id,
  label,
  onChange,
  secondary,
}: RadioBoxProps): JSX.Element {
  const button = useRef<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>(
    null
  )
  const radioGroup = useRadioGroup(id)
  const inRadioGroup = radioGroup !== null
  const checked = checkedProp ?? (inRadioGroup && id === radioGroup?.selected)

  if (!onChange) {
    if (!inRadioGroup || id === undefined) {
      throw new Error(
        "RadioBox requires an onChange handler or to be in a RadioGroup with an id."
      )
    }
    onChange = (checked) => {
      if (checked) {
        radioGroup?.select(id)
      }
    }
  }

  const handleChange = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  const handleClick = () => {
    // onChange is always set (see above),
    // this is only for the TS checker.
    if (onChange) {
      onChange(!checked)
    }
  }

  const focusReady = useRef(false)
  useEffect(() => {
    if (checked && inRadioGroup && focusReady.current) {
      button.current?.focus()
    }
    // Prevents to focus on mount
    focusReady.current = true
  }, [checked, inRadioGroup])
  const focusVisible = useFocusVisible()

  return (
    <div
      role="radio"
      aria-checked={true}
      ref={button}
      onClick={handleClick}
      onKeyDown={radioGroup?.onKeyDown}
      tabIndex={
        radioGroup &&
        (radioGroup.focusableId === undefined || id === radioGroup.focusableId)
          ? 0
          : -1
      }
      css={({ colors }) => css`
        position: relative;
        width: 100%;
        padding: 2gu;
        background: ${colors.layer2};
        cursor: pointer;
        &:focus {
          outline: ${focusVisible ? "2px" : "0"} solid ${colors.focus};
          & > div:after {
            ${focusVisible
              ? css`
                  outline-color: ${colors.focus};
                `
              : ""}
          }
        }
      `}
    >
      <div
        css={({ colors }) => css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1gu;
          width: 100%;
          &:after {
            content: "";
            position: absolute;
            inset: 1px;
            outline: 2px solid
              ${error
                ? colors.warning
                : checked
                ? colors.accent
                : "transparent"};
            pointer-events: none;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            width: 100%;
          `}
        >
          <Radio
            checked={checked}
            focusOnCheck={false}
            onChange={handleChange}
          />
          <span
            css={({ fonts }) => css`
              margin-left: 1.5gu;
              font-family: ${fonts.families.mono};
              font-size: 18px;
              text-transform: uppercase;
            `}
          >
            {label}
          </span>
        </div>
        <div
          css={({ colors }) => css`
            width: 100%;
            font-size: 12px;
            text-align: left;
            color: ${colors.contentDimmed};
          `}
        >
          {secondary}
        </div>
      </div>
    </div>
  )
}
