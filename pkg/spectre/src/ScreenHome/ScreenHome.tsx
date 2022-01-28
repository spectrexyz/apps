import { css } from "@emotion/react"
import { useLocation } from "wouter"
import { Button } from "kit"
import { AppScreen } from "../AppLayout/AppScreen2"
import { useSpectralize } from "../ScreenSpectralize/use-spectralize"

export function ScreenHome() {
  const [_, setLocation] = useLocation()
  const spectralize = useSpectralize()
  return (
    <AppScreen compactBar={null}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          h1 {
            padding-bottom: 5gu;
          }
        `}
      >
        <h1>Spectre</h1>

        <div
          css={css`
            display: grid;
            gap: 2gu;
          `}
        >
          <Button
            label="Spectralize"
            onClick={() => {
              spectralize.reset()
              setLocation("/spectralize")
            }}
            wide
          />
          <Button
            label="Spectralize with demo data"
            onClick={() => {
              spectralize.fillDemoData()
              setLocation("/spectralize")
            }}
            wide
          />
        </div>
        {/*[
          // ["NFT #1", "/nfts/1"],
          // ["TOKEN #1", "/nfts/1/serc20"],
          // ["Buy token", "/nfts/1/buy"],
        ].map(([label, path]) => (
          <div
            key={path}
            css={css`
              & + & {
                padding-top: 2gu;
              }
            `}
          >
            <Button label={label} onClick={() => setLocation(path)} />
          </div>
        ))*/}
      </div>
    </AppScreen>
  )
}
