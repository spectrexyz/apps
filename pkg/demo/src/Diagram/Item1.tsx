import { memo } from "react"
import { a, useSpring } from "react-spring"
import { colors } from "uikit"
import { Label } from "./Label"
import { Nft } from "./Nft"
import { PADDING, spSlow } from "./shared"

export const Item1 = memo(function Item1({ progress }) {
  const text = useSpring({
    delay: 400,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })
  return (
    <a.g transform={`translate(84, 116)`}>
      <g transform="translate(50, -21)">
        <a.g opacity={text.opacity} transform={text.transform}>
          <Label text="NFT – ERC721" />
        </a.g>
      </g>
      <a.rect
        width="100"
        height="100"
        fill={colors.blackBlue}
        opacity={progress}
        transform-origin="50 50"
        transform={progress.to([0, 1], [0.7, 1]).to((v) => `scale(${v})`)}
      />
      <g transform={`translate(${24}, ${24})`}>
        <Nft />
      </g>
    </a.g>
  )
})
