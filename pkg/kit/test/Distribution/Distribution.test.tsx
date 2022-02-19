import { describe, expect, it } from "vitest"
import { fillDistribution } from "../../src/Distribution/Distribution.tsx"

describe("Distribution: fillDistribution()", () => {
  it("doesn’t touch already filled arrays", () => {
    expect(fillDistribution([100])).toEqual([100])
  })
  it("fills empty arrays", () => {
    expect(fillDistribution([])).toEqual([100])
  })
  it("fills missing values", () => {
    expect(fillDistribution([10, 10, 30])).toEqual([10, 10, 30, 50])
  })
  it("cuts extra values", () => {
    expect(fillDistribution([10, 10, 30, 60])).toEqual([10, 10, 30, 50])
    expect(fillDistribution([10, 10, 30, 600])).toEqual([10, 10, 30, 50])
    expect(fillDistribution([10, 10, 90, 600])).toEqual([10, 10, 80])
  })
})
