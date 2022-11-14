import type { Abi } from "abitype"
import type { Dnum } from "dnum"
import type { Address, AddressOrEnsName } from "moire"
import type { SignTxAndWaitStatus } from "./types"

import { useQuery } from "@tanstack/react-query"
import { BigNumber } from "ethers"
import { useCallback, useMemo } from "react"
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi"
import { CREATORS_BY_ADDRESS } from "./demo-data"
import { DEMO_MODE } from "./environment"
import { addressesEqual } from "./utils"

export function useConnectedAccountBalance(): (
  // The return type should be infered by TS, but an issue
  // prevents it so we declare it explicitly.
  // https://github.com/microsoft/TypeScript/issues/47663
  Omit<ReturnType<typeof useBalance>, "data"> & { data?: Dnum }
) {
  const account = useAccount()
  const balance = useBalance({
    addressOrName: account.address,
    enabled: account.status === "connected",
  })
  return {
    ...balance,
    data: balance.data && ([
      BigInt(String(balance.data.value)),
      18,
    ] as const),
  }
}

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

export function useSignTxAndWait({
  address,
  args,
  abi,
  enabled = true,
  functionName,
  value,
}: {
  address: AddressOrEnsName
  args: unknown[]
  abi: Abi
  enabled?: boolean
  functionName: string
  value?: Dnum
}): {
  // The return type should be infered by TS, but an issue
  // prevents it so we declare it explicitly.
  // https://github.com/microsoft/TypeScript/issues/47663
  contractWrite: ReturnType<typeof useContractWrite>
  prepareContractWrite: ReturnType<typeof usePrepareContractWrite>
  reset: () => void
  status: SignTxAndWaitStatus
  transactionResult: ReturnType<typeof useWaitForTransaction>
  write: () => void
} {
  const value_ = value ? BigNumber.from(value[0]) : null

  const prepareContractWrite = usePrepareContractWrite({
    address,
    args,
    abi,
    enabled,
    functionName,
    overrides: value_ === null ? {} : { value: value_ },
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
    if (transactionResult.status === "success") {
      // reverted = error
      return `tx:${transactionResult.data?.status === 1 ? "success" : "error"}`
    }
    return `tx:${transactionResult.status}`
  }, [contractWrite, prepareContractWrite, transactionResult])

  const write = useCallback(() => {
    contractWrite.write?.()
  }, [contractWrite])

  const reset = useCallback(() => {
    contractWrite.reset()
    void prepareContractWrite.refetch()
    void transactionResult.refetch()
  }, [contractWrite, prepareContractWrite, transactionResult])

  return {
    contractWrite,
    prepareContractWrite,
    reset,
    status,
    transactionResult,
    write,
  }
}
