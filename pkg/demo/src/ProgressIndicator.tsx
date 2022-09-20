import { ProgressIndicator } from "moire"
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
  const [status, setStatus] = useState<typeof STATUSES[number]>("error")
  return (
    <div
      css={{
        display: "flex",
        gap: "1gu",
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
      <ProgressIndicator status={nextStatus(nextStatus(status))} />
      <ProgressIndicator status={nextStatus(status)} />
      <ProgressIndicator status={status} />
    </div>
  )
}

export { ProgressIndicatorDemo as ProgressIndicator }
