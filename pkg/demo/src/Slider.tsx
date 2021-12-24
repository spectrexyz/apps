import { useState } from "react"
import { css } from "@emotion/react"
import { Slider as KitSlider } from "kit"

export function Slider() {
  const [value, setValue] = useState(0.5)

  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <KitSlider value={value} onChange={setValue} />
    </div>
  )
}
