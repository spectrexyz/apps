import type { TimeScale } from "../types"

import { Button } from "moire"

export const TIME_SCALES = new Map<
  TimeScale,
  [label: string, labelShort: string]
>([
  ["DAY", ["1 day", "1D"]],
  ["WEEK", ["1 week", "1W"]],
  ["MONTH", ["1 month", "1M"]],
  ["YEAR", ["1 year", "1Y"]],
  ["ALL", ["All", "ALL"]],
])

const TIME_SCALES_AS_ENTRIES = Array.from(TIME_SCALES.entries())

export function TimeScaleButtons(
  {
    compact,
    onChange,
    value,
  }: {
    compact: boolean
    onChange: (value: TimeScale) => void
    value: TimeScale
  },
) {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${TIME_SCALES.size}, 7gu)`,
        justifyContent: compact ? "space-between" : "center",
        gap: "1.5gu",
        width: "100%",
      }}
    >
      {TIME_SCALES_AS_ENTRIES.map(
        ([name, [label, labelShort]], index) => {
          return (
            <div key={index}>
              <Button
                label={labelShort}
                mode="outline-2"
                selected={name === value}
                size={compact ? "small" : "compact"}
                title={label}
                onClick={() => onChange(name)}
                wide
              />
            </div>
          )
        },
      )}
    </div>
  )
}
