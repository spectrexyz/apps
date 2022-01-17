import { createContext, useContext, ReactNode } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { useEthereum } from "./Ethereum"

const BlockNumberContext = createContext<UseQueryResult<number>>({} as UseQueryResult<number>)

export function BlockNumber({
  children,
  refreshEvery = 7000,
}: {
  children: ReactNode
  refreshEvery?: number
}) {
  const { ethersProvider } = useEthereum()
  const blockNumber = useQuery<number>(
    "blockNumber",
    () => ethersProvider?.getBlockNumber() ?? -1,
    { refetchInterval: refreshEvery }
  )
  return (
    <BlockNumberContext.Provider value={blockNumber}>
      {children}
    </BlockNumberContext.Provider>
  )
}

export function useBlockNumber() {
  return useContext(BlockNumberContext)
}
