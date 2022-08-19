import { css } from "@emotion/react"
import { RadioBox as KitRadioBox, RadioGroup } from "moire"
import { useState } from "react"

export function RadioBox() {
  const [selected, setSelected] = useState(0)
  const options = ["Option A", "Option B", "Option C"]
  return (
    <RadioGroup
      onChange={(id) => {
        setSelected(id as number)
      }}
      selected={selected}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.5gu;
          width: 40gu;
        `}
      >
        {options.map((label, index) => (
          <KitRadioBox
            key={index}
            id={index}
            label={label}
            secondary={<>SECONDARY CONTENT</>}
          />
        ))}
      </div>
    </RadioGroup>
  )
}
