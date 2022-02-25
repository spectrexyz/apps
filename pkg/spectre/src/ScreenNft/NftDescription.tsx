import Markdown from "markdown-to-jsx"
import { useLayout } from "../styles"
import { Snft } from "../types"
import { PanelSection } from "./PanelSection"

export function NftDescription({ snft }: { snft: Snft }) {
  const layout = useLayout()
  return (
    <>
      <h1
        css={({ fonts }) => ({
          fontFamily: fonts.sans,
          fontSize: layout.below("large") ? "24px" : "40px",
        })}
      >
        {snft.title}
      </h1>
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
    </>
  )
}
