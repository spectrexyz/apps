import { ChangeEvent, ReactNode, useCallback } from "react"
import { css } from "@emotion/react"
import { gu } from "../styles"
import { Button } from "../Button"
import { TokenIcon } from "../TokenIcon"

type TokenInputProps = {
  balance?: string
  balanceConverted?: string
  maxButton?: boolean
  onBalanceClick?: () => void
  onChange: (value: string) => void
  secondaryEnd?: ReactNode
  secondaryStart?: ReactNode
  symbol: string
  value: string
}

export function TokenInput({
  balance,
  balanceConverted,
  maxButton = false,
  onBalanceClick,
  onChange,
  secondaryEnd,
  secondaryStart,
  symbol,
  value,
}: TokenInputProps): JSX.Element {
  const hasBalanceRow = balance !== undefined || balanceConverted !== undefined
  const hasSecondaryRow =
    secondaryStart !== undefined || secondaryEnd !== undefined

  if (hasBalanceRow && hasSecondaryRow) {
    throw new Error(
      "TokenInput: please only use balance / balanceConverted or secondary, not both."
    )
  }

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value.trim()
      if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        onChange(value)
      }
    },
    [onChange]
  )

  return (
    <div>
      <div
        css={css`
          display: flex;
          align-items: center;
          height: 5gu;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            height: 100%;
            padding-right: ${maxButton ? css`2gu` : css`0.5gu`};
          `}
        >
          <TokenIcon tokenType={symbol === "ETH" ? "eth" : "serc20"} />
          <span
            css={css`
              padding: 0 1gu;
            `}
          >
            {symbol}
          </span>
          {maxButton && (
            <Button
              mode="flat-2"
              label="Max"
              adjustLabelAlignment={false}
              horizontalPadding={1 * gu}
              css={css`
                height: 3gu;
                text-transform: uppercase;
              `}
            />
          )}
        </div>
        <input
          type="text"
          onChange={handleChange}
          value={value}
          css={({ colors }) => css`
            display: block;
            width: 100%;
            margin-right: -1gu;
            padding-right: 1gu;
            text-align: right;
            font-size: 24px;
            color: ${colors.accent};
            background: none;
            border: 0;
            outline: 0;
            &:focus {
              outline: 2px solid ${colors.focus};
            }
          `}
        />
      </div>
      {hasSecondaryRow && (
        <SecondaryRow end={secondaryEnd} start={secondaryStart} />
      )}
      {hasBalanceRow && (
        <SecondaryRow
          end={balanceConverted}
          start={
            <span
              onClick={onBalanceClick}
              css={css`
                cursor: ${onBalanceClick ? "pointer" : "default"};
                user-select: none;
              `}
            >
              <span>Balance:</span> {balance} {symbol}
            </span>
          }
        />
      )}
    </div>
  )
}

function SecondaryRow({ start, end }: { start?: ReactNode; end?: ReactNode }) {
  return (
    <div
      css={({ fonts }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3gu;
        font-family: ${fonts.families.sans};
      `}
    >
      <div
        css={({ colors }) => css`
          font-size: 12px;
          span {
            color: ${colors.contentDimmed};
          }
        `}
      >
        {start}
      </div>
      <div
        css={css`
          font-size: 14px;
        `}
      >
        {end}
      </div>
    </div>
  )
}
