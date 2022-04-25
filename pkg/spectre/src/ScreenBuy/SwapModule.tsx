import { ButtonIcon, noop, TokenInput } from "kit"
import { useState } from "react"

import arrowsSwap from "./arrows-swap.svg"

export function SwapModule() {
  const [ethValue, setEthValue] = useState("100")
  return (
    <div>
      <div css={{ padding: "0 2gu" }}>
        <FromTo label="From" />
        <div>
          <TokenInput
            onChange={setEthValue}
            symbol="ETH"
            value={ethValue}
            balance="106.970"
            balanceConverted="$283,982"
            maxButton
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
          label="Invert (sell MAGIC)"
        />
      </div>
      <div
        css={({ colors }) => ({
          padding: "2gu",
          background: colors.layer1,
        })}
      >
        <FromTo label="To (estimated)" />
        <TokenInput onChange={setEthValue} symbol="MAGIC" value={ethValue} />
      </div>
    </div>
  )
}

function FromTo({ label }: { label: string }) {
  return (
    <div
      css={({ colors, fonts }) => ({
        fontFamily: fonts.sans,
        fontSize: "14px",
        color: colors.contentDimmed,
      })}
    >
      {label}
    </div>
  )
}
