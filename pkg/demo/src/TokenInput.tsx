import { useState } from "react"
import { css } from "@emotion/react"
import { TokenInput as KitTokenInput } from "kit"

export function TokenInput() {
  const [value, setValue] = useState(1)
  return (
    <div
      css={css`
        padding-top: 4gu;
      `}
    >
      <KitTokenInput
        balance="106.970"
        balanceConverted="$283,982"
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
    </div>
  )
}
