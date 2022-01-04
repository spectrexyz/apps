import { useCallback, useEffect, useState } from "react"
import { css } from "@emotion/react"
import { Steps } from "kit"

import { useLayout } from "../styles.js"
import { useResetScroll } from "../App/AppScroll.jsx"
import { AppScreen } from "../AppLayout/AppScreen2.jsx"
import { Step1 } from "./Step1.jsx"
import { Step2 } from "./Step2.jsx"
import { Step3 } from "./Step3.jsx"
import { useSpectralize } from "./use-spectralize.js"

const STEPS = [Step1, Step2, Step3]

export function ScreenSpectralize() {
  const layout = useLayout()
  const resetScroll = useResetScroll()
  const { currentStep, currentStepTitle, nextStep, prevStep } = useSpectralize()

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    nextStep()
  }, [])

  useEffect(() => {
    resetScroll()
  }, [currentStep, resetScroll])

  const contentMaxWidth = layout.value({
    small: "none",
    large: css`104gu`,
    xlarge: css`128gu`,
  })
  const contentPadding = layout.value({
    small: css`0 3gu`,
    medium: css`0 3gu`,
    large: "0",
  })
  const flexGap = layout.value({
    small: css`3.5gu`,
    large: css`4gu`,
    xlarge: css`8gu`,
  })

  const Step = STEPS[currentStep]

  return (
    <AppScreen
      compactBar={
        layout.below("medium") && {
          title: currentStepTitle(),
          onBack: () => {},
          extraRow: (
            <div
              css={css`
                padding: 0 2gu;
              `}
            >
              <Steps
                steps={STEPS.length}
                current={currentStep}
                direction="horizontal"
              />
            </div>
          ),
        }
      }
    >
      <form onSubmit={handleSubmit}>
        <div
          css={css`
            display: flex;
            gap: ${flexGap};
            flex-direction: ${layout.below("medium") ? "column" : "row"};
            max-width: ${contentMaxWidth};
            margin: 0 auto;
            padding: ${contentPadding};
          `}
        >
          {!layout.below("medium") && (
            <div
              css={css`
                flex-shrink: 0;
                height: 38gu;
                padding-top: 4.5gu;
              `}
            >
              <Steps
                steps={STEPS.length}
                current={currentStep}
                direction="vertical"
              />
            </div>
          )}
          <Step title={currentStepTitle()} onPrev={() => prevStep()} />
        </div>
      </form>
    </AppScreen>
  )
}
