import React from "react"
import { css } from "@emotion/react"
import {
  Anchor,
  Button,
  ButtonIcon,
  IconHeartStraightFilled,
  IconMagnifyingGlassPlus,
  MoireLabel,
  Slashes,
  formatDate,
  gu,
  useTheme,
} from "kit"
import { Link } from "wouter"
import { SNFTS } from "../demo-data"
import { Distribution } from "../Distribution/Distribution.jsx"
import { PanelDetails } from "./PanelDetails.jsx"
import { PanelSection } from "./PanelSection.jsx"
import { ViewArea } from "./ViewArea.jsx"

function useSnft(_id) {
  return SNFTS.find(({ id }) => id === _id)
}

function useSnftByCreator(creatorAddress, { exclude = [] } = {}) {
  return SNFTS.filter(
    ({ id, creator }) =>
      !exclude.includes(id) && creator.address === creatorAddress
  )
}

export function NftPanel({ id }) {
  const snft = useSnft(id)
  const { colors } = useTheme()
  return (
    <section>
      <ViewArea
        actionButtons={
          <>
            <ButtonIcon icon={<IconHeartStraightFilled />} mode="outline" />
            <ButtonIcon
              external
              href={snft.image}
              icon={<IconMagnifyingGlassPlus />}
              mode="outline"
            />
          </>
        }
        height={62.5 * gu}
        labelDisplay="SPECTRALIZED"
        label="Spectralized"
      >
        <img alt="" src={snft.image} width="500" />
      </ViewArea>
      <PanelDetails
        title={snft.title}
        primary={
          <>
            <PanelSection title="Creator">
              <Button
                label={snft.creator.name}
                mode="flat"
                href={snft.creator.url}
                external
                css={({ fonts }) => css`
                  font-family: ${fonts.families.sans};
                `}
              />
            </PanelSection>
            <PanelSection title="Description">
              <div
                css={css`
                  padding-bottom: 5gu;
                `}
              >
                {snft.description}
              </div>
              <Button label="Create buyout proposal" mode="primary" />
            </PanelSection>
            <PanelSection title="Authenticity">
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 2gu;
                `}
              >
                {snft.authenticity.map(({ name, url }) => (
                  <div key={name + url}>
                    <Button
                      label={"» " + name}
                      mode="flat-2"
                      href={url}
                      external
                      css={({ fonts }) => css`
                        font-family: ${fonts.families.sans};
                      `}
                    />
                  </div>
                ))}
              </div>
            </PanelSection>
            <MoreNfts snftFrom={snft} />
          </>
        }
        secondary={
          <>
            <PanelSection title="Collective ownership distribution">
              <Distribution values={snft.token.distribution} />
            </PanelSection>
            <PanelSection title="History">
              {snft.history.map(({ date, event }, index) => (
                <div key={JSON.stringify(event) + date}>
                  {index > 0 && (
                    <div
                      css={css`
                        padding: 3gu 0;
                      `}
                    >
                      <Slashes color={colors.contentHeading2} />
                    </div>
                  )}
                  <div>
                    {event.map(
                      (value, index) => (
                        <span key={index}>
                          {Array.isArray(value) ? (
                            <Anchor external href={value[1]}>
                              {value[0]}
                            </Anchor>
                          ) : (
                            value
                          )}
                        </span>
                      ),
                      []
                    )}
                  </div>
                  <div
                    css={css`
                      padding-top: 1.5gu;
                    `}
                  >
                    <time dateTime={date} title={formatDate(date, true)}>
                      {formatDate(date)}
                    </time>
                  </div>
                </div>
              ))}
            </PanelSection>
          </>
        }
      />
    </section>
  )
}

function MoreNfts({ snftFrom }) {
  const snfts = useSnftByCreator(snftFrom.creator.address, {
    exclude: snftFrom.id,
  })
  return (
    <PanelSection title="More NFTs from this creator">
      <div
        css={({ colors }) => css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: auto;
          grid-auto-flow: row;
          gap: 9gu 3gu;
          img {
            display: block;
            width: 100%;
            margin-bottom: 2gu;
          }
          img + div {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 5gu;
            font-size: 18px;
            color: ${colors.accent};
            background: ${colors.layer1};
          }
        `}
      >
        {snfts.map((snft) => (
          <Link key={snft.id} href={`/nfts/${snft.id}`}>
            <img src={snft.image} alt="" />
            <div>{snft.title}</div>
          </Link>
        ))}
      </div>
    </PanelSection>
  )
}
