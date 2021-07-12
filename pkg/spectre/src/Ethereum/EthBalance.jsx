import { createContext, useContext } from "react"
import { useQuery } from "react-query"
import { useEthereum } from "./Ethereum.jsx"

const EthBalanceContext = createContext()

export function EthBalance({ children, refreshEvery = 7000 }) {
  const { account, ethersProvider } = useEthereum()
  const balance = useQuery(
    ["eth-balance", account],
    () =>
      account
        ? ethersProvider.getBalance(account).then((v) => BigInt(`${v}`))
        : -1n,
    { refetchInterval: refreshEvery }
  )
  return (
    <EthBalanceContext.Provider value={balance}>
      {children}
    </EthBalanceContext.Provider>
  )
}

export function useEthBalance() {
  return useContext(EthBalanceContext)
}
