import React from "react"
import { css } from "@emotion/react"
import { Button, Fieldset, Slider, TokenInput } from "kit"

import { useLayout } from "../styles"
import { useSpectralize } from "./use-spectralize"

type Step3Props = {
  title: string
  onPrev: () => void
}

export function Step3({ title, onPrev }: Step3Props) {
  const data = useSpectralize()
  const layout = useLayout()

  const introPadding = layout.value({
    small: css`2gu 0`,
    medium: css`2gu 0`,
    large: css`1.5gu 0 1gu`,
  })
  const flexGap = layout.value({
    small: css`3.5gu`,
    xlarge: css`5gu`,
  })

  return (
    <div
      css={css`
        display: flex;
        gap: ${flexGap};
        flexDirection: ${layout.below("medium") ? "column" : "row"};
        width: 100%;
      `}
    >
      <div
        css={({ colors }) => css`
          padding: ${layout.below("medium") ? "0" : css`4.5gu 5gu 3gu`};
          background: ${layout.below("medium") ? "none" : colors.background};
        `}
      >
        {!layout.below("medium") ? (
          <h1
            css={({ fonts }) => css`
              font-family: ${fonts.families.mono};
              font-size: 18px;
              text-transform: uppercase;
            `}
          >
            {title}
          </h1>
        ) : (
          <div
            css={css`
              height: 6gu;
            `}
          />
        )}
        <p
          css={({ colors, fonts }) => css`
            padding: ${introPadding};
            font-family: ${fonts.families.sans};
            font-size: 14px;
            color: ${colors.contentDimmed};
          `}
        >
          Set the economic values of the NFT’s fractions. These will determine
          the amount of fractions that can be minted, the starting price, as
          well as the initial price to buy back the NFT.
        </p>
        <div
          css={css`
            display: grid;
            grid-template-columns: 42gu 1fr;
            gap: 8.75gu;
          `}
        >
          <div>
            <Fieldset label="NFT buyout price">
              <TokenInput value="50" onChange={() => {}} symbol="ETH" />
            </Fieldset>
            <Fieldset label="Total market cap">
              <TokenInput value="50" onChange={() => {}} symbol="ETH" />
            </Fieldset>
            <Fieldset label="Initial token price">
              <TokenInput value="0.001" onChange={() => {}} symbol="ETH" />
            </Fieldset>
          </div>
          <div>
            <Fieldset
              label="Max token supply cap"
              contextual={
                <span
                  css={({ colors }) => css`
                    font-size: 18px;
                    colors: ${colors.contentDimmed};
                  `}
                >
                  {data.rewardsPct}%
                </span>
              }
            >
              <Slider labels={["1K", "1B"]} onChange={(v) => {}} value={0.5} />
            </Fieldset>
            <Fieldset
              label="Buyout multiplier"
              contextual={
                <span
                  css={({ colors }) => css`
                    font-size: 18px;
                    colors: ${colors.contentDimmed};
                  `}
                >
                  {data.rewardsPct}%
                </span>
              }
            >
              <Slider labels={["1x", "5x"]} onChange={(v) => {}} value={0.5} />
            </Fieldset>
          </div>
        </div>

        <section>Advanced parameters</section>

        {layout.below("medium") ? (
          <div
            css={css`
              padding: 3gu 0;
            `}
          >
            <Button
              type="submit"
              label="Next"
              mode="primary-2"
              shadowInBox
              wide
            />
          </div>
        ) : (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              gap: 2gu;
              padding-top: 3gu;
            `}
          >
            <Button
              label="Back"
              mode="secondary-2"
              shadowInBox
              onClick={onPrev}
            />
            <Button type="submit" label="Next" mode="primary-2" shadowInBox />
          </div>
        )}
      </div>
    </div>
  )
}
