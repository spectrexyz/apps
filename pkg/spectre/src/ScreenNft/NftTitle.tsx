import { useLayout } from "../styles"
import { Snft } from "../types"

export function NftTitle(
  { snft, spaceAfter }: { snft: Snft; spaceAfter?: boolean },
) {
  const layout = useLayout()
  return (
    <h1
      css={({ fonts }) => ({
        paddingBottom: spaceAfter ? "3gu" : 0,
        fontFamily: fonts.sans,
        fontSize: layout.below("xlarge") ? "24px" : "40px",
      })}
    >
      {snft.title}
    </h1>
  )
}
