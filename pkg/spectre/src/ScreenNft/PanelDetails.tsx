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
        paddingTop: "8gu",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          css={{
            width: "72gu",
          }}
        >
          <h1
            css={({ fonts }) => ({
              fontFamily: fonts.sans,
              fontSize: "40px",
            })}
          >
            {"Spectre is a super long NFT title that overflows in 2 lines"
              || title}
          </h1>
          {primary}
        </div>
        <div
          css={{
            width: "72gu",
          }}
        >
          {secondary}
        </div>
      </div>
    </div>
  )
}
