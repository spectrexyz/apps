import { EthIcon } from "../EthIcon"
import { gu } from "../styles"
import { shortenAddress } from "../utils"

type AddressBadgeProps = {
  address: string
  ensName?: string
  error?: boolean
  rounded?: boolean
  size?: "medium" | "large"
  transparent?: boolean
}

export function AddressBadge({
  address,
  ensName,
  error = false,
  rounded = false,
  size = "medium",
  transparent = false,
}: AddressBadgeProps): JSX.Element {
  let iconSize = rounded ? 3 * gu : 2.5 * gu
  if (size === "large") iconSize = 4 * gu

  return (
    <div
      css={({ colors }) => ({
        display: "flex",
        alignItems: "center",
        height: "4gu",
        padding: transparent ? "0" : `0 1gu`,
        userSelect: "none",
        color: colors.accent,
        background: error
          ? colors.negative
          : transparent
          ? "none"
          : colors.layer1,
        borderRadius: rounded ? "10gu" : "0",
      })}
    >
      <div
        css={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          width: iconSize,
          height: iconSize,
          marginLeft: rounded ? "-0.5gu" : "0",
          marginRight: size === "large" ? "2gu" : "1.25gu",
          borderRadius: rounded ? "50%" : "0",
        }}
      >
        <EthIcon address={address} size={iconSize} />
      </div>
      <div
        title={address}
        css={({ fonts }) => ({
          fontFamily: fonts.mono,
          fontSize: size === "large" ? "24px" : "16px",
          whiteSpace: "nowrap",
        })}
      >
        {ensName ?? shortenAddress(address)}
      </div>
    </div>
  )
}
