// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace SpectreTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
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
};

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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  spectre?: Maybe<Spectre>;
  spectres: Array<Spectre>;
  spectresCounter?: Maybe<SpectresCounter>;
  spectresCounters: Array<SpectresCounter>;
  sERC20?: Maybe<sERC20>;
  sERC20S: Array<sERC20>;
  sERC20Holder?: Maybe<sERC20Holder>;
  sERC20Holders: Array<sERC20Holder>;
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
  timestamp: Scalars['BigInt'];
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
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  nft?: Maybe<NFT>;
  nfts: Array<NFT>;
  spectre?: Maybe<Spectre>;
  spectres: Array<Spectre>;
  spectresCounter?: Maybe<SpectresCounter>;
  spectresCounters: Array<SpectresCounter>;
  sERC20?: Maybe<sERC20>;
  sERC20S: Array<sERC20>;
  sERC20Holder?: Maybe<sERC20Holder>;
  sERC20Holders: Array<sERC20Holder>;
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
  address: Scalars['Bytes'];
  spectre: Spectre;
  name: Scalars['String'];
  symbol: Scalars['String'];
  cap: Scalars['BigInt'];
  minted: Scalars['BigInt'];
  sale?: Maybe<Sale>;
  issuance?: Maybe<Issuance>;
  pool?: Maybe<Pool>;
  holders: Array<sERC20Holder>;
  price: Scalars['BigInt'];
};


export type sERC20holdersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<sERC20Holder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<sERC20Holder_filter>;
};

export type sERC20Holder = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  sERC20: sERC20;
};

export type sERC20Holder_filter = {
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
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type sERC20Holder_orderBy =
  | 'id'
  | 'address'
  | 'amount'
  | 'sERC20';

export type sERC20_filter = {
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
  minted?: InputMaybe<Scalars['BigInt']>;
  minted_not?: InputMaybe<Scalars['BigInt']>;
  minted_gt?: InputMaybe<Scalars['BigInt']>;
  minted_lt?: InputMaybe<Scalars['BigInt']>;
  minted_gte?: InputMaybe<Scalars['BigInt']>;
  minted_lte?: InputMaybe<Scalars['BigInt']>;
  minted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  holders_?: InputMaybe<sERC20Holder_filter>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
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
  | 'holders'
  | 'price';

  export type QuerySdk = {
      /** null **/
  nft: InContextSdkMethod<Query['nft'], QuerynftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Query['nfts'], QuerynftsArgs, MeshContext>,
  /** null **/
  spectre: InContextSdkMethod<Query['spectre'], QueryspectreArgs, MeshContext>,
  /** null **/
  spectres: InContextSdkMethod<Query['spectres'], QueryspectresArgs, MeshContext>,
  /** null **/
  spectresCounter: InContextSdkMethod<Query['spectresCounter'], QueryspectresCounterArgs, MeshContext>,
  /** null **/
  spectresCounters: InContextSdkMethod<Query['spectresCounters'], QueryspectresCountersArgs, MeshContext>,
  /** null **/
  sERC20: InContextSdkMethod<Query['sERC20'], QuerysERC20Args, MeshContext>,
  /** null **/
  sERC20S: InContextSdkMethod<Query['sERC20S'], QuerysERC20SArgs, MeshContext>,
  /** null **/
  sERC20Holder: InContextSdkMethod<Query['sERC20Holder'], QuerysERC20HolderArgs, MeshContext>,
  /** null **/
  sERC20Holders: InContextSdkMethod<Query['sERC20Holders'], QuerysERC20HoldersArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Query['sale'], QuerysaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Query['sales'], QuerysalesArgs, MeshContext>,
  /** null **/
  buyoutProposal: InContextSdkMethod<Query['buyoutProposal'], QuerybuyoutProposalArgs, MeshContext>,
  /** null **/
  buyoutProposals: InContextSdkMethod<Query['buyoutProposals'], QuerybuyoutProposalsArgs, MeshContext>,
  /** null **/
  buyout: InContextSdkMethod<Query['buyout'], QuerybuyoutArgs, MeshContext>,
  /** null **/
  buyouts: InContextSdkMethod<Query['buyouts'], QuerybuyoutsArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Query['claim'], QueryclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Query['claims'], QueryclaimsArgs, MeshContext>,
  /** null **/
  issuance: InContextSdkMethod<Query['issuance'], QueryissuanceArgs, MeshContext>,
  /** null **/
  issuances: InContextSdkMethod<Query['issuances'], QueryissuancesArgs, MeshContext>,
  /** null **/
  issue: InContextSdkMethod<Query['issue'], QueryissueArgs, MeshContext>,
  /** null **/
  issues: InContextSdkMethod<Query['issues'], QueryissuesArgs, MeshContext>,
  /** null **/
  issuanceProposal: InContextSdkMethod<Query['issuanceProposal'], QueryissuanceProposalArgs, MeshContext>,
  /** null **/
  issuanceProposals: InContextSdkMethod<Query['issuanceProposals'], QueryissuanceProposalsArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Query['pool'], QuerypoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Query['pools'], QuerypoolsArgs, MeshContext>,
  /** null **/
  poolState: InContextSdkMethod<Query['poolState'], QuerypoolStateArgs, MeshContext>,
  /** null **/
  poolStates: InContextSdkMethod<Query['poolStates'], QuerypoolStatesArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Query['swap'], QueryswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Query['swaps'], QueryswapsArgs, MeshContext>,
  /** null **/
  join: InContextSdkMethod<Query['join'], QueryjoinArgs, MeshContext>,
  /** null **/
  joins: InContextSdkMethod<Query['joins'], QueryjoinsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  nft: InContextSdkMethod<Subscription['nft'], SubscriptionnftArgs, MeshContext>,
  /** null **/
  nfts: InContextSdkMethod<Subscription['nfts'], SubscriptionnftsArgs, MeshContext>,
  /** null **/
  spectre: InContextSdkMethod<Subscription['spectre'], SubscriptionspectreArgs, MeshContext>,
  /** null **/
  spectres: InContextSdkMethod<Subscription['spectres'], SubscriptionspectresArgs, MeshContext>,
  /** null **/
  spectresCounter: InContextSdkMethod<Subscription['spectresCounter'], SubscriptionspectresCounterArgs, MeshContext>,
  /** null **/
  spectresCounters: InContextSdkMethod<Subscription['spectresCounters'], SubscriptionspectresCountersArgs, MeshContext>,
  /** null **/
  sERC20: InContextSdkMethod<Subscription['sERC20'], SubscriptionsERC20Args, MeshContext>,
  /** null **/
  sERC20S: InContextSdkMethod<Subscription['sERC20S'], SubscriptionsERC20SArgs, MeshContext>,
  /** null **/
  sERC20Holder: InContextSdkMethod<Subscription['sERC20Holder'], SubscriptionsERC20HolderArgs, MeshContext>,
  /** null **/
  sERC20Holders: InContextSdkMethod<Subscription['sERC20Holders'], SubscriptionsERC20HoldersArgs, MeshContext>,
  /** null **/
  sale: InContextSdkMethod<Subscription['sale'], SubscriptionsaleArgs, MeshContext>,
  /** null **/
  sales: InContextSdkMethod<Subscription['sales'], SubscriptionsalesArgs, MeshContext>,
  /** null **/
  buyoutProposal: InContextSdkMethod<Subscription['buyoutProposal'], SubscriptionbuyoutProposalArgs, MeshContext>,
  /** null **/
  buyoutProposals: InContextSdkMethod<Subscription['buyoutProposals'], SubscriptionbuyoutProposalsArgs, MeshContext>,
  /** null **/
  buyout: InContextSdkMethod<Subscription['buyout'], SubscriptionbuyoutArgs, MeshContext>,
  /** null **/
  buyouts: InContextSdkMethod<Subscription['buyouts'], SubscriptionbuyoutsArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Subscription['claim'], SubscriptionclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Subscription['claims'], SubscriptionclaimsArgs, MeshContext>,
  /** null **/
  issuance: InContextSdkMethod<Subscription['issuance'], SubscriptionissuanceArgs, MeshContext>,
  /** null **/
  issuances: InContextSdkMethod<Subscription['issuances'], SubscriptionissuancesArgs, MeshContext>,
  /** null **/
  issue: InContextSdkMethod<Subscription['issue'], SubscriptionissueArgs, MeshContext>,
  /** null **/
  issues: InContextSdkMethod<Subscription['issues'], SubscriptionissuesArgs, MeshContext>,
  /** null **/
  issuanceProposal: InContextSdkMethod<Subscription['issuanceProposal'], SubscriptionissuanceProposalArgs, MeshContext>,
  /** null **/
  issuanceProposals: InContextSdkMethod<Subscription['issuanceProposals'], SubscriptionissuanceProposalsArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Subscription['pool'], SubscriptionpoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Subscription['pools'], SubscriptionpoolsArgs, MeshContext>,
  /** null **/
  poolState: InContextSdkMethod<Subscription['poolState'], SubscriptionpoolStateArgs, MeshContext>,
  /** null **/
  poolStates: InContextSdkMethod<Subscription['poolStates'], SubscriptionpoolStatesArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Subscription['swap'], SubscriptionswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Subscription['swaps'], SubscriptionswapsArgs, MeshContext>,
  /** null **/
  join: InContextSdkMethod<Subscription['join'], SubscriptionjoinArgs, MeshContext>,
  /** null **/
  joins: InContextSdkMethod<Subscription['joins'], SubscriptionjoinsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["spectre"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
