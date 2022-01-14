import { useState } from "react"
import { css } from "@emotion/react"
import { ButtonIcon, IconArrowsDownUp, TokenInput, gu } from "kit"

export function SwapModule() {
  const [ethValue, setEthValue] = useState("100")
  return (
    <div>
      <div
        css={css`
          padding: 0 2gu;
        `}
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
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2gu 0;
        `}
      >
        <ButtonIcon
          onClick={() => {}}
          icon={<IconArrowsDownUp size={4 * gu} />}
          label="Sell MAGIC"
        />
      </div>
      <div
        css={({ colors }) => css`
          padding: 2gu;
          background: ${colors.layer1};
        `}
      >
        <TokenInput onChange={setEthValue} symbol="MAGIC" value={ethValue} />
        <p
          css={({ colors, fonts }) => css`
            padding-top: 1.5gu;
            font-family: ${fonts.families.sans};
            font-size: 12px;
            color: ${colors.contentDimmed};
          `}
        >
          Tokens will be minted and trasnferred to your connected account.
        </p>
      </div>
    </div>
  )
}
