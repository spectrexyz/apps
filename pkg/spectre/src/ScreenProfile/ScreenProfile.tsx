import {
  AddressBadge,
  ButtonIcon,
  ButtonIconLabel,
  IconEnvelopeSimple,
  IconGearSix,
  IconLinkSimple,
  IconPencil,
  IconTwitterLogo,
  noop,
  Tabs,
} from "kit"
import { useState } from "react"
import { AppScreen } from "../AppLayout/AppScreen"
import { Grid } from "../AppLayout/Grid"
import { NftCard } from "../NftCard"
import { useSnftsByCreator } from "../snft-hooks"
import { useLayout } from "../styles"

const resolvedAddress = "0xfabe062eb33af3e68eb3329818d0507949c14142"

const tabs = [
  { label: "NFTs", panelId: "nfts", tabId: "nfts-tab" },
  { label: "Fractions", panelId: "fractions", tabId: "fractions-tab" },
  { label: "Pools", panelId: "pools", tabId: "pools-tab" },
  { label: "Rewards", panelId: "rewards", tabId: "rewards-tab" },
  { label: "Proposals", panelId: "proposals", tabId: "proposals-tab" },
]

export function ScreenProfile({
  address,
}: {
  address: string
}) {
  const layout = useLayout()
  const [activeTab, setActiveTab] = useState(0)
  const snfts = useSnftsByCreator(address)
  return (
    <AppScreen compactBar={null}>
      <div
        css={{
          width: "100%",
          maxWidth: "160gu",
          margin: "0 auto",
          paddingTop: "6gu",
        }}
      >
        <header
          css={{
            position: "relative",
            paddingBottom: "8gu",
            textAlign: "center",
          }}
        >
          <div>
            <img
              alt=""
              height="120"
              src="https://bpier.re/avatar.png"
              width="120"
              css={{
                display: "block",
                margin: "0 auto",
                borderRadius: "50%",
              }}
            />
          </div>
          <div css={{ paddingTop: "3gu", fontSize: "32px" }}>
            {address}
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingTop: "2gu",
            }}
          >
            <AddressBadge
              address={resolvedAddress}
              rounded
              showCopy
              showExplore
            />
          </div>
          <div
            css={({ colors }) => ({
              paddingTop: "3gu",
              color: colors.accent2,
            })}
          >
            WWW · OSS · P2P · GUI
          </div>
          <div css={{ paddingTop: "4gu" }}>
            <ButtonIcon icon={<IconLinkSimple />} label="Website" />
            <ButtonIcon icon={<IconEnvelopeSimple />} label="Email" />
            <ButtonIcon icon={<IconTwitterLogo />} label="Twitter" />
          </div>

          <div
            css={{
              position: "absolute",
              inset: "0 0 auto auto",
              display: "flex",
              flexDirection: "column",
              gap: "1.5gu",
            }}
          >
            <ButtonIconLabel
              icon={<IconGearSix />}
              label="Settings"
              labelPosition="left"
              onClick={noop}
            />
            <ButtonIconLabel
              icon={<IconPencil />}
              label="Edit profile"
              labelPosition="left"
              onClick={noop}
            />
          </div>
        </header>
        <Tabs
          compact={layout.below("xlarge")}
          fullWidth={layout.below("xlarge")}
          items={tabs}
          onSelect={setActiveTab}
          selected={activeTab}
        />
      </div>
      <div css={{ paddingTop: "8gu" }}>
        {snfts.data && (
          <Grid>
            {snfts.data.map((snft) => (
              <NftCard
                key={snft.id}
                snft={snft}
              />
            ))}
          </Grid>
        )}
      </div>
    </AppScreen>
  )
}
