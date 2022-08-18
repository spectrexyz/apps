import type { ReactNode } from "react"

import { ButtonIcon } from "../ButtonIcon"
import { Fieldset } from "../Fieldset"
import { IconArrowDown, IconArrowUp } from "../icons"

export function Incremental({
  enableDecrease,
  enableIncrease,
  label,
  onDecrease,
  onIncrease,
  value,
}: {
  enableDecrease: boolean
  enableIncrease: boolean
  label: ReactNode
  onDecrease: () => void
  onIncrease: () => void
  value: ReactNode
}) {
  return (
    <Fieldset
      label={label}
      dimmed
      contextual={
        <div
          css={{
            position: "absolute",
            inset: "2gu 2gu 2gu auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ButtonIcon
            disabled={!enableIncrease}
            icon={<IconArrowUp />}
            label="Increase"
            mode="outline"
            size="small"
            onClick={onIncrease}
          />
          <ButtonIcon
            disabled={!enableDecrease}
            icon={<IconArrowDown />}
            label="Decrease"
            mode="outline"
            size="small"
            onClick={onDecrease}
          />
        </div>
      }
    >
      <p
        css={({ colors }) => ({
          paddingTop: "0.5gu",
          textTransform: "uppercase",
          color: colors.accent,
        })}
      >
        {value}
      </p>
    </Fieldset>
  )
}
