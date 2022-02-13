import { describe, expect, it } from "vitest"
import { formatAmount } from "../src/utils"

describe("formatAmount()", () => {
  it("accepts any number of decimals", () => {
    expect(formatAmount(1288n, 0)).eq("1,288")
    expect(formatAmount(1288n, 2)).eq("12.88")
  })
  it("rounds to the specific amount of digits", () => {
    expect(formatAmount(1235003783328732987000n, 18, { digits: 3 })).eq(
      "1,235.004",
    )
    expect(formatAmount(1235343783328732987000n, 18, { digits: 3 })).eq(
      "1,235.344",
    )
  })
  it("truncates the trailing zeros as specified", () => {
    expect(
      formatAmount(1235030000000000000000n, 18, {
        digits: 3,
        trailingZeros: true,
      }),
    ).eq("1,235.030")
    expect(
      formatAmount(1235030000000000000000n, 18, {
        digits: 3,
        trailingZeros: false,
      }),
    ).eq("1,235.03")
    expect(
      formatAmount(1235000000000000000000n, 18, {
        digits: 3,
        trailingZeros: true,
      }),
    ).eq("1,235.000")
    expect(
      formatAmount(1235000000000000000000n, 18, {
        digits: 3,
        trailingZeros: false,
      }),
    ).eq("1,235")
  })
})
