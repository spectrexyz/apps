import type { ReactNode } from "react"

import { configureChains, createClient, WagmiConfig } from "wagmi"
import { goerli, mainnet } from "wagmi/chains"

import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { infuraProvider } from "wagmi/providers/infura"
import "../walletconnect-compat"

import { CHAIN_ID, INFURA_PROJECT_ID } from "../environment"

const CHAIN = [mainnet, goerli].find((chain) => chain.id === CHAIN_ID)

if (!CHAIN) {
  throw new Error(`CHAIN_ID not found: ${CHAIN_ID}`)
}

if (!INFURA_PROJECT_ID) {
  throw new Error("INFURA_PROJECT_ID missing.")
}

const { chains, provider, webSocketProvider } = configureChains(
  [CHAIN],
  [infuraProvider({ apiKey: INFURA_PROJECT_ID })],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: { infuraId: INFURA_PROJECT_ID },
    }),
  ],
})

export function Wagmi({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}
