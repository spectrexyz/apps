import { ReactNode } from "react"

type DefinitionProps = {
  title: ReactNode
  content: ReactNode
}

export function Definition({ title, content }: DefinitionProps) {
  return (
    <div
      css={({ fonts }) => ({
        overflow: "hidden",
        fontFamily: fonts.sans,
      })}
    >
      <div
        css={({ colors }) => ({
          paddingBottom: "0.75gu",
          fontSize: "12px",
          textTransform: "uppercase",
          color: colors.contentDimmed,
        })}
      >
        {title}
      </div>
      <div
        css={{
          fontSize: "14px",
        }}
      >
        {content}
      </div>
    </div>
  )
}
