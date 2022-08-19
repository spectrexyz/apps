import { ComponentPropsWithoutRef, forwardRef, ReactNode, useMemo } from "react"

export type AnchorProps =
  & ComponentPropsWithoutRef<"button">
  & ComponentPropsWithoutRef<"a">
  & {
    children: ReactNode
    disabled?: boolean
    external?: boolean
    href?: string
    onClick?: (event: MouseEvent) => void
  }

export const Anchor = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  AnchorProps
>(function Anchor(
  {
    children,
    disabled = false,
    external,
    href,
    onClick,
    ...props
    // forwardRef<_, AnchorProps> only is not enough for TS to follow the
    // params of functions when consuming, so we add the prop types here too:
  }: AnchorProps,
  ref,
) {
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
        onClick={onClick}
        {...anchorProps}
        {...props}
        css={({ colors }) => ({
          outline: "0",
          textDecoration: "underline",
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
        {...props}
        css={({ colors }) => ({
          padding: "0",
          border: "0",
          outline: "0",
          textDecoration: "underline",
          background: "none",
          cursor: "pointer",
          "&::-moz-focus-inner": {
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
