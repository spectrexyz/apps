import { css } from "@emotion/react"
import { Badge, gu } from "moire"

export function BadgeDemo() {
  // <img alt="" src={tokenImage} width={3 * gu} height={3 * gu} />
  return (
    <div
      css={css`
        display: flex;
        gap: 2gu;
        padding-top: 4gu;
      `}
    >
      <Badge label="Badge label" />
      <Badge label="With icon URL" icon="/token-icon-image.png" />
      <Badge
        label="With icon element"
        icon={
          <img
            alt=""
            src="/token-icon-image.png"
            width={3 * gu}
            height={3 * gu}
          />
        }
      />
    </div>
  )
}
