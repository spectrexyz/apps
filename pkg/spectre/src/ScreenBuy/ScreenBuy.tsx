import { Button, ButtonIcon, IconGearSix } from "kit"
import { ReactNode } from "react"
import { useLocation } from "wouter"
import { AppScreen } from "../AppLayout/AppScreen"
import { SwapModule } from "./SwapModule"

export function ScreenBuy() {
  const [_, setLocation] = useLocation()
  return (
    <AppScreen
      title="Buy MAGIC"
      onBack={() => setLocation("/")}
      contextual={
        <ButtonIcon
          icon={<IconGearSix />}
          label="Settings"
          css={{
            width: "7gu",
            height: "100%",
          }}
        />
      }
    >
      <div
        css={{
          paddingBottom: "3gu",
        }}
      >
        <div
          css={({ colors }) => ({
            width: "100%",
            margin: "0 auto",
            padding: "2gu 1gu 3gu",
            background: colors.layer2,
          })}
        >
          <SwapModule />

          <div
            css={{
              padding: "0 1gu 3gu",
            }}
          >
            <Group heading="Est. price">
              <p>~ 0.0643709 ETH per MAGIC</p>
            </Group>

            <Group heading="Network fee">
              <p>$67.49 | 32 Gwei ~ 4 min</p>
            </Group>

            <Group heading="Best rate combining mint & swap">
              <Distribution mint={62 / 100} swap={38 / 100} />
            </Group>

            <Group heading="Slippage">
              <p>0.5%</p>
            </Group>

            <Group heading="Liquidity provider fee (2%)">
              <p>$28.08</p>
            </Group>

            <Group heading="Creator allocation (10%)">
              <p>$134.56</p>
            </Group>

            <Group heading="Protocol fee (1%)">
              <p>$12.35</p>
            </Group>

            <Group heading="Minting fee (2%)">
              <p>$28.08</p>
            </Group>
          </div>

          <div>
            <Button label="Place order" mode="primary" wide shadowInBox />
          </div>
        </div>
      </div>
    </AppScreen>
  )
}

function Group({
  children,
  heading,
}: {
  children: ReactNode
  heading: ReactNode
}) {
  return (
    <section
      css={({ fonts }) => ({
        paddingTop: "2gu",
        fontFamily: fonts.families.sans,
        fontSize: "14px",
      })}
    >
      <h1
        css={({ colors }) => ({
          paddingBottom: "0.5gu",
          color: colors.contentDimmed,
        })}
      >
        {heading}
      </h1>
      <div>{children}</div>
    </section>
  )
}

function Distribution({ mint, swap }: { mint: number; swap: number }) {
  return (
    <div>
      <div
        css={{
          padding: "1gu 0",
        }}
      >
        <div
          css={{
            position: "relative",
            height: "0.5gu",
          }}
        >
          <div
            css={({ colors }) => ({
              position: "absolute",
              inset: "0",
              borderRadius: "4px",
              background: colors.pink,
            })}
          />
          <div
            css={({ colors }) => ({
              position: "absolute",
              inset: `0 ${(1 - mint) * 100}% 0 0`,
              borderRadius: "4px",
              background: colors.yellow,
            })}
          />
        </div>
      </div>

      <ul
        css={({ colors }) => ({
          "li": {
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            padding: "0.5gu 0 0",
            "&:before": {
              content: "\"\"",
              width: "1gu",
              height: "1gu",
              marginRight: "1gu",
              borderRadius: "50%",
              background: colors.yellow,
            },
            "& + li:before": {
              background: colors.pink,
            },
          },
        })}
      >
        <li>62% Minting</li>
        <li>38% Swapping</li>
      </ul>
    </div>
  )
}
