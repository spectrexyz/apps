import { ReactNode } from "react"

export function PanelDetails({
  primary,
  secondary,
  title,
}: {
  primary: ReactNode
  secondary: ReactNode
  title: ReactNode
}) {
  return (
    <div
      css={{
        maxWidth: "160gu",
        margin: "0 auto",
        paddingTop: "7.5gu",
      }}
    >
      <h1
        css={{
          paddingBottom: "5gu",
          fontSize: "32px",
        }}
      >
        {title}
      </h1>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            width: "80gu",
          }}
        >
          {primary}
        </div>
        <div
          css={{
            width: "52gu",
          }}
        >
          {secondary}
        </div>
      </div>
    </div>
  )
}
