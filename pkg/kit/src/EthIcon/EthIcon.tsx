/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import Blockies from "react-blockies"
import { isAddress } from "../utils"

const BLOCKIES_SQUARES = 8
const BASE_SCALE = 3
const PX_RATIO = typeof devicePixelRatio === "undefined" ? 2 : devicePixelRatio

type EthIconProps = {
  address: string
  scale?: number
}

export function EthIcon({ address, scale = 1 }: EthIconProps): JSX.Element {
  const blockiesScale = scale * BASE_SCALE
  if (!isAddress(address)) {
    throw new Error(`Incorrect address: ${address}`)
  }
  return (
    <div
      css={css`
        display: inline-flex;
        overflow: hidden;
        width: ${BLOCKIES_SQUARES * blockiesScale}px;
        height: ${BLOCKIES_SQUARES * blockiesScale}px;
        /* 
         * vertical-align prevents the inline parent to have an incorrect height.
         * See
         * - https://bugzilla.mozilla.org/show_bug.cgi?id=491549#c9
         * - https://bugzilla.mozilla.org/show_bug.cgi?id=737757#c1
         */
        vertical-align: middle;
      `}
    >
      <div
        css={css`
          /*
           * display:flex to remove the display:inline on the child without
           * using a selector (Blockies doesn’t allow the style prop to be
           * passed).
           */
          display: flex;
          width: ${BLOCKIES_SQUARES * blockiesScale * PX_RATIO}px;
          height: ${BLOCKIES_SQUARES * blockiesScale * PX_RATIO}px;
          background: #fff;

          /* add high-res screens support to Blockies */
          transform: scale(${1 / PX_RATIO}, ${1 / PX_RATIO});
          transform-origin: 0 0;
        `}
      >
        <Blockies
          seed={address.toLowerCase()}
          size={BLOCKIES_SQUARES}
          scale={blockiesScale * PX_RATIO}
        />
      </div>
    </div>
  )
}
