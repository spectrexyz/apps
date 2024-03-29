import type { FormEvent } from "react"

import {
  Button,
  closestIndexFromSortedNumbers,
  DAY_MS,
  Fieldset,
  formatDuration,
  Incremental,
  Modal,
  norm,
  Slider,
  Toggle,
  WEEK_MS,
} from "moire"
import { useCallback, useMemo } from "react"
import { useLayout } from "../styles"
import { useAdvancedParametersForm, useSpectralize } from "./use-spectralize"

const TIMELOCK_OPTIONS = [
  DAY_MS * 1,
  DAY_MS * 2,
  DAY_MS * 3,
  DAY_MS * 4,
  DAY_MS * 5,
  DAY_MS * 6,
  WEEK_MS * 1,
  WEEK_MS * 2,
  WEEK_MS * 3,
  WEEK_MS * 4,
]
export function AdvancedParametersEditModal({
  onClose,
  visible,
}: {
  onClose: () => void
  visible: boolean
}) {
  const layout = useLayout()
  const introPadding = layout.value({
    small: "2gu 0",
    medium: "2gu 0",
    large: "1.5gu 0 1gu",
  })
  return (
    <Modal mode="large" onClose={onClose} visible={visible}>
      <header>
        <h1
          css={({ fonts }) => ({
            fontFamily: fonts.mono,
            fontSize: "18px",
            textTransform: "uppercase",
          })}
        >
          Edit Advanced Parameters
        </h1>
        <p
          css={({ colors, fonts }) => ({
            padding: introPadding,
            fontFamily: fonts.sans,
            fontSize: "14px",
            color: colors.contentDimmed,
          })}
        >
          Modifying these settings will affect all transactions triggered with
          the enabled account. You can always reset them to the original
          default.
        </p>
      </header>
      <AdvancedParametersEditModalForm onSave={onClose} />
    </Modal>
  )
}

export function AdvancedParametersEditModalForm({
  onSave,
}: {
  onSave(): void
}) {
  const {
    buyoutMechanism,
    initialLpTokenWeight,
    mintingFees,
    reset,
    save,
    targetLpTokenWeight,
    timelock,
    tradingFees,
    updateBuyoutMechanism,
    updateInitialLpTokenWeight,
    updateMintingFees,
    updateTargetLpTokenWeight,
    updateTimelock,
    updateTradingFees,
  } = useAdvancedParametersForm()

  const tokenSymbol = useSpectralize((state) => state.tokenSymbol)

  const closestTimelockIndex = useMemo(
    () => closestIndexFromSortedNumbers(TIMELOCK_OPTIONS, timelock),
    [timelock],
  )

  const handleBuyoutMechanismIncrease = () => {
    updateTimelock(
      TIMELOCK_OPTIONS[
        Math.min(closestTimelockIndex + 1, TIMELOCK_OPTIONS.length - 1)
      ],
    )
  }

  const handleBuyoutMechanismDecrease = () => {
    updateTimelock(TIMELOCK_OPTIONS[Math.max(closestTimelockIndex - 1, 0)])
  }

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()
      save()
      onSave()
    },
    [onSave, save],
  )

  const handleDefaultsClick = useCallback(() => {
    reset()
  }, [reset])

  const layout = useLayout()
  const saveLabel = layout.value({
    small: "Save",
    medium: "Save changes",
  })

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset
        label="Buyout Mechanism"
        dimmed
        contextual={
          <Toggle
            labels={["Manual", "Flash"]}
            value={buyoutMechanism === "manual" ? 0 : 1}
            onChange={(value) => {
              updateBuyoutMechanism(value === 0 ? "manual" : "flash")
            }}
          />
        }
      >
        <p
          css={({ colors }) => ({
            paddingTop: "1gu",
            fontSize: "14px",
            color: colors.contentHeading,
          })}
        >
          Buyout proposals need to be approved or rejected by you (as the NFT
          guardian) before they can be executed. Proposals can stay active for
          up to one week.
        </p>
      </Fieldset>

      <Incremental
        label="Buyout Timelock"
        onDecrease={handleBuyoutMechanismDecrease}
        onIncrease={handleBuyoutMechanismIncrease}
        enableDecrease={closestTimelockIndex > 0}
        enableIncrease={closestTimelockIndex < TIMELOCK_OPTIONS.length - 1}
        value={formatDuration(timelock)}
      />

      <Fieldset
        label="Initial LP Weight"
        dimmed
        contextual={
          <TokenWeight
            tokenWeight={initialLpTokenWeight}
            tokenSymbol={tokenSymbol}
          />
        }
      >
        <TokenWeightSlider
          onChange={updateInitialLpTokenWeight}
          tokenSymbol={tokenSymbol}
          tokenWeight={initialLpTokenWeight}
        />
      </Fieldset>

      <Fieldset
        label="Target LP Weight"
        dimmed
        contextual={
          <TokenWeight
            tokenWeight={targetLpTokenWeight}
            tokenSymbol={tokenSymbol}
          />
        }
      >
        <TokenWeightSlider
          onChange={updateTargetLpTokenWeight}
          tokenSymbol={tokenSymbol}
          tokenWeight={targetLpTokenWeight}
        />
      </Fieldset>

      <Incremental
        enableDecrease={mintingFees > 1}
        enableIncrease={mintingFees < 99}
        label="Minting Fees"
        onDecrease={() => updateMintingFees(Math.max(1, mintingFees - 1))}
        onIncrease={() => updateMintingFees(Math.min(99, mintingFees + 1))}
        value={`${mintingFees}%`}
      />

      <Incremental
        enableDecrease={tradingFees > 1}
        enableIncrease={tradingFees < 99}
        label="Trading Fees"
        onDecrease={() => updateTradingFees(Math.max(1, tradingFees - 1))}
        onIncrease={() => updateTradingFees(Math.min(99, tradingFees + 1))}
        value={`${tradingFees}%`}
      />

      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2gu",
          paddingTop: "3gu",
        }}
      >
        <Button
          label="Defaults"
          mode="secondary-2"
          onClick={handleDefaultsClick}
          shadowInBox
        />
        <Button
          label={saveLabel}
          mode="primary-2"
          onClick={save}
          shadowInBox
          type="submit"
        />
      </div>
    </form>
  )
}

function TokenWeight({
  tokenWeight,
  tokenSymbol,
}: {
  tokenWeight: number
  tokenSymbol: string
}) {
  const tokenWeightPct = `${Math.round(tokenWeight * 100)}%`
  const ethWeightPct = `${Math.round((1 - tokenWeight) * 100)}%`
  const layout = useLayout()
  const [baseFontSize, symbolFontSize, position] = layout.value({
    small: ["12px", "100%", "static"],
    medium: ["24px", "75%", "absolute"],
  })
  return (
    <div
      css={({ colors }) => ({
        position: position as "static" | "absolute",
        inset: "1gu 2gu auto auto",
        fontSize: baseFontSize,
        color: colors.accent,
        ".symbol": {
          fontSize: symbolFontSize,
        },
      })}
    >
      {tokenWeightPct}
      <span className="symbol">{tokenSymbol}</span>
      <span>{" / "}</span>
      {ethWeightPct}
      <span className="symbol">ETH</span>
    </div>
  )
}

function TokenWeightSlider({
  onChange,
  tokenWeight,
  tokenSymbol,
}: {
  onChange: (value: number) => void
  tokenWeight: number
  tokenSymbol: string
}) {
  return (
    <Slider
      labels={[`1% ${tokenSymbol} / 99% ETH`, `99% ${tokenSymbol} / 1% ETH`]}
      onChange={(value) => {
        onChange((1 + Math.round(value * 98)) / 100)
      }}
      onLabelClick={(side) => {
        onChange((side === "start" ? 1 : 99) / 100)
      }}
      value={norm(tokenWeight, 1 / 100, 99 / 100)}
      keyboardStep={(value, direction) => {
        const pct = norm(1 + Math.round(value * 98) + direction, 1, 99)
        return Math.max(0, Math.min(1, pct / 100))
      }}
    />
  )
}
