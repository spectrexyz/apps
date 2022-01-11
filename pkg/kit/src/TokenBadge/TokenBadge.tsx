import { Badge } from "../Badge"
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
    <Badge
      alt={alt}
      icon={
        tokenImage ? (
          <img alt="" src={tokenImage} width={3 * gu} height={3 * gu} />
        ) : (
          <TokenIcon tokenType={tokenType} />
        )
      }
      label={label}
    />
  )
}
