import { useBlockNumber } from "wagmi"

export function SyncStatus({ full = false }: { full?: boolean }) {
  const { data: blockNumber, isError, isLoading } = useBlockNumber()
  return (
    <div
      css={({ colors }) => ({
        display: "flex",
        alignItems: "center",
        height: "4gu",
        padding: "0 1.5gu",
        fontSize: "14px",
        color: colors.content,
        background: colors.layer2,
        userSelect: "none",
        "&:before": {
          content: "\"\"",
          width: "1gu",
          height: "1gu",
          marginRight: "1gu",
          borderRadius: "50%",
          opacity: isLoading ? 0.5 : 1,
          background: isError ? colors.negative : colors.positive,
        },
      })}
    >
      {full && (
        <span
          css={{
            textTransform: "uppercase",
          }}
        >
          Block:&nbsp;
        </span>
      )}
      {(() => {
        if (isError) return "error."
        if (isLoading) return "syncing…"
        return blockNumber
      })()}
    </div>
  )
}
