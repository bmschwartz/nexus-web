import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  _FieldSet: any
}

export type CreateGroupInput = {
  name: Scalars['String']
  description: Scalars['String']
  telegram?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  membershipLength: Scalars['Int']
  membershipFee: Scalars['Float']
  payInPlatform: Scalars['Boolean']
  payoutCurrency?: Maybe<Scalars['String']>
  payoutAddress?: Maybe<Scalars['String']>
}

export type CreateGroupMembershipInput = {
  groupId: Scalars['ID']
  memberId: Scalars['ID']
  role: MembershipRole
  status: MembershipStatus
}

export type CreateGroupMembershipResult = {
  __typename?: 'CreateGroupMembershipResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type DeleteMembershipInput = {
  groupId: Scalars['ID']
  membershipId: Scalars['ID']
}

export type DeleteMembershipResult = {
  __typename?: 'DeleteMembershipResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type DisableGroupInput = {
  groupId: Scalars['ID']
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['ID']
  name: Scalars['String']
  active: Scalars['Boolean']
  description: Scalars['String']
  members?: Maybe<GroupMembersResult>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  orderSets: GroupOrderSets
  orderSet?: Maybe<OrderSet>
  symbolsWithPosition?: Maybe<SymbolsWithPositionResult>
}

export type GroupMembersArgs = {
  input?: Maybe<GroupMembersInput>
}

export type GroupOrderSetsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type GroupOrderSetArgs = {
  input: OrderSetInput
}

export type GroupExistsInput = {
  name: Scalars['String']
}

export type GroupInput = {
  groupId: Scalars['ID']
}

export type GroupMembership = {
  __typename?: 'GroupMembership'
  id: Scalars['ID']
  group: Group
  member: User
  active: Scalars['Boolean']
  role: MembershipRole
  status: MembershipStatus
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  orders: MemberOrdersResult
  positions: MemberPositionsResult
  exchangeAccounts: Array<ExchangeAccount>
}

export type GroupMembershipOrdersArgs = {
  input: MemberOrdersInput
}

export type GroupMembershipPositionsArgs = {
  input: MemberPositionsInput
}

export type GroupMembersInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  roles?: Maybe<Array<MembershipRole>>
}

export type GroupMembersResult = {
  __typename?: 'GroupMembersResult'
  members: Array<GroupMembership>
  totalCount: Scalars['Int']
}

export type MembershipInput = {
  membershipId: Scalars['ID']
}

export type MembershipRequestsInput = {
  groupId: Scalars['ID']
}

export enum MembershipRole {
  Member = 'MEMBER',
  Trader = 'TRADER',
  Admin = 'ADMIN',
}

export enum MembershipStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING',
}

export type MyMembershipInput = {
  groupId: Scalars['ID']
}

export type MyMembershipsInput = {
  roles?: Maybe<Array<MembershipRole>>
  statuses?: Maybe<Array<MembershipStatus>>
}

export type RenameGroupInput = {
  groupId: Scalars['ID']
  name: Scalars['String']
}

export type RequestGroupAccessInput = {
  groupId: Scalars['ID']
}

export type UpdateGroupDescriptionInput = {
  groupId: Scalars['ID']
  description: Scalars['String']
}

export type UpdateMembershipActiveInput = {
  membershipId: Scalars['ID']
  active: Scalars['Boolean']
}

export type UpdateMembershipRoleInput = {
  membershipId: Scalars['ID']
  role: MembershipRole
}

export type UpdateMembershipStatusInput = {
  membershipId: Scalars['ID']
  status: MembershipStatus
}

export type AddStopToPositionsInput = {
  symbol: Scalars['String']
  stopPrice: Scalars['Float']
  exchangeAccountIds: Array<Scalars['ID']>
  stopTriggerPriceType: StopTriggerType
}

export type AddStopToPositionsResult = {
  __typename?: 'AddStopToPositionsResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type AddTslToPositionsInput = {
  symbol: Scalars['String']
  tslPercent: Scalars['Float']
  exchangeAccountIds: Array<Scalars['ID']>
  stopTriggerPriceType: StopTriggerType
}

export type AddTslToPositionsResult = {
  __typename?: 'AddTslToPositionsResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type AsyncOperation = {
  __typename?: 'AsyncOperation'
  id: Scalars['ID']
  opType: OperationType
  success: Scalars['Boolean']
  complete: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type AsyncOperationStatus = {
  __typename?: 'AsyncOperationStatus'
  operation: AsyncOperation
}

export type AsyncOperationStatusInput = {
  id: Scalars['ID']
}

export type BinanceCurrency = {
  __typename?: 'BinanceCurrency'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  symbol: Scalars['String']
  status: BinanceSymbolStatus
  lastPrice?: Maybe<Scalars['Float']>
  openPrice?: Maybe<Scalars['Float']>
  highPrice?: Maybe<Scalars['Float']>
  lowPrice?: Maybe<Scalars['Float']>
  priceChange?: Maybe<Scalars['Float']>
  priceChangePercent?: Maybe<Scalars['Float']>
  minPrice: Scalars['String']
  maxPrice: Scalars['String']
  tickSize: Scalars['String']
  baseAsset: Scalars['String']
  quoteAsset: Scalars['String']
  baseAssetPrecision: Scalars['Int']
  quotePrecision: Scalars['Int']
  quoteAssetPrecision: Scalars['Int']
  baseCommissionPrecision: Scalars['Int']
  quoteCommissionPrecision: Scalars['Int']
  allowsLimit: Scalars['Boolean']
  allowsMarket: Scalars['Boolean']
  allowsStopLoss: Scalars['Boolean']
  allowsStopLossLimit: Scalars['Boolean']
  allowsTakeProfit: Scalars['Boolean']
  allowsTakeProfitLimit: Scalars['Boolean']
}

export enum BinanceSymbolStatus {
  AuctionMatch = 'AUCTION_MATCH',
  Break = 'BREAK',
  EndOfDay = 'END_OF_DAY',
  Halt = 'HALT',
  PostTrading = 'POST_TRADING',
  PreTrading = 'PRE_TRADING',
  Trading = 'TRADING',
}

export type BitmexCurrency = {
  __typename?: 'BitmexCurrency'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  symbol: Scalars['String']
  underlying: Scalars['String']
  active: Scalars['Boolean']
  fractionalDigits?: Maybe<Scalars['Int']>
  lastPrice?: Maybe<Scalars['Float']>
  markPrice?: Maybe<Scalars['Float']>
  maxPrice?: Maybe<Scalars['Float']>
  tickSize?: Maybe<Scalars['Float']>
}

export type CancelOrderInput = {
  id: Scalars['String']
}

export type CancelOrderResponse = {
  __typename?: 'CancelOrderResponse'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type CancelOrderSetInput = {
  orderSetId: Scalars['ID']
}

export type CancelOrderSetResult = {
  __typename?: 'CancelOrderSetResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type ClosePositionsInput = {
  symbol: Scalars['String']
  price?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
  exchangeAccountIds: Array<Scalars['ID']>
}

export type ClosePositionsResult = {
  __typename?: 'ClosePositionsResult'
  orderSet?: Maybe<OrderSet>
}

export type CreateExchangeAccountInput = {
  exchange: Exchange
  membershipId: Scalars['ID']
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
}

export type CreateExchangeAccountResult = {
  __typename?: 'CreateExchangeAccountResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type CreateOrderSetInput = {
  groupId: Scalars['ID']
  exchangeAccountIds: Array<Scalars['ID']>
  symbol: Scalars['String']
  exchange: Exchange
  description?: Maybe<Scalars['String']>
  side: OrderSide
  orderType: OrderType
  closeOrderSet: Scalars['Boolean']
  leverage: Scalars['Float']
  price?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  trailingStopPercent?: Maybe<Scalars['Float']>
  stopTriggerType?: Maybe<StopTriggerType>
}

export type CreateOrderSetResult = {
  __typename?: 'CreateOrderSetResult'
  orderSet?: Maybe<OrderSet>
}

export type Currency = BitmexCurrency | BinanceCurrency

export type CurrencyInput = {
  exchange: Exchange
  symbol: Scalars['String']
}

export type CurrencyResponse = {
  __typename?: 'CurrencyResponse'
  currency?: Maybe<Currency>
}

export type DeleteExchangeAccountInput = {
  id: Scalars['ID']
}

export type DeleteExchangeAccountResult = {
  __typename?: 'DeleteExchangeAccountResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export enum Exchange {
  Binance = 'BINANCE',
  Bitmex = 'BITMEX',
}

export type ExchangeAccount = {
  __typename?: 'ExchangeAccount'
  id: Scalars['ID']
  active: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  exchange: Exchange
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
  orders: Array<Order>
  positions?: Maybe<ExchangeAccountPositionsResult>
  position?: Maybe<ExchangeAccountSymbolPositionResult>
  membershipId: Scalars['ID']
  membership: GroupMembership
}

export type ExchangeAccountPositionsArgs = {
  input?: Maybe<ExchangeAccountPositionsInput>
}

export type ExchangeAccountPositionArgs = {
  input: ExchangeAccountSymbolPositionInput
}

export type ExchangeAccountInput = {
  id: Scalars['ID']
}

export type ExchangeAccountPositionsInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type ExchangeAccountPositionsResult = {
  __typename?: 'ExchangeAccountPositionsResult'
  positions: Array<Position>
  totalCount: Scalars['Int']
}

export type ExchangeAccountsInput = {
  membershipId: Scalars['ID']
}

export type ExchangeAccountSymbolPositionInput = {
  symbol: Scalars['String']
}

export type ExchangeAccountSymbolPositionResult = {
  __typename?: 'ExchangeAccountSymbolPositionResult'
  position: Position
}

export type GroupOrderSets = {
  __typename?: 'GroupOrderSets'
  orderSets: Array<OrderSet>
  totalCount: Scalars['Int']
}

export type MemberOrdersInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type MemberOrdersResult = {
  __typename?: 'MemberOrdersResult'
  orders: Array<Order>
  totalCount: Scalars['Int']
}

export type MemberPositionsInput = {
  exchange?: Maybe<Exchange>
  symbol?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type MemberPositionsResult = {
  __typename?: 'MemberPositionsResult'
  positions: Array<Position>
  totalCount: Scalars['Int']
}

export enum OperationType {
  CancelBinanceOrder = 'CANCEL_BINANCE_ORDER',
  CreateBinanceOrder = 'CREATE_BINANCE_ORDER',
  UpdateBinanceOrder = 'UPDATE_BINANCE_ORDER',
  CreateBinanceAccount = 'CREATE_BINANCE_ACCOUNT',
  DeleteBinanceAccount = 'DELETE_BINANCE_ACCOUNT',
  DisableBinanceAccount = 'DISABLE_BINANCE_ACCOUNT',
  UpdateBinanceAccount = 'UPDATE_BINANCE_ACCOUNT',
  CancelBitmexOrder = 'CANCEL_BITMEX_ORDER',
  CreateBitmexOrder = 'CREATE_BITMEX_ORDER',
  UpdateBitmexOrder = 'UPDATE_BITMEX_ORDER',
  CreateBitmexAccount = 'CREATE_BITMEX_ACCOUNT',
  DeleteBitmexAccount = 'DELETE_BITMEX_ACCOUNT',
  DisableBitmexAccount = 'DISABLE_BITMEX_ACCOUNT',
  UpdateBitmexAccount = 'UPDATE_BITMEX_ACCOUNT',
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  orderSet: OrderSet
  side: OrderSide
  exchange: Exchange
  orderType: OrderType
  status: OrderStatus
  closeOrder: Scalars['Boolean']
  leverage: Scalars['Float']
  price?: Maybe<Scalars['Float']>
  quantity?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  trailingStopPercent?: Maybe<Scalars['Float']>
  stopTriggerType?: Maybe<StopTriggerType>
  filledQty?: Maybe<Scalars['Float']>
  symbol: Scalars['String']
  lastTimestamp: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  exchangeAccount: ExchangeAccount
}

export type OrderInput = {
  id: Scalars['ID']
}

export type OrderSet = {
  __typename?: 'OrderSet'
  id: Scalars['ID']
  exchange: Exchange
  symbol: Scalars['String']
  price?: Maybe<Scalars['Float']>
  side: OrderSide
  orderType: OrderType
  closeOrderSet: Scalars['Boolean']
  orders: OrderSetOrders
  percent: Scalars['Float']
  leverage: Scalars['Float']
  stopPrice?: Maybe<Scalars['Float']>
  trailingStopPercent?: Maybe<Scalars['Float']>
  stopTriggerType?: Maybe<StopTriggerType>
  description?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type OrderSetOrdersArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  stopOrderType?: Maybe<StopOrderType>
}

export type OrderSetInput = {
  id: Scalars['ID']
  stopOrderType?: Maybe<StopOrderType>
}

export type OrderSetOrders = {
  __typename?: 'OrderSetOrders'
  totalCount: Scalars['Int']
  orders: Array<Order>
}

export enum OrderSide {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum OrderStatus {
  New = 'NEW',
  Filled = 'FILLED',
  PartiallyFilled = 'PARTIALLY_FILLED',
  Canceled = 'CANCELED',
  Rejected = 'REJECTED',
}

export enum OrderType {
  Market = 'MARKET',
  Limit = 'LIMIT',
}

export type Position = {
  __typename?: 'Position'
  id: Scalars['ID']
  exchangeAccount: ExchangeAccount
  side: PositionSide
  exchange: Exchange
  quantity?: Maybe<Scalars['Float']>
  avgPrice?: Maybe<Scalars['Float']>
  symbol: Scalars['String']
  isOpen: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type PositionInput = {
  id: Scalars['ID']
}

export enum PositionSide {
  Long = 'LONG',
  Short = 'SHORT',
}

export enum StopOrderType {
  None = 'NONE',
  StopLimit = 'STOP_LIMIT',
  TrailingStop = 'TRAILING_STOP',
}

export enum StopTriggerType {
  LastPrice = 'LAST_PRICE',
  MarkPrice = 'MARK_PRICE',
}

export type SymbolsWithPositionResult = {
  __typename?: 'SymbolsWithPositionResult'
  binance: Array<BinanceCurrency>
  bitmex: Array<BitmexCurrency>
}

export type ToggleExchangeAccountActiveInput = {
  id: Scalars['ID']
}

export type ToggleExchangeAccountActiveResult = {
  __typename?: 'ToggleExchangeAccountActiveResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type UpdateExchangeAccountInput = {
  id: Scalars['ID']
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
}

export type UpdateExchangeAccountResult = {
  __typename?: 'UpdateExchangeAccountResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type UpdateOrderSetInput = {
  orderSetId: Scalars['ID']
  description: Scalars['String']
  leverage: Scalars['Float']
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  trailingStopPercent?: Maybe<Scalars['Float']>
  stopTriggerType?: Maybe<StopTriggerType>
}

export type UpdateOrderSetResult = {
  __typename?: 'UpdateOrderSetResult'
  operationId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignupUserInput = {
  email: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  email: Scalars['String']
  username: Scalars['String']
  admin: Scalars['Boolean']
  memberships: Array<GroupMembership>
}

export type UserIdByEmailInput = {
  email: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  allGroups: Array<Group>
  group?: Maybe<Group>
  groupExists: Scalars['Boolean']
  membership: GroupMembership
  myMembership: GroupMembership
  myMemberships?: Maybe<Array<GroupMembership>>
  groupMembers?: Maybe<Array<GroupMembership>>
  membershipRequests?: Maybe<Array<GroupMembership>>
  order?: Maybe<Order>
  orderSet?: Maybe<OrderSet>
  bitmexCurrencies: Array<BitmexCurrency>
  binanceCurrencies: Array<BinanceCurrency>
  currency?: Maybe<CurrencyResponse>
  position?: Maybe<Position>
  asyncOperationStatus?: Maybe<AsyncOperationStatus>
  exchangeAccount?: Maybe<ExchangeAccount>
  exchangeAccounts: Array<ExchangeAccount>
  me?: Maybe<User>
  userIdByEmail?: Maybe<Scalars['ID']>
}

export type QueryGroupArgs = {
  input: GroupInput
}

export type QueryGroupExistsArgs = {
  input: GroupExistsInput
}

export type QueryMembershipArgs = {
  input: MembershipInput
}

export type QueryMyMembershipArgs = {
  input: MyMembershipInput
}

export type QueryMyMembershipsArgs = {
  input?: Maybe<MyMembershipsInput>
}

export type QueryGroupMembersArgs = {
  input: GroupMembersInput
}

export type QueryMembershipRequestsArgs = {
  input: MembershipRequestsInput
}

export type QueryOrderArgs = {
  input: OrderInput
}

export type QueryOrderSetArgs = {
  input: OrderSetInput
}

export type QueryCurrencyArgs = {
  input: CurrencyInput
}

export type QueryPositionArgs = {
  input: PositionInput
}

export type QueryAsyncOperationStatusArgs = {
  input: AsyncOperationStatusInput
}

export type QueryExchangeAccountArgs = {
  input: ExchangeAccountInput
}

export type QueryExchangeAccountsArgs = {
  input: ExchangeAccountsInput
}

export type QueryUserIdByEmailArgs = {
  input: UserIdByEmailInput
}

export type Mutation = {
  __typename?: 'Mutation'
  createGroup?: Maybe<Group>
  renameGroup?: Maybe<Group>
  updateGroupDescription?: Maybe<Group>
  disableGroup?: Maybe<Group>
  requestGroupAccess?: Maybe<GroupMembership>
  createMembership?: Maybe<CreateGroupMembershipResult>
  updateMembershipRole?: Maybe<GroupMembership>
  updateMembershipStatus?: Maybe<GroupMembership>
  updateMembershipActive?: Maybe<GroupMembership>
  deleteMembership?: Maybe<DeleteMembershipResult>
  createOrderSet?: Maybe<CreateOrderSetResult>
  updateOrderSet?: Maybe<UpdateOrderSetResult>
  cancelOrderSet?: Maybe<CancelOrderSetResult>
  cancelOrder?: Maybe<CancelOrderResponse>
  closePositions?: Maybe<ClosePositionsResult>
  addStopToPositions?: Maybe<Array<AddStopToPositionsResult>>
  addTslToPositions?: Maybe<Array<AddTslToPositionsResult>>
  createExchangeAccount?: Maybe<CreateExchangeAccountResult>
  deleteExchangeAccount: DeleteExchangeAccountResult
  updateExchangeAccount: UpdateExchangeAccountResult
  toggleExchangeAccountActive: ToggleExchangeAccountActiveResult
  loginUser: AuthPayload
  signupUser: AuthPayload
}

export type MutationCreateGroupArgs = {
  input: CreateGroupInput
}

export type MutationRenameGroupArgs = {
  input: RenameGroupInput
}

export type MutationUpdateGroupDescriptionArgs = {
  input: UpdateGroupDescriptionInput
}

export type MutationDisableGroupArgs = {
  input: DisableGroupInput
}

export type MutationRequestGroupAccessArgs = {
  input: RequestGroupAccessInput
}

export type MutationCreateMembershipArgs = {
  input: CreateGroupMembershipInput
}

export type MutationUpdateMembershipRoleArgs = {
  input: UpdateMembershipRoleInput
}

export type MutationUpdateMembershipStatusArgs = {
  input: UpdateMembershipStatusInput
}

export type MutationUpdateMembershipActiveArgs = {
  input: UpdateMembershipActiveInput
}

export type MutationDeleteMembershipArgs = {
  input: DeleteMembershipInput
}

export type MutationCreateOrderSetArgs = {
  input: CreateOrderSetInput
}

export type MutationUpdateOrderSetArgs = {
  input: UpdateOrderSetInput
}

export type MutationCancelOrderSetArgs = {
  input: CancelOrderSetInput
}

export type MutationCancelOrderArgs = {
  input: CancelOrderInput
}

export type MutationClosePositionsArgs = {
  input: ClosePositionsInput
}

export type MutationAddStopToPositionsArgs = {
  input: AddStopToPositionsInput
}

export type MutationAddTslToPositionsArgs = {
  input: AddTslToPositionsInput
}

export type MutationCreateExchangeAccountArgs = {
  input: CreateExchangeAccountInput
}

export type MutationDeleteExchangeAccountArgs = {
  input: DeleteExchangeAccountInput
}

export type MutationUpdateExchangeAccountArgs = {
  input: UpdateExchangeAccountInput
}

export type MutationToggleExchangeAccountActiveArgs = {
  input: ToggleExchangeAccountActiveInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationSignupUserArgs = {
  input: SignupUserInput
}

export type AsyncOperationDetailsFragment = { __typename?: 'AsyncOperation' } & Pick<
  AsyncOperation,
  'id' | 'success' | 'complete' | 'error' | 'opType'
>

export type BinanceCurrencyDetailsFragment = { __typename?: 'BinanceCurrency' } & Pick<
  BinanceCurrency,
  | 'id'
  | 'symbol'
  | 'status'
  | 'lastPrice'
  | 'openPrice'
  | 'highPrice'
  | 'lowPrice'
  | 'minPrice'
  | 'maxPrice'
  | 'tickSize'
  | 'priceChange'
  | 'priceChangePercent'
  | 'baseAsset'
  | 'quoteAsset'
  | 'baseAssetPrecision'
  | 'quotePrecision'
  | 'quoteAssetPrecision'
  | 'baseCommissionPrecision'
  | 'quoteCommissionPrecision'
  | 'allowsLimit'
  | 'allowsMarket'
  | 'allowsStopLoss'
  | 'allowsStopLossLimit'
  | 'allowsTakeProfit'
  | 'allowsTakeProfitLimit'
>

export type BitmexCurrencyDetailsFragment = { __typename?: 'BitmexCurrency' } & Pick<
  BitmexCurrency,
  | 'id'
  | 'symbol'
  | 'underlying'
  | 'active'
  | 'fractionalDigits'
  | 'lastPrice'
  | 'markPrice'
  | 'maxPrice'
  | 'tickSize'
>

export type ExchangeAccountDetailsFragment = { __typename?: 'ExchangeAccount' } & Pick<
  ExchangeAccount,
  'id' | 'active' | 'exchange' | 'createdAt'
> & {
    orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment>
    positions?: Maybe<
      { __typename?: 'ExchangeAccountPositionsResult' } & Pick<
        ExchangeAccountPositionsResult,
        'totalCount'
      > & { positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment> }
    >
  }

export type GroupDetailsFragment = { __typename?: 'Group' } & Pick<
  Group,
  'id' | 'name' | 'description' | 'active'
>

export type GroupMembershipDetailsFragment = { __typename?: 'GroupMembership' } & Pick<
  GroupMembership,
  'id' | 'active' | 'role' | 'status' | 'createdAt'
> & {
    member: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    group: { __typename?: 'Group' } & Pick<Group, 'id' | 'name'>
    orders: { __typename?: 'MemberOrdersResult' } & Pick<MemberOrdersResult, 'totalCount'>
    exchangeAccounts: Array<{ __typename?: 'ExchangeAccount' } & Pick<ExchangeAccount, 'id'>>
  }

export type OrderDetailsFragment = { __typename?: 'Order' } & Pick<
  Order,
  | 'id'
  | 'side'
  | 'price'
  | 'symbol'
  | 'status'
  | 'exchange'
  | 'quantity'
  | 'filledQty'
  | 'stopPrice'
  | 'orderType'
  | 'createdAt'
  | 'updatedAt'
>

export type OrderSetDetailsFragment = { __typename?: 'OrderSet' } & Pick<
  OrderSet,
  | 'id'
  | 'exchange'
  | 'symbol'
  | 'price'
  | 'side'
  | 'orderType'
  | 'closeOrderSet'
  | 'percent'
  | 'stopPrice'
  | 'trailingStopPercent'
  | 'stopTriggerType'
  | 'description'
  | 'createdAt'
>

export type PositionDetailsFragment = { __typename?: 'Position' } & Pick<
  Position,
  | 'id'
  | 'side'
  | 'symbol'
  | 'isOpen'
  | 'exchange'
  | 'quantity'
  | 'avgPrice'
  | 'createdAt'
  | 'updatedAt'
>

export type CancelOrderMutationVariables = Exact<{
  input: CancelOrderInput
}>

export type CancelOrderMutation = { __typename?: 'Mutation' } & {
  cancelOrder?: Maybe<
    { __typename?: 'CancelOrderResponse' } & Pick<CancelOrderResponse, 'operationId' | 'error'>
  >
}

export type ClosePositionsMutationVariables = Exact<{
  input: ClosePositionsInput
}>

export type ClosePositionsMutation = { __typename?: 'Mutation' } & {
  closePositions?: Maybe<
    { __typename?: 'ClosePositionsResult' } & {
      orderSet?: Maybe<{ __typename?: 'OrderSet' } & Pick<OrderSet, 'id'>>
    }
  >
}

export type CreateExchangeAccountMutationVariables = Exact<{
  input: CreateExchangeAccountInput
}>

export type CreateExchangeAccountMutation = { __typename?: 'Mutation' } & {
  createExchangeAccount?: Maybe<
    { __typename?: 'CreateExchangeAccountResult' } & Pick<
      CreateExchangeAccountResult,
      'operationId' | 'error'
    >
  >
}

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput
}>

export type CreateGroupMutation = { __typename?: 'Mutation' } & {
  createGroup?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'id'>>
}

export type CreateGroupMembershipMutationVariables = Exact<{
  input: CreateGroupMembershipInput
}>

export type CreateGroupMembershipMutation = { __typename?: 'Mutation' } & {
  createMembership?: Maybe<
    { __typename?: 'CreateGroupMembershipResult' } & Pick<
      CreateGroupMembershipResult,
      'success' | 'error'
    >
  >
}

export type CreateOrderSetMutationVariables = Exact<{
  input: CreateOrderSetInput
}>

export type CreateOrderSetMutation = { __typename?: 'Mutation' } & {
  createOrderSet?: Maybe<
    { __typename?: 'CreateOrderSetResult' } & {
      orderSet?: Maybe<{ __typename?: 'OrderSet' } & Pick<OrderSet, 'id'>>
    }
  >
}

export type DeleteExchangeAccountMutationVariables = Exact<{
  input: DeleteExchangeAccountInput
}>

export type DeleteExchangeAccountMutation = { __typename?: 'Mutation' } & {
  deleteExchangeAccount: { __typename?: 'DeleteExchangeAccountResult' } & Pick<
    DeleteExchangeAccountResult,
    'operationId' | 'error'
  >
}

export type DeleteMembershipMutationVariables = Exact<{
  input: DeleteMembershipInput
}>

export type DeleteMembershipMutation = { __typename?: 'Mutation' } & {
  deleteMembership?: Maybe<
    { __typename?: 'DeleteMembershipResult' } & Pick<DeleteMembershipResult, 'success' | 'error'>
  >
}

export type ToggleExchangeAccountActiveMutationVariables = Exact<{
  input: ToggleExchangeAccountActiveInput
}>

export type ToggleExchangeAccountActiveMutation = { __typename?: 'Mutation' } & {
  toggleExchangeAccountActive: { __typename?: 'ToggleExchangeAccountActiveResult' } & Pick<
    ToggleExchangeAccountActiveResult,
    'operationId' | 'error'
  >
}

export type UpdateExchangeAccountMutationVariables = Exact<{
  input: UpdateExchangeAccountInput
}>

export type UpdateExchangeAccountMutation = { __typename?: 'Mutation' } & {
  updateExchangeAccount: { __typename?: 'UpdateExchangeAccountResult' } & Pick<
    UpdateExchangeAccountResult,
    'operationId' | 'error'
  >
}

export type UserLoginMutationVariables = Exact<{
  input: LoginUserInput
}>

export type UserLoginMutation = { __typename?: 'Mutation' } & {
  loginUser: { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'>
}

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInput
}>

export type SignupUserMutation = { __typename?: 'Mutation' } & {
  signupUser: { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'>
}

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllGroupsQuery = { __typename?: 'Query' } & {
  allGroups: Array<{ __typename?: 'Group' } & GroupDetailsFragment>
}

export type GetAsyncOperationStatusQueryVariables = Exact<{
  input: AsyncOperationStatusInput
}>

export type GetAsyncOperationStatusQuery = { __typename?: 'Query' } & {
  asyncOperationStatus?: Maybe<
    { __typename?: 'AsyncOperationStatus' } & {
      operation: { __typename?: 'AsyncOperation' } & AsyncOperationDetailsFragment
    }
  >
}

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrenciesQuery = { __typename?: 'Query' } & {
  bitmexCurrencies: Array<{ __typename?: 'BitmexCurrency' } & BitmexCurrencyDetailsFragment>
  binanceCurrencies: Array<{ __typename?: 'BinanceCurrency' } & BinanceCurrencyDetailsFragment>
}

export type GetCurrencyQueryVariables = Exact<{
  input: CurrencyInput
}>

export type GetCurrencyQuery = { __typename?: 'Query' } & {
  currency?: Maybe<
    { __typename?: 'CurrencyResponse' } & {
      currency?: Maybe<
        | ({ __typename: 'BitmexCurrency' } & BitmexCurrencyDetailsFragment)
        | { __typename: 'BinanceCurrency' }
      >
    }
  >
}

export type GetExchangeAccountQueryVariables = Exact<{
  input: ExchangeAccountInput
}>

export type GetExchangeAccountQuery = { __typename?: 'Query' } & {
  exchangeAccount?: Maybe<{ __typename?: 'ExchangeAccount' } & ExchangeAccountDetailsFragment>
}

export type GetExchangeAccountsQueryVariables = Exact<{
  input: ExchangeAccountsInput
}>

export type GetExchangeAccountsQuery = { __typename?: 'Query' } & {
  exchangeAccounts: Array<{ __typename?: 'ExchangeAccount' } & ExchangeAccountDetailsFragment>
}

export type GetGroupQueryVariables = Exact<{
  input: GroupInput
}>

export type GetGroupQuery = { __typename?: 'Query' } & {
  group?: Maybe<{ __typename?: 'Group' } & GroupDetailsFragment>
}

export type GetGroupExchangeAccountsQueryVariables = Exact<{
  groupInput: GroupInput
}>

export type GetGroupExchangeAccountsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        members?: Maybe<
          { __typename?: 'GroupMembersResult' } & {
            members: Array<
              { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
                  member: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                  exchangeAccounts: Array<
                    { __typename?: 'ExchangeAccount' } & Pick<
                      ExchangeAccount,
                      'id' | 'active' | 'exchange'
                    >
                  >
                }
            >
          }
        >
      }
  >
}

export type GetGroupMemberQueryVariables = Exact<{
  input: MembershipInput
}>

export type GetGroupMemberQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment
}

export type GetGroupMembersQueryVariables = Exact<{
  groupInput: GroupInput
  membersInput: GroupMembersInput
}>

export type GetGroupMembersQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & {
      members?: Maybe<
        { __typename?: 'GroupMembersResult' } & Pick<GroupMembersResult, 'totalCount'> & {
            members: Array<{ __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment>
          }
      >
    } & GroupDetailsFragment
  >
}

export type GetGroupOrderSetDetailsQueryVariables = Exact<{
  groupInput: GroupInput
  orderSetInput: OrderSetInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  stopOrderType?: Maybe<StopOrderType>
}>

export type GetGroupOrderSetDetailsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        orderSet?: Maybe<
          { __typename?: 'OrderSet' } & {
            orders: { __typename?: 'OrderSetOrders' } & Pick<OrderSetOrders, 'totalCount'> & {
                orders: Array<
                  { __typename?: 'Order' } & {
                    exchangeAccount: { __typename?: 'ExchangeAccount' } & Pick<
                      ExchangeAccount,
                      'id'
                    > & {
                        membership: { __typename?: 'GroupMembership' } & Pick<
                          GroupMembership,
                          'id'
                        > & { member: { __typename?: 'User' } & Pick<User, 'username'> }
                      }
                  } & OrderDetailsFragment
                >
              }
          } & OrderSetDetailsFragment
        >
      }
  >
}

export type GetGroupOrderSetsQueryVariables = Exact<{
  input: GroupInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetGroupOrderSetsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        orderSets: { __typename?: 'GroupOrderSets' } & Pick<GroupOrderSets, 'totalCount'> & {
            orderSets: Array<{ __typename?: 'OrderSet' } & OrderSetDetailsFragment>
          }
      }
  >
}

export type GetGroupPositionsQueryVariables = Exact<{
  groupInput: GroupInput
  positionsInput: MemberPositionsInput
}>

export type GetGroupPositionsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        members?: Maybe<
          { __typename?: 'GroupMembersResult' } & {
            members: Array<
              { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
                  member: { __typename?: 'User' } & Pick<User, 'username'>
                  positions: { __typename?: 'MemberPositionsResult' } & Pick<
                    MemberPositionsResult,
                    'totalCount'
                  > & {
                      positions: Array<
                        { __typename?: 'Position' } & {
                          exchangeAccount: { __typename?: 'ExchangeAccount' } & Pick<
                            ExchangeAccount,
                            'id'
                          >
                        } & PositionDetailsFragment
                      >
                    }
                }
            >
          }
        >
      }
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'admin' | 'username'>>
}

export type GetMemberOrdersQueryVariables = Exact<{
  membershipInput: MembershipInput
  ordersInput: MemberOrdersInput
}>

export type GetMemberOrdersQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
      orders: { __typename?: 'MemberOrdersResult' } & Pick<MemberOrdersResult, 'totalCount'> & {
          orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment>
        }
    }
}

export type GetMemberPositionsQueryVariables = Exact<{
  membershipInput: MembershipInput
  positionsInput: MemberPositionsInput
}>

export type GetMemberPositionsQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
      positions: { __typename?: 'MemberPositionsResult' } & Pick<
        MemberPositionsResult,
        'totalCount'
      > & { positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment> }
    }
}

export type GetMyGroupPositionsQueryVariables = Exact<{
  membershipInput: MyMembershipInput
  positionsInput: MemberPositionsInput
}>

export type GetMyGroupPositionsQuery = { __typename?: 'Query' } & {
  myMembership: { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
      positions: { __typename?: 'MemberPositionsResult' } & Pick<
        MemberPositionsResult,
        'totalCount'
      > & { positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment> }
    }
}

export type GetMyMembershipQueryVariables = Exact<{
  input: MyMembershipInput
}>

export type GetMyMembershipQuery = { __typename?: 'Query' } & {
  myMembership: { __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment
}

export type GetOrderQueryVariables = Exact<{
  input: OrderInput
}>

export type GetOrderQuery = { __typename?: 'Query' } & {
  order?: Maybe<{ __typename?: 'Order' } & OrderDetailsFragment>
}

export type GetPositionQueryVariables = Exact<{
  input: PositionInput
}>

export type GetPositionQuery = { __typename?: 'Query' } & {
  position?: Maybe<{ __typename?: 'Position' } & PositionDetailsFragment>
}

export type GetSymbolsQueryVariables = Exact<{ [key: string]: never }>

export type GetSymbolsQuery = { __typename?: 'Query' } & {
  bitmexCurrencies: Array<{ __typename?: 'BitmexCurrency' } & Pick<BitmexCurrency, 'id' | 'symbol'>>
  binanceCurrencies: Array<
    { __typename?: 'BinanceCurrency' } & Pick<BinanceCurrency, 'id' | 'symbol'>
  >
}

export type GetUserIdByEmailQueryVariables = Exact<{
  input: UserIdByEmailInput
}>

export type GetUserIdByEmailQuery = { __typename?: 'Query' } & Pick<Query, 'userIdByEmail'>

export type GroupExistsQueryVariables = Exact<{
  input: GroupExistsInput
}>

export type GroupExistsQuery = { __typename?: 'Query' } & Pick<Query, 'groupExists'>

export type MyMembershipsQueryVariables = Exact<{
  input: MyMembershipsInput
}>

export type MyMembershipsQuery = { __typename?: 'Query' } & {
  myMemberships?: Maybe<
    Array<
      { __typename?: 'GroupMembership' } & Pick<
        GroupMembership,
        'id' | 'active' | 'role' | 'status'
      > & {
          member: { __typename?: 'User' } & Pick<User, 'id'>
          group: { __typename?: 'Group' } & GroupDetailsFragment
          exchangeAccounts: Array<
            { __typename?: 'ExchangeAccount' } & ExchangeAccountDetailsFragment
          >
        }
    >
  >
}

export const AsyncOperationDetailsFragmentDoc = gql`
  fragment AsyncOperationDetails on AsyncOperation {
    id
    success
    complete
    error
    opType
  }
`
export const BinanceCurrencyDetailsFragmentDoc = gql`
  fragment BinanceCurrencyDetails on BinanceCurrency {
    id
    symbol
    status
    lastPrice
    openPrice
    highPrice
    lowPrice
    minPrice
    maxPrice
    tickSize
    priceChange
    priceChangePercent
    baseAsset
    quoteAsset
    baseAssetPrecision
    quotePrecision
    quoteAssetPrecision
    baseCommissionPrecision
    quoteCommissionPrecision
    allowsLimit
    allowsMarket
    allowsStopLoss
    allowsStopLossLimit
    allowsTakeProfit
    allowsTakeProfitLimit
  }
`
export const BitmexCurrencyDetailsFragmentDoc = gql`
  fragment BitmexCurrencyDetails on BitmexCurrency {
    id
    symbol
    underlying
    active
    fractionalDigits
    lastPrice
    markPrice
    maxPrice
    tickSize
  }
`
export const OrderDetailsFragmentDoc = gql`
  fragment OrderDetails on Order {
    id
    side
    price
    symbol
    status
    exchange
    quantity
    filledQty
    stopPrice
    orderType
    createdAt
    updatedAt
  }
`
export const PositionDetailsFragmentDoc = gql`
  fragment PositionDetails on Position {
    id
    side
    symbol
    isOpen
    exchange
    quantity
    avgPrice
    createdAt
    updatedAt
  }
`
export const ExchangeAccountDetailsFragmentDoc = gql`
  fragment ExchangeAccountDetails on ExchangeAccount {
    id
    active
    exchange
    createdAt
    orders {
      ...OrderDetails
    }
    positions {
      totalCount
      positions {
        ...PositionDetails
      }
    }
  }
  ${OrderDetailsFragmentDoc}
  ${PositionDetailsFragmentDoc}
`
export const GroupDetailsFragmentDoc = gql`
  fragment GroupDetails on Group {
    id
    name
    description
    active
  }
`
export const GroupMembershipDetailsFragmentDoc = gql`
  fragment GroupMembershipDetails on GroupMembership {
    id
    active
    role
    status
    createdAt
    member {
      id
      username
    }
    group {
      id
      name
    }
    orders(input: {}) {
      totalCount
    }
    exchangeAccounts {
      id
    }
  }
`
export const OrderSetDetailsFragmentDoc = gql`
  fragment OrderSetDetails on OrderSet {
    id
    exchange
    symbol
    price
    side
    orderType
    closeOrderSet
    percent
    stopPrice
    trailingStopPercent
    stopTriggerType
    description
    createdAt
  }
`
export const CancelOrderDocument = gql`
  mutation CancelOrder($input: CancelOrderInput!) {
    cancelOrder(input: $input) {
      operationId
      error
    }
  }
`
export type CancelOrderMutationFn = Apollo.MutationFunction<
  CancelOrderMutation,
  CancelOrderMutationVariables
>

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>,
) {
  return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(
    CancelOrderDocument,
    baseOptions,
  )
}
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<
  CancelOrderMutation,
  CancelOrderMutationVariables
>
export const ClosePositionsDocument = gql`
  mutation ClosePositions($input: ClosePositionsInput!) {
    closePositions(input: $input) {
      orderSet {
        id
      }
    }
  }
`
export type ClosePositionsMutationFn = Apollo.MutationFunction<
  ClosePositionsMutation,
  ClosePositionsMutationVariables
>

/**
 * __useClosePositionsMutation__
 *
 * To run a mutation, you first call `useClosePositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosePositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closePositionsMutation, { data, loading, error }] = useClosePositionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClosePositionsMutation(
  baseOptions?: Apollo.MutationHookOptions<ClosePositionsMutation, ClosePositionsMutationVariables>,
) {
  return Apollo.useMutation<ClosePositionsMutation, ClosePositionsMutationVariables>(
    ClosePositionsDocument,
    baseOptions,
  )
}
export type ClosePositionsMutationHookResult = ReturnType<typeof useClosePositionsMutation>
export type ClosePositionsMutationResult = Apollo.MutationResult<ClosePositionsMutation>
export type ClosePositionsMutationOptions = Apollo.BaseMutationOptions<
  ClosePositionsMutation,
  ClosePositionsMutationVariables
>
export const CreateExchangeAccountDocument = gql`
  mutation CreateExchangeAccount($input: CreateExchangeAccountInput!) {
    createExchangeAccount(input: $input) {
      operationId
      error
    }
  }
`
export type CreateExchangeAccountMutationFn = Apollo.MutationFunction<
  CreateExchangeAccountMutation,
  CreateExchangeAccountMutationVariables
>

/**
 * __useCreateExchangeAccountMutation__
 *
 * To run a mutation, you first call `useCreateExchangeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExchangeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExchangeAccountMutation, { data, loading, error }] = useCreateExchangeAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExchangeAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateExchangeAccountMutation,
    CreateExchangeAccountMutationVariables
  >,
) {
  return Apollo.useMutation<CreateExchangeAccountMutation, CreateExchangeAccountMutationVariables>(
    CreateExchangeAccountDocument,
    baseOptions,
  )
}
export type CreateExchangeAccountMutationHookResult = ReturnType<
  typeof useCreateExchangeAccountMutation
>
export type CreateExchangeAccountMutationResult = Apollo.MutationResult<
  CreateExchangeAccountMutation
>
export type CreateExchangeAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateExchangeAccountMutation,
  CreateExchangeAccountMutationVariables
>
export const CreateGroupDocument = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
    }
  }
`
export type CreateGroupMutationFn = Apollo.MutationFunction<
  CreateGroupMutation,
  CreateGroupMutationVariables
>

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>,
) {
  return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    baseOptions,
  )
}
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>
export const CreateGroupMembershipDocument = gql`
  mutation CreateGroupMembership($input: CreateGroupMembershipInput!) {
    createMembership(input: $input) {
      success
      error
    }
  }
`
export type CreateGroupMembershipMutationFn = Apollo.MutationFunction<
  CreateGroupMembershipMutation,
  CreateGroupMembershipMutationVariables
>

/**
 * __useCreateGroupMembershipMutation__
 *
 * To run a mutation, you first call `useCreateGroupMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMembershipMutation, { data, loading, error }] = useCreateGroupMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMembershipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMembershipMutation,
    CreateGroupMembershipMutationVariables
  >,
) {
  return Apollo.useMutation<CreateGroupMembershipMutation, CreateGroupMembershipMutationVariables>(
    CreateGroupMembershipDocument,
    baseOptions,
  )
}
export type CreateGroupMembershipMutationHookResult = ReturnType<
  typeof useCreateGroupMembershipMutation
>
export type CreateGroupMembershipMutationResult = Apollo.MutationResult<
  CreateGroupMembershipMutation
>
export type CreateGroupMembershipMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMembershipMutation,
  CreateGroupMembershipMutationVariables
>
export const CreateOrderSetDocument = gql`
  mutation CreateOrderSet($input: CreateOrderSetInput!) {
    createOrderSet(input: $input) {
      orderSet {
        id
      }
    }
  }
`
export type CreateOrderSetMutationFn = Apollo.MutationFunction<
  CreateOrderSetMutation,
  CreateOrderSetMutationVariables
>

/**
 * __useCreateOrderSetMutation__
 *
 * To run a mutation, you first call `useCreateOrderSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderSetMutation, { data, loading, error }] = useCreateOrderSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderSetMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrderSetMutation, CreateOrderSetMutationVariables>,
) {
  return Apollo.useMutation<CreateOrderSetMutation, CreateOrderSetMutationVariables>(
    CreateOrderSetDocument,
    baseOptions,
  )
}
export type CreateOrderSetMutationHookResult = ReturnType<typeof useCreateOrderSetMutation>
export type CreateOrderSetMutationResult = Apollo.MutationResult<CreateOrderSetMutation>
export type CreateOrderSetMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderSetMutation,
  CreateOrderSetMutationVariables
>
export const DeleteExchangeAccountDocument = gql`
  mutation DeleteExchangeAccount($input: DeleteExchangeAccountInput!) {
    deleteExchangeAccount(input: $input) {
      operationId
      error
    }
  }
`
export type DeleteExchangeAccountMutationFn = Apollo.MutationFunction<
  DeleteExchangeAccountMutation,
  DeleteExchangeAccountMutationVariables
>

/**
 * __useDeleteExchangeAccountMutation__
 *
 * To run a mutation, you first call `useDeleteExchangeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExchangeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExchangeAccountMutation, { data, loading, error }] = useDeleteExchangeAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteExchangeAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteExchangeAccountMutation,
    DeleteExchangeAccountMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteExchangeAccountMutation, DeleteExchangeAccountMutationVariables>(
    DeleteExchangeAccountDocument,
    baseOptions,
  )
}
export type DeleteExchangeAccountMutationHookResult = ReturnType<
  typeof useDeleteExchangeAccountMutation
>
export type DeleteExchangeAccountMutationResult = Apollo.MutationResult<
  DeleteExchangeAccountMutation
>
export type DeleteExchangeAccountMutationOptions = Apollo.BaseMutationOptions<
  DeleteExchangeAccountMutation,
  DeleteExchangeAccountMutationVariables
>
export const DeleteMembershipDocument = gql`
  mutation DeleteMembership($input: DeleteMembershipInput!) {
    deleteMembership(input: $input) {
      success
      error
    }
  }
`
export type DeleteMembershipMutationFn = Apollo.MutationFunction<
  DeleteMembershipMutation,
  DeleteMembershipMutationVariables
>

/**
 * __useDeleteMembershipMutation__
 *
 * To run a mutation, you first call `useDeleteMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMembershipMutation, { data, loading, error }] = useDeleteMembershipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMembershipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMembershipMutation,
    DeleteMembershipMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteMembershipMutation, DeleteMembershipMutationVariables>(
    DeleteMembershipDocument,
    baseOptions,
  )
}
export type DeleteMembershipMutationHookResult = ReturnType<typeof useDeleteMembershipMutation>
export type DeleteMembershipMutationResult = Apollo.MutationResult<DeleteMembershipMutation>
export type DeleteMembershipMutationOptions = Apollo.BaseMutationOptions<
  DeleteMembershipMutation,
  DeleteMembershipMutationVariables
>
export const ToggleExchangeAccountActiveDocument = gql`
  mutation ToggleExchangeAccountActive($input: ToggleExchangeAccountActiveInput!) {
    toggleExchangeAccountActive(input: $input) {
      operationId
      error
    }
  }
`
export type ToggleExchangeAccountActiveMutationFn = Apollo.MutationFunction<
  ToggleExchangeAccountActiveMutation,
  ToggleExchangeAccountActiveMutationVariables
>

/**
 * __useToggleExchangeAccountActiveMutation__
 *
 * To run a mutation, you first call `useToggleExchangeAccountActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleExchangeAccountActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleExchangeAccountActiveMutation, { data, loading, error }] = useToggleExchangeAccountActiveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleExchangeAccountActiveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleExchangeAccountActiveMutation,
    ToggleExchangeAccountActiveMutationVariables
  >,
) {
  return Apollo.useMutation<
    ToggleExchangeAccountActiveMutation,
    ToggleExchangeAccountActiveMutationVariables
  >(ToggleExchangeAccountActiveDocument, baseOptions)
}
export type ToggleExchangeAccountActiveMutationHookResult = ReturnType<
  typeof useToggleExchangeAccountActiveMutation
>
export type ToggleExchangeAccountActiveMutationResult = Apollo.MutationResult<
  ToggleExchangeAccountActiveMutation
>
export type ToggleExchangeAccountActiveMutationOptions = Apollo.BaseMutationOptions<
  ToggleExchangeAccountActiveMutation,
  ToggleExchangeAccountActiveMutationVariables
>
export const UpdateExchangeAccountDocument = gql`
  mutation UpdateExchangeAccount($input: UpdateExchangeAccountInput!) {
    updateExchangeAccount(input: $input) {
      operationId
      error
    }
  }
`
export type UpdateExchangeAccountMutationFn = Apollo.MutationFunction<
  UpdateExchangeAccountMutation,
  UpdateExchangeAccountMutationVariables
>

/**
 * __useUpdateExchangeAccountMutation__
 *
 * To run a mutation, you first call `useUpdateExchangeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExchangeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExchangeAccountMutation, { data, loading, error }] = useUpdateExchangeAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExchangeAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateExchangeAccountMutation,
    UpdateExchangeAccountMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateExchangeAccountMutation, UpdateExchangeAccountMutationVariables>(
    UpdateExchangeAccountDocument,
    baseOptions,
  )
}
export type UpdateExchangeAccountMutationHookResult = ReturnType<
  typeof useUpdateExchangeAccountMutation
>
export type UpdateExchangeAccountMutationResult = Apollo.MutationResult<
  UpdateExchangeAccountMutation
>
export type UpdateExchangeAccountMutationOptions = Apollo.BaseMutationOptions<
  UpdateExchangeAccountMutation,
  UpdateExchangeAccountMutationVariables
>
export const UserLoginDocument = gql`
  mutation UserLogin($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`
export type UserLoginMutationFn = Apollo.MutationFunction<
  UserLoginMutation,
  UserLoginMutationVariables
>

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>,
) {
  return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(
    UserLoginDocument,
    baseOptions,
  )
}
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<
  UserLoginMutation,
  UserLoginMutationVariables
>
export const SignupUserDocument = gql`
  mutation SignupUser($input: SignupUserInput!) {
    signupUser(input: $input) {
      token
    }
  }
`
export type SignupUserMutationFn = Apollo.MutationFunction<
  SignupUserMutation,
  SignupUserMutationVariables
>

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>,
) {
  return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(
    SignupUserDocument,
    baseOptions,
  )
}
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<
  SignupUserMutation,
  SignupUserMutationVariables
>
export const GetAllGroupsDocument = gql`
  query GetAllGroups {
    allGroups {
      ...GroupDetails
    }
  }
  ${GroupDetailsFragmentDoc}
`

/**
 * __useGetAllGroupsQuery__
 *
 * To run a query within a React component, call `useGetAllGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllGroupsQuery, GetAllGroupsQueryVariables>,
) {
  return Apollo.useQuery<GetAllGroupsQuery, GetAllGroupsQueryVariables>(
    GetAllGroupsDocument,
    baseOptions,
  )
}
export function useGetAllGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllGroupsQuery, GetAllGroupsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetAllGroupsQuery, GetAllGroupsQueryVariables>(
    GetAllGroupsDocument,
    baseOptions,
  )
}
export type GetAllGroupsQueryHookResult = ReturnType<typeof useGetAllGroupsQuery>
export type GetAllGroupsLazyQueryHookResult = ReturnType<typeof useGetAllGroupsLazyQuery>
export type GetAllGroupsQueryResult = Apollo.QueryResult<
  GetAllGroupsQuery,
  GetAllGroupsQueryVariables
>
export const GetAsyncOperationStatusDocument = gql`
  query GetAsyncOperationStatus($input: AsyncOperationStatusInput!) {
    asyncOperationStatus(input: $input) {
      operation {
        ...AsyncOperationDetails
      }
    }
  }
  ${AsyncOperationDetailsFragmentDoc}
`

/**
 * __useGetAsyncOperationStatusQuery__
 *
 * To run a query within a React component, call `useGetAsyncOperationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAsyncOperationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAsyncOperationStatusQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAsyncOperationStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAsyncOperationStatusQuery,
    GetAsyncOperationStatusQueryVariables
  >,
) {
  return Apollo.useQuery<GetAsyncOperationStatusQuery, GetAsyncOperationStatusQueryVariables>(
    GetAsyncOperationStatusDocument,
    baseOptions,
  )
}
export function useGetAsyncOperationStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAsyncOperationStatusQuery,
    GetAsyncOperationStatusQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetAsyncOperationStatusQuery, GetAsyncOperationStatusQueryVariables>(
    GetAsyncOperationStatusDocument,
    baseOptions,
  )
}
export type GetAsyncOperationStatusQueryHookResult = ReturnType<
  typeof useGetAsyncOperationStatusQuery
>
export type GetAsyncOperationStatusLazyQueryHookResult = ReturnType<
  typeof useGetAsyncOperationStatusLazyQuery
>
export type GetAsyncOperationStatusQueryResult = Apollo.QueryResult<
  GetAsyncOperationStatusQuery,
  GetAsyncOperationStatusQueryVariables
>
export const GetCurrenciesDocument = gql`
  query GetCurrencies {
    bitmexCurrencies {
      ...BitmexCurrencyDetails
    }
    binanceCurrencies {
      ...BinanceCurrencyDetails
    }
  }
  ${BitmexCurrencyDetailsFragmentDoc}
  ${BinanceCurrencyDetailsFragmentDoc}
`

/**
 * __useGetCurrenciesQuery__
 *
 * To run a query within a React component, call `useGetCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrenciesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>,
) {
  return Apollo.useQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(
    GetCurrenciesDocument,
    baseOptions,
  )
}
export function useGetCurrenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(
    GetCurrenciesDocument,
    baseOptions,
  )
}
export type GetCurrenciesQueryHookResult = ReturnType<typeof useGetCurrenciesQuery>
export type GetCurrenciesLazyQueryHookResult = ReturnType<typeof useGetCurrenciesLazyQuery>
export type GetCurrenciesQueryResult = Apollo.QueryResult<
  GetCurrenciesQuery,
  GetCurrenciesQueryVariables
>
export const GetCurrencyDocument = gql`
  query GetCurrency($input: CurrencyInput!) {
    currency(input: $input) {
      currency {
        ... on BitmexCurrency {
          ...BitmexCurrencyDetails
        }
        __typename
      }
    }
  }
  ${BitmexCurrencyDetailsFragmentDoc}
`

/**
 * __useGetCurrencyQuery__
 *
 * To run a query within a React component, call `useGetCurrencyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrencyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrencyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCurrencyQuery(
  baseOptions: Apollo.QueryHookOptions<GetCurrencyQuery, GetCurrencyQueryVariables>,
) {
  return Apollo.useQuery<GetCurrencyQuery, GetCurrencyQueryVariables>(
    GetCurrencyDocument,
    baseOptions,
  )
}
export function useGetCurrencyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCurrencyQuery, GetCurrencyQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCurrencyQuery, GetCurrencyQueryVariables>(
    GetCurrencyDocument,
    baseOptions,
  )
}
export type GetCurrencyQueryHookResult = ReturnType<typeof useGetCurrencyQuery>
export type GetCurrencyLazyQueryHookResult = ReturnType<typeof useGetCurrencyLazyQuery>
export type GetCurrencyQueryResult = Apollo.QueryResult<GetCurrencyQuery, GetCurrencyQueryVariables>
export const GetExchangeAccountDocument = gql`
  query GetExchangeAccount($input: ExchangeAccountInput!) {
    exchangeAccount(input: $input) {
      ...ExchangeAccountDetails
    }
  }
  ${ExchangeAccountDetailsFragmentDoc}
`

/**
 * __useGetExchangeAccountQuery__
 *
 * To run a query within a React component, call `useGetExchangeAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetExchangeAccountQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeAccountQuery, GetExchangeAccountQueryVariables>,
) {
  return Apollo.useQuery<GetExchangeAccountQuery, GetExchangeAccountQueryVariables>(
    GetExchangeAccountDocument,
    baseOptions,
  )
}
export function useGetExchangeAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetExchangeAccountQuery,
    GetExchangeAccountQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetExchangeAccountQuery, GetExchangeAccountQueryVariables>(
    GetExchangeAccountDocument,
    baseOptions,
  )
}
export type GetExchangeAccountQueryHookResult = ReturnType<typeof useGetExchangeAccountQuery>
export type GetExchangeAccountLazyQueryHookResult = ReturnType<
  typeof useGetExchangeAccountLazyQuery
>
export type GetExchangeAccountQueryResult = Apollo.QueryResult<
  GetExchangeAccountQuery,
  GetExchangeAccountQueryVariables
>
export const GetExchangeAccountsDocument = gql`
  query GetExchangeAccounts($input: ExchangeAccountsInput!) {
    exchangeAccounts(input: $input) {
      ...ExchangeAccountDetails
    }
  }
  ${ExchangeAccountDetailsFragmentDoc}
`

/**
 * __useGetExchangeAccountsQuery__
 *
 * To run a query within a React component, call `useGetExchangeAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeAccountsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetExchangeAccountsQuery(
  baseOptions: Apollo.QueryHookOptions<GetExchangeAccountsQuery, GetExchangeAccountsQueryVariables>,
) {
  return Apollo.useQuery<GetExchangeAccountsQuery, GetExchangeAccountsQueryVariables>(
    GetExchangeAccountsDocument,
    baseOptions,
  )
}
export function useGetExchangeAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetExchangeAccountsQuery,
    GetExchangeAccountsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetExchangeAccountsQuery, GetExchangeAccountsQueryVariables>(
    GetExchangeAccountsDocument,
    baseOptions,
  )
}
export type GetExchangeAccountsQueryHookResult = ReturnType<typeof useGetExchangeAccountsQuery>
export type GetExchangeAccountsLazyQueryHookResult = ReturnType<
  typeof useGetExchangeAccountsLazyQuery
>
export type GetExchangeAccountsQueryResult = Apollo.QueryResult<
  GetExchangeAccountsQuery,
  GetExchangeAccountsQueryVariables
>
export const GetGroupDocument = gql`
  query GetGroup($input: GroupInput!) {
    group(input: $input) {
      ...GroupDetails
    }
  }
  ${GroupDetailsFragmentDoc}
`

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>,
) {
  return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, baseOptions)
}
export function useGetGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>,
) {
  return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, baseOptions)
}
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>
export const GetGroupExchangeAccountsDocument = gql`
  query GetGroupExchangeAccounts($groupInput: GroupInput!) {
    group(input: $groupInput) {
      id
      members {
        members {
          id
          member {
            id
            username
          }
          exchangeAccounts {
            id
            active
            exchange
          }
        }
      }
    }
  }
`

/**
 * __useGetGroupExchangeAccountsQuery__
 *
 * To run a query within a React component, call `useGetGroupExchangeAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupExchangeAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupExchangeAccountsQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *   },
 * });
 */
export function useGetGroupExchangeAccountsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetGroupExchangeAccountsQuery,
    GetGroupExchangeAccountsQueryVariables
  >,
) {
  return Apollo.useQuery<GetGroupExchangeAccountsQuery, GetGroupExchangeAccountsQueryVariables>(
    GetGroupExchangeAccountsDocument,
    baseOptions,
  )
}
export function useGetGroupExchangeAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupExchangeAccountsQuery,
    GetGroupExchangeAccountsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupExchangeAccountsQuery, GetGroupExchangeAccountsQueryVariables>(
    GetGroupExchangeAccountsDocument,
    baseOptions,
  )
}
export type GetGroupExchangeAccountsQueryHookResult = ReturnType<
  typeof useGetGroupExchangeAccountsQuery
>
export type GetGroupExchangeAccountsLazyQueryHookResult = ReturnType<
  typeof useGetGroupExchangeAccountsLazyQuery
>
export type GetGroupExchangeAccountsQueryResult = Apollo.QueryResult<
  GetGroupExchangeAccountsQuery,
  GetGroupExchangeAccountsQueryVariables
>
export const GetGroupMemberDocument = gql`
  query GetGroupMember($input: MembershipInput!) {
    membership(input: $input) {
      ...GroupMembershipDetails
    }
  }
  ${GroupMembershipDetailsFragmentDoc}
`

/**
 * __useGetGroupMemberQuery__
 *
 * To run a query within a React component, call `useGetGroupMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupMemberQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetGroupMemberQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupMemberQuery, GetGroupMemberQueryVariables>,
) {
  return Apollo.useQuery<GetGroupMemberQuery, GetGroupMemberQueryVariables>(
    GetGroupMemberDocument,
    baseOptions,
  )
}
export function useGetGroupMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupMemberQuery, GetGroupMemberQueryVariables>,
) {
  return Apollo.useLazyQuery<GetGroupMemberQuery, GetGroupMemberQueryVariables>(
    GetGroupMemberDocument,
    baseOptions,
  )
}
export type GetGroupMemberQueryHookResult = ReturnType<typeof useGetGroupMemberQuery>
export type GetGroupMemberLazyQueryHookResult = ReturnType<typeof useGetGroupMemberLazyQuery>
export type GetGroupMemberQueryResult = Apollo.QueryResult<
  GetGroupMemberQuery,
  GetGroupMemberQueryVariables
>
export const GetGroupMembersDocument = gql`
  query GetGroupMembers($groupInput: GroupInput!, $membersInput: GroupMembersInput!) {
    group(input: $groupInput) {
      ...GroupDetails
      members(input: $membersInput) {
        totalCount
        members {
          ...GroupMembershipDetails
        }
      }
    }
  }
  ${GroupDetailsFragmentDoc}
  ${GroupMembershipDetailsFragmentDoc}
`

/**
 * __useGetGroupMembersQuery__
 *
 * To run a query within a React component, call `useGetGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupMembersQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *      membersInput: // value for 'membersInput'
 *   },
 * });
 */
export function useGetGroupMembersQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>,
) {
  return Apollo.useQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(
    GetGroupMembersDocument,
    baseOptions,
  )
}
export function useGetGroupMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>,
) {
  return Apollo.useLazyQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(
    GetGroupMembersDocument,
    baseOptions,
  )
}
export type GetGroupMembersQueryHookResult = ReturnType<typeof useGetGroupMembersQuery>
export type GetGroupMembersLazyQueryHookResult = ReturnType<typeof useGetGroupMembersLazyQuery>
export type GetGroupMembersQueryResult = Apollo.QueryResult<
  GetGroupMembersQuery,
  GetGroupMembersQueryVariables
>
export const GetGroupOrderSetDetailsDocument = gql`
  query GetGroupOrderSetDetails(
    $groupInput: GroupInput!
    $orderSetInput: OrderSetInput!
    $limit: Int
    $offset: Int
    $stopOrderType: StopOrderType
  ) {
    group(input: $groupInput) {
      id
      orderSet(input: $orderSetInput) {
        ...OrderSetDetails
        orders(limit: $limit, offset: $offset, stopOrderType: $stopOrderType) {
          totalCount
          orders {
            ...OrderDetails
            exchangeAccount {
              id
              membership {
                id
                member {
                  username
                }
              }
            }
          }
        }
      }
    }
  }
  ${OrderSetDetailsFragmentDoc}
  ${OrderDetailsFragmentDoc}
`

/**
 * __useGetGroupOrderSetDetailsQuery__
 *
 * To run a query within a React component, call `useGetGroupOrderSetDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupOrderSetDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupOrderSetDetailsQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *      orderSetInput: // value for 'orderSetInput'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      stopOrderType: // value for 'stopOrderType'
 *   },
 * });
 */
export function useGetGroupOrderSetDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetGroupOrderSetDetailsQuery,
    GetGroupOrderSetDetailsQueryVariables
  >,
) {
  return Apollo.useQuery<GetGroupOrderSetDetailsQuery, GetGroupOrderSetDetailsQueryVariables>(
    GetGroupOrderSetDetailsDocument,
    baseOptions,
  )
}
export function useGetGroupOrderSetDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupOrderSetDetailsQuery,
    GetGroupOrderSetDetailsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupOrderSetDetailsQuery, GetGroupOrderSetDetailsQueryVariables>(
    GetGroupOrderSetDetailsDocument,
    baseOptions,
  )
}
export type GetGroupOrderSetDetailsQueryHookResult = ReturnType<
  typeof useGetGroupOrderSetDetailsQuery
>
export type GetGroupOrderSetDetailsLazyQueryHookResult = ReturnType<
  typeof useGetGroupOrderSetDetailsLazyQuery
>
export type GetGroupOrderSetDetailsQueryResult = Apollo.QueryResult<
  GetGroupOrderSetDetailsQuery,
  GetGroupOrderSetDetailsQueryVariables
>
export const GetGroupOrderSetsDocument = gql`
  query GetGroupOrderSets($input: GroupInput!, $limit: Int, $offset: Int) {
    group(input: $input) {
      id
      orderSets(limit: $limit, offset: $offset) {
        totalCount
        orderSets {
          ...OrderSetDetails
        }
      }
    }
  }
  ${OrderSetDetailsFragmentDoc}
`

/**
 * __useGetGroupOrderSetsQuery__
 *
 * To run a query within a React component, call `useGetGroupOrderSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupOrderSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupOrderSetsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetGroupOrderSetsQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupOrderSetsQuery, GetGroupOrderSetsQueryVariables>,
) {
  return Apollo.useQuery<GetGroupOrderSetsQuery, GetGroupOrderSetsQueryVariables>(
    GetGroupOrderSetsDocument,
    baseOptions,
  )
}
export function useGetGroupOrderSetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupOrderSetsQuery,
    GetGroupOrderSetsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupOrderSetsQuery, GetGroupOrderSetsQueryVariables>(
    GetGroupOrderSetsDocument,
    baseOptions,
  )
}
export type GetGroupOrderSetsQueryHookResult = ReturnType<typeof useGetGroupOrderSetsQuery>
export type GetGroupOrderSetsLazyQueryHookResult = ReturnType<typeof useGetGroupOrderSetsLazyQuery>
export type GetGroupOrderSetsQueryResult = Apollo.QueryResult<
  GetGroupOrderSetsQuery,
  GetGroupOrderSetsQueryVariables
>
export const GetGroupPositionsDocument = gql`
  query GetGroupPositions($groupInput: GroupInput!, $positionsInput: MemberPositionsInput!) {
    group(input: $groupInput) {
      id
      members {
        members {
          id
          member {
            username
          }
          positions(input: $positionsInput) {
            totalCount
            positions {
              exchangeAccount {
                id
              }
              ...PositionDetails
            }
          }
        }
      }
    }
  }
  ${PositionDetailsFragmentDoc}
`

/**
 * __useGetGroupPositionsQuery__
 *
 * To run a query within a React component, call `useGetGroupPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupPositionsQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *      positionsInput: // value for 'positionsInput'
 *   },
 * });
 */
export function useGetGroupPositionsQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupPositionsQuery, GetGroupPositionsQueryVariables>,
) {
  return Apollo.useQuery<GetGroupPositionsQuery, GetGroupPositionsQueryVariables>(
    GetGroupPositionsDocument,
    baseOptions,
  )
}
export function useGetGroupPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupPositionsQuery,
    GetGroupPositionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupPositionsQuery, GetGroupPositionsQueryVariables>(
    GetGroupPositionsDocument,
    baseOptions,
  )
}
export type GetGroupPositionsQueryHookResult = ReturnType<typeof useGetGroupPositionsQuery>
export type GetGroupPositionsLazyQueryHookResult = ReturnType<typeof useGetGroupPositionsLazyQuery>
export type GetGroupPositionsQueryResult = Apollo.QueryResult<
  GetGroupPositionsQuery,
  GetGroupPositionsQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      admin
      username
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const GetMemberOrdersDocument = gql`
  query GetMemberOrders($membershipInput: MembershipInput!, $ordersInput: MemberOrdersInput!) {
    membership(input: $membershipInput) {
      id
      orders(input: $ordersInput) {
        totalCount
        orders {
          ...OrderDetails
        }
      }
    }
  }
  ${OrderDetailsFragmentDoc}
`

/**
 * __useGetMemberOrdersQuery__
 *
 * To run a query within a React component, call `useGetMemberOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberOrdersQuery({
 *   variables: {
 *      membershipInput: // value for 'membershipInput'
 *      ordersInput: // value for 'ordersInput'
 *   },
 * });
 */
export function useGetMemberOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberOrdersQuery, GetMemberOrdersQueryVariables>,
) {
  return Apollo.useQuery<GetMemberOrdersQuery, GetMemberOrdersQueryVariables>(
    GetMemberOrdersDocument,
    baseOptions,
  )
}
export function useGetMemberOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberOrdersQuery, GetMemberOrdersQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMemberOrdersQuery, GetMemberOrdersQueryVariables>(
    GetMemberOrdersDocument,
    baseOptions,
  )
}
export type GetMemberOrdersQueryHookResult = ReturnType<typeof useGetMemberOrdersQuery>
export type GetMemberOrdersLazyQueryHookResult = ReturnType<typeof useGetMemberOrdersLazyQuery>
export type GetMemberOrdersQueryResult = Apollo.QueryResult<
  GetMemberOrdersQuery,
  GetMemberOrdersQueryVariables
>
export const GetMemberPositionsDocument = gql`
  query GetMemberPositions(
    $membershipInput: MembershipInput!
    $positionsInput: MemberPositionsInput!
  ) {
    membership(input: $membershipInput) {
      id
      positions(input: $positionsInput) {
        totalCount
        positions {
          ...PositionDetails
        }
      }
    }
  }
  ${PositionDetailsFragmentDoc}
`

/**
 * __useGetMemberPositionsQuery__
 *
 * To run a query within a React component, call `useGetMemberPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberPositionsQuery({
 *   variables: {
 *      membershipInput: // value for 'membershipInput'
 *      positionsInput: // value for 'positionsInput'
 *   },
 * });
 */
export function useGetMemberPositionsQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberPositionsQuery, GetMemberPositionsQueryVariables>,
) {
  return Apollo.useQuery<GetMemberPositionsQuery, GetMemberPositionsQueryVariables>(
    GetMemberPositionsDocument,
    baseOptions,
  )
}
export function useGetMemberPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMemberPositionsQuery,
    GetMemberPositionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetMemberPositionsQuery, GetMemberPositionsQueryVariables>(
    GetMemberPositionsDocument,
    baseOptions,
  )
}
export type GetMemberPositionsQueryHookResult = ReturnType<typeof useGetMemberPositionsQuery>
export type GetMemberPositionsLazyQueryHookResult = ReturnType<
  typeof useGetMemberPositionsLazyQuery
>
export type GetMemberPositionsQueryResult = Apollo.QueryResult<
  GetMemberPositionsQuery,
  GetMemberPositionsQueryVariables
>
export const GetMyGroupPositionsDocument = gql`
  query GetMyGroupPositions(
    $membershipInput: MyMembershipInput!
    $positionsInput: MemberPositionsInput!
  ) {
    myMembership(input: $membershipInput) {
      id
      positions(input: $positionsInput) {
        totalCount
        positions {
          ...PositionDetails
        }
      }
    }
  }
  ${PositionDetailsFragmentDoc}
`

/**
 * __useGetMyGroupPositionsQuery__
 *
 * To run a query within a React component, call `useGetMyGroupPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyGroupPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyGroupPositionsQuery({
 *   variables: {
 *      membershipInput: // value for 'membershipInput'
 *      positionsInput: // value for 'positionsInput'
 *   },
 * });
 */
export function useGetMyGroupPositionsQuery(
  baseOptions: Apollo.QueryHookOptions<GetMyGroupPositionsQuery, GetMyGroupPositionsQueryVariables>,
) {
  return Apollo.useQuery<GetMyGroupPositionsQuery, GetMyGroupPositionsQueryVariables>(
    GetMyGroupPositionsDocument,
    baseOptions,
  )
}
export function useGetMyGroupPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyGroupPositionsQuery,
    GetMyGroupPositionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetMyGroupPositionsQuery, GetMyGroupPositionsQueryVariables>(
    GetMyGroupPositionsDocument,
    baseOptions,
  )
}
export type GetMyGroupPositionsQueryHookResult = ReturnType<typeof useGetMyGroupPositionsQuery>
export type GetMyGroupPositionsLazyQueryHookResult = ReturnType<
  typeof useGetMyGroupPositionsLazyQuery
>
export type GetMyGroupPositionsQueryResult = Apollo.QueryResult<
  GetMyGroupPositionsQuery,
  GetMyGroupPositionsQueryVariables
>
export const GetMyMembershipDocument = gql`
  query GetMyMembership($input: MyMembershipInput!) {
    myMembership(input: $input) {
      ...GroupMembershipDetails
    }
  }
  ${GroupMembershipDetailsFragmentDoc}
`

/**
 * __useGetMyMembershipQuery__
 *
 * To run a query within a React component, call `useGetMyMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMembershipQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyMembershipQuery(
  baseOptions: Apollo.QueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>,
) {
  return Apollo.useQuery<GetMyMembershipQuery, GetMyMembershipQueryVariables>(
    GetMyMembershipDocument,
    baseOptions,
  )
}
export function useGetMyMembershipLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMyMembershipQuery, GetMyMembershipQueryVariables>(
    GetMyMembershipDocument,
    baseOptions,
  )
}
export type GetMyMembershipQueryHookResult = ReturnType<typeof useGetMyMembershipQuery>
export type GetMyMembershipLazyQueryHookResult = ReturnType<typeof useGetMyMembershipLazyQuery>
export type GetMyMembershipQueryResult = Apollo.QueryResult<
  GetMyMembershipQuery,
  GetMyMembershipQueryVariables
>
export const GetOrderDocument = gql`
  query GetOrder($input: OrderInput!) {
    order(input: $input) {
      ...OrderDetails
    }
  }
  ${OrderDetailsFragmentDoc}
`

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderQuery(
  baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
) {
  return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions)
}
export function useGetOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
) {
  return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, baseOptions)
}
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>
export const GetPositionDocument = gql`
  query GetPosition($input: PositionInput!) {
    position(input: $input) {
      ...PositionDetails
    }
  }
  ${PositionDetailsFragmentDoc}
`

/**
 * __useGetPositionQuery__
 *
 * To run a query within a React component, call `useGetPositionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPositionQuery(
  baseOptions: Apollo.QueryHookOptions<GetPositionQuery, GetPositionQueryVariables>,
) {
  return Apollo.useQuery<GetPositionQuery, GetPositionQueryVariables>(
    GetPositionDocument,
    baseOptions,
  )
}
export function useGetPositionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPositionQuery, GetPositionQueryVariables>,
) {
  return Apollo.useLazyQuery<GetPositionQuery, GetPositionQueryVariables>(
    GetPositionDocument,
    baseOptions,
  )
}
export type GetPositionQueryHookResult = ReturnType<typeof useGetPositionQuery>
export type GetPositionLazyQueryHookResult = ReturnType<typeof useGetPositionLazyQuery>
export type GetPositionQueryResult = Apollo.QueryResult<GetPositionQuery, GetPositionQueryVariables>
export const GetSymbolsDocument = gql`
  query GetSymbols {
    bitmexCurrencies {
      id
      symbol
    }
    binanceCurrencies {
      id
      symbol
    }
  }
`

/**
 * __useGetSymbolsQuery__
 *
 * To run a query within a React component, call `useGetSymbolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSymbolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSymbolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSymbolsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSymbolsQuery, GetSymbolsQueryVariables>,
) {
  return Apollo.useQuery<GetSymbolsQuery, GetSymbolsQueryVariables>(GetSymbolsDocument, baseOptions)
}
export function useGetSymbolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSymbolsQuery, GetSymbolsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetSymbolsQuery, GetSymbolsQueryVariables>(
    GetSymbolsDocument,
    baseOptions,
  )
}
export type GetSymbolsQueryHookResult = ReturnType<typeof useGetSymbolsQuery>
export type GetSymbolsLazyQueryHookResult = ReturnType<typeof useGetSymbolsLazyQuery>
export type GetSymbolsQueryResult = Apollo.QueryResult<GetSymbolsQuery, GetSymbolsQueryVariables>
export const GetUserIdByEmailDocument = gql`
  query GetUserIdByEmail($input: UserIdByEmailInput!) {
    userIdByEmail(input: $input)
  }
`

/**
 * __useGetUserIdByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserIdByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdByEmailQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserIdByEmailQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserIdByEmailQuery, GetUserIdByEmailQueryVariables>,
) {
  return Apollo.useQuery<GetUserIdByEmailQuery, GetUserIdByEmailQueryVariables>(
    GetUserIdByEmailDocument,
    baseOptions,
  )
}
export function useGetUserIdByEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserIdByEmailQuery, GetUserIdByEmailQueryVariables>,
) {
  return Apollo.useLazyQuery<GetUserIdByEmailQuery, GetUserIdByEmailQueryVariables>(
    GetUserIdByEmailDocument,
    baseOptions,
  )
}
export type GetUserIdByEmailQueryHookResult = ReturnType<typeof useGetUserIdByEmailQuery>
export type GetUserIdByEmailLazyQueryHookResult = ReturnType<typeof useGetUserIdByEmailLazyQuery>
export type GetUserIdByEmailQueryResult = Apollo.QueryResult<
  GetUserIdByEmailQuery,
  GetUserIdByEmailQueryVariables
>
export const GroupExistsDocument = gql`
  query GroupExists($input: GroupExistsInput!) {
    groupExists(input: $input)
  }
`

/**
 * __useGroupExistsQuery__
 *
 * To run a query within a React component, call `useGroupExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupExistsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGroupExistsQuery(
  baseOptions: Apollo.QueryHookOptions<GroupExistsQuery, GroupExistsQueryVariables>,
) {
  return Apollo.useQuery<GroupExistsQuery, GroupExistsQueryVariables>(
    GroupExistsDocument,
    baseOptions,
  )
}
export function useGroupExistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GroupExistsQuery, GroupExistsQueryVariables>,
) {
  return Apollo.useLazyQuery<GroupExistsQuery, GroupExistsQueryVariables>(
    GroupExistsDocument,
    baseOptions,
  )
}
export type GroupExistsQueryHookResult = ReturnType<typeof useGroupExistsQuery>
export type GroupExistsLazyQueryHookResult = ReturnType<typeof useGroupExistsLazyQuery>
export type GroupExistsQueryResult = Apollo.QueryResult<GroupExistsQuery, GroupExistsQueryVariables>
export const MyMembershipsDocument = gql`
  query MyMemberships($input: MyMembershipsInput!) {
    myMemberships(input: $input) {
      id
      active
      role
      status
      member {
        id
      }
      group {
        ...GroupDetails
      }
      exchangeAccounts {
        ...ExchangeAccountDetails
      }
    }
  }
  ${GroupDetailsFragmentDoc}
  ${ExchangeAccountDetailsFragmentDoc}
`

/**
 * __useMyMembershipsQuery__
 *
 * To run a query within a React component, call `useMyMembershipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyMembershipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyMembershipsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyMembershipsQuery(
  baseOptions: Apollo.QueryHookOptions<MyMembershipsQuery, MyMembershipsQueryVariables>,
) {
  return Apollo.useQuery<MyMembershipsQuery, MyMembershipsQueryVariables>(
    MyMembershipsDocument,
    baseOptions,
  )
}
export function useMyMembershipsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyMembershipsQuery, MyMembershipsQueryVariables>,
) {
  return Apollo.useLazyQuery<MyMembershipsQuery, MyMembershipsQueryVariables>(
    MyMembershipsDocument,
    baseOptions,
  )
}
export type MyMembershipsQueryHookResult = ReturnType<typeof useMyMembershipsQuery>
export type MyMembershipsLazyQueryHookResult = ReturnType<typeof useMyMembershipsLazyQuery>
export type MyMembershipsQueryResult = Apollo.QueryResult<
  MyMembershipsQuery,
  MyMembershipsQueryVariables
>
