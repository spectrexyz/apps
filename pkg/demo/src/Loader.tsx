import { Loader } from "moire"

function LoaderDemo() {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2gu",
        width: "40gu",
        height: "20gu",
        background: "colors.background",
        border: "1px solid colors.layer2",
      }}
    >
      <Loader mode="moire" />
      <Loader />
    </div>
  )
}

export { LoaderDemo as Loader }
