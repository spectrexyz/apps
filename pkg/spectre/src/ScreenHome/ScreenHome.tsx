import { Button } from "kit"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useSpectralize } from "../ScreenSpectralize/use-spectralize"

export function ScreenHome() {
  const [_, setLocation] = useLocation()
  const spectralize = useSpectralize()
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

        <div
          css={{
            display: "grid",
            gap: "2gu",
          }}
        >
          <Button
            label="NFT"
            onClick={() => {
              setLocation(`/nfts/${Math.ceil(Math.random() * 9)}`)
            }}
            wide
          />
          <Button
            label="Fractionalize"
            onClick={() => {
              spectralize.reset()
              setLocation("/fractionalize")
            }}
            wide
          />
          <Button
            label="Fractionalize with demo data"
            onClick={() => {
              spectralize.fillDemoData()
              setLocation("/fractionalize")
            }}
            wide
          />
        </div>
      </div>
    </AppScreen>
  )
}
