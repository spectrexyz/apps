import Markdown from "markdown-to-jsx"
import { Snft } from "../types"
import { PanelSection } from "./PanelSection"

export function NftDescription({ snft }: { snft: Snft }) {
  return (
    <PanelSection title="Description">
      <div
        css={({ colors }) => ({
          color: colors.contentDimmed,
          "p, ul": {
            margin: "2gu 0",
            listStylePosition: "inside",
          },
          "article > :first-of-type": {
            marginTop: "0",
          },
          "article > :last-of-type": {
            marginBottom: "0",
          },
        })}
      >
        <Markdown
          options={{ disableParsingRawHTML: true, wrapper: "article" }}
        >
          {snft.description}
        </Markdown>
      </div>
    </PanelSection>
  )
}
