import type { ComponentPropsWithRef, ReactNode } from "react"

import { forwardRef } from "react"
import { css } from "@emotion/react"

type LinkIconProps = ComponentPropsWithRef<"a"> & {
  icon: ReactNode
  label: ReactNode
}

export const LinkIcon = forwardRef<HTMLAnchorElement, LinkIconProps>(
  function LinkIcon({ icon, label, ...props }, ref) {
    return (
      <a
        ref={ref}
        {...props}
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          text-transform: uppercase;
          color: ${colors.content};
          &:active {
            transform: translate(1px, 1px);
          }
        `}
      >
        {icon}
        <span>{label}</span>
      </a>
    )
  }
)
