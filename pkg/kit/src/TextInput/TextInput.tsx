import type {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react"

import { useCallback } from "react"
import { css } from "@emotion/react"
import { noop } from "../utils"
import { useFieldset } from "../Fieldset"

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

// All the TextInput props, except `multiline` and the props
// inherited from HTMLInputElement and HTMLTextAreaElement.
type TextInputBaseProps = {
  error?: string
  id?: string
  onChange?: (value: string, event: ChangeEvent) => void
  value?: string
}

type TextInputProps = (InputProps | TextAreaProps) &
  TextInputBaseProps & { multiline?: boolean }

export function TextInput(
  props: InputProps & TextInputBaseProps & { multiline: false }
): JSX.Element

export function TextInput(
  props: TextAreaProps & TextInputBaseProps & { multiline: true }
): JSX.Element

export function TextInput({
  error,
  id,
  multiline = false,
  onChange = noop,
  value = "",
  ...props
}: TextInputProps): JSX.Element {
  const fieldset = useFieldset()

  const sharedProps = {
    id: id ?? fieldset.labelFor,
    onChange: useCallback(
      (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event?.currentTarget?.value
        if (typeof value === "string") {
          onChange(value, event)
        }
      },
      [onChange]
    ),
    value: value,
  }

  return multiline ? (
    <textarea
      {...sharedProps}
      {...(props as TextAreaProps)}
      css={({ colors }) => css`
        width: 100%;
        padding: 0;
        color: ${colors.accent};
        background: transparent;
        resize: vertical;
        border: 0;
        &:focus {
          outline: 2px solid ${colors.focus};
          outline-offset: 3px;
        }
      `}
    />
  ) : (
    <input
      {...sharedProps}
      {...(props as InputProps)}
      css={({ colors }) => css`
        width: 100%;
        height: 3.5gu;
        padding: 0;
        background: transparent;
        border: 0;
        color: ${colors.accent};
        outline-offset: 3px;
        outline: ${error ? "2px" : "0"} solid ${colors.warning};
        &:focus {
          outline: 2px solid ${error ? colors.negative : colors.focus};
        }
      `}
    />
  )
}
