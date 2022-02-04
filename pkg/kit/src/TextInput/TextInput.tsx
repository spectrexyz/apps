import { css } from "@emotion/react"
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react"
import { useFieldset } from "../Fieldset"
import { noop } from "../utils"

type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "id" | "onChange" | "value"
>

type TextAreaProps = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  "id" | "onChange" | "value"
>

// All the TextInput props, except `multiline` and the props
// inherited from HTMLInputElement and HTMLTextAreaElement.
type TextInputBaseProps = {
  autofocus?: boolean
  error?: string | boolean
  id?: string
  onChange?: (value: string, event: ChangeEvent) => void
  value?: string
}

type TextInputProps =
  & (InputProps | TextAreaProps)
  & TextInputBaseProps
  & { multiline?: boolean }

export function TextInput(
  props: InputProps & TextInputBaseProps & { multiline?: false },
): JSX.Element

export function TextInput(
  props: TextAreaProps & TextInputBaseProps & { multiline: true },
): JSX.Element

export function TextInput({
  autofocus = false,
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
      [onChange],
    ),
    value: value,
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autofocus) {
      const el = inputRef.current || textareaRef.current
      el?.focus()
    }
  }, [autofocus])

  return multiline
    ? (
      <textarea
        ref={textareaRef}
        {...sharedProps}
        {...(props as TextAreaProps)}
        css={({ colors, fonts }) =>
          css`
        width: 100%;
        padding: 0;
        font-family: ${fonts.families.mono};
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
    )
    : (
      <input
        ref={inputRef}
        {...sharedProps}
        {...(props as InputProps)}
        css={({ colors, fonts }) =>
          css`
        width: 100%;
        height: 3.5gu;
        padding: 0;
        font-family: ${fonts.families.mono};
        background: transparent;
        border: 0;
        color: ${colors.accent};
        outline-offset: 3px;
        outline: ${error ? "2px" : "0"} solid ${colors.warning};
        &:focus {
          outline: 2px solid ${error ? colors.warning : colors.focus};
        }
      `}
      />
    )
}
