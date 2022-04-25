import type { ReactNode } from "react"

import { Button, ButtonIcon, gu, IconGearSix, Tip } from "kit"
import { useState } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { useLabelStyle, useLayout } from "../styles"
import { SwapModule } from "./SwapModule"

export function ScreenBuy() {
  const [, setLocation] = useLocation()
  const layout = useLayout()
  const [mechanism, setMechanism] = useState<"MINT" | "SWAP">("MINT")
  const [showMechanismWarning, setShowMechanismWarning] = useState(false)
  return (
    <AppScreen
      compactBar={layout.below("medium") && {
        title: "Buy MAGIC",
        onBack: () => setLocation("/"),
      }}
    >
      <CenteredContainer maxWidth={75 * gu}>
        <section
          css={({ colors }) => ({
            padding: "3gu 5gu 5gu",
            background: colors.background,
            border: `1px solid ${colors.layer2}`,
          })}
        >
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <h1
              css={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              Buy MAGIC
            </h1>
            <div css={{ marginRight: "-1gu" }}>
              <ButtonIcon
                icon={<IconGearSix />}
                label="Settings"
              />
            </div>
          </div>
          <div
            css={{
              width: "100%",
              margin: "0 auto",
              padding: "3gu 0",
            }}
          >
            <SwapModule />
            <div
              css={({ colors }) => ({
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignContent: "end",
                padding: "0 2gu 3gu",
                background: colors.layer1,
                "section:first-child": {
                  gridColumn: "span 2",
                },
                "section:nth-child(odd):not(:first-child)": {
                  textAlign: "right",
                },
              })}
            >
              {showMechanismWarning && (
                <Tip
                  title="Change buying mechanism"
                  type="warning"
                  confirmLabel="Swap fractions"
                  onCancel={() => {
                    setShowMechanismWarning(false)
                  }}
                  onConfirm={() => {
                    setMechanism("SWAP")
                    setShowMechanismWarning(false)
                  }}
                >
                  At present, minting fractions from the liquidity pool is the
                  cheapest option to fulfill your buying order. You can override
                  the default mechanism if you prefer to swap fractions instead,
                  but note that the exchange rate will be higher.
                </Tip>
              )}
              {!showMechanismWarning && (
                <Group heading="Buying mechanism">
                  <p>
                    <span css={{ marginRight: "1.5gu" }}>
                      {mechanism === "MINT"
                        ? "Mint fractions"
                        : "Swap fractions"}
                    </span>
                    <Button
                      label={mechanism === "MINT" ? "Change" : "Change to mint"}
                      mode="flat-3"
                      size="mini"
                      uppercase
                      onClick={() => {
                        if (mechanism === "MINT") {
                          setShowMechanismWarning(true)
                        } else {
                          setMechanism("MINT")
                        }
                      }}
                      css={{ color: "#F7B186" }}
                    />
                  </p>
                </Group>
              )}
              <Group heading="Est. price">
                <p>~ 0.0643709 ETH per MOI</p>
              </Group>
              <Group heading="Network fee">
                <p>~ $67.49</p>
              </Group>
              <Group heading="Slippage">
                <p>0.5%</p>
              </Group>
              <Group heading="Creator & community rewards (10%)">
                <p>$120.56</p>
              </Group>
              <Group heading="Minting fee (2%)">
                <p>$27.33</p>
              </Group>
              <Group heading="Protocol fee (1%)">
                <p>$13.42</p>
              </Group>
            </div>

            <Important />

            <div css={{ paddingTop: "3gu" }}>
              <Button label="Place order" mode="primary" wide shadowInBox />
            </div>
          </div>
        </section>
      </CenteredContainer>
    </AppScreen>
  )
}

function Group({
  children,
  heading,
}: {
  children: ReactNode
  heading: ReactNode
}) {
  const labelStyle = useLabelStyle({ size: "small" })
  return (
    <section
      css={({ fonts }) => ({
        paddingTop: "2gu",
        fontFamily: fonts.sans,
        fontSize: "14px",
      })}
    >
      <h1
        css={({ colors }) => ({
          ...labelStyle,
          paddingBottom: "1gu",
        })}
      >
        {heading}
      </h1>
      <div>{children}</div>
    </section>
  )
}

function Important() {
  return (
    <div css={{ paddingTop: "2gu" }}>
      <Tip title="Important">
        Upon approval from the NFT guardian, your fractions will be minted and
        transferred to the connected account. Buying proposals approval may take
        up to one week. Opt-in for email notifications here.
      </Tip>
    </div>
  )
}
