import {
  AddressBadge,
  Button,
  ButtonIcon,
  ButtonIconLabel,
  IconEnvelopeSimple,
  IconGearSix,
  IconLinkSimple,
  IconPencil,
  IconTwitterLogo,
  isAddressOrEnsName,
  noop,
  Tabs,
} from "kit"
import { useCallback, useMemo } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { Grid } from "../AppLayout/Grid"
import { NftCard } from "../NftCard"
import { useSnftCreator, useSnftsByCreator } from "../snft-hooks"
import { useLayout } from "../styles"
import { useIsConnectedAddress } from "../web3-hooks"

const resolvedAddress = "0xfabe062eb33af3e68eb3329818d0507949c14142"

const tabs = [
  { label: "NFTs", panelId: "nfts", tabId: "nfts-tab" },
  { label: "Fractions", panelId: "fractions", tabId: "fractions-tab" },
  { label: "Pools", panelId: "pools", tabId: "pools-tab" },
  { label: "Rewards", panelId: "rewards", tabId: "rewards-tab" },
  { label: "Proposals", panelId: "proposals", tabId: "proposals-tab" },
]

const panels = [
  ["nfts", ""],
  ["fractions", "/fractions"],
  ["pools", "/pools"],
  ["rewards", "/rewards"],
  ["proposals", "/proposals"],
]

export function ScreenProfile({
  address,
  panel,
}: {
  address: string
  panel: "nfts" | "fractions" | "pools" | "rewards" | "proposals"
}) {
  const [, setLocation] = useLocation()
  const layout = useLayout()
  const snfts = useSnftsByCreator(address)
  const creator = useSnftCreator(address)

  if (!isAddressOrEnsName(address)) {
    throw new Error(`Wrong address: ${address}`)
  }

  const isConnectedAddress = useIsConnectedAddress(address)

  const tabIndex = useMemo(() => (
    panels.findIndex(([_panel]) => _panel === panel)
  ), [panel])

  const handleSelectPanel = useCallback(
    (index: number) => {
      if (panels[index]) {
        setLocation(`/${address}${panels[index][1]}`)
      }
    },
    [address, setLocation],
  )

  const maxWidth = layout.value({
    small: "100%",
    large: "160gu",
  })

  const spaceBelowTabs = layout.value({
    small: "3gu",
    xlarge: "8gu",
  })

  return (
    <AppScreen compactBar={null} loading={!creator.data}>
      {creator.data && (
        <>
          <div
            css={{
              width: "100%",
              maxWidth,
              margin: "0 auto",
              paddingTop: "6gu",
            }}
          >
            <div css={{ height: "52gu" }}>
              {creator.data && (
                <header
                  css={{
                    position: "relative",
                    paddingBottom: "8gu",
                    textAlign: "center",
                  }}
                >
                  <div
                    css={{
                      overflow: "hidden",
                      width: "120px",
                      height: "120px",
                      margin: "0 auto",
                      borderRadius: "50%",
                      "img": {
                        display: "block",
                      },
                    }}
                  >
                    <img
                      alt=""
                      height="120"
                      src={creator.data.avatar}
                      width="120"
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
                    title={creator.data.bio}
                    css={({ colors }) => ({
                      maxWidth: "60gu",
                      margin: "0 auto",
                      paddingTop: "3gu",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: colors.accent2,
                    })}
                  >
                    {creator.data.bio}
                  </div>
                  <div css={{ paddingTop: "4gu" }}>
                    <ButtonIcon icon={<IconLinkSimple />} label="Website" />
                    <ButtonIcon
                      icon={<IconEnvelopeSimple />}
                      label="Email"
                    />
                    <ButtonIcon
                      icon={<IconTwitterLogo />}
                      label="Twitter"
                    />
                  </div>

                  {isConnectedAddress.data && (
                    <div
                      css={{
                        position: "absolute",
                        inset: "0 2gu auto auto",
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
                  )}
                </header>
              )}
            </div>
            <Tabs
              compact={layout.below("xlarge")}
              fullWidth={layout.below("xlarge")}
              items={tabs}
              onSelect={handleSelectPanel}
              selected={tabIndex}
            />
          </div>
          <div
            css={{
              maxWidth,
              margin: "0 auto",
              paddingTop: spaceBelowTabs,
            }}
          >
            {panel === "nfts" && snfts.data && (
              <Grid>
                {snfts.data.map((snft) => (
                  <NftCard
                    key={snft.id}
                    snft={snft}
                    action={isConnectedAddress.data && (
                      <Button label="Fractionalize" mode="primary" wide />
                    )}
                  />
                ))}
              </Grid>
            )}
          </div>
        </>
      )}
    </AppScreen>
  )
}
