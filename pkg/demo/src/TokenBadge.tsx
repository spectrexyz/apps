import { css } from "@emotion/react"
import { TokenBadge as KitTokenBadge } from "moire"

export function TokenBadge() {
  return (
    <div
      css={css`
        display: flex;
        gap: 2gu;
        padding-top: 4gu;
      `}
    >
      <KitTokenBadge label="Token 1" />
      <KitTokenBadge label="Token 2" tokenImage="/token-icon-image.png" />
      <KitTokenBadge label="Ethereum" tokenType="eth" />
    </div>
  )
}
