import { Loader } from "moire"

function LoaderDemo() {
  return (
    <div
      css={{
        display: "grid",
        placeItems: "center",
        padding: "4gu",
        background: "colors.background",
        border: "1px solid colors.layer2",
      }}
    >
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2gu",
        }}
      >
        <Loader mode="moire" />
        <Loader color="pink" />
        <Loader />
        <Loader mode="moire" color="pink" />
      </div>
    </div>
  )
}

export { LoaderDemo as Loader }
