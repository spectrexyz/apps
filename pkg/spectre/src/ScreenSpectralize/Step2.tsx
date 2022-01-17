import { ReactNode } from "react"
import { css } from "@emotion/react"
import {
  Badge,
  Button,
  ButtonIcon,
  Fieldset,
  IconPlus,
  IconTrash,
  Slider,
  TextInput,
  gu,
} from "kit"

import { useLayout } from "../styles"
import { useSpectralize } from "./use-spectralize"

const REWARDS_MAX = 50

type Step2Props = {
  title: string
  onPrev: () => void
}

export function Step2({ title, onPrev }: Step2Props) {
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
        flex-direction: ${layout.below("medium") ? "column" : "row"};
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
          Add the name and symbol of your token – this will be used to name your
          NFT fractions. Also, decide on the % of minting rewards that you’d
          like to assign to yourself and others, such as collaborators, friends,
          supporters, etc.
        </p>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8.75gu;
          `}
        >
          <div>
            <Fieldset label="Token name">
              <TextInput
                onChange={(value: string) => data.updateTokenName(value)}
                placeholder="Token"
                value={data.tokenName}
              />
            </Fieldset>
            <Fieldset label="Token symbol">
              <TextInput
                onChange={(value: string) => data.updateTokenSymbol(value)}
                placeholder="TKN"
                value={data.tokenSymbol}
              />
            </Fieldset>
          </div>
          <div>
            <Fieldset
              label="Creator & community rewards"
              contextual={
                <span
                  css={({ colors }) => css`
                    font-size: 18px;
                    colors: ${colors.contentDimmed};
                  `}
                >
                  {data.rewards}%
                </span>
              }
            >
              <Slider
                keyboardStep={(value, dir) =>
                  Math.round((value + (1 / REWARDS_MAX) * dir) * 1000) / 1000
                }
                labels={["0%", `${REWARDS_MAX}%`]}
                onChange={(value) =>
                  data.updateRewards(Math.round(value * REWARDS_MAX))
                }
                value={data.rewards / REWARDS_MAX}
              />
            </Fieldset>

            <Fieldset label="Split creator & community rewards">
              <div
                css={css`
                  padding-bottom: 2gu;
                `}
              >
                <EthAddressRow
                  address="pierre.eth"
                  onRemove={() => {}}
                  reward={`${data.rewards}%`}
                />
                <EthAddressRow
                  address="pierre.eth"
                  onRemove={() => {}}
                  reward={`${data.rewards}%`}
                />
              </div>

              <Button
                icon={<IconPlus />}
                label="Add ETH address"
                mode="flat-3"
                size="compact"
                css={css`
                  text-transform: uppercase;
                `}
              />
            </Fieldset>
          </div>
        </div>

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

function EthAddressRow({
  address,
  onRemove,
  reward,
}: {
  address: string
  onRemove: () => void
  reward: ReactNode
}) {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-top: 1.5gu;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            width: 22gu;
          `}
        >
          <Badge
            label={
              <span
                css={({ colors }) => css`
                  font-size: 16px;
                  color: ${colors.accent};
                `}
              >
                {address}
              </span>
            }
          />
        </div>
        <ButtonIcon
          icon={<IconTrash size={2.5 * gu} />}
          label="Remove"
          onClick={onRemove}
          css={css`
            width: 3gu;
            height: 3gu;
          `}
        />
      </div>
      <span
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          font-size: 18px;
          color: ${colors.contentDimmed};
        `}
      >
        {reward}
      </span>
    </div>
  )
}
