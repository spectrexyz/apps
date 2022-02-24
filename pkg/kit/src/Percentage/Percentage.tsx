import { memo } from "react"

export const Percentage = memo(
  function Percentage({ percentage }: { percentage: string | number }) {
    let [whole, fraction = null] = String(percentage).split(".")
    if (fraction !== null) {
      fraction = Math.round(fraction.slice(0, 4).padEnd(4, "0") / 100)
    }
    return (
      <div
        css={({ fonts }) => ({
          display: "flex",
          alignItems: "baseline",
          gap: "0.5gu",
          fontSize: "32px",
          fontFamily: fonts.mono,
        })}
      >
        <span>
          {whole || "0"}
          {fraction !== null && (
            <span css={{ fontSize: "18px" }}>.{fraction}</span>
          )}
        </span>
        <span css={{ fontSize: "18px" }}>%</span>
      </div>
    )
  },
)
