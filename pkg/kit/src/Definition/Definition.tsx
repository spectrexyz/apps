import { ReactNode } from "react"
import { css } from "@emotion/react"

type DefinitionProps = {
  title: ReactNode
  content: ReactNode
}

export function Definition({ title, content }: DefinitionProps) {
  return (
    <div
      css={({ fonts }) => css`
        font-family: ${fonts.families.sans};
      `}
    >
      <div
        css={({ colors }) => css`
          padding-bottom: 0.5gu;
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
