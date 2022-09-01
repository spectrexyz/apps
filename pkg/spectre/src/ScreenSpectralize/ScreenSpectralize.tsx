import type { NftMetadataToBeStored } from "../types"
import type { SpectralizeStatus } from "./use-spectralize"

import { useMutation } from "@tanstack/react-query"
import { Steps } from "moire"
import { useCallback, useEffect, useMemo } from "react"
import { useAccount } from "wagmi"
import { useLocation } from "wouter"
import { useResetScroll } from "../App/AppScroll"
import { AppScreen } from "../AppLayout/AppScreen"
import { NFT_STORAGE_KEY } from "../environment"
import { useLayout } from "../styles"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"
import { StepSummary } from "./StepSummary"
import { useSpectralize } from "./use-spectralize"

const STEPS = [Step1, Step2, Step3, StepSummary]

export function ScreenSpectralize() {
  const [, setLocation] = useLocation()
  const { isConnected } = useAccount()

  const resetScroll = useResetScroll()
  const {
    currentStep,
    description,
    file,
    fileType,
    // fillDemoData,
    nextStep,
    prevStep,
    previewFile,
    status,
    title,
    updateStatus,
  } = useSpectralize()

  // useEffect(() => {
  //   fillDemoData()
  // }, [fillDemoData])

  const storeNft = useStoreNft()

  const storeNftMetadata = () => {
    const image = fileType === "image" || (fileType === "video" && !previewFile)
      ? file
      : previewFile

    if (image === null || file === null) {
      return
    }

    const metadataBase = {
      description,
      image,
      name: title,
    }

    const metadata: NftMetadataToBeStored = fileType === "image"
      ? {
        ...metadataBase,
        properties: { type: "image" },
      }
      : {
        ...metadataBase,
        animation_url: file,
        properties: { type: fileType as "audio" | "video" },
      }

    storeNft.mutate(metadata)
  }

  const storeNftStatus = storeNft.status
  useEffect(() => {
    if (
      status === "spectralize:nft-upload-data" && storeNftStatus === "success"
    ) {
      updateStatus("spectralize:nft-before-tx")
    }
  }, [status, storeNftStatus])

  const prev = useCallback(() => {
    if (currentStep === 0) {
      setLocation("/")
    } else {
      prevStep()
    }
  }, [currentStep, setLocation, prevStep])

  const next = useCallback(() => {
    if (currentStep === STEPS.length - 1) {
      storeNftMetadata()
      updateStatus("spectralize:nft-upload-data")
    } else {
      nextStep()
    }
  }, [currentStep, nextStep, updateStatus])

  useEffect(() => {
    resetScroll()
  }, [currentStep, resetScroll])

  if (!isConnected) {
    return <Disconnected onPrev={prev} />
  }

  if (status.startsWith("spectralize:")) {
    return (
      <Spectralize
        onPrev={prev}
        status={status}
      />
    )
  }

  // status === "configure"
  return <Configure onNext={next} onPrev={prev} />
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

function useStoreNft() {
  return useMutation(
    async (nftMetadata: NftMetadataToBeStored) => {
      const { NFTStorage } = await import("nft.storage")
      if (!NFTStorage) {
        throw new Error("nft.storage module not loaded properly")
      }
      if (!NFT_STORAGE_KEY) {
        throw new Error("NFT_STORAGE_KEY has not been defined")
      }
      const storage = new NFTStorage({ token: NFT_STORAGE_KEY })
      return storage.store(nftMetadata)
    },
  )
}

function Spectralize(
  {
    onPrev,
    status,
  }: {
    onPrev: () => void
    status: SpectralizeStatus
  },
) {
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

  const stepLabel = useMemo(() => {
    if (status === "spectralize:nft-upload-data") return "Uploading NFT data…"
    if (status === "spectralize:nft-before-tx") {
      return "Ready to sign the transaction."
    }
    return "Spectralizing…"
  }, [status])

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
        {stepLabel}
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
