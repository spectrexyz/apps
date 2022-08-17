import type { Property as CssP } from "csstype"

export function Truncate({
  align = "left",
  text,
}: {
  align?: CssP.TextAlign
  text: string
}) {
  return (
    <div
      title={text}
      css={{
        maxWidth: "100%",
        whiteSpace: "nowrap",
        textAlign: align,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  )
}
