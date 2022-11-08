import type { Dnum } from "dnum"

import * as dn from "dnum"
import { ButtonIcon, noop, TokenInput, usePrice } from "moire"
import { useEffect, useMemo, useState } from "react"
import { useSnft } from "../snft-hooks"
import { useConnectedAccountBalance } from "../web3-hooks"

import arrowsSwap from "./arrows-swap.svg"

export function SwapModule({
  id,
  onEthValueChange,
  tokenValue,
}: {
  id: string
  onEthValueChange: (value: Dnum | null) => void
  tokenValue: Dnum | null
}) {
  const snft = useSnft(id)
  const [ethInputValue, setEthInputValue] = useState("")
  const ethBalance = useConnectedAccountBalance()
  const ethUsdPrice = usePrice("eth", "usd")

  const [formattedEthBalance, formattedEthBalanceUsd] = useMemo(() => (
    ethBalance.data
      ? [
        dn.format(ethBalance.data, 2),
        ethUsdPrice.data !== undefined && `$${
          dn.format(
            dn.multiply(ethBalance.data, ethUsdPrice.data),
            2,
          )
        }`,
      ]
      : [undefined, undefined]
  ), [ethBalance, ethUsdPrice])

  const parsedEthValue: Dnum | null = useMemo(() => {
    try {
      return dn.from(ethInputValue.replace(/([0-9])\.$/, "$1"), 18)
    } catch (err) {
      return null
    }
  }, [ethInputValue])

  useEffect(() => {
    onEthValueChange(parsedEthValue)
  }, [parsedEthValue && dn.toJSON(parsedEthValue)])

  return snft.data
    ? (
      <div>
        <div css={{ padding: "0 2gu" }}>
          <Label label="From" />
          <div>
            <TokenInput
              onChange={setEthInputValue}
              symbol="ETH"
              value={ethInputValue}
              secondaryStart={formattedEthBalance && (
                <>
                  <span css={{ color: "colors.contentDimmed" }}>
                    Balance:
                  </span>{" "}
                  {formattedEthBalance} ETH
                </>
              )}
              secondaryEnd={formattedEthBalanceUsd}
              onMaxClick={() => {
                if (ethBalance.data) {
                  setEthInputValue(dn.format(ethBalance.data))
                }
              }}
            />
          </div>
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2gu 0",
          }}
        >
          <ButtonIcon
            onClick={noop}
            icon={<img src={arrowsSwap} alt="" />}
            label={`Invert (sell ${snft.data?.token.symbol})`}
          />
        </div>
        <div
          css={({ colors }) => ({
            padding: "2gu",
            background: colors.layer1,
          })}
        >
          <Label label="To (estimated)" />
          <TokenInput
            onChange={() => {}}
            symbol={snft.data?.token.symbol}
            value={tokenValue ? dn.format(tokenValue, 2) : ""}
          />
        </div>
      </div>
    )
    : null
}

function Label({ label }: { label: string }) {
  return (
    <div
      css={{
        fontFamily: "fonts.sans",
        fontSize: "14px",
        color: "colors.contentDimmed",
      }}
    >
      {label}
    </div>
  )
}
