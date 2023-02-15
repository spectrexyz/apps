import { createContext, forwardRef, ReactNode, useContext } from "react"
import { useUid } from "../react-utils"

type FieldsetProps = {
  children: ReactNode | ((id: string) => ReactNode)
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
  function Fieldset({
    children,
    contextual,
    dimmed = false,
    error = false,
    label,
    optional = false,
  }: FieldsetProps, ref): JSX.Element {
    const labelFor = useUid()
    return (
      <FieldsetContext.Provider value={{ labelFor }}>
        <section
          ref={ref}
          css={({ colors, fonts }) => ({
            position: "relative",
            marginTop: "2gu",
            padding: "2gu",
            background: colors.layer2,
            outline: `${
              error
                ? "2px"
                : "0"
            } solid ${colors.warning}`,
            "header": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingBottom: "1gu",
              userSelect: "none",
            },
            "header h1": {
              flexGrow: "1",
              fontFamily: fonts.sans,
              fontSize: "12px",
              textTransform: "uppercase",
              color: dimmed ? colors.contentDimmed : colors.contentHeading,
              whiteSpace: "nowrap",
              "label": {
                display: "block",
              },
            },
          })}
        >
          <header>
            <h1>
              <label htmlFor={labelFor}>
                {label} {optional && (
                  <span
                    css={({ colors }) => ({
                      textTransform: "none",
                      color: colors.contentDimmed,
                    })}
                  >
                    (Optional)
                  </span>
                )}
              </label>
            </h1>
            {contextual && (
              <div
                css={({ colors, fonts }) => ({
                  fontFamily: fonts.sans,
                  fontSize: "12px",
                  color: colors.contentDimmed,
                })}
              >
                {contextual}
              </div>
            )}
          </header>
          <div css={({ fonts }) => ({ fontFamily: fonts.sans })}>
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
