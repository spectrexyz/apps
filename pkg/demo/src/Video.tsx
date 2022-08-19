import { css } from "@emotion/react"
import { Video as KitVideo } from "moire"

export function Video() {
  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <KitVideo
        src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Roundhay_Garden_Scene.ogv"
        poster="https://upload.wikimedia.org/wikipedia/en/b/b3/Robert_Johnson.png"
      />
    </div>
  )
}
