import type { MutationStatus } from "@tanstack/react-query"
import type { ContractInterface } from "ethers"
import type { Address, AddressOrEnsName } from "moire"

import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi"
import { CREATORS_BY_ADDRESS } from "./demo-data"
import { DEMO_MODE } from "./environment"
import { addressesEqual } from "./utils"

export function useIsConnectedAddress(address: AddressOrEnsName) {
  const provider = useProvider()
  const account = useAccount()

  const connectedAddress = DEMO_MODE
    ? Array.from(CREATORS_BY_ADDRESS.values())[0].address
    : account.address as Address

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

export type SignTxAndWaitStatus =
  | `prepare:${MutationStatus}`
  | `sign:${MutationStatus}`
  | `tx:${MutationStatus}`

export function useSignTxAndWait({
  addressOrName,
  args,
  contractInterface,
  enabled = true,
  functionName,
}: {
  addressOrName: AddressOrEnsName
  args: unknown[]
  contractInterface: ContractInterface
  enabled?: boolean
  functionName: string
}) {
  const prepareContractWrite = usePrepareContractWrite({
    addressOrName,
    args,
    contractInterface,
    enabled,
    functionName,
  })

  const contractWrite = useContractWrite(prepareContractWrite.config)

  const transactionResult = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    enabled,
  })

  const status = useMemo<SignTxAndWaitStatus>(() => {
    if (prepareContractWrite.status !== "success") {
      return `prepare:${prepareContractWrite.status}`
    }
    if (contractWrite.status !== "success") {
      return `sign:${contractWrite.status}`
    }
    return `tx:${transactionResult.status}`
  }, [contractWrite, prepareContractWrite, transactionResult])

  const write = useCallback(() => {
    contractWrite.write?.()
  }, [contractWrite])

  return {
    contractWrite,
    prepareContractWrite,
    status,
    transactionResult,
    write,
  }
}
