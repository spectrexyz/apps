/** @jsx jsx */
import { useCallback } from "react"
import { jsx, css } from "@emotion/react"
import { gu } from "../styles"
import { Button } from "../Button"
import { TokenIcon } from "../TokenIcon"

type TokenInputProps = {
  symbol: string
  onChange: (value: string) => void
  value: string
  maxButton?: boolean
}

export function TokenInput({
  symbol,
  onChange,
  maxButton = false,
  value,
}: TokenInputProps): JSX.Element {
  const handleChange = useCallback(
    (event) => {
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
          <span>Balance:</span> 106.970 ETH
        </div>
        <div
          css={css`
            font-size: 14px;
          `}
        >
          $283,982
        </div>
      </div>
    </div>
  )
}
