import { forwardRef } from "react"
import { css } from "@emotion/react"
import { useUid } from "kit"

export const FormField = forwardRef(function FormField(
  { heading, contextual, children, ...props },
  ref
) {
  const labelFor = useUid()
  return (
    <section
      ref={ref}
      {...props}
      css={({ colors, fonts }) => css`
        margin-top: 2gu;
        padding: 2gu;
        background: ${colors.layer2};
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding-bottom: 1gu;
          user-select: none;
        }
        header h1 {
          flex-grow: 1;
          font-family: ${fonts.families.sans};
          font-size: 12px;
          text-transform: uppercase;
          color: ${colors.contentHeading};
          label {
            display: block;
          }
        }
      `}
    >
      <header>
        <h1>
          {typeof children === "function" ? (
            <label htmlFor={labelFor}>{heading}</label>
          ) : (
            heading
          )}
        </h1>
        {contextual && (
          <div
            css={({ colors, fonts }) => css`
              font-family: ${fonts.families.sans};
              font-size: 12px;
              color: ${colors.contentDimmed};
            `}
          >
            {contextual}
          </div>
        )}
      </header>
      <div>
        {typeof children === "function" ? children(labelFor) : children}
      </div>
    </section>
  )
})
