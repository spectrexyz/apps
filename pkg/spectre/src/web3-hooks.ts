import type { AddressOrEnsName } from "kit"

import { useQuery } from "react-query"
import { useAccount, useProvider } from "wagmi"
import { addressesEqual } from "./utils"

export function useIsConnectedAddress(address: AddressOrEnsName) {
  const [{ data }] = useAccount({ fetchEns: false })
  const provider = useProvider()
  const connectedAddress = data?.address
  return useQuery(
    ["is-connected-address", address, connectedAddress],
    async () => {
      return address && connectedAddress
        ? addressesEqual(provider, address, connectedAddress)
        : false
    },
    { enabled: Boolean(connectedAddress) },
  )
}
