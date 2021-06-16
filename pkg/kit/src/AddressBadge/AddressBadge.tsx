/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { EthIcon } from "../EthIcon"
import { shortenAddress } from "../utils"

type AddressBadgeProps = {
  address: string
  error?: boolean
}

export function AddressBadge({
  address,
  error = false,
}: AddressBadgeProps): JSX.Element {
  return (
    <div
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        height: 4gu;
        padding: 0 10px 0 4px;
        user-select: none;
        color: ${colors.accent};
        background: ${error ? colors.negative : colors.layer1};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 20px;
          height: 20px;
          margin-right: 1.5gu;
        `}
      >
        <div
          css={css`
            display: flex;
            transform-origin: 50% 50%;
            transform: scale(${20 / 24});
          `}
        >
          <EthIcon address={address} />
        </div>
      </div>
      <div>{shortenAddress(address)}</div>
    </div>
  )
}
