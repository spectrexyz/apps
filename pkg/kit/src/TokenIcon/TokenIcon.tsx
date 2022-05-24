import { useBaseUrl } from "../BaseUrl"
import { gu } from "../styles"

type TokenIconProps = {
  alt?: string
  name?: string
  size?: number
  tokenType: "eth" | "serc20"
}

function fileName(tokenType: TokenIconProps["tokenType"]): string {
  if (tokenType === "eth") return "ethereum.png"
  if (tokenType === "serc20") return "serc20.png"
  throw new Error("wrong tokenType")
}

export function TokenIcon({
  alt = "",
  tokenType,
  size = 3 * gu,
  ...props
}: TokenIconProps): JSX.Element {
  const assetsUrl = useBaseUrl("TokenIcon")

  // The extra div is to avoid issues when images
  // are used as flexbox children items.
  return (
    <div
      {...props}
      css={{
        display: "inline-flex",
        "img": {
          display: "block",
        },
      }}
    >
      <img
        src={`${assetsUrl}/${fileName(tokenType)}`}
        alt={alt}
        title={alt}
        width={size}
        height={size}
      />
    </div>
  )
}
