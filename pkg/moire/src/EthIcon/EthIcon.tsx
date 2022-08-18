import blockie from "ethereum-blockies-base64"
import { useMemo } from "react"
import { gu } from "../styles"
import { isAddress } from "../utils"

type EthIconProps = {
  address: string
  round?: boolean
  size?: number
}

export function EthIcon({
  address,
  round = false,
  size = 4 * gu,
}: EthIconProps) {
  if (!isAddress(address)) {
    throw new Error(`Incorrect address: ${address}`)
  }

  const uri = useMemo(() => blockie(address), [address])

  return (
    <div
      css={{
        overflow: "hidden",
        display: "flex",
        width: size,
        height: size,
        borderRadius: round ? "50%" : "0",
      }}
    >
      <img
        src={uri}
        alt=""
        css={{
          display: "block",
          width: size,
          height: size,
          imageRendering: "crisp-edges",
        }}
      />
    </div>
  )
}
