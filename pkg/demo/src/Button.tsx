import type { ButtonMode } from "kit"

import { css } from "@emotion/react"
import { Button as KitButton } from "kit"

export function Button() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2gu;
      `}
    >
      {(
        [
          "primary",
          "primary-2",
          "secondary",
          "secondary-2",
          "flat",
          "flat-2",
          "flat-3",
          "outline",
        ] as ButtonMode[]
      ).map((mode) => (
        <KitButton key={mode} label={mode} mode={mode} />
      ))}
    </div>
  )
}
