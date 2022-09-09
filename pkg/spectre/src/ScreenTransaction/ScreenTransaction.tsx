import type { SpectralizeStatus } from "../ScreenSpectralize/use-spectralize"

import {
  Button,
  Details,
  gu,
  IconGithubLogo,
  IconShare,
  IconShieldCheck,
  useTheme,
} from "moire"

import dots from "./dots.png"

export function ScreenTransaction({
  mode,
  title,
  txStatus,
}:
  & {
    title: string
  }
  & ({
    mode: "transaction"
    txStatus: SpectralizeStatus
  } | {
    mode: "async-task"
    txStatus?: never
  }))
{
  const { colors } = useTheme()
  return (
    <section
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "5gu 0",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4gu",
          width: "100%",
          paddingTop: "5gu",
          background: "colors.background",
          border: "1px solid colors.layer2",
        }}
      >
        <div
          css={{
            width: "42.5gu",
            aspectRatio: "1",
            background: `colors.background url(${dots}) no-repeat`,
            backgroundSize: "cover",
          }}
        >
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3gu",
            textAlign: "center",
          }}
        >
          <h1 css={{ font: "500 32px fonts.sans" }}>
            {title}
          </h1>
          <p
            css={{
              font: "300 16px fonts.mono",
              color: "colors.contentDimmed",
            }}
          >
            Confirm this transaction in your wallet to continue. Don’t close
            this tab while the transaction is pending.
          </p>
        </div>
        <Button label="Create transaction" mode="primary" />

        <section css={{ width: "100%", paddingBottom: "5gu" }}>
          <Details
            background={colors.background}
            contextual={null}
            heading={
              <span
                css={{
                  display: "flex",
                  gap: "1.5gu",
                  alignItems: "center",
                }}
              >
                <IconShieldCheck
                  size={3 * gu}
                  css={{ color: "colors.accent2" }}
                />
                <span>
                  Contract information
                </span>
              </span>
            }
            headingCentered
            headingColor={colors.contentHeading}
          >
            <div
              css={{
                display: "flex",
                gap: "1.5gu",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button label="Etherscan" mode="flat" icon={<IconShare />} />
              <Button label="GitHub" mode="flat" icon={<IconGithubLogo />} />
            </div>
          </Details>
        </section>
      </div>
    </section>
  )
}
