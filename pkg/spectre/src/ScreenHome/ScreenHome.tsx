import { Button } from "kit"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useSpectralize } from "../ScreenSpectralize/use-spectralize"

export function ScreenHome() {
  const [, setLocation] = useLocation()
  const spectralize = useSpectralize()

  const actions: [string, () => void][] = [
    ["Fractionalize", () => {
      spectralize.reset()
      setLocation("/fractionalize")
    }],
    ["Fractionalize − demo", () => {
      spectralize.fillDemoData()
      setLocation("/fractionalize")
    }],
    ["NFT", () => {
      setLocation(`/nfts/${Math.ceil(Math.random() * 9)}`)
    }],
    ["Swap", () => {
      setLocation(`/nfts/${Math.ceil(Math.random() * 9)}/buy`)
    }],
  ]

  return (
    <AppScreen compactBar={null}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          "h1": {
            paddingBottom: "5gu",
          },
        }}
      >
        <h1>Spectre</h1>
        <div css={{ display: "grid", gap: "2gu" }}>
          {actions.map(([label, onClick], index) => (
            <Button
              key={index}
              label={label}
              onClick={onClick}
              wide
            />
          ))}
        </div>
      </div>
    </AppScreen>
  )
}
