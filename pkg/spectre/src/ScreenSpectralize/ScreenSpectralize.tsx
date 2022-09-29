import type { SpectralizeStatus } from "./use-spectralize"

import { Button, Steps } from "moire"
import { useCallback, useEffect } from "react"
import { match, P } from "ts-pattern"
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
    spectralizeStatus,
    updateSpectralizeStatus,
  } = useSpectralize()

  useEffect(() => {
    fillDemoData()
  }, [fillDemoData])

  const prev = useCallback(() => {
    if (spectralizeStatus !== "configure") {
      if (confirm("Are you sure you want to abandon?")) {
        updateSpectralizeStatus("configure")
      }
      return
    }
    if (currentStep === 0) {
      setLocation("/")
    } else {
      prevStep()
    }
  }, [
    currentStep,
    prevStep,
    setLocation,
    spectralizeStatus,
    updateSpectralizeStatus,
  ])

  const next = useCallback(() => {
    if (currentStep === STEPS.length - 1) {
      updateSpectralizeStatus("store-nft")
    } else {
      nextStep()
    }
  }, [currentStep, nextStep, updateSpectralizeStatus])

  useEffect(() => {
    resetScroll()
  }, [currentStep, spectralizeStatus, resetScroll])

  if (!isConnected) {
    return <Disconnected onPrev={prev} />
  }

  if (!isCorrectNetwork) {
    return <WrongNetwork onPrev={prev} />
  }

  if (spectralizeStatus === "configure") {
    return <Configure onNext={next} onPrev={prev} />
  }

  return <Spectralize onAbandon={prev} />
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

  return (
    <AppScreen
      compactBar={layout.below("medium") && {
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
      }}
    >
      <div
        css={{
          display: "flex",
          gap: layout.value({
            small: "3.5gu",
            large: "4gu",
            xlarge: "8gu",
          }),
          flexDirection: layout.below("medium") ? "column" : "row",
          width: "100%",
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          padding: layout.value({
            small: "0 3gu",
            medium: "0 3gu",
            large: "0",
          }),
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

function Spectralize(
  {
    onAbandon,
    pauseOnSuccess = 500,
  }: {
    onAbandon: () => void
    pauseOnSuccess?: number
  },
) {
  const layout = useLayout()
  const [, setLocation] = useLocation()
  const {
    previewUrl,
    spectralizeStatus,
    updateSpectralizeStatus,
  } = useSpectralize()

  const {
    approvalNeeded,
    approve,
    approveReset,
    approveStatus,
    mint,
    mintReset,
    mintStatus,
    snftId,
    storeNftRetry,
    storeNftStatus,
  } = useCompleteMintAndSpectralize()

  const asyncTaskProps = {
    title: "Mint & fractionalize NFT",
    preview: previewUrl ?? undefined,
  }

  useEffect(() => {
    let newStatus: null | SpectralizeStatus = null
    if (spectralizeStatus === "store-nft" && storeNftStatus === "success") {
      newStatus = approvalNeeded ? "approve" : "mint-and-fractionalize"
    }
    if (spectralizeStatus === "approve" && approveStatus === "tx:success") {
      newStatus = "mint-and-fractionalize"
    }
    if (
      spectralizeStatus === "mint-and-fractionalize"
      && mintStatus === "tx:success"
    ) {
      newStatus = "done"
    }

    if (newStatus === null) {
      return
    }

    // No delay after the NFT metadata storage (only after non final txes)
    if (spectralizeStatus === "store-nft") {
      updateSpectralizeStatus(newStatus)
      return
    }

    // No delay after the last tx
    if (newStatus === "done") {
      updateSpectralizeStatus(newStatus)
      return
    }

    const delayTimer = setTimeout(() => {
      if (newStatus) {
        updateSpectralizeStatus(newStatus)
      }
    }, pauseOnSuccess)

    return () => {
      clearTimeout(delayTimer)
    }
  }, [
    approvalNeeded,
    approveStatus,
    mintStatus,
    pauseOnSuccess,
    spectralizeStatus,
    storeNftStatus,
    updateSpectralizeStatus,
  ])

  useEffect(() => {
    if (snftId) {
      localStorage.setItem("indexing-snft", snftId)
    }
  }, [snftId])

  const canAbandon = match(spectralizeStatus)
    .with(
      "store-nft",
      () => storeNftStatus !== "loading",
    )
    .with(
      "approve",
      () => approveStatus !== "tx:loading",
    )
    .with(
      "mint-and-fractionalize",
      () => mintStatus !== "tx:loading",
    )
    .otherwise(() => true)

  return (
    <AppScreen
      compactBar={{
        title: "Fractionalize",
        onBack: onAbandon,
        disableOnBack: !canAbandon,
      }}
    >
      <div
        css={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {match(spectralizeStatus)
          .with("store-nft", () => {
            if (!isMutationStatus(storeNftStatus)) {
              throw new Error(`Wrong status: ${storeNftStatus}`)
            }
            return (
              <AsyncTask
                jobDescription="You will be asked to sign a transaction in your wallet."
                jobTitle="Uploading metadata to IPFS…"
                mode={{
                  type: "async-task",
                  action: ["Approve", null],
                  description: () => (
                    match(storeNftStatus)
                      .with(
                        P.union("loading", "success"),
                        () =>
                          "The NFT metadata is now being uploaded to IPFS. "
                          + "Please wait and do not close this tab before it completes.",
                      )
                      .with(
                        "error",
                        () => "Error when uploading the NFT data.",
                      )
                      .otherwise(() => "")
                  ),
                  onRetry() {
                    storeNftRetry()
                  },
                  status: storeNftStatus === "success"
                    ? "idle"
                    : storeNftStatus,
                }}
                onAbandon={canAbandon ? onAbandon : undefined}
                {...asyncTaskProps}
              />
            )
          })
          .with("approve", () => {
            if (!isSignTxAndWaitStatus(approveStatus)) {
              throw new Error(`Wrong status: ${approveStatus}`)
            }
            return (
              <AsyncTask
                jobDescription="You will be asked to sign a transaction in your wallet."
                jobTitle={"Approve NFT transfer"}
                mode={{
                  type: "transaction",
                  onSign() {
                    approve()
                  },
                  etherscanUrl: "https://etherscan.io/",
                  githubUrl: "https://github.com/",
                  onRetry() {
                    approveReset()
                  },
                  status: approveStatus,
                  current: 1,
                  total: approvalNeeded ? 2 : 1,
                  signLabel: "Approve",
                }}
                onAbandon={canAbandon ? onAbandon : undefined}
                {...asyncTaskProps}
              />
            )
          })
          .with("mint-and-fractionalize", () => {
            if (!isSignTxAndWaitStatus(mintStatus)) {
              throw new Error(`Wrong status: ${mintStatus}`)
            }
            return (
              <AsyncTask
                jobDescription={match(mintStatus)
                  .with(
                    "tx:success",
                    () => "The NFT has been minted and fractionalized.",
                  )
                  .with(
                    "sign:loading",
                    () => "Waiting for signature… please check your wallet.",
                  )
                  .otherwise(() =>
                    "You will be asked to sign a transaction in your wallet."
                  )}
                jobTitle={mintStatus === "tx:success"
                  ? "Transaction confirmed"
                  : "Mint & fractionalize"}
                mode={{
                  type: "transaction",
                  current: approvalNeeded ? 2 : 1,
                  etherscanUrl: "https://etherscan.io/",
                  githubUrl:
                    "https://github.com/spectrexyz/protocol/blob/1cc7a31ebef753a5a8ac6b39d7b733e93d7cece7/contracts/channeler/Channeler.sol#L63-L66",
                  onRetry() {
                    mintReset()
                  },
                  onSign() {
                    mint()
                  },
                  status: mintStatus,
                  total: approvalNeeded ? 2 : 1,
                  signLabel: "Fractionalize",
                }}
                onAbandon={canAbandon ? onAbandon : undefined}
                {...asyncTaskProps}
              />
            )
          })
          .with("done", () => (
            <AsyncTask
              jobDescription="The NFT has been minted and fractionalized."
              jobTitle="Transaction confirmed"
              mode={{
                type: "success",
                description:
                  "Your transaction is confirmed and your NFT has been fractionalized. "
                  + "You can see all the information in the detail page.",
                action: ["Go to the NFT page", () => {
                  setLocation(`/nfts/${snftId}`)
                }],
              }}
              {...asyncTaskProps}
            />
          ))
          .otherwise(() => null)}
      </div>
    </AppScreen>
  )
}

function Disconnected({ onPrev }: { onPrev: () => void }) {
  const layout = useLayout()
  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack: onPrev }}>
      <div
        css={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          padding: layout.value({
            small: "0 3gu",
            medium: "0 3gu",
            large: "0",
          }),
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
  const switchNetwork = useSwitchNetwork()
  const network = useNetwork()
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
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          padding: layout.value({
            small: "0 3gu",
            medium: "0 3gu",
            large: "0",
          }),
          paddingTop: "8gu",
          textAlign: "center",
        }}
      >
        <div>
          Your wallet is connected to the wrong network.{" "}
        </div>
        <div>
          <Button
            label={layout.value({
              small: `Switch to ${network.chains[0]?.name}`,
              medium: `Switch to the ${network.chains[0]?.name} network`,
            })}
            onClick={() => {
              switchNetwork.switchNetwork?.(CHAIN_ID)
            }}
          />
        </div>
      </div>
    </AppScreen>
  )
}
