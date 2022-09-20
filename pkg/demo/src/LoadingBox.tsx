import { LoadingBox } from "moire"
import { useState } from "react"

function LoadingBoxDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <div>
      <div
        css={{
          position: "absolute",
          inset: "1gu 2gu auto auto",
          userSelect: "none",
          display: "flex",
          "a": {
            cursor: "pointer",
          },
        }}
      >
        <a
          role="button"
          onClick={() => {
            setVisible((v) => !v)
          }}
        >
          {visible ? "hide" : "show"}
        </a>
      </div>
      <LoadingBox visible={visible} />
    </div>
  )
}

export { LoadingBoxDemo as LoadingBox }
