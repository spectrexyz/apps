import { useBaseUrl } from "../BaseUrl"
import { gu } from "../styles"

type TokenIconProps = {
  alt?: string
  size?: number
  src?: string
  tokenType?: "eth" | "serc20"
}

function fileName(tokenType: TokenIconProps["tokenType"]): string {
  if (tokenType === "eth") return "ethereum.png"
  if (tokenType === "serc20") return "serc20.png"
  throw new Error("wrong tokenType")
}

export function TokenIcon({
  alt = "",
  size = 3 * gu,
  src,
  tokenType,
  ...props
}: TokenIconProps): JSX.Element {
  const assetsUrl = useBaseUrl("TokenIcon")

  const src_ = src ?? `${assetsUrl}/${fileName(tokenType)}`

  // The extra div is to avoid issues when images
  // are used as flexbox children items.
  return (
    <div
      {...props}
      css={{
        display: "inline-flex",
        "img": {
          display: "block",
          borderRadius: "50%",
        },
      }}
    >
      <img
        src={src_}
        alt={alt}
        title={alt}
        width={size}
        height={size}
      />
    </div>
  )
}
