import { ProgressIndicator, useTheme } from "moire"
import { useState } from "react"

const STATUSES = ["loading", "success", "error"] as const

type Status = typeof STATUSES[number]

function statusIndex(status: Status) {
  return STATUSES.indexOf(status)
}

function nextStatus(status: Status) {
  const nextIndex = (statusIndex(status) + 1) % STATUSES.length
  return STATUSES[nextIndex]
}

function ProgressIndicatorDemo() {
  const { colors } = useTheme()
  const [status, setStatus] = useState<typeof STATUSES[number]>("error")
  return (
    <div
      css={{
        display: "flex",
        gap: "1gu",
        padding: "2gu",
        background: "colors.background",
        border: "1px solid colors.layer2",
      }}
    >
      <div
        css={{
          position: "absolute",
          inset: "1gu 2gu auto auto",
          userSelect: "none",
          display: "flex",
          gap: "1gu",
          "a": {
            cursor: "pointer",
          },
        }}
      >
        <a
          role="button"
          onClick={() => setStatus(nextStatus)}
        >
          next
        </a>
      </div>
      <ProgressIndicator
        background={colors.background}
        status={nextStatus(nextStatus(status))}
      />
      <ProgressIndicator
        background={colors.background}
        status={nextStatus(status)}
      />
      <ProgressIndicator
        background={colors.background}
        status={status}
      />
    </div>
  )
}

export { ProgressIndicatorDemo as ProgressIndicator }
