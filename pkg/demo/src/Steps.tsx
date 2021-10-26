import { useState } from "react"
import { css } from "@emotion/react"
import { Button, Steps } from "kit"

function StepsDemo() {
  const [[step, steps], setSteps] = useState([0, 3]) // current, total
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
          gap: 1gu;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 1gu;
          `}
        >
          <Button
            label="Prev"
            onClick={() =>
              setSteps(([step, steps]) => [Math.max(0, step - 1), steps])
            }
          />
          <Button
            label="Next"
            onClick={() =>
              setSteps(([step, steps]) => [
                Math.min(steps - 1, step + 1),
                steps,
              ])
            }
          />
        </div>
        <div
          css={css`
            display: flex;
            gap: 1gu;
          `}
        >
          <Button
            label="Less"
            onClick={() =>
              setSteps(([step, steps]) => [
                Math.min(steps - 2, step),
                Math.max(1, steps - 1),
              ])
            }
          />
          <Button
            label="More"
            onClick={() => setSteps(([step, steps]) => [step, steps + 1])}
          />
        </div>
      </div>
    </div>
  )
}

export { StepsDemo as Steps }
