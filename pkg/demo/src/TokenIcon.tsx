import { css } from "@emotion/react"
import { TokenIcon as KitTokenIcon } from "moire"

export function TokenIcon() {
  return (
    <div
      css={css`
        padding-top: 4gu;
      `}
    >
      <KitTokenIcon tokenType="eth" />
    </div>
  )
}
