import type { ReactNode } from "react"

import { css } from "@emotion/react"
import { Radio as KitRadio, RadioGroup } from "kit"
import { useState } from "react"

export function Radio() {
  const [selected, setSelected] = useState(0)
  const options = ["Option A", "Option B", "Option C"]

  return (
    <RadioGroup onChange={setSelected} selected={selected}>
      {options.map((label, index) => (
        <Label key={index}>
          <KitRadio id={index} /> {label}
        </Label>
      ))}
    </RadioGroup>
  )
}

function Label({ children }: { children: ReactNode }) {
  return (
    <label
      css={css`
        display: flex;
        align-items: center;
        height: 4gu;
        gap: 1gu;
        cursor: pointer;
      `}
    >
      {children}
    </label>
  )
}
