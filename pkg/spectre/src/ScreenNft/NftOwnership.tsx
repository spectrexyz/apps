import type { Dnum } from "dnum"
import type { ReactNode } from "react"
import type { Snft } from "../types"

import dnum from "dnum"
import {
  AddressBadge,
  Button,
  calculateShares,
  Distribution,
  divideRoundBigInt,
  formatAmount,
  Percentage,
  RadioBox,
  RadioGroup,
} from "kit"
import { useEffect, useMemo, useState } from "react"
import { useInView } from "react-cool-inview"
import { useLabelStyle, useLayout } from "../styles"
import { PanelSection } from "./PanelSection"

type DisplayMode = "distribution" | "minted-supply"

const EMPTY_COLOR = "#58FFCA"
const MINTED_SUPPLY_COLOR = "#F8FFA6"
const DISTRIBUTION_COLORS = [
  "#6584E0",
  "#C0BBFF",
  "#F8FFA6",
  "#A0A8C2",
  "#F597F8",
]

function distributionColor(groupIndex: number, mode?: string) {
  return mode === "percentage"
    ? MINTED_SUPPLY_COLOR
    : DISTRIBUTION_COLORS[groupIndex % DISTRIBUTION_COLORS.length]
}

export function NftOwnership({ snft }: { snft: Snft }) {
  const distributionInView = useInView()
  const [showDistribution, setShowDistribution] = useState(false)
  const [mode, setMode] = useState<DisplayMode>("distribution")
  const layout = useLayout()

  const { inView } = distributionInView
  useEffect(() => {
    if (inView) {
      setShowDistribution(true)
    }
  }, [inView])

  const { decimals, distribution, minted, supply } = snft.token

  const shares = useMemo(
    () =>
      calculateShares(
        distribution.map((s) => s.quantity),
      ),
    [decimals, distribution],
  )

  const mintedValue = useMemo(() => [
    Number(divideRoundBigInt(minted[0] * 100n, supply[0])),
  ], [minted, supply])

  return (
    <PanelSection
      ref={distributionInView.observe}
      title="Collective ownership"
    >
      <RadioGroup selected={mode} onChange={setMode}>
        <div
          css={layout.below("xlarge")
            ? {
              display: "grid",
              gridTemplateColumns: "100%",
              gridTemplateRows: "auto auto",
              gap: "3gu",
              width: "100%",
            }
            : { display: "flex", gap: "3gu", padding: "1gu 0 2gu" }}
        >
          <RadioBox
            id="distribution"
            label="Distribution"
            mode="alt"
            secondary="Tokens that are in circulation and collectivelly owned from the minted token supply."
          />
          <RadioBox
            id="minted-supply"
            label="Minted supply"
            mode="alt"
            secondary="Tokens that have been minted so far in relation to the total token supply cap."
          />
        </div>
      </RadioGroup>
      <div css={{ display: "flex", justifyContent: "center" }}>
        <Distribution
          color={distributionColor}
          colorEmpty={EMPTY_COLOR}
          startFromEmpty={false}
          values={!showDistribution ? [] : mode === "distribution"
            ? shares.map((s) => s.percentage)
            : mintedValue}
        />
      </div>
      {mode === "distribution"
        ? <DistributionList token={snft.token} shares={shares} />
        : <MintedSupplySummary token={snft.token} />}
    </PanelSection>
  )
}

function DistributionList({ shares, token }: {
  shares: Array<{
    amount: Dnum | null
    index: number
    percentage: number
    type: "amount" | "rest"
  }>
  token: Snft["token"]
}) {
  const layout = useLayout()
  const [more, setMore] = useState(false)
  const { distribution, priceEth, symbol } = token

  useEffect(() => {
    if (shares) {
      setMore(false)
    }
  }, [shares])

  return (
    <div>
      <table
        css={({ colors, fonts }) => ({
          width: "100%",
          "th": {
            textAlign: "right",
            fontSize: "12px",
            fontWeight: "400",
            textTransform: "uppercase",
            color: colors.contentDimmed,
            "&:first-of-type": {
              paddingLeft: "3.25gu",
              textAlign: "left",
            },
          },
          "td": {
            paddingTop: "1.5gu",
            fontSize: "16px",
            fontFamily: fonts.sans,
            textAlign: "right",
            color: colors.content,
            "&:first-of-type": {
              textAlign: "left",
            },
          },
        })}
      >
        <thead>
          <tr>
            <th>Addresses</th>
            <th>Ownership</th>
            {!layout.below("xlarge") && (
              <>
                <th>Fractions</th>
                <th>Value</th>
              </>
            )}
          </tr>
        </thead>
        <tbody css={{ "td": { whiteSpace: "nowrap" } }}>
          {(more ? shares : shares.slice(0, 5)).map((share, index) => {
            const address = share.index === -1
              ? null
              : distribution[share.index].address
            return (
              <tr key={index}>
                <td>
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2gu",
                    }}
                  >
                    <Bullet color={distributionColor(index)} />
                    <div css={{ width: "20gu" }}>
                      {address === null
                        ? <BadgeSimple label="Other accounts" />
                        : <AddressBadge address={address} rounded />}
                    </div>
                  </div>
                </td>
                <td>
                  {share.percentage}%
                </td>
                {!layout.below("xlarge") && (
                  <>
                    <td>
                      {share.amount === null
                        ? "−"
                        : dnum.format(share.amount, 2)}{" "}
                      <span
                        css={({ colors }) => ({ color: colors.contentDimmed })}
                      >
                        {symbol}
                      </span>
                    </td>
                    <td>
                      {share.amount === null
                        ? "−"
                        : dnum.format(dnum.multiply(share.amount, priceEth), 2)}
                      {" "}
                      <span
                        css={({ colors }) => ({ color: colors.contentDimmed })}
                      >
                        ETH
                      </span>
                    </td>
                  </>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "3gu",
        }}
      >
        <Button
          label={`Show ${more ? "less" : "more"}`}
          mode="flat-2"
          size="compact"
          uppercase
          onClick={() => setMore((v) => !v)}
        />
      </div>
    </div>
  )
}

function Bullet({ color }: { color: string }) {
  return (
    <div
      css={({ colors }) => ({
        width: "1gu",
        height: "1gu",
        background: color,
        border: `1px solid ${colors.layer2}`,
      })}
    />
  )
}

function BadgeSimple({ label }: { label: ReactNode }) {
  return (
    <div
      css={({ colors, fonts }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "4gu",
        fontSize: "16px",
        fontFamily: fonts.mono,
        textTransform: "uppercase",
        color: colors.accent,
        background: colors.layer1,
        borderRadius: "10gu",
        userSelect: "none",
      })}
    >
      {label}
    </div>
  )
}

function MintedSupplySummary({ token }: { token: Snft["token"] }) {
  const labelStyle = useLabelStyle({ size: "small" })
  const layout = useLayout()
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: layout.below("xlarge") ? "auto" : "auto auto",
        gap: layout.below("xlarge") ? "4gu" : "0",
      }}
    >
      <div>
        <div css={labelStyle}>Minted supply</div>
        <Percentage
          percentage={String(Math.round(
            Number(token.minted * 100n * 10n / token.supply) / 10,
          ))}
        />
        <div
          css={({ colors }) => ({
            fontSize: "16px",
            whiteSpace: "nowrap",
            color: colors.contentDimmed,
            "strong": {
              fontWeight: "400",
              color: colors.content,
            },
          })}
        >
          <strong>{formatAmount(token.minted, 0)}</strong> out of{" "}
          <strong>{formatAmount(token.supply, 0)}</strong> {token.symbol}{" "}
          fractions
        </div>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: layout.below("xlarge") ? "flex-start" : "flex-end",
        }}
      >
        <div css={labelStyle}>You own</div>
        <Percentage
          percentage={"0.14"}
        />
        <div
          css={({ colors }) => ({
            fontSize: "16px",
            whiteSpace: "nowrap",
            color: colors.contentDimmed,
            "strong": {
              fontWeight: "400",
              color: colors.content,
            },
          })}
        >
          <strong>{formatAmount(2825n, 0)}</strong> {token.symbol}
        </div>
      </div>
    </div>
  )
}
