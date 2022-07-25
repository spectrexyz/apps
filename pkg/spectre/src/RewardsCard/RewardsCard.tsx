import type { Dnum } from "dnum"
import type { Address, AddressOrEnsName } from "kit"
import type { ReactNode } from "react"

import dnum from "dnum"
import {
  Button,
  Card,
  DiscsChain,
  gu,
  IconEye,
  Percentage,
  TokenAmount,
  TokenIcon,
  useEthToUsdFormat,
  useTheme,
} from "kit"
import { useMemo } from "react"
import { usePool, useSnft2, useToken } from "../snft-hooks"
import { useLabelStyle } from "../styles"

import iconBuyout from "./rewards-buyout.svg"
import iconCommunity from "./rewards-community.svg"
import iconCreators from "./rewards-creators.svg"

export function RewardsCard({
  rewards,
  rewardsType,
}: {
  rewards: Array<[Address, string]>
  rewardsType: "creators" | "community" | "buyout"
}) {
  const { colors } = useTheme()
  const ethToUsd = useEthToUsdFormat()

  const [title, icon] = useMemo(() => {
    if (rewardsType === "creators") return ["Creators rewards", iconCreators]
    if (rewardsType === "community") return ["Community rewards", iconCommunity]
    if (rewardsType === "buyout") return ["Buyout rewards", iconBuyout]
  }, [rewardsType])

  return (
    <Card
      loading={false}
      loadingBackground={colors.background}
      css={{ height: "100%", minHeight: "70gu" }}
    >
      <section
        css={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          background: "colors.background",
          border: "2px solid colors.layer2",
        }}
      >
        <div css={{ flexGrow: "1", padding: "3gu" }}>
          <img src={icon} alt="" css={{ display: "block" }} />
          <h1
            css={{
              paddingTop: "3gu",
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            {title}
          </h1>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div css={{ padding: "4gu 0" }}>
              <div
                css={{
                  height: "2px",
                  background: "colors.layer2",
                }}
              />
            </div>
          </div>
        </div>
        <div
          css={{
            flexGrow: "0",
            flexShrink: "0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5gu",
            padding: "3gu",
          }}
        >
          <Button label="Claim" wide />
        </div>
      </section>
    </Card>
  )
}

function Reward({}) {
}
