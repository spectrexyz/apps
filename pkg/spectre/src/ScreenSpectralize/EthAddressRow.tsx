import type { Address } from "kit"
import type { ReactNode } from "react"

import { Badge, ButtonIcon, gu, IconTrash, shortenAddress } from "kit"
import { useEnsName } from "wagmi"

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
  const { data: ensName } = useEnsName({ address })
  return (
    <div
      css={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        paddingTop: "1.5gu",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          css={{
            display: "flex",
            width: "22gu",
          }}
        >
          <Badge
            alt={address}
            label={
              <span
                css={({ colors }) => ({
                  fontSize: "16px",
                  color: colors.accent,
                })}
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
            css={{
              width: "3gu",
              height: "3gu",
            }}
          />
        )}
      </div>
      <span
        css={({ colors }) => ({
          display: "flex",
          alignItems: "center",
          fontSize: "18px",
          color: colors.contentDimmed,
        })}
      >
        {reward}
      </span>
    </div>
  )
}
