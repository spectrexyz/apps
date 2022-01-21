import { useState } from "react"
import { css } from "@emotion/react"
import { TokenAmount, TokenInput as KitTokenInput, usePrice } from "kit"

export function TokenInput() {
  return (
    <div
      css={css`
        display: grid;
        gap: 2gu;
      `}
    >
      <TokenInput1 />
      <TokenInput2 />
    </div>
  )
}

function eth(amount: bigint) {
  return new TokenAmount(amount, 18, { symbol: "ETH" })
}

function usd(amount: bigint) {
  return new TokenAmount(amount, 18, { symbol: "USD" })
}

function TokenInput1() {
  const [value, setValue] = useState<null | TokenAmount>(
    eth(1000000000000000000n)
  )
  const ethPrice = usePrice("eth", "usd")
  const balanceEth = eth(106970000000000000000n)
  const balanceUsd = ethPrice.data
    ? balanceEth.convert(ethPrice.data, 18)
    : null

  return (
    <KitTokenInput
      balance={`${balanceEth.format({ symbol: undefined })}`}
      balanceConverted={balanceUsd ? `$${balanceUsd.format()}` : "−"}
      onBalanceClick={() => setValue(balanceEth)}
      onChange={(value) => {
        const _value = value.trim()
        if (_value === "") {
          setValue(null)
          return
        }

        const valueNum = parseFloat(_value)
        if (!isNaN(valueNum)) {
          setValue(eth(BigInt(valueNum * 10 ** 18)))
        }
      }}
      symbol="ETH"
      value={value === null ? "" : value.format({ symbol: undefined, commify: false })}
    />
  )
}

function TokenInput2() {
  const [value, setValue] = useState(1)
  const ethPrice = usePrice("eth", "usd")
  const usdValue = ethPrice.data
    ? usd(BigInt(ethPrice.data * 10 ** 18 * value))
    : null
  return (
    <KitTokenInput
      secondaryEnd={value === -1 ? "" : usdValue?.format()}
      onChange={(value) => {
        const _value = value.trim()
        if (_value === "") {
          setValue(-1)
          return
        }

        const valueNum = parseFloat(_value)
        if (!isNaN(valueNum)) setValue(valueNum)
      }}
      symbol="ETH"
      value={value === -1 ? "" : String(value)}
    />
  )
}
