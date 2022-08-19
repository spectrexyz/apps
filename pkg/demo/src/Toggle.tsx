import { css } from "@emotion/react"
import { Toggle as KitToggle } from "moire"
import { useState } from "react"

export function Toggle() {
  const [value, setValue] = useState(0)
  return (
    <div
      css={({ colors }) =>
        css`
        padding: 8gu;
        background: ${colors.layer2};
      `}
    >
      <KitToggle value={value} onChange={setValue} labels={["Off", "On"]} />
    </div>
  )
}
