import type { ReactNode } from "react"

import { useEffect, useRef } from "react"
import { useFocusVisible } from "../FocusVisible"
import { Radio } from "./Radio"
import { useRadioGroup } from "./RadioGroup"

type RadioBoxProps = {
  checked?: boolean
  error?: string | boolean
  id?: string | number
  label: ReactNode
  mode?: "normal" | "alt"
  onChange?: (checked: boolean) => void
  secondary?: ReactNode
}

export function RadioBox({
  checked: checkedProp,
  error,
  id,
  label,
  mode = "normal",
  onChange,
  secondary,
}: RadioBoxProps): JSX.Element {
  const button = useRef<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>(
    null,
  )
  const radioGroup = useRadioGroup(id)
  const inRadioGroup = radioGroup !== null
  const checked = checkedProp ?? (inRadioGroup && id === radioGroup?.selected)

  if (!onChange) {
    if (!inRadioGroup || id === undefined) {
      throw new Error(
        "RadioBox requires an onChange handler or to be in a RadioGroup with an id.",
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
      tabIndex={radioGroup
          && (radioGroup.focusableId === undefined
            || id === radioGroup.focusableId)
        ? 0
        : -1}
      css={({ colors }) => ({
        position: "relative",
        width: "100%",
        padding: "2gu",
        background: mode === "alt" && !checked
          ? colors.background
          : colors.layer2,
        cursor: "pointer",
        "&:focus": {
          outline: `${focusVisible ? "2px" : "0"} solid ${colors.focus}`,
          "& > div:after": focusVisible ? { outlineColor: colors.focus } : {},
        },
      })}
    >
      <div
        css={({ colors }) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1gu",
          width: "100%",
          "&:after": {
            content: "\"\"",
            position: "absolute",
            inset: "1px",
            outline: `2px solid ${
              error
                ? colors.warning
                : checked
                ? (mode === "alt" ? colors.accent2 : colors.accent)
                : "transparent"
            }`,
            pointerEvents: "none",
          },
        })}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Radio
            checked={checked}
            focusOnCheck={false}
            mode={mode}
            onChange={handleChange}
          />
          <span
            css={({ colors, fonts }) => ({
              marginLeft: "1.5gu",
              fontFamily: fonts.mono,
              fontSize: "18px",
              textTransform: "uppercase",
              color: mode === "alt" ? colors.accent2 : colors.content,
            })}
          >
            {label}
          </span>
        </div>
        <div
          css={({ colors }) => ({
            width: "100%",
            fontSize: mode === "alt" ? "14px" : "12px",
            textAlign: "left",
            color: mode === "alt" ? colors.accent2 : colors.contentDimmed,
          })}
        >
          {secondary}
        </div>
      </div>
    </div>
  )
}
