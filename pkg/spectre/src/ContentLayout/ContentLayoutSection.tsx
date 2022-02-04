import { css } from "@emotion/react"
import React, { Children, ReactNode } from "react"
import { useLayout } from "../styles"

type ContentLayoutSectionProps = {
  children: ReactNode
  type?: "simple" | "two-parts" | "aside"
}

export function ContentLayoutSection({
  children,
  type = "simple",
}: ContentLayoutSectionProps) {
  const layout = useLayout()

  if (type === "two-parts") {
    return (
      <div
        css={css`
          display: grid;
          ${
          layout.above("large")
            ? `
                grid-template-columns: repeat(2, 1fr);
                gap: 5gu;
              `
            : ""
        };
        `}
      >
        {Children.map(children, (part, index) => <div key={index}>{part}</div>)}
      </div>
    )
  }

  return <>{children}</>
}
