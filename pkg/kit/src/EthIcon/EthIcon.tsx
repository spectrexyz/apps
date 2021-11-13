import { useMemo } from "react"
import { css } from "@emotion/react"
import blockie from "ethereum-blockies-base64"
import { isAddress } from "../utils"
import { gu } from "../styles"

type EthIconProps = {
  address: string
  size?: number
}

export function EthIcon({ address, size = 4 * gu }: EthIconProps): JSX.Element {
  if (!isAddress(address)) {
    throw new Error(`Incorrect address: ${address}`)
  }

  const uri = useMemo(() => blockie(address), [address])

  return (
    <img
      src={uri}
      alt=""
      css={css`
        display: inline-block;
        width: ${size}px;
        height: ${size}px;
        image-rendering: crisp-edges;
      `}
    />
  )
}
