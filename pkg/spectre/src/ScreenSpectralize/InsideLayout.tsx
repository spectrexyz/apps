import { ReactNode } from "react"
import { useLayout } from "../styles"

interface Section {
  type: string
  content: unknown
}
interface SectionSimple extends Section {
  type: "simple"
  content: ReactNode
}
interface SectionTwoParts extends Section {
  type: "two-parts"
  content: [ReactNode, ReactNode]
}
interface SectionAside extends Section {
  type: "aside"
  content: ReactNode
}

type InsideLayoutProps = {
  heading: ReactNode
  intro: ReactNode
  sections: (SectionSimple | SectionTwoParts | SectionAside)[]
}

export function InsideLayout({ heading, intro, sections }: InsideLayoutProps) {
  const layout = useLayout()
  const flexGap = layout.value({
    small: "3.5gu",
    xlarge: "5gu",
  })
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  return (
    <div
      css={{
        display: "flex",
        gap: flexGap,
        flexDirection: layout.below("medium") ? "column" : "row",
        width: "100%",
      }}
    >
      <div
        css={({ colors }) => ({
          padding: layout.below("medium") ? "0" : "4.5gu 5gu 3gu",
          background: layout.below("medium") ? "none" : colors.background,
        })}
      >
        {!layout.below("medium")
          ? (
            <h1
              css={({ fonts }) => ({
                fontFamily: fonts.mono,
                fontSize: "18px",
                textTransform: "uppercase",
              })}
            >
              {heading}
            </h1>
          )
          : (
            <div
              css={{
                height: "6gu",
              }}
            />
          )}
        <p
          css={({ colors, fonts }) => ({
            padding: introPadding,
            fontFamily: fonts.sans,
            fontSize: "14px",
            color: colors.contentDimmed,
          })}
        >
          {intro}
        </p>
        {sections.map((section) => {
          if (section.type === "simple") {
            return <div>{section.content}</div>
          }
          if (section.type === "two-parts") {
            return (
              <div
                css={{
                  display: "grid",
                  ...layout.above("large")
                    ? {
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "5gu",
                    }
                    : {},
                }}
              >
                <div>{section.content[0]}</div>
                <div>{section.content[1]}</div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
