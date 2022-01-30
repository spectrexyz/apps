import { ReactNode } from "react"
import { Provider as WagmiProvider, defaultChains } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { providers } from "ethers"

import { INFURA_PROJECT_ID, CHAIN_ID } from "../environment"

const CHAIN = defaultChains.find((chain) => chain.id === CHAIN_ID)

if (!CHAIN) {
  throw new Error("CHAIN_ID not found: " + CHAIN_ID)
}

if (!INFURA_PROJECT_ID) {
  throw new Error("INFURA_PROJECT_ID missing.")
}

const wagmiConnectors = [
  new InjectedConnector({ chains: [CHAIN] }),
  new WalletConnectConnector({
    chains: [CHAIN],
    options: {
      // bridge: "https://bridge.walletconnect.org",
      qrcode: true,
      infuraId: INFURA_PROJECT_ID,
    },
  }),
]

const ethersProvider = new providers.InfuraProvider(CHAIN_ID, INFURA_PROJECT_ID)

export function Wagmi({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider connectors={wagmiConnectors} provider={ethersProvider}>
      {children}
    </WagmiProvider>
  )
}
