import { describe, expect, it } from "vitest"
import { calculateShares, formatAmount, Share } from "../src/utils"

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

describe("calculateShares()", () => {
  const totalPercentage = (stakes: Share[]) =>
    stakes.reduce((total, stake) => total + stake.percentage, 0)

  it(
    "should return equal percentages for items having the same value − if divisible",
    () => {
      const stakes = calculateShares(Array(4).fill(1n))
      expect(totalPercentage(stakes)).toBe(100)
      expect(stakes.every((stake) => stake.percentage === 25)).toBe(true)
    },
  )

  it("should adjust percentages to reach exactly 100% (case 1)", () => {
    const stakes = calculateShares([100n, 100n, 100n, 11n, 2n])
    expect(stakes).toHaveLength(5)
    expect(totalPercentage(stakes)).toBe(100)
    expect(stakes.map((s) => s.percentage)).toEqual([32, 32, 32, 3, 1])
  })

  it("should adjust percentages to reach exactly 100% (case 2)", () => {
    const stakes = calculateShares(Array(7).fill(1n))
    expect(stakes).toHaveLength(7)
    expect(totalPercentage(stakes)).toBe(100)
    expect(stakes.map((s) => s.percentage)).toEqual([
      15,
      15,
      14,
      14,
      14,
      14,
      14,
    ])
  })

  it("should add a rest item when the total exceeds the limit", () => {
    const limit = 5
    const stakes = calculateShares(Array(10).fill(1n), { limit })
    expect(stakes).toHaveLength(limit)
    expect(totalPercentage(stakes)).toBe(100)
    expect(stakes[stakes.length - 1]).toEqual({
      amount: null,
      index: -1,
      percentage: 60,
      type: "rest",
    })
  })

  it("should remove items at 0% and replace them by the “rest” item", () => {
    const values = [1000n, 1000n, 1000n, 10n, 1n]
    const stakes = calculateShares(values)
    expect(stakes).toHaveLength(4)
    expect(totalPercentage(stakes)).toBe(100)
    expect(stakes.map((s) => s.percentage)).toEqual([33, 33, 33, 1])
  })

  it("should fill the missing balances with the “rest” item", () => {
    const values = [1000n, 1000n, 1000n, 10n, 1n]
    const stakes = calculateShares(values, { total: 4000n })
    expect(totalPercentage(stakes)).toBe(100)
    expect(stakes).toEqual([
      { amount: 1000n, index: 0, percentage: 25, type: "amount" },
      { amount: 1000n, index: 1, percentage: 25, type: "amount" },
      { amount: 1000n, index: 2, percentage: 25, type: "amount" },
      { amount: 10n, index: 3, percentage: 1, type: "amount" },
      { amount: 1n, index: 4, percentage: 1, type: "amount" },
      { amount: null, index: -1, percentage: 23, type: "rest" },
    ])
  })
})
