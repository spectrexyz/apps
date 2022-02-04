import { css } from "@emotion/react"
import { ReactNode } from "react"

type DefinitionProps = {
  title: ReactNode
  content: ReactNode
}

export function Definition({ title, content }: DefinitionProps) {
  return (
    <div
      css={({ fonts }) =>
        css`
        overflow: hidden;
        font-family: ${fonts.families.sans};
      `}
    >
      <div
        css={({ colors }) =>
          css`
          padding-bottom: 0.75gu;
          font-size: 12px;
          text-transform: uppercase;
          color: ${colors.contentDimmed};
        `}
      >
        {title}
      </div>
      <div
        css={css`
          font-size: 14px;
        `}
      >
        {content}
      </div>
    </div>
  )
}
