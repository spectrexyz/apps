import { ReactNode } from "react"
import { useLayout } from "../styles"

export function PanelDetails({ primary, secondary }: {
  primary: ReactNode
  secondary: ReactNode
}) {
  const layout = useLayout()
  console.log('?', layout.below('xlarge'));
  return (
    <div
      css={{
        maxWidth: "160gu",
        margin: "0 auto",
        paddingTop: layout.below("xlarge") ? "2gu" : "8gu",
      }}
    >
      <div
        css={layout.below("xlarge")
          ? { padding: "2gu" }
          : {
            display: "grid",
            gridTemplateColumns: "72gu 72gu",
            justifyContent: "space-between",
            width: "100%",
          }}
      >
        <div>
          {primary}
        </div>
        <div>
          {secondary}
        </div>
      </div>
    </div>
  )
}
