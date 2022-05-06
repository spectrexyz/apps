import { Button, shuffle } from "kit"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { SNFTS } from "../demo-data"
import { useSpectralize } from "../ScreenSpectralize/use-spectralize"
import { useSnftCreators } from "../snft-hooks"

export function ScreenHome() {
  const [, setLocation] = useLocation()
  const spectralize = useSpectralize()
  const creators = useSnftCreators()

  const randomId = () => Math.floor(Math.random() * SNFTS.length) + 1

  const actions: [string, () => void][] = [
    ["/:account", () => {
      if (creators.data) {
        setLocation(`/${shuffle(creators.data.slice(1))[0]?.address}`)
      }
    }],
    ["/:account (connected)", () => {
      if (creators.data) {
        setLocation(`/${creators.data[0]?.address}`)
      }
    }],
    ["/nfts/:id", () => {
      setLocation(`/nfts/${randomId()}`)
    }],
    ["/nfts/:id/fractions", () => {
      setLocation(`/nfts/${randomId()}/fractions`)
    }],
    ["/nfts/:id/pool", () => {
      setLocation(`/nfts/${randomId()}/pool`)
    }],
    ["/nfts/:id/buy", () => {
      setLocation(`/nfts/${randomId()}/buy`)
    }],
    ["/fractionalize", () => {
      spectralize.reset()
      setLocation("/fractionalize")
    }],
    ["/fractionalize (filled)", () => {
      spectralize.fillDemoData()
      setLocation("/fractionalize")
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
          paddingTop: "8gu",
        }}
      >
        <div>
          <div css={{ paddingBottom: "2gu" }}>APP PATHS</div>
          <div css={{ display: "grid", gap: "2gu" }}>
            {actions.map(([label, onClick], index) => (
              <div key={index}>
                <Button
                  label={label}
                  onClick={onClick}
                />
              </div>
            ))}
          </div>
        </div>
        {false && creators.data?.map((creator) => {
          return (
            <div key={creator.resolvedAddress}>
              <Button
                label={creator.address}
                onClick={() => setLocation(`/${creator.address}`)}
              />
            </div>
          )
        })}
      </div>
    </AppScreen>
  )
}
