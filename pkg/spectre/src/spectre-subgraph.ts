/* eslint-disable */
// This file has been generated, do not edit.
// See spectre-subgraph/codegen.yml
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import gql from "graphql-tag"
import { z } from "zod"
import { subgraphFetcher } from "./subgraph-fetcher"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: string
  BigInt: string
  Bytes: string
}

export type Buyout = {
  readonly __typename?: "Buyout"
  readonly buyer: Scalars["Bytes"]
  readonly claims: ReadonlyArray<Claim>
  readonly collateral: Scalars["BigInt"]
  readonly id: Scalars["ID"]
  readonly sale: Sale
  readonly stock: Scalars["BigInt"]
  readonly timestamp: Scalars["BigInt"]
  readonly value: Scalars["BigInt"]
}

export type BuyoutProposal = {
  readonly __typename?: "BuyoutProposal"
  readonly buyer: Scalars["Bytes"]
  readonly collateral: Scalars["BigInt"]
  readonly expiration: Scalars["BigInt"]
  readonly id: Scalars["ID"]
  readonly sale: Sale
  readonly state: ProposalState
  readonly timestamp: Scalars["BigInt"]
  readonly value: Scalars["BigInt"]
}

export type Claim = {
  readonly __typename?: "Claim"
  readonly buyout: Buyout
  readonly collateral: Scalars["BigInt"]
  readonly holder: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly timestamp: Scalars["BigInt"]
  readonly value: Scalars["BigInt"]
}

export type Issuance = {
  readonly __typename?: "Issuance"
  readonly allocation: Scalars["BigInt"]
  readonly fee: Scalars["BigInt"]
  readonly flash?: Maybe<Scalars["Boolean"]>
  readonly guardian: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly issues: ReadonlyArray<Issue>
  readonly pool: Scalars["Bytes"]
  readonly poolId: Scalars["Bytes"]
  readonly proposals: ReadonlyArray<IssuanceProposal>
  readonly reserve: Scalars["BigInt"]
  readonly sERC20: SErc20
  readonly state: IssuanceState
}

export type IssuanceProposal = {
  readonly __typename?: "IssuanceProposal"
  readonly buyer: Scalars["Bytes"]
  readonly expiration: Scalars["BigInt"]
  readonly id: Scalars["ID"]
  readonly issuance: Issuance
  readonly price: Scalars["BigInt"]
  readonly state: ProposalState
  readonly timestamp: Scalars["BigInt"]
  readonly value: Scalars["BigInt"]
}

export enum IssuanceState {
  Closed = "Closed",
  Null = "Null",
  Opened = "Opened",
}

export type Issue = {
  readonly __typename?: "Issue"
  readonly amount: Scalars["BigInt"]
  readonly id: Scalars["ID"]
  readonly issuance: Issuance
  readonly recipient: Scalars["Bytes"]
  readonly timestamp: Scalars["BigInt"]
  readonly value: Scalars["BigInt"]
}

export type Join = {
  readonly __typename?: "Join"
  readonly amounts: ReadonlyArray<Scalars["BigInt"]>
  readonly from: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly pool: Pool
  readonly timestamp: Scalars["BigInt"]
}

export type Nft = {
  readonly __typename?: "NFT"
  readonly collection: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly tokenId: Scalars["BigInt"]
}

export type Pool = {
  readonly __typename?: "Pool"
  readonly address: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly joins: ReadonlyArray<Join>
  readonly sERC20: SErc20
  readonly sERC20IsToken0: Scalars["Boolean"]
  readonly states: ReadonlyArray<PoolState>
  readonly swaps: ReadonlyArray<Swap>
}

export type PoolState = {
  readonly __typename?: "PoolState"
  readonly balances: ReadonlyArray<Scalars["BigInt"]>
  readonly id: Scalars["ID"]
  readonly pool: Pool
  readonly price: Scalars["BigDecimal"]
  readonly timestamp: Scalars["BigInt"]
  readonly weights: ReadonlyArray<Scalars["BigInt"]>
}

export enum ProposalState {
  Accepted = "Accepted",
  Lapsed = "Lapsed",
  Null = "Null",
  Pending = "Pending",
  Rejected = "Rejected",
  Withdrawn = "Withdrawn",
}

export type Query = {
  readonly __typename?: "Query"
  readonly spectres: ReadonlyArray<Spectre>
}

export type QuerySpectresArgs = {
  first?: InputMaybe<Scalars["Int"]>
  skip?: InputMaybe<Scalars["Int"]>
}

export type Sale = {
  readonly __typename?: "Sale"
  readonly buyout?: Maybe<Buyout>
  readonly escape: Scalars["Boolean"]
  readonly flash: Scalars["Boolean"]
  readonly guardian: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly multiplier: Scalars["BigInt"]
  readonly opening: Scalars["BigInt"]
  readonly proposals: ReadonlyArray<BuyoutProposal>
  readonly reserve: Scalars["BigInt"]
  readonly sERC20: SErc20
  readonly state: SaleState
  readonly stock: Scalars["BigInt"]
}

export enum SaleState {
  Closed = "Closed",
  Null = "Null",
  Opened = "Opened",
  Pending = "Pending",
}

export type Spectre = {
  readonly __typename?: "Spectre"
  readonly NFT: Nft
  readonly broker: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly sERC20: SErc20
  readonly state: SpectreState
  readonly vault: Scalars["Bytes"]
}

export enum SpectreState {
  Locked = "Locked",
  Null = "Null",
  Unlocked = "Unlocked",
}

export type Swap = {
  readonly __typename?: "Swap"
  readonly amounts: ReadonlyArray<Scalars["BigInt"]>
  readonly from: Scalars["Bytes"]
  readonly id: Scalars["ID"]
  readonly pool: Pool
  readonly timestamp: Scalars["BigInt"]
}

export type SErc20 = {
  readonly __typename?: "sERC20"
  readonly cap: Scalars["BigInt"]
  readonly id: Scalars["ID"]
  readonly issuance?: Maybe<Issuance>
  readonly name: Scalars["String"]
  readonly pool?: Maybe<Pool>
  readonly sale?: Maybe<Sale>
  readonly spectre: Spectre
  readonly symbol: Scalars["String"]
}

export type AllSpectresQueryVariables = Exact<{ [key: string]: never }>

export type AllSpectresQuery = {
  readonly __typename?: "Query"
  readonly spectres: ReadonlyArray<
    {
      readonly __typename?: "Spectre"
      readonly sERC20: {
        readonly __typename?: "sERC20"
        readonly name: string
        readonly symbol: string
        readonly cap: string
        readonly sale?:
          | { readonly __typename?: "Sale"; readonly id: string }
          | null
        readonly issuance?: {
          readonly __typename?: "Issuance"
          readonly id: string
        } | null
      }
    }
  >
}

export const AllSpectres = gql`
    query AllSpectres {
  spectres {
    sERC20 {
      name
      symbol
      cap
      sale {
        id
      }
      issuance {
        id
      }
    }
  }
}
    `

export const AllSpectresDocument = `
    query AllSpectres {
  spectres {
    sERC20 {
      name
      symbol
      cap
      sale {
        id
      }
      issuance {
        id
      }
    }
  }
}
    `
export const useAllSpectresQuery = <
  TData = AllSpectresQuery,
  TError = unknown,
>(
  variables?: AllSpectresQueryVariables,
  options?: UseQueryOptions<AllSpectresQuery, TError, TData>,
) =>
  useQuery<AllSpectresQuery, TError, TData>(
    variables === undefined ? ["AllSpectres"] : ["AllSpectres", variables],
    subgraphFetcher<AllSpectresQuery, AllSpectresQueryVariables>(
      AllSpectresDocument,
      variables,
    ),
    options,
  )

type Properties<T> = Required<
  {
    [K in keyof T]: z.ZodType<T[K], any, T[K]>
  }
>

type definedNonNullAny = {}

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null

export const definedNonNullAnySchema = z.any().refine((v) =>
  isDefinedNonNullAny(v)
)

export const IssuanceStateSchema = z.nativeEnum(IssuanceState)

export const ProposalStateSchema = z.nativeEnum(ProposalState)

export const SaleStateSchema = z.nativeEnum(SaleState)

export const SpectreStateSchema = z.nativeEnum(SpectreState)
