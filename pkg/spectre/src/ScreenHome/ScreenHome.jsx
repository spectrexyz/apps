import { css } from "@emotion/react"
import { Button } from "kit"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen.jsx"

export function ScreenHome() {
  const [_, setLocation] = useLocation()
  return (
    <AppScreen>
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
        {[
          ["Spectralize", "/spectralize"],
          ["Buy token", "/nfts/1/buy"],
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
        ))}
      </div>
    </AppScreen>
  )
}
