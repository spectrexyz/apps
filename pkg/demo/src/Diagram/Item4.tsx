import React, { memo } from "react"
import { a, useSpring } from "react-spring"
import { colors } from "uikit"
import { Label } from "./Label"
import { Nft } from "./Nft"
import { WIDTH, HEIGHT, spSlow } from "./shared"

export const Item4 = memo(function Item4({ progress }) {
  const text = useSpring({
    delay: 300,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  const moire = useSpring({
    delay: 200,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  return (
    <g transform={`translate(${WIDTH - 125 - 75}, ${HEIGHT - 250 + 40})`}>
      <a.image
        width="125"
        height="125"
        href="/diagram/moire.png"
        opacity={moire.opacity}
        transform-origin={`${125 / 2} ${125 / 2}`}
        transform={moire.transform}
      />
      <g transform={`translate(${125 / 2}, 140)`}>
        <a.g opacity={text.opacity} transform={text.transform}>
          <Label
            text={
              <>
                <tspan x="0" dy="1.6em">
                  ERC1155 becomes the
                </tspan>
                <tspan x="0" dy="1.6em">
                  owner of the ERC721
                </tspan>
              </>
            }
          />
        </a.g>
      </g>
      <a.rect
        x={125 / 2 - 90 / 2 - 1}
        y={125 / 2 - 90 / 2 - 1}
        width="90"
        height="90"
        fill={colors.blackBlue}
        opacity={progress}
        transform-origin="50 50"
        transform={progress.to([0, 1], [0.7, 1]).to((v) => `scale(${v})`)}
      />
      <g transform={`translate(${125 / 2 - 55 / 2}, ${125 / 2 - 55 / 2})`}>
        <Nft progress={progress} />
      </g>
    </g>
  )
})
