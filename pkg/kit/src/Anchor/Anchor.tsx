/** @jsx jsx */
import type { ComponentPropsWithoutRef } from "react"

import { forwardRef, useMemo } from "react"
import { jsx, css } from "@emotion/react"

export type AnchorProps = ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a"> & {
    disabled?: boolean
    external?: boolean
    href?: string
    onClick?: () => void
  }

export const Anchor = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  AnchorProps
>(function Anchor(
  { disabled = false, href, external, onClick, ...props },
  ref
) {
  if (onClick !== undefined && (href !== undefined || external !== undefined)) {
    throw new Error(
      "Anchor: the href and external props can’t be set when onClick is set."
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
  }, [href, disabled, external])

  return href ? (
    <a
      ref={ref}
      {...anchorProps}
      {...props}
      css={({ colors }) => css`
        outline: 0;
        text-decoration: underline;
        &:focus:not(:focus-visible) {
          outline: 0;
        }
        &:focus-visible {
          outline: 2px solid ${colors.focus};
        }
      `}
    />
  ) : (
    <button
      ref={ref}
      onClick={onClick}
      {...props}
      css={({ colors }) => css`
        padding: 0;
        border: 0;
        outline: 0;
        text-decoration: underline;
        background: none;
        cursor: pointer;
        &::-moz-focus-inner {
          border: 0;
        }
        &:focus:not(:focus-visible) {
          outline: 0;
        }
        &:focus-visible {
          outline: 2px solid ${colors.focus};
        }
      `}
    />
  )
})
