import { css } from "@emotion/react"
import { Badge as KitBadge, gu } from "kit"

export function Badge() {
  // <img alt="" src={tokenImage} width={3 * gu} height={3 * gu} />
  return (
    <div
      css={css`
        display: flex;
        gap: 2gu;
        padding-top: 4gu;
      `}
    >
      <KitBadge label="Badge label" />
      <KitBadge label="With icon URL" icon="/token-icon-image.png" />
      <KitBadge
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
