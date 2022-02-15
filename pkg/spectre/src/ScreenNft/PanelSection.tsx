import { forwardRef, ReactNode } from "react"

type PanelSectionProps = {
  title?: ReactNode
  children: ReactNode
}

export const PanelSection = forwardRef<HTMLElement, PanelSectionProps>(
  function PanelSection({ title, children }, ref) {
    return (
      <section
        ref={ref}
        css={{
          paddingTop: "8gu",
        }}
      >
        {title && (
          <h1
            css={({ colors }) => ({
              paddingBottom: "2gu",
              fontSize: "20px",
              textTransform: "uppercase",
              color: colors.contentHeading2,
            })}
          >
            {title}
          </h1>
        )}
        <div
          css={({ fonts }) => ({
            fontFamily: fonts.sans,
          })}
        >
          {children}
        </div>
      </section>
    )
  },
)
