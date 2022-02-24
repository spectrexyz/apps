import { describe, expect, it } from "vitest"
import { correctDistribution } from "../../src/Distribution/Distribution"

describe("Distribution: correctDistribution()", () => {
  it("doesn’t touch already filled arrays", () => {
    expect(correctDistribution([100])).toEqual([100])
  })
  it("fills empty arrays", () => {
    expect(correctDistribution([])).toEqual([100])
  })
  it("fills missing values", () => {
    expect(correctDistribution([10, 10, 30])).toEqual([10, 10, 30, 50])
  })
  it("cuts extra values", () => {
    expect(correctDistribution([10, 10, 30, 60])).toEqual([10, 10, 30, 50])
    expect(correctDistribution([10, 10, 30, 600])).toEqual([10, 10, 30, 50])
    expect(correctDistribution([10, 10, 90, 600])).toEqual([10, 10, 80])
  })
})
