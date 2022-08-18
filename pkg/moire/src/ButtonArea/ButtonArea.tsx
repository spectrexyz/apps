import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { forwardRef, useMemo } from "react"

export type ButtonAreaProps =
  & ComponentPropsWithoutRef<"button">
  & ComponentPropsWithoutRef<"a">
  & {
    children?: ReactNode
    disabled?: boolean
    external?: boolean
    href?: string
    onClick?: () => void
  }

export const ButtonArea = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonAreaProps
>(function ButtonArea(
  { disabled = false, href, external, onClick, children, ...props },
  ref,
) {
  if (onClick !== undefined && (href !== undefined || external !== undefined)) {
    throw new Error(
      "ButtonArea: the href and external props can’t be set when onClick is set.",
    )
  }

  const anchorProps = useMemo<ComponentPropsWithoutRef<"a">>(() => {
    if (!href || disabled) {
      return {}
    }
    const props = {
      href,
      onClick,
      rel: "noopener noreferrer",
    }
    return external ? { ...props, target: "_blank" } : props
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
