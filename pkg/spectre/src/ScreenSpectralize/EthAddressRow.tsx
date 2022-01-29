import { ReactNode } from "react"
import { css } from "@emotion/react"
import { useEnsLookup } from "wagmi"
import { Address, Badge, ButtonIcon, IconTrash, gu, shortenAddress } from "kit"

type EthAddressRowProps = {
  address: Address
  onRemove?: () => void
  reward: ReactNode
}

export function EthAddressRow({
  address,
  onRemove,
  reward,
}: EthAddressRowProps) {
  const [{ data: ensName }] = useEnsLookup({ address })
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-top: 1.5gu;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            width: 22gu;
          `}
        >
          <Badge
            alt={address}
            label={
              <span
                css={({ colors }) => css`
                  font-size: 16px;
                  color: ${colors.accent};
                `}
              >
                {ensName ?? shortenAddress(address)}
              </span>
            }
          />
        </div>
        {onRemove && (
          <ButtonIcon
            icon={<IconTrash size={2.5 * gu} />}
            label="Remove"
            onClick={onRemove}
            css={css`
              width: 3gu;
              height: 3gu;
            `}
          />
        )}
      </div>
      <span
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          font-size: 18px;
          color: ${colors.contentDimmed};
        `}
      >
        {reward}
      </span>
    </div>
  )
}
