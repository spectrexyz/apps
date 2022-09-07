import type { SpectralizeStatus } from "./use-spectralize"

import { Button, Steps } from "moire"
import { useCallback, useEffect } from "react"
import { match } from "ts-pattern"
import { useAccount } from "wagmi"
import { useLocation } from "wouter"
import { useResetScroll } from "../App/AppScroll"
import { AppScreen } from "../AppLayout/AppScreen"
import { useLayout } from "../styles"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"
import { StepSummary } from "./StepSummary"
import {
  useCompleteMintAndSpectralize,
  useSpectralize,
} from "./use-spectralize"

const STEPS = [Step1, Step2, Step3, StepSummary]

export function ScreenSpectralize() {
  const [, setLocation] = useLocation()
  const { isConnected } = useAccount()

  const resetScroll = useResetScroll()
  const {
    currentStep,
    fillDemoData,
    nextStep,
    prevStep,
  } = useSpectralize()

  const mintAndSpectralize = useCompleteMintAndSpectralize()

  useEffect(() => {
    fillDemoData()
  }, [fillDemoData])

  const prev = useCallback(() => {
    if (currentStep === 0) {
      setLocation("/")
    } else {
      prevStep()
    }
  }, [currentStep, setLocation, prevStep])

  const next = useCallback(() => {
    if (currentStep === STEPS.length - 1) {
      mintAndSpectralize.init()
    } else {
      nextStep()
    }
  }, [currentStep, nextStep])

  useEffect(() => {
    resetScroll()
  }, [currentStep, resetScroll])

  if (!isConnected) {
    return <Disconnected onPrev={prev} />
  }

  if (mintAndSpectralize.status === "configure") {
    return <Configure onNext={next} onPrev={prev} />
  }

  return (
    <Spectralize
      onPrev={prev}
      mintAndSpectralize={mintAndSpectralize}
    />
  )
}

function Configure({
  onNext,
  onPrev,
}: {
  onNext: () => void
  onPrev: () => void
}) {
  const layout = useLayout()

  const { currentStep, currentStepTitle } = useSpectralize()
  const title = currentStepTitle()
  const Step = STEPS[currentStep]

  const compactBar = layout.below("medium") && {
    title,
    onBack: onPrev,
    extraRow: (
      <div css={{ padding: "0 2gu" }}>
        <Steps
          steps={STEPS.length - 1}
          current={currentStep}
          direction="horizontal"
        />
      </div>
    ),
  }

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

  return (
    <AppScreen compactBar={compactBar}>
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
              current={currentStep}
              direction="vertical"
              steps={STEPS.length - 1}
            />
          </div>
        )}
        <Step title={title} onPrev={onPrev} onNext={onNext} />
      </div>
    </AppScreen>
  )
}

function Spectralize({
  onPrev,
  mintAndSpectralize,
}: {
  onPrev: () => void
  mintAndSpectralize: ReturnType<typeof useCompleteMintAndSpectralize>
}) {
  const layout = useLayout()

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

  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack: onPrev }}>
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
        {match(mintAndSpectralize.status)
          .with("store-nft:loading", () => "Uploading NFT metadata…")
          .with("store-nft:error", () => "Error when uploading the NFT data.")
          .when((s) => s.startsWith("approve:"), () => (
            <TxBox
              onSign={() => mintAndSpectralize.approve()}
              prefix="approve"
              reason="to approve transfers"
              status={mintAndSpectralize.status}
            />
          ))
          .when((s) => s.startsWith("mint-and-fractionalize:"), () => (
            <TxBox
              onSign={() => mintAndSpectralize.mint()}
              prefix="mint-and-fractionalize"
              reason="to mint and fractionalize your NFT"
              status={mintAndSpectralize.status}
            />
          ))
          .with("success", () => "Done!")
          .otherwise(() => null)}
      </div>
    </AppScreen>
  )
}

function Disconnected({ onPrev }: { onPrev: () => void }) {
  const layout = useLayout()

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

  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack: onPrev }}>
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

function TxBox({
  onSign,
  prefix,
  reason,
  status,
}: {
  onSign: () => void
  prefix: "approve" | "mint-and-fractionalize"
  reason: string
  status: SpectralizeStatus
}) {
  return (
    <div>
      {status}
      <div>
        {match(status)
          .with(
            `${prefix}:prepare:loading`,
            () => "Preparing the transaction…",
          )
          .with(
            `${prefix}:prepare:error`,
            () => "Error while preparing the transaction.",
          )
          .with(
            `${prefix}:sign:idle`,
            () => `Please sign this transaction ${reason}.`,
          )
          .with(
            `${prefix}:sign:loading`,
            () => "Please open your wallet to sign the transaction.",
          )
          .with(
            `${prefix}:sign:error`,
            () =>
              "An error occured while signing the transaction. Please try again.",
          )
          .with(
            `${prefix}:tx:loading`,
            () => "Waiting for the transaction to be confirmed…",
          )
          .with(
            `${prefix}:tx:error`,
            () =>
              "An error occured and the transaction didn’t pass. Please try again.",
          )
          .with(
            `${prefix}:tx:error`,
            () =>
              "An error occured and the transaction didn’t pass. Please try again.",
          )
          .otherwise(() => null)}
      </div>
      <div css={{ paddingTop: "1gu" }}>
        <Button
          disabled={!(
            status === `${prefix}:sign:idle`
            || status === `${prefix}:sign:error`
            || status === `${prefix}:tx:error`
          )}
          label="Sign transaction"
          onClick={onSign}
        />
      </div>
    </div>
  )
}
