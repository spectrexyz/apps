import { useCallback, useEffect } from "react"
import { css } from "@emotion/react"
import { Steps } from "kit"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useEthereum } from "../Ethereum"
import { useLayout } from "../styles"
import { useResetScroll } from "../App/AppScroll"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"
import { useSpectralize } from "./use-spectralize"

const STEPS = [Step1, Step2, Step3]

export function ScreenSpectralize() {
  const [_, setLocation] = useLocation()
  const { account } = useEthereum()
  const layout = useLayout()
  const resetScroll = useResetScroll()
  const { currentStep, currentStepTitle, nextStep, prevStep, demo } =
    useSpectralize()
  const title = currentStepTitle()
  const Step = STEPS[currentStep]

  const prev = useCallback(() => {
    if (currentStep === 0) {
      setLocation("/")
    } else {
      prevStep()
    }
  }, [currentStep, setLocation, prevStep])

  const next = useCallback(() => {
    nextStep()
  }, [nextStep])

  useEffect(() => {
    resetScroll()
  }, [currentStep, resetScroll])

  const contentMaxWidth = layout.value({
    small: css`none`,
    large: css`104gu`,
    xlarge: css`128gu`,
  })
  const contentPadding = layout.value({
    small: css`0 3gu`,
    medium: css`0 3gu`,
    large: css`0`,
  })
  const flexGap = layout.value({
    small: css`3.5gu`,
    large: css`4gu`,
    xlarge: css`8gu`,
  })

  if (!account) {
    return (
      <AppScreen
        compactBar={{
          title: "Spectralize",
          onBack: prev,
        }}
      >
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: ${contentMaxWidth};
            margin: 0 auto;
            padding: ${contentPadding};
            padding-top: 8gu;
          `}
        >
          Please connect your account to spectralize your NFT.
        </div>
      </AppScreen>
    )
  }

  return (
    <AppScreen
      compactBar={
        layout.below("medium") && {
          title,
          onBack: prev,
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
        <Step title={title} onPrev={prev} onNext={next} />
      </div>
    </AppScreen>
  )
}
