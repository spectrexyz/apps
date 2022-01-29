import { css } from "@emotion/react"
import { EthIcon } from "../EthIcon"
import { shortenAddress } from "../utils"

type AddressBadgeProps = {
  address: string
  ensName?: string
  error?: boolean
  size?: "medium" | "large"
  transparent?: boolean
}

export function AddressBadge({
  address,
  ensName,
  error = false,
  size = "medium",
  transparent = false,
}: AddressBadgeProps): JSX.Element {
  const iconSize = size === "large" ? 32 : 20
  return (
    <div
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        height: 4gu;
        padding: ${transparent ? "0" : css`0 1gu`};
        user-select: none;
        color: ${colors.accent};
        background: ${error
          ? colors.negative
          : transparent
          ? "none"
          : colors.layer1};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          width: ${iconSize}px;
          height: ${iconSize}px;
          margin-right: ${size === "large" ? css`2gu` : css`1.25gu`};
        `}
      >
        <EthIcon address={address} size={iconSize} />
      </div>
      <div
        title={address}
        css={({ fonts }) => css`
          font-family: ${fonts.families.mono};
          font-size: ${size === "large" ? "24px" : "16px"};
        `}
      >
        {ensName ?? shortenAddress(address)}
      </div>
    </div>
  )
}
