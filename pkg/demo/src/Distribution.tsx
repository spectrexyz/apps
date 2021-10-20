import { useState } from "react"
import { Distribution } from "kit"

function randomDistribution(): number[] {
  const { random, floor, max } = Math
  let distribution = []
  let remaining = 100

  while (remaining > 0) {
    const size = max(1, floor(random() * random() * random() * remaining))
    distribution.push(size)
    remaining -= size
  }

  distribution.sort((a, b) => b - a)

  return distribution
}

function DistributionDemo() {
  const [values, setValues] = useState(randomDistribution)
  return (
    <div onClick={() => setValues(randomDistribution)}>
      <Distribution values={values} />
    </div>
  )
}

export { DistributionDemo as Distribution }
