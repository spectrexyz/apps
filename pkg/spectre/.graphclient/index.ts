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
  BigDecimal: any;
  BigInt: bigint;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Buyout = {
  id: Scalars['ID'];
  sale: Sale;
  timestamp: Scalars['BigInt'];
  buyer: Scalars['Bytes'];
  value: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  stock: Scalars['BigInt'];
  claims: Array<Claim>;
};


export type BuyoutclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
};

export type BuyoutProposal = {
  id: Scalars['ID'];
  sale: Sale;
  state: ProposalState;
  timestamp: Scalars['BigInt'];
  buyer: Scalars['Bytes'];
  value: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  expiration: Scalars['BigInt'];
};

export type BuyoutProposal_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sale?: InputMaybe<Scalars['String']>;
  sale_not?: InputMaybe<Scalars['String']>;
  sale_gt?: InputMaybe<Scalars['String']>;
  sale_lt?: InputMaybe<Scalars['String']>;
  sale_gte?: InputMaybe<Scalars['String']>;
  sale_lte?: InputMaybe<Scalars['String']>;
  sale_in?: InputMaybe<Array<Scalars['String']>>;
  sale_not_in?: InputMaybe<Array<Scalars['String']>>;
  sale_contains?: InputMaybe<Scalars['String']>;
  sale_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_not_contains?: InputMaybe<Scalars['String']>;
  sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_starts_with?: InputMaybe<Scalars['String']>;
  sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_starts_with?: InputMaybe<Scalars['String']>;
  sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_ends_with?: InputMaybe<Scalars['String']>;
  sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_ends_with?: InputMaybe<Scalars['String']>;
  sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_?: InputMaybe<Sale_filter>;
  state?: InputMaybe<ProposalState>;
  state_not?: InputMaybe<ProposalState>;
  state_in?: InputMaybe<Array<ProposalState>>;
  state_not_in?: InputMaybe<Array<ProposalState>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sale?: InputMaybe<Scalars['String']>;
  sale_not?: InputMaybe<Scalars['String']>;
  sale_gt?: InputMaybe<Scalars['String']>;
  sale_lt?: InputMaybe<Scalars['String']>;
  sale_gte?: InputMaybe<Scalars['String']>;
  sale_lte?: InputMaybe<Scalars['String']>;
  sale_in?: InputMaybe<Array<Scalars['String']>>;
  sale_not_in?: InputMaybe<Array<Scalars['String']>>;
  sale_contains?: InputMaybe<Scalars['String']>;
  sale_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_not_contains?: InputMaybe<Scalars['String']>;
  sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_starts_with?: InputMaybe<Scalars['String']>;
  sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_starts_with?: InputMaybe<Scalars['String']>;
  sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_ends_with?: InputMaybe<Scalars['String']>;
  sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_ends_with?: InputMaybe<Scalars['String']>;
  sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_?: InputMaybe<Sale_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stock?: InputMaybe<Scalars['BigInt']>;
  stock_not?: InputMaybe<Scalars['BigInt']>;
  stock_gt?: InputMaybe<Scalars['BigInt']>;
  stock_lt?: InputMaybe<Scalars['BigInt']>;
  stock_gte?: InputMaybe<Scalars['BigInt']>;
  stock_lte?: InputMaybe<Scalars['BigInt']>;
  stock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claims_?: InputMaybe<Claim_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  id: Scalars['ID'];
  buyout: Buyout;
  timestamp: Scalars['BigInt'];
  holder: Scalars['Bytes'];
  value: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
};

export type Claim_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  buyout?: InputMaybe<Scalars['String']>;
  buyout_not?: InputMaybe<Scalars['String']>;
  buyout_gt?: InputMaybe<Scalars['String']>;
  buyout_lt?: InputMaybe<Scalars['String']>;
  buyout_gte?: InputMaybe<Scalars['String']>;
  buyout_lte?: InputMaybe<Scalars['String']>;
  buyout_in?: InputMaybe<Array<Scalars['String']>>;
  buyout_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyout_contains?: InputMaybe<Scalars['String']>;
  buyout_contains_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_contains?: InputMaybe<Scalars['String']>;
  buyout_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyout_starts_with?: InputMaybe<Scalars['String']>;
  buyout_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_starts_with?: InputMaybe<Scalars['String']>;
  buyout_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_ends_with?: InputMaybe<Scalars['String']>;
  buyout_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_ends_with?: InputMaybe<Scalars['String']>;
  buyout_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_?: InputMaybe<Buyout_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holder?: InputMaybe<Scalars['Bytes']>;
  holder_not?: InputMaybe<Scalars['Bytes']>;
  holder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  holder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  holder_contains?: InputMaybe<Scalars['Bytes']>;
  holder_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Claim_orderBy =
  | 'id'
  | 'buyout'
  | 'timestamp'
  | 'holder'
  | 'value'
  | 'collateral';

export type Issuance = {
  id: Scalars['ID'];
  sERC20: sERC20;
  state: IssuanceState;
  guardian: Scalars['Bytes'];
  pool: Scalars['Bytes'];
  poolId: Scalars['Bytes'];
  reserve: Scalars['BigInt'];
  allocation: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  flash?: Maybe<Scalars['Boolean']>;
  issues: Array<Issue>;
  proposals: Array<IssuanceProposal>;
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
  id: Scalars['ID'];
  issuance: Issuance;
  state: ProposalState;
  timestamp: Scalars['BigInt'];
  buyer: Scalars['Bytes'];
  value: Scalars['BigInt'];
  price: Scalars['BigInt'];
  expiration: Scalars['BigInt'];
};

export type IssuanceProposal_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  issuance?: InputMaybe<Scalars['String']>;
  issuance_not?: InputMaybe<Scalars['String']>;
  issuance_gt?: InputMaybe<Scalars['String']>;
  issuance_lt?: InputMaybe<Scalars['String']>;
  issuance_gte?: InputMaybe<Scalars['String']>;
  issuance_lte?: InputMaybe<Scalars['String']>;
  issuance_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_not_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_contains?: InputMaybe<Scalars['String']>;
  issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_contains?: InputMaybe<Scalars['String']>;
  issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_starts_with?: InputMaybe<Scalars['String']>;
  issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_ends_with?: InputMaybe<Scalars['String']>;
  issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_?: InputMaybe<Issuance_filter>;
  state?: InputMaybe<ProposalState>;
  state_not?: InputMaybe<ProposalState>;
  state_in?: InputMaybe<Array<ProposalState>>;
  state_not_in?: InputMaybe<Array<ProposalState>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration?: InputMaybe<Scalars['BigInt']>;
  expiration_not?: InputMaybe<Scalars['BigInt']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']>;
  expiration_lt?: InputMaybe<Scalars['BigInt']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']>;
  expiration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sERC20?: InputMaybe<Scalars['String']>;
  sERC20_not?: InputMaybe<Scalars['String']>;
  sERC20_gt?: InputMaybe<Scalars['String']>;
  sERC20_lt?: InputMaybe<Scalars['String']>;
  sERC20_gte?: InputMaybe<Scalars['String']>;
  sERC20_lte?: InputMaybe<Scalars['String']>;
  sERC20_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_not_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_contains?: InputMaybe<Scalars['String']>;
  sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_contains?: InputMaybe<Scalars['String']>;
  sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_?: InputMaybe<sERC20_filter>;
  state?: InputMaybe<IssuanceState>;
  state_not?: InputMaybe<IssuanceState>;
  state_in?: InputMaybe<Array<IssuanceState>>;
  state_not_in?: InputMaybe<Array<IssuanceState>>;
  guardian?: InputMaybe<Scalars['Bytes']>;
  guardian_not?: InputMaybe<Scalars['Bytes']>;
  guardian_in?: InputMaybe<Array<Scalars['Bytes']>>;
  guardian_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  guardian_contains?: InputMaybe<Scalars['Bytes']>;
  guardian_not_contains?: InputMaybe<Scalars['Bytes']>;
  pool?: InputMaybe<Scalars['Bytes']>;
  pool_not?: InputMaybe<Scalars['Bytes']>;
  pool_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pool_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pool_contains?: InputMaybe<Scalars['Bytes']>;
  pool_not_contains?: InputMaybe<Scalars['Bytes']>;
  poolId?: InputMaybe<Scalars['Bytes']>;
  poolId_not?: InputMaybe<Scalars['Bytes']>;
  poolId_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolId_contains?: InputMaybe<Scalars['Bytes']>;
  poolId_not_contains?: InputMaybe<Scalars['Bytes']>;
  reserve?: InputMaybe<Scalars['BigInt']>;
  reserve_not?: InputMaybe<Scalars['BigInt']>;
  reserve_gt?: InputMaybe<Scalars['BigInt']>;
  reserve_lt?: InputMaybe<Scalars['BigInt']>;
  reserve_gte?: InputMaybe<Scalars['BigInt']>;
  reserve_lte?: InputMaybe<Scalars['BigInt']>;
  reserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocation?: InputMaybe<Scalars['BigInt']>;
  allocation_not?: InputMaybe<Scalars['BigInt']>;
  allocation_gt?: InputMaybe<Scalars['BigInt']>;
  allocation_lt?: InputMaybe<Scalars['BigInt']>;
  allocation_gte?: InputMaybe<Scalars['BigInt']>;
  allocation_lte?: InputMaybe<Scalars['BigInt']>;
  allocation_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allocation_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  flash?: InputMaybe<Scalars['Boolean']>;
  flash_not?: InputMaybe<Scalars['Boolean']>;
  flash_in?: InputMaybe<Array<Scalars['Boolean']>>;
  flash_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  issues_?: InputMaybe<Issue_filter>;
  proposals_?: InputMaybe<IssuanceProposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  id: Scalars['ID'];
  issuance: Issuance;
  timestamp: Scalars['BigInt'];
  recipient: Scalars['Bytes'];
  value: Scalars['BigInt'];
  amount: Scalars['BigInt'];
};

export type Issue_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  issuance?: InputMaybe<Scalars['String']>;
  issuance_not?: InputMaybe<Scalars['String']>;
  issuance_gt?: InputMaybe<Scalars['String']>;
  issuance_lt?: InputMaybe<Scalars['String']>;
  issuance_gte?: InputMaybe<Scalars['String']>;
  issuance_lte?: InputMaybe<Scalars['String']>;
  issuance_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_not_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_contains?: InputMaybe<Scalars['String']>;
  issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_contains?: InputMaybe<Scalars['String']>;
  issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_starts_with?: InputMaybe<Scalars['String']>;
  issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_ends_with?: InputMaybe<Scalars['String']>;
  issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_?: InputMaybe<Issuance_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Issue_orderBy =
  | 'id'
  | 'issuance'
  | 'timestamp'
  | 'recipient'
  | 'value'
  | 'amount';

export type Join = {
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  from: Scalars['Bytes'];
  amounts: Array<Scalars['BigInt']>;
};

export type Join_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  amounts?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Join_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'from'
  | 'amounts';

export type NFT = {
  id: Scalars['ID'];
  collection: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  tokenURI: Scalars['String'];
  creator: Scalars['Bytes'];
  metadata: NFTMetadata;
};

export type NFTMetadata = {
  id: Scalars['ID'];
  nft: NFT;
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type NFTMetadata_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  nft?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<NFT_filter>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NFTMetadata_orderBy =
  | 'id'
  | 'nft'
  | 'description'
  | 'image'
  | 'name';

export type NFT_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  collection?: InputMaybe<Scalars['Bytes']>;
  collection_not?: InputMaybe<Scalars['Bytes']>;
  collection_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collection_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  collection_contains?: InputMaybe<Scalars['Bytes']>;
  collection_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenURI?: InputMaybe<Scalars['String']>;
  tokenURI_not?: InputMaybe<Scalars['String']>;
  tokenURI_gt?: InputMaybe<Scalars['String']>;
  tokenURI_lt?: InputMaybe<Scalars['String']>;
  tokenURI_gte?: InputMaybe<Scalars['String']>;
  tokenURI_lte?: InputMaybe<Scalars['String']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenURI_contains?: InputMaybe<Scalars['String']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['Bytes']>;
  creator_not?: InputMaybe<Scalars['Bytes']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  metadata_?: InputMaybe<NFTMetadata_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NFT_orderBy =
  | 'id'
  | 'collection'
  | 'tokenId'
  | 'tokenURI'
  | 'creator'
  | 'metadata';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pool = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  sERC20: sERC20;
  sERC20IsToken0: Scalars['Boolean'];
  states: Array<PoolState>;
  swaps: Array<Swap>;
  joins: Array<Join>;
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
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  balances: Array<Scalars['BigInt']>;
  weights: Array<Scalars['BigInt']>;
  price: Scalars['BigDecimal'];
};

export type PoolState_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balances?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  balances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  weights?: InputMaybe<Array<Scalars['BigInt']>>;
  weights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  weights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  weights_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  weights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  weights_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PoolState_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'balances'
  | 'weights'
  | 'price';

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  sERC20?: InputMaybe<Scalars['String']>;
  sERC20_not?: InputMaybe<Scalars['String']>;
  sERC20_gt?: InputMaybe<Scalars['String']>;
  sERC20_lt?: InputMaybe<Scalars['String']>;
  sERC20_gte?: InputMaybe<Scalars['String']>;
  sERC20_lte?: InputMaybe<Scalars['String']>;
  sERC20_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_not_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_contains?: InputMaybe<Scalars['String']>;
  sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_contains?: InputMaybe<Scalars['String']>;
  sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_?: InputMaybe<sERC20_filter>;
  sERC20IsToken0?: InputMaybe<Scalars['Boolean']>;
  sERC20IsToken0_not?: InputMaybe<Scalars['Boolean']>;
  sERC20IsToken0_in?: InputMaybe<Array<Scalars['Boolean']>>;
  sERC20IsToken0_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  states_?: InputMaybe<PoolState_filter>;
  swaps_?: InputMaybe<Swap_filter>;
  joins_?: InputMaybe<Join_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  nftmetadata: Array<NFTMetadata>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  spectre?: Maybe<Spectre>;
  spectres: Array<Spectre>;
  spectresCounter?: Maybe<SpectresCounter>;
  spectresCounters: Array<SpectresCounter>;
  sERC20?: Maybe<sERC20>;
  sERC20S: Array<sERC20>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  buyoutProposal?: Maybe<BuyoutProposal>;
  buyoutProposals: Array<BuyoutProposal>;
  buyout?: Maybe<Buyout>;
  buyouts: Array<Buyout>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  issuance?: Maybe<Issuance>;
  issuances: Array<Issuance>;
  issue?: Maybe<Issue>;
  issues: Array<Issue>;
  issuanceProposal?: Maybe<IssuanceProposal>;
  issuanceProposals: Array<IssuanceProposal>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolState?: Maybe<PoolState>;
  poolStates: Array<PoolState>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  join?: Maybe<Join>;
  joins: Array<Join>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerynftmetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFTMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFTMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
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
  id: Scalars['ID'];
  sERC20: sERC20;
  state: SaleState;
  guardian: Scalars['Bytes'];
  reserve: Scalars['BigInt'];
  multiplier: Scalars['BigInt'];
  opening: Scalars['BigInt'];
  stock: Scalars['BigInt'];
  flash: Scalars['Boolean'];
  escape: Scalars['Boolean'];
  proposals: Array<BuyoutProposal>;
  buyout?: Maybe<Buyout>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sERC20?: InputMaybe<Scalars['String']>;
  sERC20_not?: InputMaybe<Scalars['String']>;
  sERC20_gt?: InputMaybe<Scalars['String']>;
  sERC20_lt?: InputMaybe<Scalars['String']>;
  sERC20_gte?: InputMaybe<Scalars['String']>;
  sERC20_lte?: InputMaybe<Scalars['String']>;
  sERC20_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_not_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_contains?: InputMaybe<Scalars['String']>;
  sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_contains?: InputMaybe<Scalars['String']>;
  sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_?: InputMaybe<sERC20_filter>;
  state?: InputMaybe<SaleState>;
  state_not?: InputMaybe<SaleState>;
  state_in?: InputMaybe<Array<SaleState>>;
  state_not_in?: InputMaybe<Array<SaleState>>;
  guardian?: InputMaybe<Scalars['Bytes']>;
  guardian_not?: InputMaybe<Scalars['Bytes']>;
  guardian_in?: InputMaybe<Array<Scalars['Bytes']>>;
  guardian_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  guardian_contains?: InputMaybe<Scalars['Bytes']>;
  guardian_not_contains?: InputMaybe<Scalars['Bytes']>;
  reserve?: InputMaybe<Scalars['BigInt']>;
  reserve_not?: InputMaybe<Scalars['BigInt']>;
  reserve_gt?: InputMaybe<Scalars['BigInt']>;
  reserve_lt?: InputMaybe<Scalars['BigInt']>;
  reserve_gte?: InputMaybe<Scalars['BigInt']>;
  reserve_lte?: InputMaybe<Scalars['BigInt']>;
  reserve_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  multiplier?: InputMaybe<Scalars['BigInt']>;
  multiplier_not?: InputMaybe<Scalars['BigInt']>;
  multiplier_gt?: InputMaybe<Scalars['BigInt']>;
  multiplier_lt?: InputMaybe<Scalars['BigInt']>;
  multiplier_gte?: InputMaybe<Scalars['BigInt']>;
  multiplier_lte?: InputMaybe<Scalars['BigInt']>;
  multiplier_in?: InputMaybe<Array<Scalars['BigInt']>>;
  multiplier_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  opening?: InputMaybe<Scalars['BigInt']>;
  opening_not?: InputMaybe<Scalars['BigInt']>;
  opening_gt?: InputMaybe<Scalars['BigInt']>;
  opening_lt?: InputMaybe<Scalars['BigInt']>;
  opening_gte?: InputMaybe<Scalars['BigInt']>;
  opening_lte?: InputMaybe<Scalars['BigInt']>;
  opening_in?: InputMaybe<Array<Scalars['BigInt']>>;
  opening_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stock?: InputMaybe<Scalars['BigInt']>;
  stock_not?: InputMaybe<Scalars['BigInt']>;
  stock_gt?: InputMaybe<Scalars['BigInt']>;
  stock_lt?: InputMaybe<Scalars['BigInt']>;
  stock_gte?: InputMaybe<Scalars['BigInt']>;
  stock_lte?: InputMaybe<Scalars['BigInt']>;
  stock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  flash?: InputMaybe<Scalars['Boolean']>;
  flash_not?: InputMaybe<Scalars['Boolean']>;
  flash_in?: InputMaybe<Array<Scalars['Boolean']>>;
  flash_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  escape?: InputMaybe<Scalars['Boolean']>;
  escape_not?: InputMaybe<Scalars['Boolean']>;
  escape_in?: InputMaybe<Array<Scalars['Boolean']>>;
  escape_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  proposals_?: InputMaybe<BuyoutProposal_filter>;
  buyout?: InputMaybe<Scalars['String']>;
  buyout_not?: InputMaybe<Scalars['String']>;
  buyout_gt?: InputMaybe<Scalars['String']>;
  buyout_lt?: InputMaybe<Scalars['String']>;
  buyout_gte?: InputMaybe<Scalars['String']>;
  buyout_lte?: InputMaybe<Scalars['String']>;
  buyout_in?: InputMaybe<Array<Scalars['String']>>;
  buyout_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyout_contains?: InputMaybe<Scalars['String']>;
  buyout_contains_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_contains?: InputMaybe<Scalars['String']>;
  buyout_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyout_starts_with?: InputMaybe<Scalars['String']>;
  buyout_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_starts_with?: InputMaybe<Scalars['String']>;
  buyout_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_ends_with?: InputMaybe<Scalars['String']>;
  buyout_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_not_ends_with?: InputMaybe<Scalars['String']>;
  buyout_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyout_?: InputMaybe<Buyout_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  id: Scalars['ID'];
  NFT: NFT;
  sERC20: sERC20;
  state: SpectreState;
  vault: Scalars['Bytes'];
  broker: Scalars['Bytes'];
};

export type SpectreState =
  | 'Null'
  | 'Locked'
  | 'Unlocked';

export type Spectre_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  NFT?: InputMaybe<Scalars['String']>;
  NFT_not?: InputMaybe<Scalars['String']>;
  NFT_gt?: InputMaybe<Scalars['String']>;
  NFT_lt?: InputMaybe<Scalars['String']>;
  NFT_gte?: InputMaybe<Scalars['String']>;
  NFT_lte?: InputMaybe<Scalars['String']>;
  NFT_in?: InputMaybe<Array<Scalars['String']>>;
  NFT_not_in?: InputMaybe<Array<Scalars['String']>>;
  NFT_contains?: InputMaybe<Scalars['String']>;
  NFT_contains_nocase?: InputMaybe<Scalars['String']>;
  NFT_not_contains?: InputMaybe<Scalars['String']>;
  NFT_not_contains_nocase?: InputMaybe<Scalars['String']>;
  NFT_starts_with?: InputMaybe<Scalars['String']>;
  NFT_starts_with_nocase?: InputMaybe<Scalars['String']>;
  NFT_not_starts_with?: InputMaybe<Scalars['String']>;
  NFT_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  NFT_ends_with?: InputMaybe<Scalars['String']>;
  NFT_ends_with_nocase?: InputMaybe<Scalars['String']>;
  NFT_not_ends_with?: InputMaybe<Scalars['String']>;
  NFT_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  NFT_?: InputMaybe<NFT_filter>;
  sERC20?: InputMaybe<Scalars['String']>;
  sERC20_not?: InputMaybe<Scalars['String']>;
  sERC20_gt?: InputMaybe<Scalars['String']>;
  sERC20_lt?: InputMaybe<Scalars['String']>;
  sERC20_gte?: InputMaybe<Scalars['String']>;
  sERC20_lte?: InputMaybe<Scalars['String']>;
  sERC20_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_not_in?: InputMaybe<Array<Scalars['String']>>;
  sERC20_contains?: InputMaybe<Scalars['String']>;
  sERC20_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_contains?: InputMaybe<Scalars['String']>;
  sERC20_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sERC20_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with?: InputMaybe<Scalars['String']>;
  sERC20_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with?: InputMaybe<Scalars['String']>;
  sERC20_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sERC20_?: InputMaybe<sERC20_filter>;
  state?: InputMaybe<SpectreState>;
  state_not?: InputMaybe<SpectreState>;
  state_in?: InputMaybe<Array<SpectreState>>;
  state_not_in?: InputMaybe<Array<SpectreState>>;
  vault?: InputMaybe<Scalars['Bytes']>;
  vault_not?: InputMaybe<Scalars['Bytes']>;
  vault_in?: InputMaybe<Array<Scalars['Bytes']>>;
  vault_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  vault_contains?: InputMaybe<Scalars['Bytes']>;
  vault_not_contains?: InputMaybe<Scalars['Bytes']>;
  broker?: InputMaybe<Scalars['Bytes']>;
  broker_not?: InputMaybe<Scalars['Bytes']>;
  broker_in?: InputMaybe<Array<Scalars['Bytes']>>;
  broker_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  broker_contains?: InputMaybe<Scalars['Bytes']>;
  broker_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Spectre_orderBy =
  | 'id'
  | 'NFT'
  | 'sERC20'
  | 'state'
  | 'vault'
  | 'broker';

export type SpectresCounter = {
  id: Scalars['String'];
  count: Scalars['Int'];
};

export type SpectresCounter_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  count?: InputMaybe<Scalars['Int']>;
  count_not?: InputMaybe<Scalars['Int']>;
  count_gt?: InputMaybe<Scalars['Int']>;
  count_lt?: InputMaybe<Scalars['Int']>;
  count_gte?: InputMaybe<Scalars['Int']>;
  count_lte?: InputMaybe<Scalars['Int']>;
  count_in?: InputMaybe<Array<Scalars['Int']>>;
  count_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SpectresCounter_orderBy =
  | 'id'
  | 'count';

export type Subscription = {
  nftmetadata: Array<NFTMetadata>;
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  spectre?: Maybe<Spectre>;
  spectres: Array<Spectre>;
  spectresCounter?: Maybe<SpectresCounter>;
  spectresCounters: Array<SpectresCounter>;
  sERC20?: Maybe<sERC20>;
  sERC20S: Array<sERC20>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  buyoutProposal?: Maybe<BuyoutProposal>;
  buyoutProposals: Array<BuyoutProposal>;
  buyout?: Maybe<Buyout>;
  buyouts: Array<Buyout>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  issuance?: Maybe<Issuance>;
  issuances: Array<Issuance>;
  issue?: Maybe<Issue>;
  issues: Array<Issue>;
  issuanceProposal?: Maybe<IssuanceProposal>;
  issuanceProposals: Array<IssuanceProposal>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolState?: Maybe<PoolState>;
  poolStates: Array<PoolState>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  join?: Maybe<Join>;
  joins: Array<Join>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionnftmetadataArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NFTMetadata_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NFTMetadata_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
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
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  from: Scalars['Bytes'];
  amounts: Array<Scalars['BigInt']>;
};

export type Swap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  amounts?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Swap_orderBy =
  | 'id'
  | 'pool'
  | 'timestamp'
  | 'from'
  | 'amounts';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type sERC20 = {
  id: Scalars['ID'];
  spectre: Spectre;
  name: Scalars['String'];
  symbol: Scalars['String'];
  cap: Scalars['BigInt'];
  sale?: Maybe<Sale>;
  issuance?: Maybe<Issuance>;
  pool?: Maybe<Pool>;
};

export type sERC20_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  spectre?: InputMaybe<Scalars['String']>;
  spectre_not?: InputMaybe<Scalars['String']>;
  spectre_gt?: InputMaybe<Scalars['String']>;
  spectre_lt?: InputMaybe<Scalars['String']>;
  spectre_gte?: InputMaybe<Scalars['String']>;
  spectre_lte?: InputMaybe<Scalars['String']>;
  spectre_in?: InputMaybe<Array<Scalars['String']>>;
  spectre_not_in?: InputMaybe<Array<Scalars['String']>>;
  spectre_contains?: InputMaybe<Scalars['String']>;
  spectre_contains_nocase?: InputMaybe<Scalars['String']>;
  spectre_not_contains?: InputMaybe<Scalars['String']>;
  spectre_not_contains_nocase?: InputMaybe<Scalars['String']>;
  spectre_starts_with?: InputMaybe<Scalars['String']>;
  spectre_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spectre_not_starts_with?: InputMaybe<Scalars['String']>;
  spectre_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  spectre_ends_with?: InputMaybe<Scalars['String']>;
  spectre_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spectre_not_ends_with?: InputMaybe<Scalars['String']>;
  spectre_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  spectre_?: InputMaybe<Spectre_filter>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cap?: InputMaybe<Scalars['BigInt']>;
  cap_not?: InputMaybe<Scalars['BigInt']>;
  cap_gt?: InputMaybe<Scalars['BigInt']>;
  cap_lt?: InputMaybe<Scalars['BigInt']>;
  cap_gte?: InputMaybe<Scalars['BigInt']>;
  cap_lte?: InputMaybe<Scalars['BigInt']>;
  cap_in?: InputMaybe<Array<Scalars['BigInt']>>;
  cap_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sale?: InputMaybe<Scalars['String']>;
  sale_not?: InputMaybe<Scalars['String']>;
  sale_gt?: InputMaybe<Scalars['String']>;
  sale_lt?: InputMaybe<Scalars['String']>;
  sale_gte?: InputMaybe<Scalars['String']>;
  sale_lte?: InputMaybe<Scalars['String']>;
  sale_in?: InputMaybe<Array<Scalars['String']>>;
  sale_not_in?: InputMaybe<Array<Scalars['String']>>;
  sale_contains?: InputMaybe<Scalars['String']>;
  sale_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_not_contains?: InputMaybe<Scalars['String']>;
  sale_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sale_starts_with?: InputMaybe<Scalars['String']>;
  sale_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_starts_with?: InputMaybe<Scalars['String']>;
  sale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sale_ends_with?: InputMaybe<Scalars['String']>;
  sale_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_not_ends_with?: InputMaybe<Scalars['String']>;
  sale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sale_?: InputMaybe<Sale_filter>;
  issuance?: InputMaybe<Scalars['String']>;
  issuance_not?: InputMaybe<Scalars['String']>;
  issuance_gt?: InputMaybe<Scalars['String']>;
  issuance_lt?: InputMaybe<Scalars['String']>;
  issuance_gte?: InputMaybe<Scalars['String']>;
  issuance_lte?: InputMaybe<Scalars['String']>;
  issuance_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_not_in?: InputMaybe<Array<Scalars['String']>>;
  issuance_contains?: InputMaybe<Scalars['String']>;
  issuance_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_contains?: InputMaybe<Scalars['String']>;
  issuance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  issuance_starts_with?: InputMaybe<Scalars['String']>;
  issuance_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with?: InputMaybe<Scalars['String']>;
  issuance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_ends_with?: InputMaybe<Scalars['String']>;
  issuance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with?: InputMaybe<Scalars['String']>;
  issuance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  issuance_?: InputMaybe<Issuance_filter>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type sERC20_orderBy =
  | 'id'
  | 'spectre'
  | 'name'
  | 'symbol'
  | 'cap'
  | 'sale'
  | 'issuance'
  | 'pool';

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
  NFTMetadata: ResolverTypeWrapper<NFTMetadata>;
  NFTMetadata_filter: NFTMetadata_filter;
  NFTMetadata_orderBy: NFTMetadata_orderBy;
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
  NFTMetadata: NFTMetadata;
  NFTMetadata_filter: NFTMetadata_filter;
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
  claims?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<BuyoutclaimsArgs, 'skip' | 'first'>>;
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
  issues?: Resolver<Array<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<IssuanceissuesArgs, 'skip' | 'first'>>;
  proposals?: Resolver<Array<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<IssuanceproposalsArgs, 'skip' | 'first'>>;
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
  amounts?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['NFTMetadata'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NFTMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFTMetadata'] = ResolversParentTypes['NFTMetadata']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sERC20?: Resolver<ResolversTypes['sERC20'], ParentType, ContextType>;
  sERC20IsToken0?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  states?: Resolver<Array<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<PoolstatesArgs, 'skip' | 'first'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<PoolswapsArgs, 'skip' | 'first'>>;
  joins?: Resolver<Array<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<PooljoinsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolStateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PoolState'] = ResolversParentTypes['PoolState']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  balances?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  weights?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  nftmetadata?: Resolver<Array<ResolversTypes['NFTMetadata']>, ParentType, ContextType, RequireFields<QuerynftmetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftArgs, 'id' | 'subgraphError'>>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QuerynftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectre?: Resolver<Maybe<ResolversTypes['Spectre']>, ParentType, ContextType, RequireFields<QueryspectreArgs, 'id' | 'subgraphError'>>;
  spectres?: Resolver<Array<ResolversTypes['Spectre']>, ParentType, ContextType, RequireFields<QueryspectresArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectresCounter?: Resolver<Maybe<ResolversTypes['SpectresCounter']>, ParentType, ContextType, RequireFields<QueryspectresCounterArgs, 'id' | 'subgraphError'>>;
  spectresCounters?: Resolver<Array<ResolversTypes['SpectresCounter']>, ParentType, ContextType, RequireFields<QueryspectresCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20?: Resolver<Maybe<ResolversTypes['sERC20']>, ParentType, ContextType, RequireFields<QuerysERC20Args, 'id' | 'subgraphError'>>;
  sERC20S?: Resolver<Array<ResolversTypes['sERC20']>, ParentType, ContextType, RequireFields<QuerysERC20SArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysaleArgs, 'id' | 'subgraphError'>>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerysalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyoutProposal?: Resolver<Maybe<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<QuerybuyoutProposalArgs, 'id' | 'subgraphError'>>;
  buyoutProposals?: Resolver<Array<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<QuerybuyoutProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyout?: Resolver<Maybe<ResolversTypes['Buyout']>, ParentType, ContextType, RequireFields<QuerybuyoutArgs, 'id' | 'subgraphError'>>;
  buyouts?: Resolver<Array<ResolversTypes['Buyout']>, ParentType, ContextType, RequireFields<QuerybuyoutsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimArgs, 'id' | 'subgraphError'>>;
  claims?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuance?: Resolver<Maybe<ResolversTypes['Issuance']>, ParentType, ContextType, RequireFields<QueryissuanceArgs, 'id' | 'subgraphError'>>;
  issuances?: Resolver<Array<ResolversTypes['Issuance']>, ParentType, ContextType, RequireFields<QueryissuancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issue?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryissueArgs, 'id' | 'subgraphError'>>;
  issues?: Resolver<Array<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryissuesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuanceProposal?: Resolver<Maybe<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<QueryissuanceProposalArgs, 'id' | 'subgraphError'>>;
  issuanceProposals?: Resolver<Array<ResolversTypes['IssuanceProposal']>, ParentType, ContextType, RequireFields<QueryissuanceProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolState?: Resolver<Maybe<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<QuerypoolStateArgs, 'id' | 'subgraphError'>>;
  poolStates?: Resolver<Array<ResolversTypes['PoolState']>, ParentType, ContextType, RequireFields<QuerypoolStatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  swap?: Resolver<Maybe<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapArgs, 'id' | 'subgraphError'>>;
  swaps?: Resolver<Array<ResolversTypes['Swap']>, ParentType, ContextType, RequireFields<QueryswapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  join?: Resolver<Maybe<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<QueryjoinArgs, 'id' | 'subgraphError'>>;
  joins?: Resolver<Array<ResolversTypes['Join']>, ParentType, ContextType, RequireFields<QueryjoinsArgs, 'skip' | 'first' | 'subgraphError'>>;
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
  proposals?: Resolver<Array<ResolversTypes['BuyoutProposal']>, ParentType, ContextType, RequireFields<SaleproposalsArgs, 'skip' | 'first'>>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpectresCounterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SpectresCounter'] = ResolversParentTypes['SpectresCounter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  nftmetadata?: SubscriptionResolver<Array<ResolversTypes['NFTMetadata']>, "nftmetadata", ParentType, ContextType, RequireFields<SubscriptionnftmetadataArgs, 'skip' | 'first' | 'subgraphError'>>;
  nft?: SubscriptionResolver<Maybe<ResolversTypes['NFT']>, "nft", ParentType, ContextType, RequireFields<SubscriptionnftArgs, 'id' | 'subgraphError'>>;
  nfts?: SubscriptionResolver<Array<ResolversTypes['NFT']>, "nfts", ParentType, ContextType, RequireFields<SubscriptionnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectre?: SubscriptionResolver<Maybe<ResolversTypes['Spectre']>, "spectre", ParentType, ContextType, RequireFields<SubscriptionspectreArgs, 'id' | 'subgraphError'>>;
  spectres?: SubscriptionResolver<Array<ResolversTypes['Spectre']>, "spectres", ParentType, ContextType, RequireFields<SubscriptionspectresArgs, 'skip' | 'first' | 'subgraphError'>>;
  spectresCounter?: SubscriptionResolver<Maybe<ResolversTypes['SpectresCounter']>, "spectresCounter", ParentType, ContextType, RequireFields<SubscriptionspectresCounterArgs, 'id' | 'subgraphError'>>;
  spectresCounters?: SubscriptionResolver<Array<ResolversTypes['SpectresCounter']>, "spectresCounters", ParentType, ContextType, RequireFields<SubscriptionspectresCountersArgs, 'skip' | 'first' | 'subgraphError'>>;
  sERC20?: SubscriptionResolver<Maybe<ResolversTypes['sERC20']>, "sERC20", ParentType, ContextType, RequireFields<SubscriptionsERC20Args, 'id' | 'subgraphError'>>;
  sERC20S?: SubscriptionResolver<Array<ResolversTypes['sERC20']>, "sERC20S", ParentType, ContextType, RequireFields<SubscriptionsERC20SArgs, 'skip' | 'first' | 'subgraphError'>>;
  sale?: SubscriptionResolver<Maybe<ResolversTypes['Sale']>, "sale", ParentType, ContextType, RequireFields<SubscriptionsaleArgs, 'id' | 'subgraphError'>>;
  sales?: SubscriptionResolver<Array<ResolversTypes['Sale']>, "sales", ParentType, ContextType, RequireFields<SubscriptionsalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyoutProposal?: SubscriptionResolver<Maybe<ResolversTypes['BuyoutProposal']>, "buyoutProposal", ParentType, ContextType, RequireFields<SubscriptionbuyoutProposalArgs, 'id' | 'subgraphError'>>;
  buyoutProposals?: SubscriptionResolver<Array<ResolversTypes['BuyoutProposal']>, "buyoutProposals", ParentType, ContextType, RequireFields<SubscriptionbuyoutProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  buyout?: SubscriptionResolver<Maybe<ResolversTypes['Buyout']>, "buyout", ParentType, ContextType, RequireFields<SubscriptionbuyoutArgs, 'id' | 'subgraphError'>>;
  buyouts?: SubscriptionResolver<Array<ResolversTypes['Buyout']>, "buyouts", ParentType, ContextType, RequireFields<SubscriptionbuyoutsArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: SubscriptionResolver<Maybe<ResolversTypes['Claim']>, "claim", ParentType, ContextType, RequireFields<SubscriptionclaimArgs, 'id' | 'subgraphError'>>;
  claims?: SubscriptionResolver<Array<ResolversTypes['Claim']>, "claims", ParentType, ContextType, RequireFields<SubscriptionclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuance?: SubscriptionResolver<Maybe<ResolversTypes['Issuance']>, "issuance", ParentType, ContextType, RequireFields<SubscriptionissuanceArgs, 'id' | 'subgraphError'>>;
  issuances?: SubscriptionResolver<Array<ResolversTypes['Issuance']>, "issuances", ParentType, ContextType, RequireFields<SubscriptionissuancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issue?: SubscriptionResolver<Maybe<ResolversTypes['Issue']>, "issue", ParentType, ContextType, RequireFields<SubscriptionissueArgs, 'id' | 'subgraphError'>>;
  issues?: SubscriptionResolver<Array<ResolversTypes['Issue']>, "issues", ParentType, ContextType, RequireFields<SubscriptionissuesArgs, 'skip' | 'first' | 'subgraphError'>>;
  issuanceProposal?: SubscriptionResolver<Maybe<ResolversTypes['IssuanceProposal']>, "issuanceProposal", ParentType, ContextType, RequireFields<SubscriptionissuanceProposalArgs, 'id' | 'subgraphError'>>;
  issuanceProposals?: SubscriptionResolver<Array<ResolversTypes['IssuanceProposal']>, "issuanceProposals", ParentType, ContextType, RequireFields<SubscriptionissuanceProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: SubscriptionResolver<Maybe<ResolversTypes['Pool']>, "pool", ParentType, ContextType, RequireFields<SubscriptionpoolArgs, 'id' | 'subgraphError'>>;
  pools?: SubscriptionResolver<Array<ResolversTypes['Pool']>, "pools", ParentType, ContextType, RequireFields<SubscriptionpoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  poolState?: SubscriptionResolver<Maybe<ResolversTypes['PoolState']>, "poolState", ParentType, ContextType, RequireFields<SubscriptionpoolStateArgs, 'id' | 'subgraphError'>>;
  poolStates?: SubscriptionResolver<Array<ResolversTypes['PoolState']>, "poolStates", ParentType, ContextType, RequireFields<SubscriptionpoolStatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  swap?: SubscriptionResolver<Maybe<ResolversTypes['Swap']>, "swap", ParentType, ContextType, RequireFields<SubscriptionswapArgs, 'id' | 'subgraphError'>>;
  swaps?: SubscriptionResolver<Array<ResolversTypes['Swap']>, "swaps", ParentType, ContextType, RequireFields<SubscriptionswapsArgs, 'skip' | 'first' | 'subgraphError'>>;
  join?: SubscriptionResolver<Maybe<ResolversTypes['Join']>, "join", ParentType, ContextType, RequireFields<SubscriptionjoinArgs, 'id' | 'subgraphError'>>;
  joins?: SubscriptionResolver<Array<ResolversTypes['Join']>, "joins", ParentType, ContextType, RequireFields<SubscriptionjoinsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type SwapResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Swap'] = ResolversParentTypes['Swap']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pool?: Resolver<ResolversTypes['Pool'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amounts?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
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
  spectre?: Resolver<ResolversTypes['Spectre'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cap?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  issuance?: Resolver<Maybe<ResolversTypes['Issuance']>, ParentType, ContextType>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType>;
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
  NFTMetadata?: NFTMetadataResolvers<ContextType>;
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
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/bpierre/spectre-preview"},
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


export type SpectresQuery = { spectresCounter?: Maybe<Pick<SpectresCounter, 'count'>>, spectres: Array<(
    Pick<Spectre, 'id'>
    & { NFT: (
      Pick<NFT, 'id' | 'collection' | 'tokenId' | 'tokenURI' | 'creator'>
      & { metadata: Pick<NFTMetadata, 'name' | 'image'> }
    ), sERC20: (
      Pick<sERC20, 'name' | 'symbol' | 'cap'>
      & { sale?: Maybe<Pick<Sale, 'id' | 'guardian'>>, issuance?: Maybe<Pick<Issuance, 'id'>> }
    ) }
  )> };

export type SpectreByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SpectreByIdQuery = { spectre?: Maybe<(
    Pick<Spectre, 'state' | 'vault' | 'broker'>
    & { NFT: (
      Pick<NFT, 'id' | 'collection' | 'tokenId' | 'tokenURI' | 'creator'>
      & { metadata: Pick<NFTMetadata, 'name' | 'description' | 'image'> }
    ), sERC20: (
      Pick<sERC20, 'id' | 'name' | 'symbol' | 'cap'>
      & { sale?: Maybe<Pick<Sale, 'stock' | 'multiplier' | 'opening' | 'escape' | 'flash' | 'guardian' | 'id' | 'reserve' | 'state'>>, issuance?: Maybe<Pick<Issuance, 'id' | 'reserve' | 'state' | 'allocation' | 'fee' | 'flash' | 'guardian' | 'pool' | 'poolId'>>, pool?: Maybe<(
        Pick<Pool, 'id' | 'address'>
        & { joins: Array<Pick<Join, 'id'>> }
      )> }
    ) }
  )> };


export const SpectresDocument = gql`
    query Spectres($first: Int, $skip: Int) {
  spectresCounter(id: "SpectresCounter") {
    count
  }
  spectres(first: $first, skip: $skip) {
    id
    NFT {
      id
      collection
      tokenId
      tokenURI
      creator
      metadata {
        name
        image
      }
    }
    sERC20 {
      name
      symbol
      cap
      sale {
        id
        guardian
      }
      issuance {
        id
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
      metadata {
        name
        description
        image
      }
    }
    sERC20 {
      id
      name
      symbol
      cap
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
        joins {
          id
        }
        address
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