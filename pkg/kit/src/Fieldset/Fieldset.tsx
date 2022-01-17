import type { ReactNode } from "react"

import { createContext, forwardRef, useContext } from "react"
import { css } from "@emotion/react"
import { useUid } from "../react-utils"

type FieldsetProps = {
  children: ReactNode
  contextual?: ReactNode
  error?: boolean | string
  label: ReactNode
}

const FieldsetContext = createContext<{ labelFor?: string }>({
  labelFor: undefined,
})

export const Fieldset = forwardRef<HTMLElement, FieldsetProps>(
  function Fieldset(
    { children, contextual, error = false, label }: FieldsetProps,
    ref
  ): JSX.Element {
    const labelFor = useUid()
    return (
      <FieldsetContext.Provider value={{ labelFor }}>
        <section
          ref={ref}
          css={({ colors, fonts }) => css`
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
              <label htmlFor={labelFor}>{label}</label>
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
      </FieldsetContext.Provider>
    )
  }
)

export function useFieldset() {
  return useContext(FieldsetContext)
}
