import React from "react"
import { css } from "@emotion/react"
import { useBlockNumber } from "../Ethereum"

export function SyncStatus() {
  const { data, isError, isLoading } = useBlockNumber()
  return (
    <div
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        height: 4gu;
        padding: 0 1.5gu;
        color: ${colors.content};
        background: ${colors.layer2};
        &:before {
          content: "";
          width: 1gu;
          height: 1gu;
          margin-right: 1gu;
          border-radius: 50%;
          opacity: ${isLoading ? 0.5 : 1};
          background: ${isError ? colors.negative : colors.positive};
        }
      `}
    >
      {(() => {
        if (isError) return "error."
        if (isLoading) return "syncing…"
        return data
      })()}
    </div>
  )
}
