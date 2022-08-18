import type { Proposal } from "../types"

import * as dnum from "dnum"
import {
  AddressBadge,
  Button,
  ButtonText,
  Card,
  Definition,
  gu,
  IconCheck,
  IconX,
  useTheme,
} from "kit"
import ms from "ms"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "wouter"
import { Grid } from "../AppLayout/Grid"
import { useSnft2 } from "../snft-hooks"

function Status({ status }: { status: Proposal["status"] }) {
  const { colors } = useTheme()

  /* eslint-disable react/jsx-key */
  const [label, icon] = useMemo(() => {
    const iconSize = 3 * gu
    if (status === "approved") {
      return [
        "Approved",
        <IconCheck size={iconSize} color={colors.positive} />,
      ]
    }
    if (status === "rejected") {
      return [
        "Rejected",
        <IconX size={iconSize} color={colors.negative} />,
      ]
    }
    if (status === "submitted") {
      return [
        "Submitted",
        <IconCheck size={iconSize} color={colors.positive} />,
      ]
    }
    throw new Error(`Wrong status: ${status}`)
  }, [colors, status])
  /* eslint-enable react/jsx-key */

  return (
    <div css={{ display: "flex", alignItems: "center", gap: "1gu" }}>
      {icon}
      {label}
    </div>
  )
}

export function PanelProposals({ proposals }: { proposals: Proposal[] }) {
  return (
    <Grid>
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
        />
      ))}
    </Grid>
  )
}

function ProposalCard({ proposal }: { proposal: Proposal }) {
  const { colors } = useTheme()
  const snft = useSnft2(proposal.snftId)
  const [, setLocation] = useLocation()
  const ownershipPct = dnum.format(
    dnum.multiply(proposal.buyerOwnership, 100),
    2,
  )

  const [opened, setOpened] = useState(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const start = () => {
      const end = new Date(proposal.endsOn).getTime()
      const now = Date.now()
      const opened = end > now && proposal.status === "submitted"

      setOpened(opened)
      timer = setTimeout(start, 1000)
    }
    start()

    return () => clearTimeout(timer)
  }, [proposal])

  return (
    <Card
      loading={!snft.data}
      loadingBackground={opened ? colors.layer3 : colors.background}
      css={{ height: "100%", minHeight: "70gu" }}
    >
      <section
        css={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          padding: "3gu",
          background: opened ? colors.layer3 : colors.background,
          border: "2px solid colors.layer2",
        }}
      >
        <div css={{ flexGrow: "1", flexShrink: "0" }}>
          <h1
            title={snft.data?.token.name}
            css={{
              display: "flex",
              alignItems: "center",
              gap: "1.5gu",
              fontSize: "24px",
            }}
          >
            <img
              src={snft.data?.image.url}
              alt=""
              width={5 * gu}
              height={5 * gu}
              css={{ borderRadius: "50%" }}
            />
            <span
              css={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {snft.data?.token.name}
            </span>
          </h1>
          <div css={{ paddingTop: "3gu" }}>
            <Definition
              title={proposal.action.type === "buyout"
                ? "Buyout proposal"
                : "Mint proposal"}
              titleFontSize="14px"
              content={
                <div>
                  <div css={{ fontSize: "16px" }}>
                    Buyout{" "}
                    <ButtonText
                      onClick={() => setLocation(`/nfts/${snft.data?.id}`)}
                      label={
                        <span
                          css={{
                            color: "colors.link",
                            textDecoration: "underline",
                          }}
                        >
                          {snft.data?.token.symbol}
                        </span>
                      }
                    />{" "}
                    for 68.32 ETH
                  </div>
                  <div css={{ color: "colors.contentDimmed" }}>
                    Minted fractions: ~ 82% total supply
                  </div>
                </div>
              }
            />
          </div>
          <div css={{ paddingTop: "3gu" }}>
            <Definition
              title="Submitted by"
              titleFontSize="14px"
              content={
                <div css={{ display: "flex" }}>
                  <AddressBadge
                    address={proposal.submitter}
                    rounded
                  />
                </div>
              }
            />
          </div>
          <div css={{ paddingTop: "3gu" }}>
            {snft.data && (
              <Definition
                title="Buyer ownership"
                titleFontSize="14px"
                content={
                  <span>
                    <span css={{ marginRight: "1.5gu", fontSize: "16px" }}>
                      {ownershipPct}%
                    </span>
                    <span css={{ color: "colors.contentDimmed" }}>
                      ~ {dnum.format(snft.data?.token.supply, {
                        compact: true,
                        digits: 2,
                      })} {snft.data?.token.symbol} fractions
                    </span>
                  </span>
                }
              />
            )}
          </div>
          <div css={{ paddingTop: "3gu" }}>
            <Definition
              title={`Approval deadline (${ms(proposal.duration)})`}
              titleFontSize="14px"
              content={
                <time
                  dateTime={proposal.endsOn}
                  title={proposal.endsOn}
                  css={{
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  {ms(new Date(proposal.endsOn).getTime() - Date.now(),  { long: true })}
                </time>
              }
            />
          </div>
        </div>
        {opened
          ? (
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "2gu",
                flexGrow: "0",
                flexShrink: "0",
              }}
            >
              <Button label="Reject" mode="negative" wide />
              <Button label="Approve" mode="positive" wide />
            </div>
          )
          : (
            <div css={{ paddingTop: "3gu" }}>
              <Definition
                title="Status"
                titleFontSize="14px"
                content={<Status status={proposal.status} />}
              />
            </div>
          )}
      </section>
    </Card>
  )
}
