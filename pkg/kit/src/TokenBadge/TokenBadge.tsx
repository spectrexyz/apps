import { css } from "@emotion/react"
import { TokenIcon } from "../TokenIcon"
import { gu } from "../styles"

type TokenBadgeProps = {
  alt?: string
  label: string
  tokenImage?: string
  tokenType?: "eth" | "serc20"
}

export function TokenBadge({
  alt,
  label,
  tokenImage,
  tokenType,
}: TokenBadgeProps): JSX.Element {
  if (tokenType && tokenImage) {
    throw new Error("TokenBadge: please use either tokenImage or tokenType.")
  }
  if (!tokenType) {
    tokenType = "serc20"
  }
  return (
    <div
      title={alt}
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        gap: 0.75gu;
        height: 4gu;
        padding: 0 2gu 0 0.5gu;
        color: ${colors.accent2};
        background: ${colors.translucid};
        border-radius: 10gu;
      `}
    >
      {tokenImage ? (
        <img alt="" src={tokenImage} width={3 * gu} height={3 * gu} />
      ) : (
        <TokenIcon tokenType={tokenType} />
      )}
      <span
        css={css`
          font-size: 18px;
          text-transform: uppercase;
        `}
      >
        {label}
      </span>
    </div>
  )
}
