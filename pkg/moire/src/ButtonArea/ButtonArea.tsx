import type {
  ComponentPropsWithoutRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react"

import { forwardRef, useMemo } from "react"

export type ButtonAreaProps =
  & ComponentPropsWithoutRef<"button">
  & ComponentPropsWithoutRef<"a">
  & {
    children?: ReactNode
    disabled?: boolean
    external?: boolean
    href?: string
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  }

export const ButtonArea = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonAreaProps
>(function ButtonArea(
  { disabled = false, href, external, onClick, children, ...props },
  ref,
) {
  const anchorProps = useMemo<ComponentPropsWithoutRef<"a">>(() => {
    if (!href || disabled) {
      return {}
    }

    const anchorProps = {
      href,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick && href) {
          event.preventDefault()
          onClick(event)
        }
      },
      rel: "noopener noreferrer",
    }

    return external
      ? { ...anchorProps, target: "_blank" }
      : anchorProps
  }, [href, disabled, external, onClick])

  return href
    ? (
      <a
        ref={ref}
        {...anchorProps}
        {...props}
        css={({ colors }) => ({
          display: "flex",
          outline: "0",
          "&:focus:not(:focus-visible)": {
            outline: "0",
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.focus}`,
          },
        })}
      >
        {children}
      </a>
    )
    : (
      <button
        ref={ref}
        onClick={onClick}
        type="button"
        disabled={disabled}
        {...props}
        css={({ colors }) => ({
          display: "flex",
          padding: "0",
          border: "0",
          outline: "0",
          background: "none",
          cursor: "pointer",
          "&:-moz-focus-inner": {
            border: "0",
          },
          "&:focus:not(:focus-visible)": {
            outline: "0",
          },
          "&:focus-visible": {
            outline: `2px solid ${colors.focus}`,
          },
        })}
      >
        {children}
      </button>
    )
})
