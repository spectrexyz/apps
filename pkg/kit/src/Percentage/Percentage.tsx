import type { Dnum } from "dnum"

import dnum from "dnum"
import { memo } from "react"

function isDnum(value: unknown): value is Dnum {
  return Array.isArray(value)
    && value.length >= 2
    && typeof value[0] === "bigint"
    && typeof value[1] === "number"
}

export const Percentage = memo(
  function Percentage({
    percentage,
  }: {
    percentage: Dnum | string | number
  }) {
    if (isDnum(percentage)) {
      percentage = dnum.format(dnum.multiply(percentage, 100))
    }

    let [whole, fraction = null] = String(percentage).split(".")
    if (fraction !== null) {
      fraction = String(
        Math.round(
          parseInt(fraction.slice(0, 4).padEnd(4, "0"), 10) / 100,
        ),
      )
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
