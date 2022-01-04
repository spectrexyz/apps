import React from "react"
import { css } from "@emotion/react"
import { Button, Fieldset, TextInput } from "kit"

import { useLayout } from "../styles.js"
import { useSpectralize } from "./use-spectralize.js"

export function Step3({ title, onPrev }) {
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
                onChange={data.updateTokenName}
                placeholder="Token"
                value={data.tokenName}
              />
            </Fieldset>
            <Fieldset label="Token symbol">
              <TextInput
                onChange={data.updateTokenSymbol}
                placeholder="TKN"
                value={data.tokenSymbol}
              />
            </Fieldset>
          </div>
          <div>
            <Fieldset label="NFT description">
              <TextInput
                multiline
                onChange={data.updateDescription}
                value={data.description}
                css={css`
                  height: 8em;
                `}
              />
            </Fieldset>

            <Fieldset label="Your name / alias">
              <TextInput
                onChange={data.updateAuthorName}
                value={data.authorName}
              />
            </Fieldset>

            <Fieldset label="Email">
              <TextInput
                onChange={data.updateDescription}
                value={data.description}
              />
            </Fieldset>

            <Fieldset label="ENS Domain">
              <TextInput
                onChange={data.updateDescription}
                value={data.description}
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
              label="Cancel"
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
