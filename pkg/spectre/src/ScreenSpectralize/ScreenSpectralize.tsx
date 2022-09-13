import { Button, Steps } from "moire"
import { useCallback, useEffect, useState } from "react"
import { match } from "ts-pattern"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { useLocation } from "wouter"
import { useResetScroll } from "../App/AppScroll"
import { AppScreen } from "../AppLayout/AppScreen"
import { AsyncTask } from "../AsyncTask/AsyncTask"
import { CHAIN_ID } from "../environment"
import { useLayout } from "../styles"
import { isMutationStatus, isSignTxAndWaitStatus } from "../utils"
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
  const network = useNetwork()
  const isCorrectNetwork = network.chain?.id === CHAIN_ID

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

  if (!isCorrectNetwork) {
    return <WrongNetwork onPrev={prev} />
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
  const [approveNeeded, setApproveNeeded] = useState(false)
  const { tokenSymbol, previewUrl } = useSpectralize()

  // Only to keep track of the number of transactions needed
  const mintAndSpectralizeStatus = mintAndSpectralize.status
  useEffect(() => {
    if (mintAndSpectralizeStatus.startsWith("approve:")) {
      setApproveNeeded(true)
    }
  }, [mintAndSpectralizeStatus])

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

  const asyncTaskProps = {
    title: "Fractionalizing NFT",
    preview: previewUrl ?? undefined,
  }

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
          .when((s) => s.startsWith("store-nft:"), () => {
            const status = mintAndSpectralize.status.replace("store-nft:", "")
            if (!isMutationStatus(status)) {
              throw new Error("Wrong status:" + status)
            }
            return (
              <AsyncTask
                mode={{
                  type: "async-task",
                  description() {
                    return match(mintAndSpectralize.status)
                      .with(
                        "store-nft:loading",
                        "store-nft:success",
                        () =>
                          "The NFT metadata is now being uploaded to IPFS. Please wait and do not close this tab before it completes.",
                      )
                      .with(
                        "store-nft:error",
                        () => "Error when uploading the NFT data.",
                      )
                      .otherwise(() => "")
                  },
                  onRetry() {
                    mintAndSpectralize.restart()
                  },
                  status,
                }}
                {...asyncTaskProps}
              />
            )
          })
          .when((s) => s.startsWith("approve:"), () => {
            const status = mintAndSpectralize.status.replace("approve:", "")
            if (!isSignTxAndWaitStatus(status)) {
              throw new Error("Wrong status:" + status)
            }
            return (
              <AsyncTask
                mode={{
                  type: "transaction",
                  onSign() {
                    mintAndSpectralize.approve()
                  },
                  etherscanUrl: "https://etherscan.io/",
                  githubUrl: "https://github.com/",
                  onRetry() {
                    mintAndSpectralize.approve()
                  },
                  status,
                  current: 1,
                  total: approveNeeded ? 2 : 1,
                  txLabel: `Approve transfers`,
                }}
                {...asyncTaskProps}
              />
            )
          })
          .when(
            (s) => s.startsWith("mint-and-fractionalize:"),
            () => {
              const status = mintAndSpectralize.status.replace(
                "mint-and-fractionalize:",
                "",
              )
              if (!isSignTxAndWaitStatus(status)) {
                throw new Error("Wrong status:" + status)
              }
              return (
                <AsyncTask
                  mode={{
                    type: "transaction",
                    current: approveNeeded ? 2 : 1,
                    etherscanUrl: "https://etherscan.io/",
                    githubUrl:
                      "https://github.com/spectrexyz/protocol/blob/1cc7a31ebef753a5a8ac6b39d7b733e93d7cece7/contracts/channeler/Channeler.sol#L63-L66",
                    onRetry() {
                      mintAndSpectralize.mint()
                    },
                    onSign() {
                      mintAndSpectralize.mint()
                    },
                    status,
                    total: approveNeeded ? 2 : 1,
                    txLabel: `Locking NFT & minting ${tokenSymbol}`,
                  }}
                  {...asyncTaskProps}
                />
              )
            },
          )
          .with("success", () => (
            <AsyncTask
              mode={{
                type: "success",
                description:
                  "Your transaction is confirmed and your NFT has been fractionalized. "
                  + "You can see all the information in the detail page.",
                action: ["Go to the NFT page", () => {}],
              }}
              {...asyncTaskProps}
              title="One has become multitude"
            />
          ))
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

function WrongNetwork({ onPrev }: { onPrev: () => void }) {
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

  const switchNetwork = useSwitchNetwork()
  const network = useNetwork()

  const buttonLabel = layout.value({
    small: `Switch to ${network.chains[0]?.name}`,
    medium: `Switch to the ${network.chains[0]?.name} network`,
  })

  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack: onPrev }}>
      <div
        css={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3gu",
          maxWidth: contentMaxWidth,
          margin: "0 auto",
          padding: contentPadding,
          paddingTop: "8gu",
          textAlign: "center",
        }}
      >
        <div>
          Your wallet is connected to the wrong network.{" "}
        </div>
        <div>
          <Button
            label={buttonLabel}
            onClick={() => {
              switchNetwork.switchNetwork?.(CHAIN_ID)
            }}
          />
        </div>
      </div>
    </AppScreen>
  )
}
