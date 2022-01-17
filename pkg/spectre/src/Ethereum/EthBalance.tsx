import { ReactNode, createContext, useContext } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { useEthereum } from "./Ethereum"

const EthBalanceContext = createContext<UseQueryResult<bigint>>({} as UseQueryResult<bigint>)

export function EthBalance({
  children,
  refreshEvery = 7000,
}: {
  children: ReactNode
  refreshEvery?: number
}) {
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
