import type { AddressOrEnsName } from "kit"

import { useQuery } from "react-query"
import { useProvider } from "wagmi"
import { CREATORS_BY_ADDRESS } from "./demo-data"
import { addressesEqual } from "./utils"

export function useIsConnectedAddress(address: AddressOrEnsName) {
  const provider = useProvider()

  const connectedAddress = Array.from(CREATORS_BY_ADDRESS.values())[0].address
  // const [{ data }] = useAccount({ fetchEns: false })
  // const connectedAddress = data?.address

  return useQuery(
    ["is-connected-address", address, connectedAddress],
    () => {
      return address && connectedAddress
        ? addressesEqual(provider, address, connectedAddress)
        : false
    },
    { enabled: Boolean(connectedAddress) },
  )
}
