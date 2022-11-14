import type { ReactNode } from "react"

import { Button } from "moire"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { AppScreen } from "../AppLayout/AppScreen"
import { CHAIN_ID } from "../environment"
import { useLayout } from "../styles"

export function RequireConnected({
  children,
  onBack,
  messageConnect = "Please connect your account.",
  messageNetwork = "Your wallet is connected to the wrong network.",
}: {
  children: ReactNode
  onBack: () => void
  messageConnect?: string
  messageNetwork?: string
}) {
  const { isConnected } = useAccount()
  const network = useNetwork()
  const isCorrectNetwork = network.chain?.id === CHAIN_ID

  if (!isConnected) {
    return <Disconnected onBack={onBack} message={messageConnect} />
  }
  if (!isCorrectNetwork) {
    return <WrongNetwork onBack={onBack} message={messageNetwork} />
  }

  return <>{children}</>
}

function Disconnected({
  message,
  onBack,
}: {
  message: string
  onBack: () => void
}) {
  const layout = useLayout()
  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack }}>
      <div
        css={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          padding: layout.value({
            small: "0 3gu",
            medium: "0 3gu",
            large: "0",
          }),
          paddingTop: "8gu",
          textAlign: "center",
        }}
      >
        {message}
      </div>
    </AppScreen>
  )
}

function WrongNetwork({
  onBack,
  message,
}: {
  onBack: () => void
  message: string
}) {
  const layout = useLayout()
  const switchNetwork = useSwitchNetwork()
  const network = useNetwork()
  return (
    <AppScreen compactBar={{ title: "Fractionalize", onBack }}>
      <div
        css={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3gu",
          maxWidth: layout.value({
            small: "none",
            large: "104gu",
            xlarge: "128gu",
          }),
          margin: "0 auto",
          padding: layout.value({
            small: "0 3gu",
            medium: "0 3gu",
            large: "0",
          }),
          paddingTop: "8gu",
          textAlign: "center",
        }}
      >
        <div>{message}</div>
        <div>
          <Button
            label={layout.value({
              small: `Switch to ${network.chains[0]?.name}`,
              medium: `Switch to the ${network.chains[0]?.name} network`,
            })}
            onClick={() => {
              switchNetwork.switchNetwork?.(CHAIN_ID)
            }}
          />
        </div>
      </div>
    </AppScreen>
  )
}
