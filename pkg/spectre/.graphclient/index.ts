// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import type { SpectreContext } from './sources/spectre/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: bigint;
  Bytes: string;
};

export type BlockChangedFilter = {
  readonly number_gte: Scalars['Int'];
};

export type Block_height = {
  readonly hash?: InputMaybe<Scalars['Bytes']>;
  readonly number?: InputMaybe<Scalars['Int']>;
  readonly number_gte?: InputMaybe<Scalars['Int']>;
};

export type Buyout = {
  readonly id: Scalars['ID'];
  readonly sale: Sale;
  readonly timestamp: Scalars['BigInt'];
  readonly buyer: Scalars['Bytes'];
  readonly value: Scalars['BigInt'];
  readonly collateral: Scalars['BigInt'];
  readonly stock: Scalars['BigInt'];
  readonly claims: ReadonlyArray<Claim>;
};


export type BuyoutclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
};

export type BuyoutProposal = {
  readonly id: Scalars['ID'];
  readonly sale: Sale;
  readonly state: ProposalState;
  readonly timestamp: Scalars['BigInt'];
  readonly buyer: Scalars['Bytes'];
  readonly value: Scalars['BigInt'];
  readonly collateral: Scalars['BigInt'];
  readonly expiration: Scalars['BigInt'];
};

export type BuyoutProposal_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly sale?: InputMaybe<Scalars['String']>;
  readonly sale_not?: InputMaybe<Scalars['String']>;
  readonly sale_gt?: InputMaybe<Scalars['String']>;
  readonly sale_lt?: InputMaybe<Scalars['String']>;
  readonly sale_gte?: InputMaybe<Scalars['String']>;
  readonly sale_lte?: InputMaybe<Scalars['String']>;
  readonly sale_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_contains?: InputMaybe<Scalars['String']>;
  readonly sale_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_?: InputMaybe<Sale_filter>;
  readonly state?: InputMaybe<ProposalState>;
  readonly state_not?: InputMaybe<ProposalState>;
  readonly state_in?: InputMaybe<ReadonlyArray<ProposalState>>;
  readonly state_not_in?: InputMaybe<ReadonlyArray<ProposalState>>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly buyer?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_contains?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly value?: InputMaybe<Scalars['BigInt']>;
  readonly value_not?: InputMaybe<Scalars['BigInt']>;
  readonly value_gt?: InputMaybe<Scalars['BigInt']>;
  readonly value_lt?: InputMaybe<Scalars['BigInt']>;
  readonly value_gte?: InputMaybe<Scalars['BigInt']>;
  readonly value_lte?: InputMaybe<Scalars['BigInt']>;
  readonly value_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly value_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_not?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly expiration?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_not?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_gt?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_lt?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_gte?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_lte?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly expiration_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type BuyoutProposal_orderBy =
  | 'id'
  | 'sale'
  | 'state'
  | 'timestamp'
  | 'buyer'
  | 'value'
  | 'collateral'
  | 'expiration';

export type Buyout_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly sale?: InputMaybe<Scalars['String']>;
  readonly sale_not?: InputMaybe<Scalars['String']>;
  readonly sale_gt?: InputMaybe<Scalars['String']>;
  readonly sale_lt?: InputMaybe<Scalars['String']>;
  readonly sale_gte?: InputMaybe<Scalars['String']>;
  readonly sale_lte?: InputMaybe<Scalars['String']>;
  readonly sale_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_contains?: InputMaybe<Scalars['String']>;
  readonly sale_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_?: InputMaybe<Sale_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly buyer?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_contains?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly value?: InputMaybe<Scalars['BigInt']>;
  readonly value_not?: InputMaybe<Scalars['BigInt']>;
  readonly value_gt?: InputMaybe<Scalars['BigInt']>;
  readonly value_lt?: InputMaybe<Scalars['BigInt']>;
  readonly value_gte?: InputMaybe<Scalars['BigInt']>;
  readonly value_lte?: InputMaybe<Scalars['BigInt']>;
  readonly value_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly value_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_not?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly stock?: InputMaybe<Scalars['BigInt']>;
  readonly stock_not?: InputMaybe<Scalars['BigInt']>;
  readonly stock_gt?: InputMaybe<Scalars['BigInt']>;
  readonly stock_lt?: InputMaybe<Scalars['BigInt']>;
  readonly stock_gte?: InputMaybe<Scalars['BigInt']>;
  readonly stock_lte?: InputMaybe<Scalars['BigInt']>;
  readonly stock_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly stock_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly claims_?: InputMaybe<Claim_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Buyout_orderBy =
  | 'id'
  | 'sale'
  | 'timestamp'
  | 'buyer'
  | 'value'
  | 'collateral'
  | 'stock'
  | 'claims';

export type Claim = {
  readonly id: Scalars['ID'];
  readonly buyout: Buyout;
  readonly timestamp: Scalars['BigInt'];
  readonly holder: Scalars['Bytes'];
  readonly value: Scalars['BigInt'];
  readonly collateral: Scalars['BigInt'];
};

export type Claim_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly buyout?: InputMaybe<Scalars['String']>;
  readonly buyout_not?: InputMaybe<Scalars['String']>;
  readonly buyout_gt?: InputMaybe<Scalars['String']>;
  readonly buyout_lt?: InputMaybe<Scalars['String']>;
  readonly buyout_gte?: InputMaybe<Scalars['String']>;
  readonly buyout_lte?: InputMaybe<Scalars['String']>;
  readonly buyout_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly buyout_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly buyout_contains?: InputMaybe<Scalars['String']>;
  readonly buyout_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_contains?: InputMaybe<Scalars['String']>;
  readonly buyout_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_starts_with?: InputMaybe<Scalars['String']>;
  readonly buyout_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly buyout_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_ends_with?: InputMaybe<Scalars['String']>;
  readonly buyout_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly buyout_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_?: InputMaybe<Buyout_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly holder?: InputMaybe<Scalars['Bytes']>;
  readonly holder_not?: InputMaybe<Scalars['Bytes']>;
  readonly holder_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly holder_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly holder_contains?: InputMaybe<Scalars['Bytes']>;
  readonly holder_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly value?: InputMaybe<Scalars['BigInt']>;
  readonly value_not?: InputMaybe<Scalars['BigInt']>;
  readonly value_gt?: InputMaybe<Scalars['BigInt']>;
  readonly value_lt?: InputMaybe<Scalars['BigInt']>;
  readonly value_gte?: InputMaybe<Scalars['BigInt']>;
  readonly value_lte?: InputMaybe<Scalars['BigInt']>;
  readonly value_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly value_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_not?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lt?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_gte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_lte?: InputMaybe<Scalars['BigInt']>;
  readonly collateral_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly collateral_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Claim_orderBy =
  | 'id'
  | 'buyout'
  | 'timestamp'
  | 'holder'
  | 'value'
  | 'collateral';

export type Issuance = {
  readonly id: Scalars['ID'];
  readonly sERC20: sERC20;
  readonly state: IssuanceState;
  readonly guardian: Scalars['Bytes'];
  readonly pool: Scalars['Bytes'];
  readonly poolId: Scalars['Bytes'];
  readonly reserve: Scalars['BigInt'];
  readonly allocation: Scalars['BigInt'];
  readonly fee: Scalars['BigInt'];
  readonly flash?: Maybe<Scalars['Boolean']>;
  readonly issues: ReadonlyArray<Issue>;
  readonly proposals: ReadonlyArray<IssuanceProposal>;
};


export type IssuanceissuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issue_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Issue_filter>;
};


export type IssuanceproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IssuanceProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IssuanceProposal_filter>;
};

export type IssuanceProposal = {
  readonly id: Scalars['ID'];
  readonly issuance: Issuance;
  readonly state: ProposalState;
  readonly timestamp: Scalars['BigInt'];
  readonly buyer: Scalars['Bytes'];
  readonly value: Scalars['BigInt'];
  readonly price: Scalars['BigInt'];
  readonly expiration: Scalars['BigInt'];
};

export type IssuanceProposal_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly issuance?: InputMaybe<Scalars['String']>;
  readonly issuance_not?: InputMaybe<Scalars['String']>;
  readonly issuance_gt?: InputMaybe<Scalars['String']>;
  readonly issuance_lt?: InputMaybe<Scalars['String']>;
  readonly issuance_gte?: InputMaybe<Scalars['String']>;
  readonly issuance_lte?: InputMaybe<Scalars['String']>;
  readonly issuance_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_?: InputMaybe<Issuance_filter>;
  readonly state?: InputMaybe<ProposalState>;
  readonly state_not?: InputMaybe<ProposalState>;
  readonly state_in?: InputMaybe<ReadonlyArray<ProposalState>>;
  readonly state_not_in?: InputMaybe<ReadonlyArray<ProposalState>>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly buyer?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly buyer_contains?: InputMaybe<Scalars['Bytes']>;
  readonly buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly value?: InputMaybe<Scalars['BigInt']>;
  readonly value_not?: InputMaybe<Scalars['BigInt']>;
  readonly value_gt?: InputMaybe<Scalars['BigInt']>;
  readonly value_lt?: InputMaybe<Scalars['BigInt']>;
  readonly value_gte?: InputMaybe<Scalars['BigInt']>;
  readonly value_lte?: InputMaybe<Scalars['BigInt']>;
  readonly value_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly value_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly price?: InputMaybe<Scalars['BigInt']>;
  readonly price_not?: InputMaybe<Scalars['BigInt']>;
  readonly price_gt?: InputMaybe<Scalars['BigInt']>;
  readonly price_lt?: InputMaybe<Scalars['BigInt']>;
  readonly price_gte?: InputMaybe<Scalars['BigInt']>;
  readonly price_lte?: InputMaybe<Scalars['BigInt']>;
  readonly price_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly price_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly expiration?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_not?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_gt?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_lt?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_gte?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_lte?: InputMaybe<Scalars['BigInt']>;
  readonly expiration_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly expiration_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type IssuanceProposal_orderBy =
  | 'id'
  | 'issuance'
  | 'state'
  | 'timestamp'
  | 'buyer'
  | 'value'
  | 'price'
  | 'expiration';

export type IssuanceState =
  | 'Null'
  | 'Opened'
  | 'Closed';

export type Issuance_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly sERC20?: InputMaybe<Scalars['String']>;
  readonly sERC20_not?: InputMaybe<Scalars['String']>;
  readonly sERC20_gt?: InputMaybe<Scalars['String']>;
  readonly sERC20_lt?: InputMaybe<Scalars['String']>;
  readonly sERC20_gte?: InputMaybe<Scalars['String']>;
  readonly sERC20_lte?: InputMaybe<Scalars['String']>;
  readonly sERC20_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_?: InputMaybe<sERC20_filter>;
  readonly state?: InputMaybe<IssuanceState>;
  readonly state_not?: InputMaybe<IssuanceState>;
  readonly state_in?: InputMaybe<ReadonlyArray<IssuanceState>>;
  readonly state_not_in?: InputMaybe<ReadonlyArray<IssuanceState>>;
  readonly guardian?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_not?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly guardian_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly guardian_contains?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly pool?: InputMaybe<Scalars['Bytes']>;
  readonly pool_not?: InputMaybe<Scalars['Bytes']>;
  readonly pool_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly pool_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly pool_contains?: InputMaybe<Scalars['Bytes']>;
  readonly pool_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly poolId?: InputMaybe<Scalars['Bytes']>;
  readonly poolId_not?: InputMaybe<Scalars['Bytes']>;
  readonly poolId_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly poolId_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly poolId_contains?: InputMaybe<Scalars['Bytes']>;
  readonly poolId_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly reserve?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_not?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_gt?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_lt?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_gte?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_lte?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly reserve_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly allocation?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_not?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_gt?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_lt?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_gte?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_lte?: InputMaybe<Scalars['BigInt']>;
  readonly allocation_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly allocation_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly fee?: InputMaybe<Scalars['BigInt']>;
  readonly fee_not?: InputMaybe<Scalars['BigInt']>;
  readonly fee_gt?: InputMaybe<Scalars['BigInt']>;
  readonly fee_lt?: InputMaybe<Scalars['BigInt']>;
  readonly fee_gte?: InputMaybe<Scalars['BigInt']>;
  readonly fee_lte?: InputMaybe<Scalars['BigInt']>;
  readonly fee_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly fee_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly flash?: InputMaybe<Scalars['Boolean']>;
  readonly flash_not?: InputMaybe<Scalars['Boolean']>;
  readonly flash_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly flash_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly issues_?: InputMaybe<Issue_filter>;
  readonly proposals_?: InputMaybe<IssuanceProposal_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Issuance_orderBy =
  | 'id'
  | 'sERC20'
  | 'state'
  | 'guardian'
  | 'pool'
  | 'poolId'
  | 'reserve'
  | 'allocation'
  | 'fee'
  | 'flash'
  | 'issues'
  | 'proposals';

export type Issue = {
  readonly id: Scalars['ID'];
  readonly issuance: Issuance;
  readonly timestamp: Scalars['BigInt'];
  readonly recipient: Scalars['Bytes'];
  readonly value: Scalars['BigInt'];
  readonly amount: Scalars['BigInt'];
};

export type Issue_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly issuance?: InputMaybe<Scalars['String']>;
  readonly issuance_not?: InputMaybe<Scalars['String']>;
  readonly issuance_gt?: InputMaybe<Scalars['String']>;
  readonly issuance_lt?: InputMaybe<Scalars['String']>;
  readonly issuance_gte?: InputMaybe<Scalars['String']>;
  readonly issuance_lte?: InputMaybe<Scalars['String']>;
  readonly issuance_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_?: InputMaybe<Issuance_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly recipient?: InputMaybe<Scalars['Bytes']>;
  readonly recipient_not?: InputMaybe<Scalars['Bytes']>;
  readonly recipient_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly recipient_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly recipient_contains?: InputMaybe<Scalars['Bytes']>;
  readonly recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly value?: InputMaybe<Scalars['BigInt']>;
  readonly value_not?: InputMaybe<Scalars['BigInt']>;
  readonly value_gt?: InputMaybe<Scalars['BigInt']>;
  readonly value_lt?: InputMaybe<Scalars['BigInt']>;
  readonly value_gte?: InputMaybe<Scalars['BigInt']>;
  readonly value_lte?: InputMaybe<Scalars['BigInt']>;
  readonly value_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly value_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amount?: InputMaybe<Scalars['BigInt']>;
  readonly amount_not?: InputMaybe<Scalars['BigInt']>;
  readonly amount_gt?: InputMaybe<Scalars['BigInt']>;
  readonly amount_lt?: InputMaybe<Scalars['BigInt']>;
  readonly amount_gte?: InputMaybe<Scalars['BigInt']>;
  readonly amount_lte?: InputMaybe<Scalars['BigInt']>;
  readonly amount_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amount_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Issue_orderBy =
  | 'id'
  | 'issuance'
  | 'timestamp'
  | 'recipient'
  | 'value'
  | 'amount';

export type Join = {
  readonly id: Scalars['ID'];
  readonly pool: Pool;
  readonly timestamp: Scalars['BigInt'];
  readonly from: Scalars['Bytes'];
  readonly amounts: ReadonlyArray<Scalars['BigInt']>;
};

export type Join_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly pool?: InputMaybe<Scalars['String']>;
  readonly pool_not?: InputMaybe<Scalars['String']>;
  readonly pool_gt?: InputMaybe<Scalars['String']>;
  readonly pool_lt?: InputMaybe<Scalars['String']>;
  readonly pool_gte?: InputMaybe<Scalars['String']>;
  readonly pool_lte?: InputMaybe<Scalars['String']>;
  readonly pool_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_contains?: InputMaybe<Scalars['String']>;
  readonly pool_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_?: InputMaybe<Pool_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly from?: InputMaybe<Scalars['Bytes']>;
  readonly from_not?: InputMaybe<Scalars['Bytes']>;
  readonly from_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly from_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly from_contains?: InputMaybe<Scalars['Bytes']>;
  readonly from_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly amounts?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Join_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'from'
  | 'amounts';

export type NFT = {
  readonly id: Scalars['ID'];
  readonly collection: Scalars['Bytes'];
  readonly tokenId: Scalars['BigInt'];
  readonly tokenURI: Scalars['String'];
  readonly creator: Scalars['Bytes'];
};

export type NFT_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly collection?: InputMaybe<Scalars['Bytes']>;
  readonly collection_not?: InputMaybe<Scalars['Bytes']>;
  readonly collection_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly collection_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly collection_contains?: InputMaybe<Scalars['Bytes']>;
  readonly collection_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly tokenId?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_not?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenId_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly tokenId_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly tokenURI?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not?: InputMaybe<Scalars['String']>;
  readonly tokenURI_gt?: InputMaybe<Scalars['String']>;
  readonly tokenURI_lt?: InputMaybe<Scalars['String']>;
  readonly tokenURI_gte?: InputMaybe<Scalars['String']>;
  readonly tokenURI_lte?: InputMaybe<Scalars['String']>;
  readonly tokenURI_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly tokenURI_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly tokenURI_contains?: InputMaybe<Scalars['String']>;
  readonly tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly creator?: InputMaybe<Scalars['Bytes']>;
  readonly creator_not?: InputMaybe<Scalars['Bytes']>;
  readonly creator_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly creator_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly creator_contains?: InputMaybe<Scalars['Bytes']>;
  readonly creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NFT_orderBy =
  | 'id'
  | 'collection'
  | 'tokenId'
  | 'tokenURI'
  | 'creator';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pool = {
  readonly id: Scalars['ID'];
  readonly address: Scalars['Bytes'];
  readonly sERC20: sERC20;
  readonly sERC20IsToken0: Scalars['Boolean'];
  readonly states: ReadonlyArray<PoolState>;
  readonly swaps: ReadonlyArray<Swap>;
  readonly joins: ReadonlyArray<Join>;
};


export type PoolstatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolState_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolState_filter>;
};


export type PoolswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
};


export type PooljoinsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Join_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Join_filter>;
};

export type PoolState = {
  readonly id: Scalars['ID'];
  readonly pool: Pool;
  readonly timestamp: Scalars['BigInt'];
  readonly balances: ReadonlyArray<Scalars['BigInt']>;
  readonly weights: ReadonlyArray<Scalars['BigInt']>;
  readonly price: Scalars['BigDecimal'];
};

export type PoolState_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly pool?: InputMaybe<Scalars['String']>;
  readonly pool_not?: InputMaybe<Scalars['String']>;
  readonly pool_gt?: InputMaybe<Scalars['String']>;
  readonly pool_lt?: InputMaybe<Scalars['String']>;
  readonly pool_gte?: InputMaybe<Scalars['String']>;
  readonly pool_lte?: InputMaybe<Scalars['String']>;
  readonly pool_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_contains?: InputMaybe<Scalars['String']>;
  readonly pool_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_?: InputMaybe<Pool_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances_not?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances_not_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly balances_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights_not?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights_not_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly weights_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly price?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_not?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_gt?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_lt?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_gte?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_lte?: InputMaybe<Scalars['BigDecimal']>;
  readonly price_in?: InputMaybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly price_not_in?: InputMaybe<ReadonlyArray<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PoolState_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'balances'
  | 'weights'
  | 'price';

export type Pool_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly address?: InputMaybe<Scalars['Bytes']>;
  readonly address_not?: InputMaybe<Scalars['Bytes']>;
  readonly address_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly sERC20?: InputMaybe<Scalars['String']>;
  readonly sERC20_not?: InputMaybe<Scalars['String']>;
  readonly sERC20_gt?: InputMaybe<Scalars['String']>;
  readonly sERC20_lt?: InputMaybe<Scalars['String']>;
  readonly sERC20_gte?: InputMaybe<Scalars['String']>;
  readonly sERC20_lte?: InputMaybe<Scalars['String']>;
  readonly sERC20_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_?: InputMaybe<sERC20_filter>;
  readonly sERC20IsToken0?: InputMaybe<Scalars['Boolean']>;
  readonly sERC20IsToken0_not?: InputMaybe<Scalars['Boolean']>;
  readonly sERC20IsToken0_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly sERC20IsToken0_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly states_?: InputMaybe<PoolState_filter>;
  readonly swaps_?: InputMaybe<Swap_filter>;
  readonly joins_?: InputMaybe<Join_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Pool_orderBy =
  | 'id'
  | 'address'
  | 'sERC20'
  | 'sERC20IsToken0'
  | 'states'
  | 'swaps'
  | 'joins';

export type ProposalState =
  | 'Null'
  | 'Pending'
  | 'Accepted'
  | 'Rejected'
  | 'Lapsed'
  | 'Withdrawn';

export type Query = {
  readonly nft?: Maybe<NFT>;
  readonly nfts: ReadonlyArray<NFT>;
  readonly spectre?: Maybe<Spectre>;
  readonly spectres: ReadonlyArray<Spectre>;
  readonly spectresCounter?: Maybe<SpectresCounter>;
  readonly spectresCounters: ReadonlyArray<SpectresCounter>;
  readonly sERC20?: Maybe<sERC20>;
  readonly sERC20S: ReadonlyArray<sERC20>;
  readonly sERC20Holder?: Maybe<sERC20Holder>;
  readonly sERC20Holders: ReadonlyArray<sERC20Holder>;
  readonly sale?: Maybe<Sale>;
  readonly sales: ReadonlyArray<Sale>;
  readonly buyoutProposal?: Maybe<BuyoutProposal>;
  readonly buyoutProposals: ReadonlyArray<BuyoutProposal>;
  readonly buyout?: Maybe<Buyout>;
  readonly buyouts: ReadonlyArray<Buyout>;
  readonly claim?: Maybe<Claim>;
  readonly claims: ReadonlyArray<Claim>;
  readonly issuance?: Maybe<Issuance>;
  readonly issuances: ReadonlyArray<Issuance>;
  readonly issue?: Maybe<Issue>;
  readonly issues: ReadonlyArray<Issue>;
  readonly issuanceProposal?: Maybe<IssuanceProposal>;
  readonly issuanceProposals: ReadonlyArray<IssuanceProposal>;
  readonly pool?: Maybe<Pool>;
  readonly pools: ReadonlyArray<Pool>;
  readonly poolState?: Maybe<PoolState>;
  readonly poolStates: ReadonlyArray<PoolState>;
  readonly swap?: Maybe<Swap>;
  readonly swaps: ReadonlyArray<Swap>;
  readonly join?: Maybe<Join>;
  readonly joins: ReadonlyArray<Join>;
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
};


export type QuerynftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspectreArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspectresArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Spectre_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Spectre_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspectresCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryspectresCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpectresCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpectresCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysERC20Args = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysERC20SArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysERC20HolderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysERC20HoldersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20Holder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20Holder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybuyoutProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybuyoutProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BuyoutProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BuyoutProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybuyoutArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybuyoutsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Buyout_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Buyout_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissuanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissuancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issuance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Issuance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissueArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issue_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Issue_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissuanceProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryissuanceProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IssuanceProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IssuanceProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolStateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolStatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolState_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolState_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryjoinArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryjoinsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Join_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Join_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Sale = {
  readonly id: Scalars['ID'];
  readonly sERC20: sERC20;
  readonly state: SaleState;
  readonly guardian: Scalars['Bytes'];
  readonly reserve: Scalars['BigInt'];
  readonly multiplier: Scalars['BigInt'];
  readonly opening: Scalars['BigInt'];
  readonly stock: Scalars['BigInt'];
  readonly flash: Scalars['Boolean'];
  readonly escape: Scalars['Boolean'];
  readonly proposals: ReadonlyArray<BuyoutProposal>;
  readonly buyout?: Maybe<Buyout>;
};


export type SaleproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BuyoutProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BuyoutProposal_filter>;
};

export type SaleState =
  | 'Null'
  | 'Pending'
  | 'Opened'
  | 'Closed';

export type Sale_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly sERC20?: InputMaybe<Scalars['String']>;
  readonly sERC20_not?: InputMaybe<Scalars['String']>;
  readonly sERC20_gt?: InputMaybe<Scalars['String']>;
  readonly sERC20_lt?: InputMaybe<Scalars['String']>;
  readonly sERC20_gte?: InputMaybe<Scalars['String']>;
  readonly sERC20_lte?: InputMaybe<Scalars['String']>;
  readonly sERC20_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_?: InputMaybe<sERC20_filter>;
  readonly state?: InputMaybe<SaleState>;
  readonly state_not?: InputMaybe<SaleState>;
  readonly state_in?: InputMaybe<ReadonlyArray<SaleState>>;
  readonly state_not_in?: InputMaybe<ReadonlyArray<SaleState>>;
  readonly guardian?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_not?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly guardian_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly guardian_contains?: InputMaybe<Scalars['Bytes']>;
  readonly guardian_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly reserve?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_not?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_gt?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_lt?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_gte?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_lte?: InputMaybe<Scalars['BigInt']>;
  readonly reserve_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly reserve_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly multiplier?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_not?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_gt?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_lt?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_gte?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_lte?: InputMaybe<Scalars['BigInt']>;
  readonly multiplier_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly multiplier_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly opening?: InputMaybe<Scalars['BigInt']>;
  readonly opening_not?: InputMaybe<Scalars['BigInt']>;
  readonly opening_gt?: InputMaybe<Scalars['BigInt']>;
  readonly opening_lt?: InputMaybe<Scalars['BigInt']>;
  readonly opening_gte?: InputMaybe<Scalars['BigInt']>;
  readonly opening_lte?: InputMaybe<Scalars['BigInt']>;
  readonly opening_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly opening_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly stock?: InputMaybe<Scalars['BigInt']>;
  readonly stock_not?: InputMaybe<Scalars['BigInt']>;
  readonly stock_gt?: InputMaybe<Scalars['BigInt']>;
  readonly stock_lt?: InputMaybe<Scalars['BigInt']>;
  readonly stock_gte?: InputMaybe<Scalars['BigInt']>;
  readonly stock_lte?: InputMaybe<Scalars['BigInt']>;
  readonly stock_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly stock_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly flash?: InputMaybe<Scalars['Boolean']>;
  readonly flash_not?: InputMaybe<Scalars['Boolean']>;
  readonly flash_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly flash_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly escape?: InputMaybe<Scalars['Boolean']>;
  readonly escape_not?: InputMaybe<Scalars['Boolean']>;
  readonly escape_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly escape_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly proposals_?: InputMaybe<BuyoutProposal_filter>;
  readonly buyout?: InputMaybe<Scalars['String']>;
  readonly buyout_not?: InputMaybe<Scalars['String']>;
  readonly buyout_gt?: InputMaybe<Scalars['String']>;
  readonly buyout_lt?: InputMaybe<Scalars['String']>;
  readonly buyout_gte?: InputMaybe<Scalars['String']>;
  readonly buyout_lte?: InputMaybe<Scalars['String']>;
  readonly buyout_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly buyout_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly buyout_contains?: InputMaybe<Scalars['String']>;
  readonly buyout_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_contains?: InputMaybe<Scalars['String']>;
  readonly buyout_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_starts_with?: InputMaybe<Scalars['String']>;
  readonly buyout_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly buyout_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_ends_with?: InputMaybe<Scalars['String']>;
  readonly buyout_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly buyout_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly buyout_?: InputMaybe<Buyout_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Sale_orderBy =
  | 'id'
  | 'sERC20'
  | 'state'
  | 'guardian'
  | 'reserve'
  | 'multiplier'
  | 'opening'
  | 'stock'
  | 'flash'
  | 'escape'
  | 'proposals'
  | 'buyout';

export type Spectre = {
  readonly id: Scalars['ID'];
  readonly NFT: NFT;
  readonly sERC20: sERC20;
  readonly state: SpectreState;
  readonly vault: Scalars['Bytes'];
  readonly broker: Scalars['Bytes'];
  readonly timestamp: Scalars['BigInt'];
};

export type SpectreState =
  | 'Null'
  | 'Locked'
  | 'Unlocked';

export type Spectre_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly NFT?: InputMaybe<Scalars['String']>;
  readonly NFT_not?: InputMaybe<Scalars['String']>;
  readonly NFT_gt?: InputMaybe<Scalars['String']>;
  readonly NFT_lt?: InputMaybe<Scalars['String']>;
  readonly NFT_gte?: InputMaybe<Scalars['String']>;
  readonly NFT_lte?: InputMaybe<Scalars['String']>;
  readonly NFT_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly NFT_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly NFT_contains?: InputMaybe<Scalars['String']>;
  readonly NFT_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_not_contains?: InputMaybe<Scalars['String']>;
  readonly NFT_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_starts_with?: InputMaybe<Scalars['String']>;
  readonly NFT_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly NFT_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_ends_with?: InputMaybe<Scalars['String']>;
  readonly NFT_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly NFT_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly NFT_?: InputMaybe<NFT_filter>;
  readonly sERC20?: InputMaybe<Scalars['String']>;
  readonly sERC20_not?: InputMaybe<Scalars['String']>;
  readonly sERC20_gt?: InputMaybe<Scalars['String']>;
  readonly sERC20_lt?: InputMaybe<Scalars['String']>;
  readonly sERC20_gte?: InputMaybe<Scalars['String']>;
  readonly sERC20_lte?: InputMaybe<Scalars['String']>;
  readonly sERC20_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_?: InputMaybe<sERC20_filter>;
  readonly state?: InputMaybe<SpectreState>;
  readonly state_not?: InputMaybe<SpectreState>;
  readonly state_in?: InputMaybe<ReadonlyArray<SpectreState>>;
  readonly state_not_in?: InputMaybe<ReadonlyArray<SpectreState>>;
  readonly vault?: InputMaybe<Scalars['Bytes']>;
  readonly vault_not?: InputMaybe<Scalars['Bytes']>;
  readonly vault_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly vault_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly vault_contains?: InputMaybe<Scalars['Bytes']>;
  readonly vault_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly broker?: InputMaybe<Scalars['Bytes']>;
  readonly broker_not?: InputMaybe<Scalars['Bytes']>;
  readonly broker_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly broker_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly broker_contains?: InputMaybe<Scalars['Bytes']>;
  readonly broker_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Spectre_orderBy =
  | 'id'
  | 'NFT'
  | 'sERC20'
  | 'state'
  | 'vault'
  | 'broker'
  | 'timestamp';

export type SpectresCounter = {
  readonly id: Scalars['String'];
  readonly count: Scalars['Int'];
};

export type SpectresCounter_filter = {
  readonly id?: InputMaybe<Scalars['String']>;
  readonly id_not?: InputMaybe<Scalars['String']>;
  readonly id_gt?: InputMaybe<Scalars['String']>;
  readonly id_lt?: InputMaybe<Scalars['String']>;
  readonly id_gte?: InputMaybe<Scalars['String']>;
  readonly id_lte?: InputMaybe<Scalars['String']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly id_contains?: InputMaybe<Scalars['String']>;
  readonly id_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly id_not_contains?: InputMaybe<Scalars['String']>;
  readonly id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly id_starts_with?: InputMaybe<Scalars['String']>;
  readonly id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id_ends_with?: InputMaybe<Scalars['String']>;
  readonly id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly count?: InputMaybe<Scalars['Int']>;
  readonly count_not?: InputMaybe<Scalars['Int']>;
  readonly count_gt?: InputMaybe<Scalars['Int']>;
  readonly count_lt?: InputMaybe<Scalars['Int']>;
  readonly count_gte?: InputMaybe<Scalars['Int']>;
  readonly count_lte?: InputMaybe<Scalars['Int']>;
  readonly count_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly count_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpectresCounter_orderBy =
  | 'id'
  | 'count';

export type Subscription = {
  readonly nft?: Maybe<NFT>;
  readonly nfts: ReadonlyArray<NFT>;
  readonly spectre?: Maybe<Spectre>;
  readonly spectres: ReadonlyArray<Spectre>;
  readonly spectresCounter?: Maybe<SpectresCounter>;
  readonly spectresCounters: ReadonlyArray<SpectresCounter>;
  readonly sERC20?: Maybe<sERC20>;
  readonly sERC20S: ReadonlyArray<sERC20>;
  readonly sERC20Holder?: Maybe<sERC20Holder>;
  readonly sERC20Holders: ReadonlyArray<sERC20Holder>;
  readonly sale?: Maybe<Sale>;
  readonly sales: ReadonlyArray<Sale>;
  readonly buyoutProposal?: Maybe<BuyoutProposal>;
  readonly buyoutProposals: ReadonlyArray<BuyoutProposal>;
  readonly buyout?: Maybe<Buyout>;
  readonly buyouts: ReadonlyArray<Buyout>;
  readonly claim?: Maybe<Claim>;
  readonly claims: ReadonlyArray<Claim>;
  readonly issuance?: Maybe<Issuance>;
  readonly issuances: ReadonlyArray<Issuance>;
  readonly issue?: Maybe<Issue>;
  readonly issues: ReadonlyArray<Issue>;
  readonly issuanceProposal?: Maybe<IssuanceProposal>;
  readonly issuanceProposals: ReadonlyArray<IssuanceProposal>;
  readonly pool?: Maybe<Pool>;
  readonly pools: ReadonlyArray<Pool>;
  readonly poolState?: Maybe<PoolState>;
  readonly poolStates: ReadonlyArray<PoolState>;
  readonly swap?: Maybe<Swap>;
  readonly swaps: ReadonlyArray<Swap>;
  readonly join?: Maybe<Join>;
  readonly joins: ReadonlyArray<Join>;
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
};


export type SubscriptionnftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspectreArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspectresArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Spectre_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Spectre_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspectresCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionspectresCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SpectresCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SpectresCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsERC20Args = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsERC20SArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsERC20HolderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsERC20HoldersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20Holder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20Holder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Sale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Sale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbuyoutProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbuyoutProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BuyoutProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BuyoutProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbuyoutArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbuyoutsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Buyout_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Buyout_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissuanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissuancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issuance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Issuance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissueArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Issue_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Issue_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissuanceProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionissuanceProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IssuanceProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IssuanceProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolStateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolStatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolState_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolState_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionjoinArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionjoinsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Join_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Join_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Swap = {
  readonly id: Scalars['ID'];
  readonly pool: Pool;
  readonly timestamp: Scalars['BigInt'];
  readonly from: Scalars['Bytes'];
  readonly amounts: ReadonlyArray<Scalars['BigInt']>;
};

export type Swap_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly pool?: InputMaybe<Scalars['String']>;
  readonly pool_not?: InputMaybe<Scalars['String']>;
  readonly pool_gt?: InputMaybe<Scalars['String']>;
  readonly pool_lt?: InputMaybe<Scalars['String']>;
  readonly pool_gte?: InputMaybe<Scalars['String']>;
  readonly pool_lte?: InputMaybe<Scalars['String']>;
  readonly pool_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_contains?: InputMaybe<Scalars['String']>;
  readonly pool_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_?: InputMaybe<Pool_filter>;
  readonly timestamp?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_not?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timestamp_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly from?: InputMaybe<Scalars['Bytes']>;
  readonly from_not?: InputMaybe<Scalars['Bytes']>;
  readonly from_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly from_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly from_contains?: InputMaybe<Scalars['Bytes']>;
  readonly from_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly amounts?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amounts_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Swap_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'from'
  | 'amounts';

export type _Block_ = {
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  readonly timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type sERC20 = {
  readonly id: Scalars['ID'];
  readonly address: Scalars['Bytes'];
  readonly spectre: Spectre;
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
  readonly cap: Scalars['BigInt'];
  readonly minted: Scalars['BigInt'];
  readonly sale?: Maybe<Sale>;
  readonly issuance?: Maybe<Issuance>;
  readonly pool?: Maybe<Pool>;
  readonly holders: ReadonlyArray<sERC20Holder>;
};


export type sERC20holdersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20Holder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20Holder_filter>;
};

export type sERC20Holder = {
  readonly id: Scalars['ID'];
  readonly address: Scalars['Bytes'];
  readonly amount: Scalars['BigInt'];
  readonly sERC20: sERC20;
};

export type sERC20Holder_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly address?: InputMaybe<Scalars['Bytes']>;
  readonly address_not?: InputMaybe<Scalars['Bytes']>;
  readonly address_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly amount?: InputMaybe<Scalars['BigInt']>;
  readonly amount_not?: InputMaybe<Scalars['BigInt']>;
  readonly amount_gt?: InputMaybe<Scalars['BigInt']>;
  readonly amount_lt?: InputMaybe<Scalars['BigInt']>;
  readonly amount_gte?: InputMaybe<Scalars['BigInt']>;
  readonly amount_lte?: InputMaybe<Scalars['BigInt']>;
  readonly amount_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly amount_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly sERC20?: InputMaybe<Scalars['String']>;
  readonly sERC20_not?: InputMaybe<Scalars['String']>;
  readonly sERC20_gt?: InputMaybe<Scalars['String']>;
  readonly sERC20_lt?: InputMaybe<Scalars['String']>;
  readonly sERC20_gte?: InputMaybe<Scalars['String']>;
  readonly sERC20_lte?: InputMaybe<Scalars['String']>;
  readonly sERC20_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sERC20_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sERC20_?: InputMaybe<sERC20_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type sERC20Holder_orderBy =
  | 'id'
  | 'address'
  | 'amount'
  | 'sERC20';

export type sERC20_filter = {
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly address?: InputMaybe<Scalars['Bytes']>;
  readonly address_not?: InputMaybe<Scalars['Bytes']>;
  readonly address_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly spectre?: InputMaybe<Scalars['String']>;
  readonly spectre_not?: InputMaybe<Scalars['String']>;
  readonly spectre_gt?: InputMaybe<Scalars['String']>;
  readonly spectre_lt?: InputMaybe<Scalars['String']>;
  readonly spectre_gte?: InputMaybe<Scalars['String']>;
  readonly spectre_lte?: InputMaybe<Scalars['String']>;
  readonly spectre_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly spectre_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly spectre_contains?: InputMaybe<Scalars['String']>;
  readonly spectre_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_not_contains?: InputMaybe<Scalars['String']>;
  readonly spectre_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_starts_with?: InputMaybe<Scalars['String']>;
  readonly spectre_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly spectre_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_ends_with?: InputMaybe<Scalars['String']>;
  readonly spectre_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly spectre_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly spectre_?: InputMaybe<Spectre_filter>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly name_not?: InputMaybe<Scalars['String']>;
  readonly name_gt?: InputMaybe<Scalars['String']>;
  readonly name_lt?: InputMaybe<Scalars['String']>;
  readonly name_gte?: InputMaybe<Scalars['String']>;
  readonly name_lte?: InputMaybe<Scalars['String']>;
  readonly name_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_contains?: InputMaybe<Scalars['String']>;
  readonly name_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  readonly name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol?: InputMaybe<Scalars['String']>;
  readonly symbol_not?: InputMaybe<Scalars['String']>;
  readonly symbol_gt?: InputMaybe<Scalars['String']>;
  readonly symbol_lt?: InputMaybe<Scalars['String']>;
  readonly symbol_gte?: InputMaybe<Scalars['String']>;
  readonly symbol_lte?: InputMaybe<Scalars['String']>;
  readonly symbol_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly symbol_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly symbol_contains?: InputMaybe<Scalars['String']>;
  readonly symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol_not_contains?: InputMaybe<Scalars['String']>;
  readonly symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol_starts_with?: InputMaybe<Scalars['String']>;
  readonly symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol_ends_with?: InputMaybe<Scalars['String']>;
  readonly symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly cap?: InputMaybe<Scalars['BigInt']>;
  readonly cap_not?: InputMaybe<Scalars['BigInt']>;
  readonly cap_gt?: InputMaybe<Scalars['BigInt']>;
  readonly cap_lt?: InputMaybe<Scalars['BigInt']>;
  readonly cap_gte?: InputMaybe<Scalars['BigInt']>;
  readonly cap_lte?: InputMaybe<Scalars['BigInt']>;
  readonly cap_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly cap_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly minted?: InputMaybe<Scalars['BigInt']>;
  readonly minted_not?: InputMaybe<Scalars['BigInt']>;
  readonly minted_gt?: InputMaybe<Scalars['BigInt']>;
  readonly minted_lt?: InputMaybe<Scalars['BigInt']>;
  readonly minted_gte?: InputMaybe<Scalars['BigInt']>;
  readonly minted_lte?: InputMaybe<Scalars['BigInt']>;
  readonly minted_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly minted_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly sale?: InputMaybe<Scalars['String']>;
  readonly sale_not?: InputMaybe<Scalars['String']>;
  readonly sale_gt?: InputMaybe<Scalars['String']>;
  readonly sale_lt?: InputMaybe<Scalars['String']>;
  readonly sale_gte?: InputMaybe<Scalars['String']>;
  readonly sale_lte?: InputMaybe<Scalars['String']>;
  readonly sale_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly sale_contains?: InputMaybe<Scalars['String']>;
  readonly sale_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains?: InputMaybe<Scalars['String']>;
  readonly sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly sale_?: InputMaybe<Sale_filter>;
  readonly issuance?: InputMaybe<Scalars['String']>;
  readonly issuance_not?: InputMaybe<Scalars['String']>;
  readonly issuance_gt?: InputMaybe<Scalars['String']>;
  readonly issuance_lt?: InputMaybe<Scalars['String']>;
  readonly issuance_gte?: InputMaybe<Scalars['String']>;
  readonly issuance_lte?: InputMaybe<Scalars['String']>;
  readonly issuance_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly issuance_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains?: InputMaybe<Scalars['String']>;
  readonly issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly issuance_?: InputMaybe<Issuance_filter>;
  readonly pool?: InputMaybe<Scalars['String']>;
  readonly pool_not?: InputMaybe<Scalars['String']>;
  readonly pool_gt?: InputMaybe<Scalars['String']>;
  readonly pool_lt?: InputMaybe<Scalars['String']>;
  readonly pool_gte?: InputMaybe<Scalars['String']>;
  readonly pool_lte?: InputMaybe<Scalars['String']>;
  readonly pool_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly pool_contains?: InputMaybe<Scalars['String']>;
  readonly pool_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains?: InputMaybe<Scalars['String']>;
  readonly pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly pool_?: InputMaybe<Pool_filter>;
  readonly holders_?: InputMaybe<sERC20Holder_filter>;
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
};

export type sERC20_orderBy =
  | 'id'
  | 'address'
  | 'spectre'
  | 'name'
  | 'symbol'
  | 'cap'
  | 'minted'
  | 'sale'
  | 'issuance'
  | 'pool'
  | 'holders';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Buyout: ResolverTypeWrapper<Buyout>;
  BuyoutProposal: ResolverTypeWrapper<BuyoutProposal>;
  BuyoutProposal_filter: BuyoutProposal_filter;
  BuyoutProposal_orderBy: BuyoutProposal_orderBy;
  Buyout_filter: Buyout_filter;
  Buyout_orderBy: Buyout_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Claim: ResolverTypeWrapper<Claim>;
  Claim_filter: Claim_filter;
  Claim_orderBy: Claim_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Issuance: ResolverTypeWrapper<Issuance>;
  IssuanceProposal: ResolverTypeWrapper<IssuanceProposal>;
  IssuanceProposal_filter: IssuanceProposal_filter;
  IssuanceProposal_orderBy: IssuanceProposal_orderBy;
  IssuanceState: IssuanceState;
  Issuance_filter: Issuance_filter;
  Issuance_orderBy: Issuance_orderBy;
  Issue: ResolverTypeWrapper<Issue>;
  Issue_filter: Issue_filter;
  Issue_orderBy: Issue_orderBy;
  Join: ResolverTypeWrapper<Join>;
  Join_filter: Join_filter;
  Join_orderBy: Join_orderBy;
  NFT: ResolverTypeWrapper<NFT>;
  NFT_filter: NFT_filter;
  NFT_orderBy: NFT_orderBy;
  OrderDirection: OrderDirection;
  Pool: ResolverTypeWrapper<Pool>;
  PoolState: ResolverTypeWrapper<PoolState>;
  PoolState_filter: PoolState_filter;
  PoolState_orderBy: PoolState_orderBy;
  Pool_filter: Pool_filter;
  Pool_orderBy: Pool_orderBy;
  ProposalState: ProposalState;
  Query: ResolverTypeWrapper<{}>;
  Sale: ResolverTypeWrapper<Sale>;
  SaleState: SaleState;
  Sale_filter: Sale_filter;
  Sale_orderBy: Sale_orderBy;
  Spectre: ResolverTypeWrapper<Spectre>;
  SpectreState: SpectreState;
  Spectre_filter: Spectre_filter;
  Spectre_orderBy: Spectre_orderBy;
  SpectresCounter: ResolverTypeWrapper<SpectresCounter>;
  SpectresCounter_filter: SpectresCounter_filter;
  SpectresCounter_orderBy: SpectresCounter_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Swap: ResolverTypeWrapper<Swap>;
  Swap_filter: Swap_filter;
  Swap_orderBy: Swap_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  sERC20: ResolverTypeWrapper<sERC20>;
  sERC20Holder: ResolverTypeWrapper<sERC20Holder>;
  sERC20Holder_filter: sERC20Holder_filter;
  sERC20Holder_orderBy: sERC20Holder_orderBy;
  sERC20_filter: sERC20_filter;
  sERC20_orderBy: sERC20_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Buyout: Buyout;
  BuyoutProposal: BuyoutProposal;
  BuyoutProposal_filter: BuyoutProposal_filter;
  Buyout_filter: Buyout_filter;
  Bytes: Scalars['Bytes'];
  Claim: Claim;
  Claim_filter: Claim_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Issuance: Issuance;
  IssuanceProposal: IssuanceProposal;
  IssuanceProposal_filter: IssuanceProposal_filter;
  Issuance_filter: Issuance_filter;
  Issue: Issue;
  Issue_filter: Issue_filter;
  Join: Join;
  Join_filter: Join_filter;
  NFT: NFT;
  NFT_filter: NFT_filter;
  Pool: Pool;
  PoolState: PoolState;
  PoolState_filter: PoolState_filter;
  Pool_filter: Pool_filter;
  Query: {};
  Sale: Sale;
  Sale_filter: Sale_filter;
  Spectre: Spectre;
  Spectre_filter: Spectre_filter;
  SpectresCounter: SpectresCounter;
  SpectresCounter_filter: SpectresCounter_filter;
  String: Scalars['String'];
  Subscription: {};
  Swap: Swap;
  Swap_filter: Swap_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  sERC20: sERC20;
  sERC20Holder: sERC20Holder;
  sERC20Holder_filter: sERC20Holder_filter;
  sERC20_filter: sERC20_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BuyoutResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Buyout'] = ResolversParentTypes['Buyout']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  claims?: Resolver<ReadonlyArray<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<BuyoutclaimsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BuyoutProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BuyoutProposal'] = ResolversParentTypes['BuyoutProposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ProposalState'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ClaimResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Claim'] = ResolversParentTypes['Claim']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  buyout?: Resolver<ResolversTypes['Buyout'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  holder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IssuanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Issuance'] = ResolversParentTypes['Issuance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['IssuanceState'], ParentType, ContextType>;
  guardian?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  poolId?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  reserve?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  allocation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  flash?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  issues?: Resolver<ReadonlyArray<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<IssuanceissuesArgs, 'skip' | 'first'>>;
  proposals?: Resolver<ReadonlyArray<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<IssuanceproposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IssuanceProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['IssuanceProposal'] = ResolversParentTypes['IssuanceProposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issuance?: Resolver<ResolversTypes['Issuance'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['ProposalState'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IssueResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issuance?: Resolver<ResolversTypes['Issuance'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JoinResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Join'] = ResolversParentTypes['Join']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amounts?: Resolver<ReadonlyArray<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  sERC20IsToken0?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  states?: Resolver<ReadonlyArray<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<PoolstatesArgs, 'skip' | 'first'>>;
  swaps?: Resolver<ReadonlyArray<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<PoolswapsArgs, 'skip' | 'first'>>;
  joins?: Resolver<ReadonlyArray<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<PooljoinsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolStateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolState'] = ResolversParentTypes['PoolState']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balances?: Resolver<ReadonlyArray<ResolversTypes['BigInt']>, ParentType, ContextType>;
  weights?: Resolver<ReadonlyArray<ResolversTypes['BigInt']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftArgs, 'id' | 'subgraphError'>>;
  nfts?: Resolver<ReadonlyArray<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectre?: Resolver<Maybe<ResolversTypes['Spectre']>, ParentType, ContextType, RequireFields<QueryspectreArgs, 'id' | 'subgraphError'>>;
  spectres?: Resolver<ReadonlyArray<ResolversTypes['Spectre']>, ParentType, ContextType, RequireFields<QueryspectresArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectresCounter?: Resolver<Maybe<ResolversTypes['SpectresCounter']>, ParentType, ContextType, RequireFields<QueryspectresCounterArgs, 'id' | 'subgraphError'>>;
  spectresCounters?: Resolver<ReadonlyArray<ResolversTypes['SpectresCounter']>, ParentType, ContextType, RequireFields<QueryspectresCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20?: Resolver<Maybe<ResolversTypes['sERC20']>, ParentType, ContextType, RequireFields<QuerysERC20Args, 'id' | 'subgraphError'>>;
  sERC20S?: Resolver<ReadonlyArray<ResolversTypes['sERC20']>, ParentType, ContextType, RequireFields<QuerysERC20SArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20Holder?: Resolver<Maybe<ResolversTypes['sERC20Holder']>, ParentType, ContextType, RequireFields<QuerysERC20HolderArgs, 'id' | 'subgraphError'>>;
  sERC20Holders?: Resolver<ReadonlyArray<ResolversTypes['sERC20Holder']>, ParentType, ContextType, RequireFields<QuerysERC20HoldersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysaleArgs, 'id' | 'subgraphError'>>;
  sales?: Resolver<ReadonlyArray<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyoutProposal?: Resolver<Maybe<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<QuerybuyoutProposalArgs, 'id' | 'subgraphError'>>;
  buyoutProposals?: Resolver<ReadonlyArray<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<QuerybuyoutProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyout?: Resolver<Maybe<ResolversTypes['Buyout']>, ParentType, ContextType, RequireFields<QuerybuyoutArgs, 'id' | 'subgraphError'>>;
  buyouts?: Resolver<ReadonlyArray<ResolversTypes['Buyout']>, ParentType, ContextType, RequireFields<QuerybuyoutsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimArgs, 'id' | 'subgraphError'>>;
  claims?: Resolver<ReadonlyArray<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuance?: Resolver<Maybe<ResolversTypes['Issuance']>, ParentType, ContextType, RequireFields<QueryissuanceArgs, 'id' | 'subgraphError'>>;
  issuances?: Resolver<ReadonlyArray<ResolversTypes['Issuance']>, ParentType, ContextType, RequireFields<QueryissuancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryissueArgs, 'id' | 'subgraphError'>>;
  issues?: Resolver<ReadonlyArray<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryissuesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuanceProposal?: Resolver<Maybe<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<QueryissuanceProposalArgs, 'id' | 'subgraphError'>>;
  issuanceProposals?: Resolver<ReadonlyArray<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<QueryissuanceProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<ReadonlyArray<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolState?: Resolver<Maybe<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<QuerypoolStateArgs, 'id' | 'subgraphError'>>;
  poolStates?: Resolver<ReadonlyArray<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<QuerypoolStatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapArgs, 'id' | 'subgraphError'>>;
  swaps?: Resolver<ReadonlyArray<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  join?: Resolver<Maybe<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<QueryjoinArgs, 'id' | 'subgraphError'>>;
  joins?: Resolver<ReadonlyArray<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<QueryjoinsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SaleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['SaleState'], ParentType, ContextType>;
  guardian?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  reserve?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  multiplier?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  opening?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  flash?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  escape?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  proposals?: Resolver<ReadonlyArray<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<SaleproposalsArgs, 'skip' | 'first'>>;
  buyout?: Resolver<Maybe<ResolversTypes['Buyout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpectreResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Spectre'] = ResolversParentTypes['Spectre']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  NFT?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['SpectreState'], ParentType, ContextType>;
  vault?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  broker?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpectresCounterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SpectresCounter'] = ResolversParentTypes['SpectresCounter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  nft?: SubscriptionResolver<Maybe<ResolversTypes['NFT']>, "nft", ParentType, ContextType, RequireFields<SubscriptionnftArgs, 'id' | 'subgraphError'>>;
  nfts?: SubscriptionResolver<ReadonlyArray<ResolversTypes['NFT']>, "nfts", ParentType, ContextType, RequireFields<SubscriptionnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectre?: SubscriptionResolver<Maybe<ResolversTypes['Spectre']>, "spectre", ParentType, ContextType, RequireFields<SubscriptionspectreArgs, 'id' | 'subgraphError'>>;
  spectres?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Spectre']>, "spectres", ParentType, ContextType, RequireFields<SubscriptionspectresArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectresCounter?: SubscriptionResolver<Maybe<ResolversTypes['SpectresCounter']>, "spectresCounter", ParentType, ContextType, RequireFields<SubscriptionspectresCounterArgs, 'id' | 'subgraphError'>>;
  spectresCounters?: SubscriptionResolver<ReadonlyArray<ResolversTypes['SpectresCounter']>, "spectresCounters", ParentType, ContextType, RequireFields<SubscriptionspectresCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20?: SubscriptionResolver<Maybe<ResolversTypes['sERC20']>, "sERC20", ParentType, ContextType, RequireFields<SubscriptionsERC20Args, 'id' | 'subgraphError'>>;
  sERC20S?: SubscriptionResolver<ReadonlyArray<ResolversTypes['sERC20']>, "sERC20S", ParentType, ContextType, RequireFields<SubscriptionsERC20SArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20Holder?: SubscriptionResolver<Maybe<ResolversTypes['sERC20Holder']>, "sERC20Holder", ParentType, ContextType, RequireFields<SubscriptionsERC20HolderArgs, 'id' | 'subgraphError'>>;
  sERC20Holders?: SubscriptionResolver<ReadonlyArray<ResolversTypes['sERC20Holder']>, "sERC20Holders", ParentType, ContextType, RequireFields<SubscriptionsERC20HoldersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: SubscriptionResolver<Maybe<ResolversTypes['Sale']>, "sale", ParentType, ContextType, RequireFields<SubscriptionsaleArgs, 'id' | 'subgraphError'>>;
  sales?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Sale']>, "sales", ParentType, ContextType, RequireFields<SubscriptionsalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyoutProposal?: SubscriptionResolver<Maybe<ResolversTypes['BuyoutProposal']>, "buyoutProposal", ParentType, ContextType, RequireFields<SubscriptionbuyoutProposalArgs, 'id' | 'subgraphError'>>;
  buyoutProposals?: SubscriptionResolver<ReadonlyArray<ResolversTypes['BuyoutProposal']>, "buyoutProposals", ParentType, ContextType, RequireFields<SubscriptionbuyoutProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyout?: SubscriptionResolver<Maybe<ResolversTypes['Buyout']>, "buyout", ParentType, ContextType, RequireFields<SubscriptionbuyoutArgs, 'id' | 'subgraphError'>>;
  buyouts?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Buyout']>, "buyouts", ParentType, ContextType, RequireFields<SubscriptionbuyoutsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: SubscriptionResolver<Maybe<ResolversTypes['Claim']>, "claim", ParentType, ContextType, RequireFields<SubscriptionclaimArgs, 'id' | 'subgraphError'>>;
  claims?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Claim']>, "claims", ParentType, ContextType, RequireFields<SubscriptionclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuance?: SubscriptionResolver<Maybe<ResolversTypes['Issuance']>, "issuance", ParentType, ContextType, RequireFields<SubscriptionissuanceArgs, 'id' | 'subgraphError'>>;
  issuances?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Issuance']>, "issuances", ParentType, ContextType, RequireFields<SubscriptionissuancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issue?: SubscriptionResolver<Maybe<ResolversTypes['Issue']>, "issue", ParentType, ContextType, RequireFields<SubscriptionissueArgs, 'id' | 'subgraphError'>>;
  issues?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Issue']>, "issues", ParentType, ContextType, RequireFields<SubscriptionissuesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuanceProposal?: SubscriptionResolver<Maybe<ResolversTypes['IssuanceProposal']>, "issuanceProposal", ParentType, ContextType, RequireFields<SubscriptionissuanceProposalArgs, 'id' | 'subgraphError'>>;
  issuanceProposals?: SubscriptionResolver<ReadonlyArray<ResolversTypes['IssuanceProposal']>, "issuanceProposals", ParentType, ContextType, RequireFields<SubscriptionissuanceProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: SubscriptionResolver<Maybe<ResolversTypes['Pool']>, "pool", ParentType, ContextType, RequireFields<SubscriptionpoolArgs, 'id' | 'subgraphError'>>;
  pools?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Pool']>, "pools", ParentType, ContextType, RequireFields<SubscriptionpoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolState?: SubscriptionResolver<Maybe<ResolversTypes['PoolState']>, "poolState", ParentType, ContextType, RequireFields<SubscriptionpoolStateArgs, 'id' | 'subgraphError'>>;
  poolStates?: SubscriptionResolver<ReadonlyArray<ResolversTypes['PoolState']>, "poolStates", ParentType, ContextType, RequireFields<SubscriptionpoolStatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  swap?: SubscriptionResolver<Maybe<ResolversTypes['Swap']>, "swap", ParentType, ContextType, RequireFields<SubscriptionswapArgs, 'id' | 'subgraphError'>>;
  swaps?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Swap']>, "swaps", ParentType, ContextType, RequireFields<SubscriptionswapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  join?: SubscriptionResolver<Maybe<ResolversTypes['Join']>, "join", ParentType, ContextType, RequireFields<SubscriptionjoinArgs, 'id' | 'subgraphError'>>;
  joins?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Join']>, "joins", ParentType, ContextType, RequireFields<SubscriptionjoinsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type SwapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amounts?: Resolver<ReadonlyArray<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type sERC20Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['sERC20'] = ResolversParentTypes['sERC20']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  spectre?: Resolver<ResolversTypes['Spectre'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cap?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  issuance?: Resolver<Maybe<ResolversTypes['Issuance']>, ParentType, ContextType>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType>;
  holders?: Resolver<ReadonlyArray<ResolversTypes['sERC20Holder']>, ParentType, ContextType, RequireFields<sERC20holdersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type sERC20HolderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['sERC20Holder'] = ResolversParentTypes['sERC20Holder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Buyout?: BuyoutResolvers<ContextType>;
  BuyoutProposal?: BuyoutProposalResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Claim?: ClaimResolvers<ContextType>;
  Issuance?: IssuanceResolvers<ContextType>;
  IssuanceProposal?: IssuanceProposalResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  Join?: JoinResolvers<ContextType>;
  NFT?: NFTResolvers<ContextType>;
  Pool?: PoolResolvers<ContextType>;
  PoolState?: PoolStateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  Spectre?: SpectreResolvers<ContextType>;
  SpectresCounter?: SpectresCounterResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Swap?: SwapResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  sERC20?: sERC20Resolvers<ContextType>;
  sERC20Holder?: sERC20HolderResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = SpectreContext & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/spectre/introspectionSchema":
      return import("./sources/spectre/introspectionSchema");
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources = [];
const transforms = [];
const additionalEnvelopPlugins = [];
const spectreTransforms = [];
const additionalTypeDefs = [] as any[];
const spectreHandler = new GraphqlHandler({
              name: "spectre",
              config: {"endpoint":"http://127.0.0.1:8000/subgraphs/name/spectre"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("spectre"),
              logger: logger.child("spectre"),
              importFn,
            });
sources[0] = {
          name: 'spectre',
          handler: spectreHandler,
          transforms: spectreTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: SpectresDocument,
        get rawSDL() {
          return printWithCache(SpectresDocument);
        },
        location: 'SpectresDocument.graphql'
      },{
        document: SpectreByIdDocument,
        get rawSDL() {
          return printWithCache(SpectreByIdDocument);
        },
        location: 'SpectreByIdDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler() {
  return createMeshHTTPHandler({
    baseDir,
    getBuiltMesh,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance<MeshContext>>;

export function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh<MeshContext>(meshOptions)).then(mesh => {
      const id$ = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        id$.then(id => mesh.pubsub.unsubscribe(id)).catch(err => console.error(err));
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type SpectresQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type SpectresQuery = { readonly spectresCounter?: Maybe<Pick<SpectresCounter, 'count'>>, readonly spectres: ReadonlyArray<(
    Pick<Spectre, 'id'>
    & { readonly NFT: Pick<NFT, 'id' | 'collection' | 'tokenId' | 'tokenURI' | 'creator'>, readonly sERC20: (
      Pick<sERC20, 'id' | 'address' | 'cap' | 'name' | 'symbol'>
      & { readonly issuance?: Maybe<Pick<Issuance, 'allocation' | 'fee' | 'flash' | 'guardian' | 'id' | 'reserve' | 'state'>>, readonly sale?: Maybe<Pick<Sale, 'multiplier' | 'stock' | 'opening' | 'escape' | 'flash' | 'guardian' | 'id' | 'reserve'>> }
    ) }
  )> };

export type SpectreByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SpectreByIdQuery = { readonly spectre?: Maybe<(
    Pick<Spectre, 'state' | 'vault' | 'broker'>
    & { readonly NFT: Pick<NFT, 'id' | 'collection' | 'tokenId' | 'tokenURI' | 'creator'>, readonly sERC20: (
      Pick<sERC20, 'id' | 'address' | 'name' | 'symbol' | 'cap' | 'minted'>
      & { readonly holders: ReadonlyArray<Pick<sERC20Holder, 'address' | 'amount'>>, readonly sale?: Maybe<Pick<Sale, 'stock' | 'multiplier' | 'opening' | 'escape' | 'flash' | 'guardian' | 'id' | 'reserve' | 'state'>>, readonly issuance?: Maybe<Pick<Issuance, 'id' | 'reserve' | 'state' | 'allocation' | 'fee' | 'flash' | 'guardian' | 'pool' | 'poolId'>>, readonly pool?: Maybe<(
        Pick<Pool, 'id' | 'address'>
        & { readonly joins: ReadonlyArray<Pick<Join, 'id'>>, readonly states: ReadonlyArray<Pick<PoolState, 'price' | 'timestamp'>> }
      )> }
    ) }
  )> };


export const SpectresDocument = gql`
    query Spectres($first: Int, $skip: Int) {
  spectresCounter(id: "SpectresCounter") {
    count
  }
  spectres(first: $first, skip: $skip, orderBy: timestamp, orderDirection: desc) {
    id
    NFT {
      id
      collection
      tokenId
      tokenURI
      creator
    }
    sERC20 {
      id
      address
      cap
      name
      symbol
      issuance {
        allocation
        fee
        flash
        guardian
        id
        reserve
        state
      }
      sale {
        multiplier
        stock
        opening
        escape
        flash
        guardian
        id
        reserve
      }
    }
  }
}
    ` as unknown as DocumentNode<SpectresQuery, SpectresQueryVariables>;
export const SpectreByIdDocument = gql`
    query SpectreById($id: ID!) {
  spectre(id: $id) {
    NFT {
      id
      collection
      tokenId
      tokenURI
      creator
    }
    sERC20 {
      id
      address
      name
      symbol
      cap
      minted
      holders(first: 20, orderBy: amount, orderDirection: desc) {
        address
        amount
      }
      sale {
        stock
        multiplier
        opening
        escape
        flash
        guardian
        id
        reserve
        state
      }
      issuance {
        id
        reserve
        state
        allocation
        fee
        flash
        guardian
        pool
        poolId
      }
      pool {
        id
        address
        joins {
          id
        }
        states(orderBy: timestamp, orderDirection: asc) {
          price
          timestamp
        }
      }
    }
    state
    vault
    broker
  }
}
    ` as unknown as DocumentNode<SpectreByIdQuery, SpectreByIdQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Spectres(variables?: SpectresQueryVariables, options?: C): Promise<SpectresQuery> {
      return requester<SpectresQuery, SpectresQueryVariables>(SpectresDocument, variables, options) as Promise<SpectresQuery>;
    },
    SpectreById(variables: SpectreByIdQueryVariables, options?: C): Promise<SpectreByIdQuery> {
      return requester<SpectreByIdQuery, SpectreByIdQueryVariables>(SpectreByIdDocument, variables, options) as Promise<SpectreByIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;