import type { ReactNode } from "react"

import { css } from "@emotion/react"
import { createContext, forwardRef, useContext } from "react"
import { useUid } from "../react-utils"

type FieldsetProps = {
  children: ReactNode
  contextual?: ReactNode
  dimmed?: boolean
  error?: boolean | string
  label: ReactNode
  optional?: boolean
}

const FieldsetContext = createContext<{ labelFor?: string }>({
  labelFor: undefined,
})

export const Fieldset = forwardRef<HTMLElement, FieldsetProps>(
  function Fieldset(
    {
      children,
      contextual,
      dimmed = false,
      error = false,
      label,
      optional = false,
    }: FieldsetProps,
    ref,
  ): JSX.Element {
    const labelFor = useUid()
    return (
      <FieldsetContext.Provider value={{ labelFor }}>
        <section
          ref={ref}
          css={({ colors, fonts }) =>
            css`
            position: relative;
            margin-top: 2gu;
            padding: 2gu;
            background: ${colors.layer2};
            outline: ${error ? "2px" : "0"} solid ${colors.warning};
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
              font-family: ${fonts.sans};
              font-size: 12px;
              text-transform: uppercase;
              color: ${dimmed ? colors.contentDimmed : colors.contentHeading};
              white-space: nowrap;
              label {
                display: block;
              }
            }
          `}
        >
          <header>
            <h1>
              <label htmlFor={labelFor}>
                {label} {optional && (
                  <span
                    css={({ colors }) =>
                      css`
                      text-transform: none;
                      color: ${colors.contentDimmed};
                    `}
                  >
                    (Optional)
                  </span>
                )}
              </label>
            </h1>
            {contextual && (
              <div
                css={({ colors, fonts }) =>
                  css`
                  font-family: ${fonts.sans};
                  font-size: 12px;
                  color: ${colors.contentDimmed};
                `}
              >
                {contextual}
              </div>
            )}
          </header>
          <div
            css={({ fonts }) =>
              css`
              font-family: ${fonts.sans};
            `}
          >
            {typeof children === "function" ? children(labelFor) : children}
          </div>
        </section>
      </FieldsetContext.Provider>
    )
  },
)

export function useFieldset() {
  return useContext(FieldsetContext)
}
