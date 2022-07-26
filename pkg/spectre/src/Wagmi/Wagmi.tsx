import type { ReactNode } from "react"

import { providers } from "ethers"
import { createClient, defaultChains, WagmiConfig } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import "../walletconnect-compat"

import { CHAIN_ID, INFURA_PROJECT_ID } from "../environment"

const CHAIN = defaultChains.find((chain) => chain.id === CHAIN_ID)

if (!CHAIN) {
  throw new Error(`CHAIN_ID not found: ${CHAIN_ID}`)
}

if (!INFURA_PROJECT_ID) {
  throw new Error("INFURA_PROJECT_ID missing.")
}

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains: [CHAIN] }),
    new WalletConnectConnector({
      chains: [CHAIN],
      options: { infuraId: INFURA_PROJECT_ID },
    }),
  ],
  provider: new providers.InfuraProvider(CHAIN_ID, INFURA_PROJECT_ID),
})

export function Wagmi({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}
