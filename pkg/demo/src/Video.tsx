import { css } from "@emotion/react"
import { Video as KitVideo } from "kit"

export function Video() {
  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <KitVideo src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Roundhay_Garden_Scene.ogv" />
    </div>
  )
}
