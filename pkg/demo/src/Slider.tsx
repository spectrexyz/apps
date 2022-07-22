import { css } from "@emotion/react"
import { Slider as KitSlider } from "kit"
import { useState } from "react"

export function Slider() {
  const [value, setValue] = useState(0.5)

  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <KitSlider value={value} onChange={setValue} labels={["0%", "100%"]} />
    </div>
  )
}
