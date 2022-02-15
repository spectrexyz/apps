import {
  Anchor,
  Button,
  Distribution,
  formatDate,
  Slashes,
  useTheme,
} from "kit"
import React, { useEffect, useState } from "react"
import useInView from "react-cool-inview"
import { Link } from "wouter"
import { useSnft, useSnftsByCreator } from "../snft-hooks"
import { Snft } from "../types"
import { PanelDetails } from "./PanelDetails"
import { PanelSection } from "./PanelSection"

export function NftPanel({ id }: { id: string }) {
  const snft = useSnft(id)
  const { colors } = useTheme()
  const distributionInView = useInView()

  const [showDistribution, setShowDistribution] = useState(false)
  useEffect(() => {
    if (distributionInView.inView) {
      setShowDistribution(true)
    }
  }, [distributionInView.inView])

  if (!snft) {
    return null
  }

  return (
    <section>
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
                css={({ fonts }) => ({
                  fontFamily: fonts.families.sans,
                })}
              />
            </PanelSection>
            <PanelSection title="Description">
              <div
                css={{
                  paddingBottom: "5gu",
                }}
              >
                {snft.description}
              </div>
              <Button label="Create buyout proposal" mode="primary" />
            </PanelSection>
            <PanelSection title="Authenticity">
              <div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2gu",
                }}
              >
                {snft.authenticity.map(({ name, url }) => (
                  <div key={name + url}>
                    <Button
                      label={"» " + name}
                      mode="flat-2"
                      href={url}
                      external
                      css={({ fonts }) => ({
                        fontFamily: fonts.sans,
                      })}
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
            <PanelSection
              ref={distributionInView.observe}
              title="Collective ownership distribution"
            >
              <Distribution
                values={showDistribution ? snft.token.distribution : []}
              />
            </PanelSection>
            <PanelSection title="History">
              {snft.history.map(({ date, event }, index) => (
                <div key={JSON.stringify(event) + date}>
                  {index > 0 && (
                    <div
                      css={{
                        padding: "3gu 0",
                      }}
                    >
                      <Slashes color={colors.contentHeading2} />
                    </div>
                  )}
                  <div>
                    {event.map(
                      (value, index) => (
                        <span key={index}>
                          {Array.isArray(value)
                            ? (
                              <Anchor external href={value[1]}>
                                {value[0]}
                              </Anchor>
                            )
                            : (
                              value
                            )}
                        </span>
                      ),
                      [],
                    )}
                  </div>
                  <div
                    css={{
                      paddingTop: "1.5gu",
                    }}
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

function MoreNfts({ snftFrom }: { snftFrom: Snft }) {
  const snfts = useSnftsByCreator(snftFrom.creator.address, {
    exclude: [snftFrom.id],
  })
  return (
    <PanelSection title="More NFTs from this creator">
      <div
        css={({ colors }) => ({
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "auto",
          gridAutoFlow: "row",
          gap: "9gu 3gu",
          "img": {
            display: "block",
            width: "100%",
            marginBottom: "2gu",
          },
          "img + div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "5gu",
            fontSize: "18px",
            color: colors.accent,
            background: colors.layer1,
          },
        })}
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
