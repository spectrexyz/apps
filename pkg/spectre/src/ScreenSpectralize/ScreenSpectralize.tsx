import { Steps } from "kit"
import { useCallback, useEffect } from "react"
import { useAccount } from "wagmi"
import { useLocation } from "wouter"
import { useResetScroll } from "../App/AppScroll"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useLayout } from "../styles"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"
import { StepSummary } from "./StepSummary"
import { useSpectralize } from "./use-spectralize"

const STEPS = [Step1, Step2, Step3, StepSummary]

export function ScreenSpectralize() {
  const [_, setLocation] = useLocation()
  const [{ data: accountData }] = useAccount({ fetchEns: false })

  const layout = useLayout()
  const resetScroll = useResetScroll()
  const { currentStep, currentStepTitle, nextStep, prevStep } = useSpectralize()
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
    small: "none",
    large: "104gu",
    xlarge: "128gu",
  })
  const contentPadding = layout.value({
    small: "0 3gu",
    medium: "0 3gu",
    large: "0",
  })
  const flexGap = layout.value({
    small: "3.5gu",
    large: "4gu",
    xlarge: "8gu",
  })

  if (!accountData) {
    return (
      <AppScreen
        compactBar={{
          title: "Fractionalize",
          onBack: prev,
        }}
      >
        <div
          css={{
            flexGrow: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: contentMaxWidth,
            margin: "0 auto",
            padding: contentPadding,
            paddingTop: "8gu",
            textAlign: "center",
          }}
        >
          Please connect your account to fractionalize your NFT.
        </div>
      </AppScreen>
    )
  }

  return (
    <AppScreen
      compactBar={layout.below("medium") && {
        title,
        onBack: prev,
        extraRow: (
          <div
            css={{
              padding: "0 2gu",
            }}
          >
            <Steps
              steps={STEPS.length - 1}
              current={currentStep}
              direction="horizontal"
            />
          </div>
        ),
      }}
    >
      <div
        css={{
          display: "flex",
          gap: flexGap,
          flexDirection: layout.below("medium") ? "column" : "row",
          width: "100%",
          maxWidth: contentMaxWidth,
          margin: "0 auto",
          padding: contentPadding,
        }}
      >
        {!layout.below("medium") && (
          <div
            css={{
              flexShrink: "0",
              height: "38gu",
              paddingTop: "4.5gu",
            }}
          >
            <Steps
              steps={STEPS.length - 1}
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
