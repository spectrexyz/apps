import { css } from "@emotion/react"
import { Button, Steps } from "kit"
import { useState } from "react"

function StepsDemo() {
  const [[step, steps], setSteps] = useState([0, 3]) // current step, total steps
  return (
    <div>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          width: 400px;
        `}
      >
        <div>
          <Steps steps={steps} current={step} />
        </div>
        <div
          css={css`
            position: absolute;
            left: -120px;
            top: 0;
            transform: translateY(calc(-50% + 8gu / 2));
            height: 400px;
          `}
        >
          <Steps steps={steps} current={step} direction="vertical" />
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding-top: 4gu;
        `}
      >
        <Button
          label="Prev"
          onClick={() =>
            setSteps(([step, steps]) => [Math.max(0, step - 1), steps])}
        />
        <Button
          label="Next"
          onClick={() =>
            setSteps(([step, steps]) => [Math.min(steps - 1, step + 1), steps])}
        />
        <Button
          label="Less"
          onClick={() =>
            setSteps(([step, steps]) => [
              Math.min(steps - 2, step),
              Math.max(2, steps - 1),
            ])}
        />
        <Button
          label="More"
          onClick={() =>
            setSteps(([step, steps]) => [step, Math.min(7, steps + 1)])}
        />
      </div>
    </div>
  )
}

export { StepsDemo as Steps }
