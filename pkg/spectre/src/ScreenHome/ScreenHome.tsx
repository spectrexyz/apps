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

  const randomAddressCb = (path = "") =>
    () => {
      if (creators.data) {
        setLocation(`/${shuffle(creators.data.slice(1))[0]?.address}${path}`)
      }
    }

  const actions: [
    group: string,
    actions: [label: string, action: () => void][],
  ][] = [
    [
      "Profile",
      [
        ["/:address", randomAddressCb()],
        ["/:address/fractions", randomAddressCb("/fractions")],
        ["/:address/pools", randomAddressCb("/pools")],
        ["/:address/rewards", randomAddressCb("/rewards")],
        ["/:address/proposals", randomAddressCb("/proposals")],
        ["/:address (connected)", () => {
          if (creators.data) {
            setLocation(`/${creators.data[0]?.address}`)
          }
        }],
      ],
    ],
    [
      "NFT",
      [
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
        ["/nfts/:id/add-liquidity", () => {
          setLocation(`/nfts/${randomId()}/add-liquidity`)
        }],
        ["/nfts/:id/remove-liquidity", () => {
          setLocation(`/nfts/${randomId()}/remove-liquidity`)
        }],
        ["/nfts/:id/buyout", () => {
          setLocation(`/nfts/${randomId()}/buyout`)
        }],
      ],
    ],
    [
      "Fractionalize",
      [
        ["/fractionalize", () => {
          spectralize.reset()
          setLocation("/fractionalize")
        }],
        ["/fractionalize (filled)", () => {
          spectralize.fillDemoData()
          setLocation("/fractionalize")
        }],
      ],
    ],
  ]

  return (
    <AppScreen compactBar={null}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "8gu 4gu 0",
        }}
      >
        <div
          css={{
            display: "flex",
            flexFlow: "row wrap",
            gap: "4gu",
          }}
        >
          {actions.map(([group, actions], index) => (
            <div key={index}>
              <div
                css={{
                  paddingBottom: "2gu",
                  textTransform: "uppercase",
                }}
              >
                {group}
              </div>
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
          ))}
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
