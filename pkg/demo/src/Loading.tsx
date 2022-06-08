import { gu, Loading, useTheme } from "kit"

function LoadingDemo() {
  const theme = useTheme()
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40gu",
        height: "20gu",
        background: "colors.layer2",
      }}
    >
      <Loading background={theme.colors.layer2} />
    </div>
  )
}

export { LoadingDemo as Loading }
