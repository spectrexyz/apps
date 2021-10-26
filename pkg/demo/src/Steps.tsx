import { useState } from "react"
import { css } from "@emotion/react"
import { Button, Steps } from "kit"

function StepsDemo() {
  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState(3)
  return (
    <div>
      <div
        css={css`
          display: flex;
          width: 400px;
        `}
      >
        <Steps steps={steps} current={step} />
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <Button
          label="Prev"
          onClick={() => setStep((v) => Math.max(0, v - 1))}
        />
        <Button
          label="Next"
          onClick={() => setStep((v) => Math.min(steps - 1, v + 1))}
        />
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <Button
          label="Less"
          onClick={() => setSteps((v) => Math.max(1, v - 1))}
        />
        <Button label="More" onClick={() => setSteps((v) => v + 1)} />
      </div>
    </div>
  )
}

export { StepsDemo as Steps }
