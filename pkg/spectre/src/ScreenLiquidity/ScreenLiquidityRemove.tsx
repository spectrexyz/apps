import type { ReactNode } from "react"

import { Button, gu, IconArrowLeft, Tip, TokenInput } from "moire"
import { useState } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { CenteredContainer } from "../AppLayout/CenteredContainer"
import { useSnft } from "../snft-hooks"
import { useLabelStyle, useLayout } from "../styles"

export function ScreenLiquidityRemove({ id }: { id: string }) {
  const snft = useSnft(id)
  const [, setLocation] = useLocation()
  const layout = useLayout()

  const onBack = () => {
    setLocation(snft.data ? `/nfts/${snft.data?.id}` : "/")
  }

  const title = "Remove liquidity"

  return (
    <AppScreen
      compactBar={layout.below("medium") && { onBack, title }}
      loading={snft.isLoading}
    >
      {!layout.below("medium") && <BackButton onClick={onBack} />}
      <CenteredContainer maxWidth={layout.below("medium") ? null : 75 * gu}>
        <section
          css={({ colors }) => ({
            padding: layout.below("medium") ? "3gu 3gu 0" : "3gu 5gu 5gu",
            background: layout.below("medium")
              ? "transparent"
              : colors.background,
            border: layout.below("medium") ? 0 : `1px solid ${colors.layer2}`,
          })}
        >
          {!layout.below("medium") && (
            <div css={{ display: "flex", justifyContent: "space-between" }}>
              <h1
                css={{
                  display: "flex",
                  alignItems: "center",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </h1>
            </div>
          )}
          <div
            css={{
              width: "100%",
              margin: "0 auto",
              padding: "3gu 0 0",
            }}
          >
            {snft.data && <SwapModule id={snft.data.id} />}

            <Important />

            <div
              css={({ colors }) => ({
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignContent: "end",
                marginTop: "2gu",
                padding: "0 2gu 3gu",
                background: colors.layer2,
                "section:nth-of-type(even):not(:first-of-type)": {
                  textAlign: "right",
                },
              })}
            >
              <Group heading={`ETH per ${snft.data?.token.symbol}`}>
                <p>~ 0.0643709</p>
              </Group>
              <Group heading="Pool share">
                <p>12.56%</p>
              </Group>
              <Group heading={`${snft.data?.token.symbol} per ETH`}>
                <p>~ 0.0643709</p>
              </Group>
              <Group heading="Network fee">
                <p>~ $67.49</p>
              </Group>
            </div>

            <div css={{ paddingTop: "3gu" }}>
              <Button
                label="Remove liquidity"
                mode="primary"
                wide
                shadowInBox
              />
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
      <h1 css={{ ...labelStyle, paddingBottom: "1gu" }}>
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
        When you add liquidity, you will receive pool tokens representing your
        position in the pool. These tokens will earn fees proportional to your
        share and can be redeemed at any time. Opt-in for email notifications
        here.
      </Tip>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  const layout = useLayout()
  return (
    <div
      css={{
        width: "100%",
        maxWidth: layout.value({
          small: "initial",
          medium: "75gu",
          large: "104gu",
          xlarge: "160gu",
        }),
        margin: layout.value({
          small: "4gu auto 0",
          medium: "4gu auto 2gu",
          xlarge: "4gu auto 0",
        }),
      }}
    >
      <Button
        icon={<IconArrowLeft />}
        label="Back"
        mode="outline"
        onClick={onClick}
        size="compact"
      />
    </div>
  )
}

function SwapModule({ id }: { id: string }) {
  const snft = useSnft(id)
  const [ethValue, setEthValue] = useState("100")
  return (
    <div>
      <div
        css={{
          padding: "2gu",
          background: "colors.layer2",
        }}
      >
        <Label label="Remove LP tokens" />
        <div css={{ paddingTop: "1gu" }}>
          <TokenInput
            onChange={setEthValue}
            pair={["ETH", ["MOI", snft.data?.image.url ?? ""]]}
            value={ethValue}
            secondaryStart={
              <>
                <span css={{ color: "colors.contentDimmed" }}>
                  Balance:
                </span>{" "}
                106.970 ETH
              </>
            }
            secondaryEnd="$283,982"
          />
        </div>
        <div css={{ display: "flex", gap: "2gu", paddingTop: "3gu" }}>
          {[
            "25%",
            "50%",
            "75%",
            "Max",
          ].map((label, index) => (
            <Button
              key={index}
              label={label}
              mode="flat-2"
              size="compact"
              uppercase
              wide
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Label({ label }: { label: string }) {
  return (
    <div
      css={{
        fontFamily: "fonts.sans",
        fontSize: "14px",
        color: "colors.contentDimmed",
      }}
    >
      {label}
    </div>
  )
}
