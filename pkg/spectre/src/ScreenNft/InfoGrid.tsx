import type { ReactNode } from "react"

import { useLabelStyle, useLayout } from "../styles"
import { PanelSection } from "./PanelSection"

type FooterType =
  | ReactNode
  | ReactNode[]
  | (({ compact }: { compact: boolean }) => ReactNode | ReactNode[])

export function InfoGrid(
  {
    compress = false,
    footer,
    heading,
    sections,
  }: {
    compress?: boolean
    footer?: FooterType
    heading?: ReactNode
    sections: Array<{ heading: ReactNode; content: ReactNode }>
  },
) {
  const labelStyle = useLabelStyle({ size: "small" })
  const layout = useLayout()

  return (
    <PanelSection title={heading}>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: compress && layout.below("xlarge")
            ? "1fr"
            : "1fr 1fr",
          gap: "3gu",
          paddingTop: "1gu",
        }}
      >
        {sections.map(({ heading, content }, index) => {
          return (
            <div key={index}>
              <h2 css={labelStyle}>{heading}</h2>
              <div>
                {content}
              </div>
            </div>
          )
        })}
      </div>
      <Footer footer={footer} />
    </PanelSection>
  )
}

function Footer({ footer }: { footer: FooterType }) {
  const layout = useLayout()
  const compact = layout.below("xlarge")

  if (typeof footer === "function") {
    footer = footer({ compact })
  }

  if (!footer || !Array.isArray(footer)) {
    return <div>{footer ?? null}</div>
  }

  if (footer.length !== 2) {
    throw new Error(
      "InfoGrid: the footer prop as an array should contain exactly two items",
    )
  }

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
        gap: compact ? "2gu" : "3gu",
        paddingTop: compact ? "2gu" : "3gu",
      }}
    >
      <div>{footer[0]}</div>
      <div>{footer[1]}</div>
    </div>
  )
}
