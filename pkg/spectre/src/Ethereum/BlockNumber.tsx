import { createContext, useContext } from "react"
import { useQuery } from "react-query"
import { useEthereum } from "./Ethereum"

const BlockNumberContext = createContext()

export function BlockNumber({ children, refreshEvery = 7000 }) {
  const { ethersProvider } = useEthereum()
  const blockNumber = useQuery(
    "blockNumber",
    () => ethersProvider.getBlockNumber(),
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
