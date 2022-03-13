import { ButtonIcon, gu, IconArrowsDownUp, noop, TokenInput } from "kit"
import { useState } from "react"

export function SwapModule() {
  const [ethValue, setEthValue] = useState("100")
  return (
    <div>
      <div
        css={{
          padding: "0 2gu",
        }}
      >
        <TokenInput
          onChange={setEthValue}
          symbol="ETH"
          value={ethValue}
          balance="106.970"
          balanceConverted="$283,982"
          maxButton
        />
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
          icon={<IconArrowsDownUp size={4 * gu} />}
          label="Sell MAGIC"
        />
      </div>
      <div
        css={({ colors }) => ({
          padding: "2gu",
          background: colors.layer1,
        })}
      >
        <TokenInput onChange={setEthValue} symbol="MAGIC" value={ethValue} />
        <p
          css={({ colors, fonts }) => ({
            paddingTop: "1.5gu",
            fontFamily: fonts.sans,
            fontSize: "12px",
            color: colors.contentDimmed,
          })}
        >
          Tokens will be minted and trasnferred to your connected account.
        </p>
      </div>
    </div>
  )
}
