import React from "react"
import { css } from "@emotion/react"
import { useBlockNumber } from "wagmi"

export function SyncStatus({ full = false }) {
  const [{ data: blockNumber, error, loading }] = useBlockNumber({
    watch: true,
  })
  return (
    <div
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        height: 4gu;
        padding: 0 1.5gu;
        font-size: 14px;
        color: ${colors.content};
        background: ${colors.layer2};
        user-select: none;
        &:before {
          content: "";
          width: 1gu;
          height: 1gu;
          margin-right: 1gu;
          border-radius: 50%;
          opacity: ${loading ? 0.5 : 1};
          background: ${error ? colors.negative : colors.positive};
        }
      `}
    >
      {full && (
        <span
          css={css`
            text-transform: uppercase;
          `}
        >
          Block:&nbsp;
        </span>
      )}
      {(() => {
        if (error) return "error."
        if (loading) return "syncing…"
        return blockNumber
      })()}
    </div>
  )
}
