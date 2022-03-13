import { forwardRef, ReactNode } from "react"
import { useLayout, useLabelStyle } from "../styles"

type PanelSectionProps = {
  title?: ReactNode
  children: ReactNode
}

export const PanelSection = forwardRef<HTMLElement, PanelSectionProps>(
  function PanelSection({ title, children }, ref) {
    const layout = useLayout()
    const titleStyle = useLabelStyle()
    return (
      <section
        ref={ref}
        css={{ paddingTop: layout.below("xlarge") ? "4gu" : "8gu" }}
      >
        {title && <h1 css={titleStyle}>{title}</h1>}
        <div
          css={({ fonts }) => ({
            fontFamily: fonts.sans,
            fontSize: "14px",
          })}
        >
          {children}
        </div>
      </section>
    )
  },
)
