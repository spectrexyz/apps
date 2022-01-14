import type { ReactNode } from "react"

import { createContext, useCallback, useContext, useMemo } from "react"
import { Web3ReactProvider, useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { providers } from "ethers"
import { INFURA_PROJECT_ID, CHAIN_ID } from "../environment"

const EthereumContext = createContext<null | {
  account: string
  connect: (connectorId: string) => void
  disconnect: () => void
  ethersProvider: typeof providers.Provider
  wallet: ReturnType<typeof useWeb3React>
}>(null)

const ethersProvider = new providers.InfuraProvider(CHAIN_ID, INFURA_PROJECT_ID)

type EthereumProps = { children: ReactNode }

export function Ethereum({ children }: EthereumProps) {
  return (
    <Web3ReactProvider getLibrary={useCallback((p) => p, [])}>
      <EthereumProvider>{children}</EthereumProvider>
    </Web3ReactProvider>
  )
}

type EthereumProviderProps = { children: ReactNode }

function EthereumProvider({ children }: EthereumProviderProps) {
  const wallet = useWeb3React()

  const connect = useCallback(
    (connectorId) => {
      if (connectorId === "injected") {
        wallet.activate(
          new InjectedConnector({ supportedChainIds: [CHAIN_ID] })
        )
        return
      }
      if (connectorId === "wallet-connect") {
        wallet.activate(
          new InjectedConnector({ supportedChainIds: [CHAIN_ID] })
        )
        // Disabling WalletConnect for now (doesn’t work with Vite)
        // wallet.activate(
        //   new WalletConnectConnector({
        //     qrcode: true,
        //     rpc: {
        //       [CHAIN_ID]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
        //     },
        //   }),
        //   (err) => {
        //     console.log("ERR", err)
        //   },
        //   true
        // )
        return
      }
      throw new Error(`Incorrect connector ID: ${connectorId}`)
    },
    [wallet]
  )

  const disconnect = useCallback(() => {
    wallet.deactivate()
  }, [wallet])

  const value = useMemo(
    () => ({
      account: wallet.account,
      connect,
      disconnect,
      ethersProvider,
      wallet,
    }),
    [connect, disconnect, ethersProvider, wallet]
  )

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  )
}

export function useEthereum() {
  return useContext(EthereumContext)
}
