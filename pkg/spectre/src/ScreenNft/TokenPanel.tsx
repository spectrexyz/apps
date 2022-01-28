import React, { useCallback, useRef, useState } from "react"
import { css } from "@emotion/react"
import {
  Anchor,
  Button,
  ButtonIcon,
  IconHeartStraightFilled,
  IconLifebuoy,
  IconMagnifyingGlassPlus,
  Info,
  Popup,
} from "kit"
import { useLocation } from "wouter"
import { PanelDetails } from "./PanelDetails"
import { PanelSection } from "./PanelSection"
import { ViewArea } from "./ViewArea"

const PARAMETER_DESC = `
  Do you want a jelly baby? Don't be sad Grace. You'll do great things. Jamie,
  remind me to give you a lesson in tying knots, sometime. This thing is
  smaller on the inside than it is on the outside.
`

const PARAMETERS: [string, string][] = [
  ["Starting price", "1$"],
  ["Allocation ration", "10%"],
  ["Maximun supply cap", "1,000,000 tokens"],
  ["Minting fee", "1%"],
  ["Liquidity pool weight at start", "80% ETH / 20% LOST"],
  ["Liquidity pool weight at end", "20% ETH / 80% LOST"],
  ["Buyout multiplier", "x1.5"],
  ["Buyout proposal timeframe", "1 week"],
  ["Liquidity ratio", "10%"],
  ["Trading fee", "1%"],
]

const PERF_METRICS: [string, string][] = [
  ["Price", "$1.57"],
  ["Total market cap", "$1,081,543.44"],
  ["Minted supply", "68%"],
  ["Liquidity pool weight", "37% / 63%"],
]

export function TokenPanel({ id }: { id: string }) {
  const [_, setLocation] = useLocation()
  return (
    <section>
      <ViewArea
        actionButtons={
          <>
            <ButtonIcon
              icon={<IconHeartStraightFilled />}
              mode="outline"
              label="Add to favorites"
            />
            <ButtonIcon
              icon={<IconMagnifyingGlassPlus />}
              mode="outline"
              label="Zoom"
            />
          </>
        }
        labelDisplay="FRACTIONALIZED"
        label="Fractionalized"
      >
        <div
          css={css`
            height: 20gu;
          `}
        >
          s-token
        </div>
      </ViewArea>
      <PanelDetails
        title="$SUB277"
        primary={
          <>
            <PanelSection>
              <div
                css={css`
                  p + p {
                    margin-top: 3gu;
                  }
                `}
              >
                <p>
                  <Anchor href="https://example.org/">
                    Token contract link
                  </Anchor>
                </p>
                <p>
                  Strictly speaking, it’s the fifteenth New York since the
                  original, so that makes it
                  New-New-New-New-New-New-New-New-New-New-New-New-New New York.
                </p>
                <div
                  css={css`
                    padding-top: 5gu;
                  `}
                >
                  <Button
                    label="Buy $SUB277 token"
                    mode="primary"
                    onClick={() => {
                      setLocation(`/nfts/${id}/buy`)
                    }}
                  />
                </div>
              </div>
            </PanelSection>
            <PanelSection title="Fractionalization parameters">
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  gap: 2gu;
                `}
              >
                {PARAMETERS.map(([label, value]) => (
                  <Parameter key={label + value} label={label} value={value} />
                ))}
              </div>
            </PanelSection>
            <PanelSection title="Performance metrics">
              <LabelledValues values={PERF_METRICS} cols={2} />
            </PanelSection>
          </>
        }
        secondary={
          <>
            <Info icon={<IconLifebuoy />} title="Token health tip">
              There’s something else I’ve always wanted to say: Allons-y,
              Alonso! I’m sorry. I’m so sorry. Goodbye…my Sarah Jane! Don’t you
              think she looks tired? Oh, yes. Harmless is just the word: that’s
              why I like it! Doesn’t kill, doesn’t wound, doesn’t maim. But I’ll
              tell you what it does do: it is very good at opening doors.
            </Info>
            <PanelSection title="Performance metrics">
              <LabelledValues values={PERF_METRICS} cols={1} />
            </PanelSection>
          </>
        }
      />
    </section>
  )
}

function Parameter({ label, value }: { label: string; value: string }) {
  const [popupVisible, setPopupVisible] = useState(false)
  const labelRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  return (
    <>
      <Button
        ref={labelRef}
        label={`${label}: ${value}`}
        mode="flat"
        onClick={() => setPopupVisible(true)}
        css={({ colors, fonts }) => css`
          font-family: ${fonts.families.sans};
          color: ${colors.contentHeading};
        `}
      />
      <Popup
        onClose={useCallback(() => setPopupVisible(false), [])}
        opener={labelRef}
        visible={popupVisible}
      >
        <section
          css={css`
            padding: 3gu;
          `}
        >
          <h1
            css={({ colors }) => css`
              padding-bottom: 1gu;
              text-transform: uppercase;
              color: ${colors.contentHeading};
            `}
          >
            {label}
          </h1>
          <p
            css={({ colors, fonts }) => css`
              font-family: ${fonts.families.sans};
              color: ${colors.contentHeading2};
            `}
          >
            {PARAMETER_DESC}
          </p>
        </section>
      </Popup>
    </>
  )
}

function LabelledValues({
  cols = 1,
  values,
}: {
  cols: number
  values: [label: string, value: string][]
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-auto-rows: auto;
        grid-template-columns: repeat(${cols}, 1fr);
        gap: 3gu;
      `}
    >
      {values.map(([label, value]) => (
        <LabelledValue key={label + value} label={label} value={value} />
      ))}
    </div>
  )
}

function LabelledValue({ label, value }: { label: string; value: string }) {
  return (
    <section>
      <h1>{label}</h1>
      <div
        css={({ fonts }) => css`
          font-family: ${fonts.families.mono};
          font-size: 32px;
          font-weight: 400;
        `}
      >
        {value}
      </div>
    </section>
  )
}
