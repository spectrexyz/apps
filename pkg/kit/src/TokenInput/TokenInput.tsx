import { ChangeEvent, ReactNode, useCallback } from "react"
import { Button } from "../Button"
import { ButtonText } from "../ButtonText"
import { DiscsChain } from "../DiscsChain"
import { gu } from "../styles"
import { TokenIcon } from "../TokenIcon"

type SymbolAndImageUrl = [symbol: string, imageUrl: string]

type TokenInputProps = {
  balance?: string // TODO: deprecate
  balanceConverted?: string // TODO: deprecate
  onBalanceClick?: () => void // TODO: deprecate

  maxButton?: boolean
  onChange: (value: string) => void
  pair?: [string | SymbolAndImageUrl, string | SymbolAndImageUrl]
  secondaryEnd?: ReactNode
  secondaryStart?: ReactNode
  symbol?: string
  value: string
}

export function TokenInput({
  balance,
  balanceConverted,
  maxButton = false,
  onBalanceClick,
  onChange,
  pair,
  secondaryEnd,
  secondaryStart,
  symbol,
  value,
}: TokenInputProps): JSX.Element {
  const hasBalanceRow = balance !== undefined || balanceConverted !== undefined
  const hasSecondaryRow = secondaryStart !== undefined
    || secondaryEnd !== undefined

  if (hasBalanceRow && hasSecondaryRow) {
    throw new Error(
      "TokenInput: please only use balance / balanceConverted or secondary, not both.",
    )
  }

  if ((pair && symbol) || (!pair && !symbol)) {
    throw new Error(
      "TokenInput: please use either pair or symbol.",
    )
  }

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value.trim()
      if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        onChange(value)
      }
    },
    [onChange],
  )

  return (
    <div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          height: "5gu",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            paddingRight: maxButton ? "2gu" : "0.5gu",
          }}
        >
          {pair
            ? (
              <DiscsChain
                images={pair.map((symbol) => (
                  <TokenIcon
                    tokenType={symbol === "ETH" ? "eth" : "serc20"}
                    src={Array.isArray(symbol) ? symbol[1] : undefined}
                  />
                ))}
              />
            )
            : (
              <TokenIcon
                tokenType={symbol === "ETH" ? "eth" : "serc20"}
              />
            )}

          <span css={{ padding: "0 1gu", whiteSpace: "nowrap" }}>
            {pair
              ? pair.map((v) => Array.isArray(v) ? v[0] : v).join("-")
              : symbol}
          </span>
          {maxButton && (
            <Button
              mode="flat-2"
              label="Max"
              adjustLabelAlignment={false}
              horizontalPadding={1 * gu}
              css={{
                height: "3gu",
                textTransform: "uppercase",
                fontSize: "14px",
              }}
            />
          )}
        </div>
        <input
          type="text"
          onChange={handleChange}
          value={value}
          css={{
            display: "block",
            width: "100%",
            marginRight: "-1gu",
            paddingRight: "1gu",
            textAlign: "right",
            fontSize: "24px",
            color: "colors.accent",
            background: "none",
            border: "0",
            outline: "0",
            "&:focus": {
              outline: "2px solid colors.focus",
            },
          }}
        />
      </div>
      {hasSecondaryRow && (
        <SecondaryRow end={secondaryEnd} start={secondaryStart} />
      )}
      {hasBalanceRow && (
        <SecondaryRow
          end={balanceConverted}
          onStartClick={onBalanceClick}
          start={
            <>
              <span css={{ color: "colors.contentDimmed" }}>
                Balance:
              </span>{" "}
              {balance} {pair
                ? pair.map((v) => v[0]).join("-")
                : symbol}
            </>
          }
        />
      )}
    </div>
  )
}

function SecondaryRow(
  {
    end,
    onEndClick,
    onStartClick,
    start,
  }: {
    end?: ReactNode
    onEndClick?: () => void
    onStartClick?: () => void
    start?: ReactNode
  },
) {
  return (
    <div
      css={({ fonts }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "3gu",
        fontFamily: fonts.sans,
        fontSize: "14px",
      })}
    >
      {onStartClick
        ? <ButtonText onClick={onStartClick} label={start} uppercase={false} />
        : <div>{start}</div>}
      {onEndClick
        ? <ButtonText onClick={onEndClick} label={end} uppercase={false} />
        : <div>{end}</div>}
    </div>
  )
}
