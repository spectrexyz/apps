import {
  ADDRESS_RE,
  Anchor,
  Button,
  EthIcon,
  formatDate,
  isAddress,
  shortenAddress,
} from "kit"
import { useState } from "react"
import { Snft } from "../types"
import { PanelSection } from "./PanelSection"

export function NftHistory({ snft }: { snft: Snft }) {
  const [more, setMore] = useState(false)
  return (
    <PanelSection title="Activity">
      <div css={{ display: "flex", flexDirection: "column", gap: "2gu" }}>
        {(more ? snft.history : snft.history.slice(0, 3)).map((event) => (
          <div
            key={JSON.stringify(event)}
            css={({ colors }) => ({
              display: "flex",
              gap: "1.5gu",
              alignItems: "center",
              padding: "2gu",
              background: colors.layer2,
            })}
          >
            <div>
              <EthIcon address={event.address} round />
            </div>
            <div>
              <time
                dateTime={event.date}
                title={formatDate(event.date, true)}
                css={({ colors }) => ({
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: colors.contentDimmed,
                })}
              >
                {formatDate(event.date)}
              </time>
              <div
                css={({ colors }) => ({
                  fontSize: "14px",
                  color: colors.contentHeading,
                })}
              >
                <EventDescription description={event.description} />
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </PanelSection>
  )
}

function EventDescription({ description }) {
  return (
    <>
      {description.split(/([^\s]+\.eth|0x[0-9a-fA-F]{40})/).map((token, i) => (
        <span key={i}>
          {isAddress(token) || token.endsWith(".eth")
            ? (
              <Anchor
                external
                href={`https://etherscan.io/address/${token}`}
                title={token}
              >
                {shortenAddress(token)}
              </Anchor>
            )
            : token}
        </span>
      ))}
    </>
  )
}
