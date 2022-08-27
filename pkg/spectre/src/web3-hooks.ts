import type { AddressOrEnsName } from "moire"

import { useQuery } from "@tanstack/react-query"
import { useProvider } from "wagmi"
import { CREATORS_BY_ADDRESS } from "./demo-data"
import { addressesEqual } from "./utils"

export function useIsConnectedAddress(address: AddressOrEnsName) {
  const provider = useProvider()

  const connectedAddress = Array.from(CREATORS_BY_ADDRESS.values())[0].address
  // const { address: connectedAddress } = useAccount()

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
