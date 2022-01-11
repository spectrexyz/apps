import { ReactNode } from "react"
import { css } from "@emotion/react"
import { gu } from "../styles"

type BadgeProps = {
  alt?: string
  icon?: string | ReactNode
  label: string
}

export function Badge({ alt, icon, label }: BadgeProps): JSX.Element {
  if (typeof icon === "string") {
    icon = <img alt="" src={icon} width={3 * gu} height={3 * gu} />
  }
  return (
    <div
      title={alt}
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        gap: 0.75gu;
        height: 4gu;
        padding: ${icon ? css`0 2gu 0 0.5gu` : css`0 1.5gu`};
        color: ${colors.accent2};
        background: ${colors.translucid};
        border-radius: 10gu;
      `}
    >
      {icon}
      {typeof label === "string" ? (
        <span
          css={css`
            font-size: 18px;
            text-transform: uppercase;
          `}
        >
          {label}
        </span>
      ) : (
        label
      )}
    </div>
  )
}
