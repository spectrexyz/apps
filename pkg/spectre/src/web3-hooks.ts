import type { AddressOrEnsName } from "kit"

import { useQuery } from "react-query"
import { useProvider } from "wagmi"
import { CREATORS_BY_ENS_NAME } from "./demo-data"
import { addressesEqual } from "./utils"

export function useIsConnectedAddress(address: AddressOrEnsName) {
  const provider = useProvider()

  // const [{ data }] = useAccount({ fetchEns: false })
  // const connectedAddress = data?.address
  const connectedAddress = Array.from(CREATORS_BY_ENS_NAME.values())[0].address

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
