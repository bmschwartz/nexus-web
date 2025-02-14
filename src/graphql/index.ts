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

export type ActivateMemberSubscriptionInput = {
  subscriptionId: Scalars['ID']
}

export type ActivateMemberSubscriptionResult = {
  __typename?: 'ActivateMemberSubscriptionResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type CancelMemberSubscriptionInput = {
  subscriptionId: Scalars['ID']
}

export type CancelMemberSubscriptionResult = {
  __typename?: 'CancelMemberSubscriptionResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type CreateGroupInput = {
  name: Scalars['String']
  email?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  telegram?: Maybe<Scalars['String']>
  description: Scalars['String']
  payoutAddress?: Maybe<Scalars['String']>
  payInPlatform: Scalars['Boolean']
  subscriptionOptions: Array<GroupSubscriptionInput>
}

export type CreateGroupMembershipInput = {
  groupId: Scalars['ID']
  memberId: Scalars['ID']
  role: MembershipRole
  status: MembershipStatus
}

export type CreateGroupMembershipResult = {
  __typename?: 'CreateGroupMembershipResult'
  membershipId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
}

export type CreateGroupSubscriptionInput = {
  fee: Scalars['Float']
  duration: Scalars['Int']
  description?: Maybe<Scalars['String']>
}

export type CreateGroupSubscriptionResult = {
  __typename?: 'CreateGroupSubscriptionResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type DeleteGroupSubscriptionInput = {
  subscriptionId: Scalars['ID']
}

export type DeleteGroupSubscriptionResult = {
  __typename?: 'DeleteGroupSubscriptionResult'
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
  subscriptionOptions: Array<GroupSubscription>
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
  subscription?: Maybe<MemberSubscription>
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

export type GroupMembershipExchangeAccountsArgs = {
  input?: Maybe<MemberExchangeAccountsInput>
}

export type GroupMembersInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  roles?: Maybe<Array<MembershipRole>>
  statuses?: Maybe<Array<MembershipStatus>>
}

export type GroupMembersResult = {
  __typename?: 'GroupMembersResult'
  members: Array<GroupMembership>
  totalCount: Scalars['Int']
}

export type GroupSubscription = {
  __typename?: 'GroupSubscription'
  id: Scalars['ID']
  group: Group
  active: Scalars['Boolean']
  price: Scalars['Float']
  duration: Scalars['Int']
  description?: Maybe<Scalars['String']>
  memberCount: Scalars['Int']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type GroupSubscriptionInput = {
  fee: Scalars['Float']
  duration: Scalars['Int']
  description?: Maybe<Scalars['String']>
}

export enum InvoiceStatus {
  New = 'NEW',
  Paid = 'PAID',
  Confirmed = 'CONFIRMED',
  Complete = 'COMPLETE',
  Expired = 'EXPIRED',
  Invalid = 'INVALID',
}

export type JoinGroupInput = {
  groupId: Scalars['ID']
  subscriptionOptionId?: Maybe<Scalars['ID']>
}

export type JoinGroupResult = {
  __typename?: 'JoinGroupResult'
  membershipId?: Maybe<Scalars['ID']>
  error?: Maybe<Scalars['String']>
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

export type MemberSubscription = {
  __typename?: 'MemberSubscription'
  id: Scalars['ID']
  active: Scalars['Boolean']
  currentPrice?: Maybe<Scalars['Float']>
  recurring: Scalars['Boolean']
  startDate?: Maybe<Scalars['DateTime']>
  endDate?: Maybe<Scalars['DateTime']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  membership: GroupMembership
  invoices: Array<SubscriptionInvoice>
  pendingInvoice?: Maybe<SubscriptionInvoice>
  groupSubscription: GroupSubscription
}

export type MyMembershipInput = {
  groupId: Scalars['ID']
}

export type MyMembershipsInput = {
  roles?: Maybe<Array<MembershipRole>>
  statuses?: Maybe<Array<MembershipStatus>>
}

export type PayMemberSubscriptionInput = {
  groupId: Scalars['ID']
  membershipId: Scalars['ID']
  subscriptionOptionId: Scalars['ID']
}

export type PayMemberSubscriptionResult = {
  __typename?: 'PayMemberSubscriptionResult'
  invoiceId?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
}

export type PlatformFee = {
  __typename?: 'PlatformFee'
  id: Scalars['ID']
  price: Scalars['Float']
  active: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type RenameGroupInput = {
  groupId: Scalars['ID']
  name: Scalars['String']
}

export type RequestGroupAccessInput = {
  groupId: Scalars['ID']
}

export type ResetPaymentInput = {
  invoiceId: Scalars['ID']
}

export type ResetPaymentResult = {
  __typename?: 'ResetPaymentResult'
  error?: Maybe<Scalars['String']>
}

export type SubscriptionInvoice = {
  __typename?: 'SubscriptionInvoice'
  id: Scalars['ID']
  email: Scalars['String']
  btcPaid?: Maybe<Scalars['Float']>
  btcPrice?: Maybe<Scalars['Float']>
  usdPrice: Scalars['Float']
  status: InvoiceStatus
  subscription: MemberSubscription
  remoteId?: Maybe<Scalars['ID']>
  token?: Maybe<Scalars['ID']>
  periodStart?: Maybe<Scalars['DateTime']>
  periodEnd?: Maybe<Scalars['DateTime']>
  expiresAt?: Maybe<Scalars['DateTime']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type SwitchSubscriptionOptionInput = {
  membershipId: Scalars['ID']
  subscriptionOptionId: Scalars['ID']
}

export type SwitchSubscriptionOptionResult = {
  __typename?: 'SwitchSubscriptionOptionResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type ToggleSubscriptionActiveInput = {
  subscriptionId: Scalars['ID']
}

export type ToggleSubscriptionActiveResult = {
  __typename?: 'ToggleSubscriptionActiveResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type UpdateGroupDescriptionInput = {
  groupId: Scalars['ID']
  description: Scalars['String']
}

export type UpdateGroupSubscriptionInput = {
  fee: Scalars['Float']
  subscriptionId: Scalars['ID']
  description?: Maybe<Scalars['String']>
}

export type UpdateGroupSubscriptionResult = {
  __typename?: 'UpdateGroupSubscriptionResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type UpdateMembershipActiveInput = {
  active: Scalars['Boolean']
  membershipId: Scalars['ID']
}

export type UpdateMembershipRoleInput = {
  groupId: Scalars['ID']
  membershipId: Scalars['ID']
  role: MembershipRole
}

export type UpdateMembershipStatusInput = {
  groupId: Scalars['ID']
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
  id: Scalars['ID']
}

export type CancelOrderResponse = {
  __typename?: 'CancelOrderResponse'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type CancelOrderSetInput = {
  orderSetId: Scalars['ID']
  stopOrderTypes?: Maybe<Array<StopOrderType>>
}

export type CancelOrderSetResult = {
  __typename?: 'CancelOrderSetResult'
  success: Scalars['Boolean']
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

export type MemberExchangeAccountsInput = {
  exchange?: Maybe<Exchange>
  activeOnly?: Maybe<Scalars['Boolean']>
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
  filledPrice?: Maybe<Scalars['Float']>
  symbol: Scalars['String']
  error?: Maybe<Scalars['String']>
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
  orders: OrderSetOrdersResult
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
  input: OrderSetOrdersInput
}

export type OrderSetInput = {
  id: Scalars['ID']
  stopOrderType?: Maybe<StopOrderType>
}

export type OrderSetOrdersInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  orderStatus?: Maybe<OrderStatus>
  stopOrderType?: Maybe<StopOrderType>
}

export type OrderSetOrdersResult = {
  __typename?: 'OrderSetOrdersResult'
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
  leverage?: Maybe<Scalars['Float']>
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

export type LoginResponse = {
  __typename?: 'LoginResponse'
  token?: Maybe<Scalars['String']>
}

export type LoginUserInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpResponse = {
  __typename?: 'SignUpResponse'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type SignupUserInput = {
  email: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
  userType: UserType
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  email: Scalars['String']
  username: Scalars['String']
  userType: UserType
  admin: Scalars['Boolean']
  memberships: Array<GroupMembership>
}

export type UserIdByEmailInput = {
  email: Scalars['String']
}

export enum UserType {
  Owner = 'OWNER',
  Trader = 'TRADER',
  Member = 'MEMBER',
}

export type VerifySignUpCodeInput = {
  email: Scalars['String']
  code: Scalars['String']
}

export type VerifySignUpCodeResponse = {
  __typename?: 'VerifySignUpCodeResponse'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  myGroup?: Maybe<Group>
  allGroups: Array<Group>
  group?: Maybe<Group>
  groupExists: Scalars['Boolean']
  activePlatformFee?: Maybe<PlatformFee>
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
  joinGroup?: Maybe<JoinGroupResult>
  requestGroupAccess?: Maybe<GroupMembership>
  createMembership?: Maybe<CreateGroupMembershipResult>
  updateMembershipRole?: Maybe<GroupMembership>
  updateMembershipStatus?: Maybe<GroupMembership>
  updateMembershipActive?: Maybe<GroupMembership>
  deleteMembership?: Maybe<DeleteMembershipResult>
  createGroupSubscription?: Maybe<CreateGroupSubscriptionResult>
  updateGroupSubscription?: Maybe<UpdateGroupSubscriptionResult>
  deleteGroupSubscription?: Maybe<DeleteGroupSubscriptionResult>
  toggleSubscriptionActive?: Maybe<ToggleSubscriptionActiveResult>
  resetPayment?: Maybe<ResetPaymentResult>
  payMemberSubscription?: Maybe<PayMemberSubscriptionResult>
  switchSubscriptionOption?: Maybe<SwitchSubscriptionOptionResult>
  cancelMemberSubscription?: Maybe<CancelMemberSubscriptionResult>
  activateMemberSubscription?: Maybe<ActivateMemberSubscriptionResult>
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
  loginUser: LoginResponse
  signupUser: SignUpResponse
  verifySignUpCode: VerifySignUpCodeResponse
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

export type MutationJoinGroupArgs = {
  input: JoinGroupInput
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

export type MutationCreateGroupSubscriptionArgs = {
  input: CreateGroupSubscriptionInput
}

export type MutationUpdateGroupSubscriptionArgs = {
  input: UpdateGroupSubscriptionInput
}

export type MutationDeleteGroupSubscriptionArgs = {
  input: DeleteGroupSubscriptionInput
}

export type MutationToggleSubscriptionActiveArgs = {
  input: ToggleSubscriptionActiveInput
}

export type MutationResetPaymentArgs = {
  input: ResetPaymentInput
}

export type MutationPayMemberSubscriptionArgs = {
  input: PayMemberSubscriptionInput
}

export type MutationSwitchSubscriptionOptionArgs = {
  input: SwitchSubscriptionOptionInput
}

export type MutationCancelMemberSubscriptionArgs = {
  input: CancelMemberSubscriptionInput
}

export type MutationActivateMemberSubscriptionArgs = {
  input: ActivateMemberSubscriptionInput
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

export type MutationVerifySignUpCodeArgs = {
  input: VerifySignUpCodeInput
}

export type AsyncOperationDetailsFragment = { __typename?: 'AsyncOperation' } & Pick<
  AsyncOperation,
  'id' | 'success' | 'complete' | 'error' | 'opType'
>

export type BasicGroupSubscriptionDetailsFragment = { __typename?: 'GroupSubscription' } & Pick<
  GroupSubscription,
  'id' | 'price' | 'active' | 'duration' | 'memberCount' | 'description' | 'createdAt' | 'updatedAt'
>

export type BinanceCurrencyBasicDetailsFragment = { __typename?: 'BinanceCurrency' } & Pick<
  BinanceCurrency,
  | 'id'
  | 'symbol'
  | 'status'
  | 'lastPrice'
  | 'minPrice'
  | 'maxPrice'
  | 'tickSize'
  | 'allowsLimit'
  | 'allowsMarket'
  | 'allowsStopLoss'
  | 'allowsTakeProfit'
  | 'allowsStopLossLimit'
  | 'allowsTakeProfitLimit'
>

export type BinanceCurrencyDetailsFragment = { __typename?: 'BinanceCurrency' } & Pick<
  BinanceCurrency,
  | 'openPrice'
  | 'highPrice'
  | 'lowPrice'
  | 'priceChange'
  | 'priceChangePercent'
  | 'baseAsset'
  | 'quoteAsset'
  | 'baseAssetPrecision'
  | 'quotePrecision'
  | 'quoteAssetPrecision'
  | 'baseCommissionPrecision'
  | 'quoteCommissionPrecision'
> &
  BinanceCurrencyBasicDetailsFragment

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

export type FullGroupSubscriptionDetailsFragment = { __typename?: 'GroupSubscription' } & Pick<
  GroupSubscription,
  'memberCount'
> &
  BasicGroupSubscriptionDetailsFragment

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
    subscription?: Maybe<{ __typename?: 'MemberSubscription' } & MemberSubscriptionDetailsFragment>
  }

export type MemberSubscriptionDetailsFragment = { __typename?: 'MemberSubscription' } & Pick<
  MemberSubscription,
  'id' | 'active' | 'recurring' | 'startDate' | 'endDate' | 'createdAt' | 'updatedAt'
> & {
    groupSubscription: { __typename?: 'GroupSubscription' } & Pick<
      GroupSubscription,
      'id' | 'active' | 'price' | 'duration'
    >
    pendingInvoice?: Maybe<
      { __typename?: 'SubscriptionInvoice' } & SubscriptionInvoiceDetailsFragment
    >
    invoices: Array<{ __typename?: 'SubscriptionInvoice' } & SubscriptionInvoiceDetailsFragment>
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
  | 'filledPrice'
  | 'orderType'
  | 'stopPrice'
  | 'trailingStopPercent'
  | 'stopTriggerType'
  | 'error'
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
  | 'leverage'
  | 'createdAt'
>

export type PlatformFeeDetailsFragment = { __typename?: 'PlatformFee' } & Pick<
  PlatformFee,
  'id' | 'price' | 'active' | 'createdAt' | 'updatedAt'
>

export type PositionDetailsFragment = { __typename?: 'Position' } & Pick<
  Position,
  | 'id'
  | 'side'
  | 'symbol'
  | 'isOpen'
  | 'exchange'
  | 'quantity'
  | 'leverage'
  | 'avgPrice'
  | 'createdAt'
  | 'updatedAt'
>

export type SubscriptionInvoiceDetailsFragment = { __typename?: 'SubscriptionInvoice' } & Pick<
  SubscriptionInvoice,
  | 'id'
  | 'email'
  | 'usdPrice'
  | 'btcPaid'
  | 'btcPrice'
  | 'status'
  | 'remoteId'
  | 'token'
  | 'periodStart'
  | 'periodEnd'
  | 'expiresAt'
  | 'createdAt'
  | 'updatedAt'
>

export type ActivateMemberSubscriptionMutationVariables = Exact<{
  input: ActivateMemberSubscriptionInput
}>

export type ActivateMemberSubscriptionMutation = { __typename?: 'Mutation' } & {
  activateMemberSubscription?: Maybe<
    { __typename?: 'ActivateMemberSubscriptionResult' } & Pick<
      ActivateMemberSubscriptionResult,
      'success' | 'error'
    >
  >
}

export type CancelMemberSubscriptionMutationVariables = Exact<{
  input: CancelMemberSubscriptionInput
}>

export type CancelMemberSubscriptionMutation = { __typename?: 'Mutation' } & {
  cancelMemberSubscription?: Maybe<
    { __typename?: 'CancelMemberSubscriptionResult' } & Pick<
      CancelMemberSubscriptionResult,
      'success' | 'error'
    >
  >
}

export type CancelOrderMutationVariables = Exact<{
  input: CancelOrderInput
}>

export type CancelOrderMutation = { __typename?: 'Mutation' } & {
  cancelOrder?: Maybe<
    { __typename?: 'CancelOrderResponse' } & Pick<CancelOrderResponse, 'success' | 'error'>
  >
}

export type CancelOrderSetMutationVariables = Exact<{
  input: CancelOrderSetInput
}>

export type CancelOrderSetMutation = { __typename?: 'Mutation' } & {
  cancelOrderSet?: Maybe<
    { __typename?: 'CancelOrderSetResult' } & Pick<CancelOrderSetResult, 'success' | 'error'>
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
      'membershipId' | 'error'
    >
  >
}

export type CreateGroupSubscriptionMutationVariables = Exact<{
  input: CreateGroupSubscriptionInput
}>

export type CreateGroupSubscriptionMutation = { __typename?: 'Mutation' } & {
  createGroupSubscription?: Maybe<
    { __typename?: 'CreateGroupSubscriptionResult' } & Pick<
      CreateGroupSubscriptionResult,
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

export type DeleteGroupSubscriptionMutationVariables = Exact<{
  input: DeleteGroupSubscriptionInput
}>

export type DeleteGroupSubscriptionMutation = { __typename?: 'Mutation' } & {
  deleteGroupSubscription?: Maybe<
    { __typename?: 'DeleteGroupSubscriptionResult' } & Pick<
      DeleteGroupSubscriptionResult,
      'success' | 'error'
    >
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

export type JoinGroupMutationVariables = Exact<{
  input: JoinGroupInput
}>

export type JoinGroupMutation = { __typename?: 'Mutation' } & {
  joinGroup?: Maybe<
    { __typename?: 'JoinGroupResult' } & Pick<JoinGroupResult, 'membershipId' | 'error'>
  >
}

export type PayMemberSubscriptionMutationVariables = Exact<{
  input: PayMemberSubscriptionInput
}>

export type PayMemberSubscriptionMutation = { __typename?: 'Mutation' } & {
  payMemberSubscription?: Maybe<
    { __typename?: 'PayMemberSubscriptionResult' } & Pick<
      PayMemberSubscriptionResult,
      'invoiceId' | 'error'
    >
  >
}

export type RequestGroupAccessMutationVariables = Exact<{
  input: RequestGroupAccessInput
}>

export type RequestGroupAccessMutation = { __typename?: 'Mutation' } & {
  requestGroupAccess?: Maybe<{ __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'>>
}

export type ResetPaymentMutationVariables = Exact<{
  input: ResetPaymentInput
}>

export type ResetPaymentMutation = { __typename?: 'Mutation' } & {
  resetPayment?: Maybe<{ __typename?: 'ResetPaymentResult' } & Pick<ResetPaymentResult, 'error'>>
}

export type SwitchSubscriptionOptionMutationVariables = Exact<{
  input: SwitchSubscriptionOptionInput
}>

export type SwitchSubscriptionOptionMutation = { __typename?: 'Mutation' } & {
  switchSubscriptionOption?: Maybe<
    { __typename?: 'SwitchSubscriptionOptionResult' } & Pick<
      SwitchSubscriptionOptionResult,
      'success' | 'error'
    >
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

export type ToggleSubscriptionActiveMutationVariables = Exact<{
  input: ToggleSubscriptionActiveInput
}>

export type ToggleSubscriptionActiveMutation = { __typename?: 'Mutation' } & {
  toggleSubscriptionActive?: Maybe<
    { __typename?: 'ToggleSubscriptionActiveResult' } & Pick<
      ToggleSubscriptionActiveResult,
      'success' | 'error'
    >
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

export type UpdateGroupDescriptionMutationVariables = Exact<{
  input: UpdateGroupDescriptionInput
}>

export type UpdateGroupDescriptionMutation = { __typename?: 'Mutation' } & {
  updateGroupDescription?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'description'>>
}

export type UpdateGroupSubscriptionMutationVariables = Exact<{
  input: UpdateGroupSubscriptionInput
}>

export type UpdateGroupSubscriptionMutation = { __typename?: 'Mutation' } & {
  updateGroupSubscription?: Maybe<
    { __typename?: 'UpdateGroupSubscriptionResult' } & Pick<
      UpdateGroupSubscriptionResult,
      'success' | 'error'
    >
  >
}

export type UpdateMembershipRoleMutationVariables = Exact<{
  input: UpdateMembershipRoleInput
}>

export type UpdateMembershipRoleMutation = { __typename?: 'Mutation' } & {
  updateMembershipRole?: Maybe<
    { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id' | 'role'>
  >
}

export type UpdateMembershipStatusMutationVariables = Exact<{
  input: UpdateMembershipStatusInput
}>

export type UpdateMembershipStatusMutation = { __typename?: 'Mutation' } & {
  updateMembershipStatus?: Maybe<
    { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id' | 'status'>
  >
}

export type UserLoginMutationVariables = Exact<{
  input: LoginUserInput
}>

export type UserLoginMutation = { __typename?: 'Mutation' } & {
  loginUser: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'token'>
}

export type SignupUserMutationVariables = Exact<{
  input: SignupUserInput
}>

export type SignupUserMutation = { __typename?: 'Mutation' } & {
  signupUser: { __typename?: 'SignUpResponse' } & Pick<SignUpResponse, 'success' | 'error'>
}

export type VerifySignUpCodeMutationVariables = Exact<{
  input: VerifySignUpCodeInput
}>

export type VerifySignUpCodeMutation = { __typename?: 'Mutation' } & {
  verifySignUpCode: { __typename?: 'VerifySignUpCodeResponse' } & Pick<
    VerifySignUpCodeResponse,
    'success' | 'error'
  >
}

export type GetAllGroupsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllGroupsQuery = { __typename?: 'Query' } & {
  allGroups: Array<{ __typename?: 'Group' } & GroupDetailsFragment>
}

export type GetActivePlatformFeeQueryVariables = Exact<{ [key: string]: never }>

export type GetActivePlatformFeeQuery = { __typename?: 'Query' } & {
  activePlatformFee?: Maybe<{ __typename?: 'PlatformFee' } & PlatformFeeDetailsFragment>
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

export type GetBasicGroupSubscriptionOptionsQueryVariables = Exact<{
  input: GroupInput
}>

export type GetBasicGroupSubscriptionOptionsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        subscriptionOptions: Array<
          { __typename?: 'GroupSubscription' } & BasicGroupSubscriptionDetailsFragment
        >
      }
  >
}

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrenciesQuery = { __typename?: 'Query' } & {
  bitmexCurrencies: Array<{ __typename?: 'BitmexCurrency' } & BitmexCurrencyDetailsFragment>
  binanceCurrencies: Array<{ __typename?: 'BinanceCurrency' } & BinanceCurrencyDetailsFragment>
}

export type GetCurrenciesBasicQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrenciesBasicQuery = { __typename?: 'Query' } & {
  bitmexCurrencies: Array<{ __typename?: 'BitmexCurrency' } & BitmexCurrencyDetailsFragment>
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

export type GetFullGroupSubscriptionOptionsQueryVariables = Exact<{
  input: GroupInput
}>

export type GetFullGroupSubscriptionOptionsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        subscriptionOptions: Array<
          { __typename?: 'GroupSubscription' } & FullGroupSubscriptionDetailsFragment
        >
      }
  >
}

export type GetGroupQueryVariables = Exact<{
  input: GroupInput
}>

export type GetGroupQuery = { __typename?: 'Query' } & {
  group?: Maybe<{ __typename?: 'Group' } & GroupDetailsFragment>
}

export type GetGroupExchangeAccountsQueryVariables = Exact<{
  groupInput: GroupInput
  exchangeAccountsInput?: Maybe<MemberExchangeAccountsInput>
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
  ordersInput: OrderSetOrdersInput
}>

export type GetGroupOrderSetDetailsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        orderSet?: Maybe<
          { __typename?: 'OrderSet' } & {
            orders: { __typename?: 'OrderSetOrdersResult' } & Pick<
              OrderSetOrdersResult,
              'totalCount'
            > & {
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

export type GetGroupStatsQueryVariables = Exact<{
  input: GroupInput
}>

export type GetGroupStatsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        orderSets: { __typename?: 'GroupOrderSets' } & Pick<GroupOrderSets, 'totalCount'>
        members?: Maybe<
          { __typename?: 'GroupMembersResult' } & Pick<GroupMembersResult, 'totalCount'>
        >
      }
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'username' | 'userType'>>
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

export type GetMyGroupQueryVariables = Exact<{ [key: string]: never }>

export type GetMyGroupQuery = { __typename?: 'Query' } & {
  myGroup?: Maybe<
    { __typename?: 'Group' } & {
      subscriptionOptions: Array<
        { __typename?: 'GroupSubscription' } & FullGroupSubscriptionDetailsFragment
      >
    } & GroupDetailsFragment
  >
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

export type GetMyGroupSubscriptionOptionsQueryVariables = Exact<{ [key: string]: never }>

export type GetMyGroupSubscriptionOptionsQuery = { __typename?: 'Query' } & {
  myGroup?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        subscriptionOptions: Array<
          { __typename?: 'GroupSubscription' } & FullGroupSubscriptionDetailsFragment
        >
      }
  >
}

export type GetMyMembershipQueryVariables = Exact<{
  input: MyMembershipInput
}>

export type GetMyMembershipQuery = { __typename?: 'Query' } & {
  myMembership: { __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment
}

export type GetMyOrdersQueryVariables = Exact<{
  ordersInput: MemberOrdersInput
}>

export type GetMyOrdersQuery = { __typename?: 'Query' } & {
  me?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id'> & {
        memberships: Array<
          { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
              group: { __typename?: 'Group' } & Pick<Group, 'id' | 'name'>
              orders: { __typename?: 'MemberOrdersResult' } & Pick<
                MemberOrdersResult,
                'totalCount'
              > & { orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment> }
            }
        >
      }
  >
}

export type GetOrderQueryVariables = Exact<{
  input: OrderInput
}>

export type GetOrderQuery = { __typename?: 'Query' } & {
  order?: Maybe<{ __typename?: 'Order' } & OrderDetailsFragment>
}

export type GetPendingMemberRequestsQueryVariables = Exact<{
  groupInput: GroupInput
  membersInput: GroupMembersInput
}>

export type GetPendingMemberRequestsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        members?: Maybe<
          { __typename?: 'GroupMembersResult' } & Pick<GroupMembersResult, 'totalCount'> & {
              members: Array<
                { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
                    member: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                  }
              >
            }
        >
      }
  >
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
export const BinanceCurrencyBasicDetailsFragmentDoc = gql`
  fragment BinanceCurrencyBasicDetails on BinanceCurrency {
    id
    symbol
    status
    lastPrice
    minPrice
    maxPrice
    tickSize
    allowsLimit
    allowsMarket
    allowsStopLoss
    allowsTakeProfit
    allowsStopLossLimit
    allowsTakeProfitLimit
  }
`
export const BinanceCurrencyDetailsFragmentDoc = gql`
  fragment BinanceCurrencyDetails on BinanceCurrency {
    ...BinanceCurrencyBasicDetails
    openPrice
    highPrice
    lowPrice
    priceChange
    priceChangePercent
    baseAsset
    quoteAsset
    baseAssetPrecision
    quotePrecision
    quoteAssetPrecision
    baseCommissionPrecision
    quoteCommissionPrecision
  }
  ${BinanceCurrencyBasicDetailsFragmentDoc}
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
    filledPrice
    orderType
    stopPrice
    trailingStopPercent
    stopTriggerType
    error
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
    leverage
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
export const BasicGroupSubscriptionDetailsFragmentDoc = gql`
  fragment BasicGroupSubscriptionDetails on GroupSubscription {
    id
    price
    active
    duration
    memberCount
    description
    createdAt
    updatedAt
  }
`
export const FullGroupSubscriptionDetailsFragmentDoc = gql`
  fragment FullGroupSubscriptionDetails on GroupSubscription {
    memberCount
    ...BasicGroupSubscriptionDetails
  }
  ${BasicGroupSubscriptionDetailsFragmentDoc}
`
export const GroupDetailsFragmentDoc = gql`
  fragment GroupDetails on Group {
    id
    name
    description
    active
  }
`
export const SubscriptionInvoiceDetailsFragmentDoc = gql`
  fragment SubscriptionInvoiceDetails on SubscriptionInvoice {
    id
    email
    usdPrice
    btcPaid
    btcPrice
    status
    remoteId
    token
    periodStart
    periodEnd
    expiresAt
    createdAt
    updatedAt
  }
`
export const MemberSubscriptionDetailsFragmentDoc = gql`
  fragment MemberSubscriptionDetails on MemberSubscription {
    id
    active
    recurring
    startDate
    endDate
    createdAt
    updatedAt
    groupSubscription {
      id
      active
      price
      duration
    }
    pendingInvoice {
      ...SubscriptionInvoiceDetails
    }
    invoices {
      ...SubscriptionInvoiceDetails
    }
  }
  ${SubscriptionInvoiceDetailsFragmentDoc}
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
    subscription {
      ...MemberSubscriptionDetails
    }
  }
  ${MemberSubscriptionDetailsFragmentDoc}
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
    leverage
    createdAt
  }
`
export const PlatformFeeDetailsFragmentDoc = gql`
  fragment PlatformFeeDetails on PlatformFee {
    id
    price
    active
    createdAt
    updatedAt
  }
`
export const ActivateMemberSubscriptionDocument = gql`
  mutation ActivateMemberSubscription($input: ActivateMemberSubscriptionInput!) {
    activateMemberSubscription(input: $input) {
      success
      error
    }
  }
`
export type ActivateMemberSubscriptionMutationFn = Apollo.MutationFunction<
  ActivateMemberSubscriptionMutation,
  ActivateMemberSubscriptionMutationVariables
>

/**
 * __useActivateMemberSubscriptionMutation__
 *
 * To run a mutation, you first call `useActivateMemberSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateMemberSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateMemberSubscriptionMutation, { data, loading, error }] = useActivateMemberSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateMemberSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ActivateMemberSubscriptionMutation,
    ActivateMemberSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    ActivateMemberSubscriptionMutation,
    ActivateMemberSubscriptionMutationVariables
  >(ActivateMemberSubscriptionDocument, baseOptions)
}
export type ActivateMemberSubscriptionMutationHookResult = ReturnType<
  typeof useActivateMemberSubscriptionMutation
>
export type ActivateMemberSubscriptionMutationResult = Apollo.MutationResult<
  ActivateMemberSubscriptionMutation
>
export type ActivateMemberSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  ActivateMemberSubscriptionMutation,
  ActivateMemberSubscriptionMutationVariables
>
export const CancelMemberSubscriptionDocument = gql`
  mutation CancelMemberSubscription($input: CancelMemberSubscriptionInput!) {
    cancelMemberSubscription(input: $input) {
      success
      error
    }
  }
`
export type CancelMemberSubscriptionMutationFn = Apollo.MutationFunction<
  CancelMemberSubscriptionMutation,
  CancelMemberSubscriptionMutationVariables
>

/**
 * __useCancelMemberSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelMemberSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMemberSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMemberSubscriptionMutation, { data, loading, error }] = useCancelMemberSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelMemberSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelMemberSubscriptionMutation,
    CancelMemberSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    CancelMemberSubscriptionMutation,
    CancelMemberSubscriptionMutationVariables
  >(CancelMemberSubscriptionDocument, baseOptions)
}
export type CancelMemberSubscriptionMutationHookResult = ReturnType<
  typeof useCancelMemberSubscriptionMutation
>
export type CancelMemberSubscriptionMutationResult = Apollo.MutationResult<
  CancelMemberSubscriptionMutation
>
export type CancelMemberSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  CancelMemberSubscriptionMutation,
  CancelMemberSubscriptionMutationVariables
>
export const CancelOrderDocument = gql`
  mutation CancelOrder($input: CancelOrderInput!) {
    cancelOrder(input: $input) {
      success
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
export const CancelOrderSetDocument = gql`
  mutation CancelOrderSet($input: CancelOrderSetInput!) {
    cancelOrderSet(input: $input) {
      success
      error
    }
  }
`
export type CancelOrderSetMutationFn = Apollo.MutationFunction<
  CancelOrderSetMutation,
  CancelOrderSetMutationVariables
>

/**
 * __useCancelOrderSetMutation__
 *
 * To run a mutation, you first call `useCancelOrderSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderSetMutation, { data, loading, error }] = useCancelOrderSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelOrderSetMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelOrderSetMutation, CancelOrderSetMutationVariables>,
) {
  return Apollo.useMutation<CancelOrderSetMutation, CancelOrderSetMutationVariables>(
    CancelOrderSetDocument,
    baseOptions,
  )
}
export type CancelOrderSetMutationHookResult = ReturnType<typeof useCancelOrderSetMutation>
export type CancelOrderSetMutationResult = Apollo.MutationResult<CancelOrderSetMutation>
export type CancelOrderSetMutationOptions = Apollo.BaseMutationOptions<
  CancelOrderSetMutation,
  CancelOrderSetMutationVariables
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
      membershipId
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
export const CreateGroupSubscriptionDocument = gql`
  mutation CreateGroupSubscription($input: CreateGroupSubscriptionInput!) {
    createGroupSubscription(input: $input) {
      success
      error
    }
  }
`
export type CreateGroupSubscriptionMutationFn = Apollo.MutationFunction<
  CreateGroupSubscriptionMutation,
  CreateGroupSubscriptionMutationVariables
>

/**
 * __useCreateGroupSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateGroupSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupSubscriptionMutation, { data, loading, error }] = useCreateGroupSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupSubscriptionMutation,
    CreateGroupSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateGroupSubscriptionMutation,
    CreateGroupSubscriptionMutationVariables
  >(CreateGroupSubscriptionDocument, baseOptions)
}
export type CreateGroupSubscriptionMutationHookResult = ReturnType<
  typeof useCreateGroupSubscriptionMutation
>
export type CreateGroupSubscriptionMutationResult = Apollo.MutationResult<
  CreateGroupSubscriptionMutation
>
export type CreateGroupSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupSubscriptionMutation,
  CreateGroupSubscriptionMutationVariables
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
export const DeleteGroupSubscriptionDocument = gql`
  mutation DeleteGroupSubscription($input: DeleteGroupSubscriptionInput!) {
    deleteGroupSubscription(input: $input) {
      success
      error
    }
  }
`
export type DeleteGroupSubscriptionMutationFn = Apollo.MutationFunction<
  DeleteGroupSubscriptionMutation,
  DeleteGroupSubscriptionMutationVariables
>

/**
 * __useDeleteGroupSubscriptionMutation__
 *
 * To run a mutation, you first call `useDeleteGroupSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupSubscriptionMutation, { data, loading, error }] = useDeleteGroupSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteGroupSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupSubscriptionMutation,
    DeleteGroupSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    DeleteGroupSubscriptionMutation,
    DeleteGroupSubscriptionMutationVariables
  >(DeleteGroupSubscriptionDocument, baseOptions)
}
export type DeleteGroupSubscriptionMutationHookResult = ReturnType<
  typeof useDeleteGroupSubscriptionMutation
>
export type DeleteGroupSubscriptionMutationResult = Apollo.MutationResult<
  DeleteGroupSubscriptionMutation
>
export type DeleteGroupSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupSubscriptionMutation,
  DeleteGroupSubscriptionMutationVariables
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
export const JoinGroupDocument = gql`
  mutation JoinGroup($input: JoinGroupInput!) {
    joinGroup(input: $input) {
      membershipId
      error
    }
  }
`
export type JoinGroupMutationFn = Apollo.MutationFunction<
  JoinGroupMutation,
  JoinGroupMutationVariables
>

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>,
) {
  return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(
    JoinGroupDocument,
    baseOptions,
  )
}
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<
  JoinGroupMutation,
  JoinGroupMutationVariables
>
export const PayMemberSubscriptionDocument = gql`
  mutation PayMemberSubscription($input: PayMemberSubscriptionInput!) {
    payMemberSubscription(input: $input) {
      invoiceId
      error
    }
  }
`
export type PayMemberSubscriptionMutationFn = Apollo.MutationFunction<
  PayMemberSubscriptionMutation,
  PayMemberSubscriptionMutationVariables
>

/**
 * __usePayMemberSubscriptionMutation__
 *
 * To run a mutation, you first call `usePayMemberSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayMemberSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payMemberSubscriptionMutation, { data, loading, error }] = usePayMemberSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayMemberSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PayMemberSubscriptionMutation,
    PayMemberSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<PayMemberSubscriptionMutation, PayMemberSubscriptionMutationVariables>(
    PayMemberSubscriptionDocument,
    baseOptions,
  )
}
export type PayMemberSubscriptionMutationHookResult = ReturnType<
  typeof usePayMemberSubscriptionMutation
>
export type PayMemberSubscriptionMutationResult = Apollo.MutationResult<
  PayMemberSubscriptionMutation
>
export type PayMemberSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  PayMemberSubscriptionMutation,
  PayMemberSubscriptionMutationVariables
>
export const RequestGroupAccessDocument = gql`
  mutation RequestGroupAccess($input: RequestGroupAccessInput!) {
    requestGroupAccess(input: $input) {
      id
    }
  }
`
export type RequestGroupAccessMutationFn = Apollo.MutationFunction<
  RequestGroupAccessMutation,
  RequestGroupAccessMutationVariables
>

/**
 * __useRequestGroupAccessMutation__
 *
 * To run a mutation, you first call `useRequestGroupAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestGroupAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestGroupAccessMutation, { data, loading, error }] = useRequestGroupAccessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestGroupAccessMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestGroupAccessMutation,
    RequestGroupAccessMutationVariables
  >,
) {
  return Apollo.useMutation<RequestGroupAccessMutation, RequestGroupAccessMutationVariables>(
    RequestGroupAccessDocument,
    baseOptions,
  )
}
export type RequestGroupAccessMutationHookResult = ReturnType<typeof useRequestGroupAccessMutation>
export type RequestGroupAccessMutationResult = Apollo.MutationResult<RequestGroupAccessMutation>
export type RequestGroupAccessMutationOptions = Apollo.BaseMutationOptions<
  RequestGroupAccessMutation,
  RequestGroupAccessMutationVariables
>
export const ResetPaymentDocument = gql`
  mutation ResetPayment($input: ResetPaymentInput!) {
    resetPayment(input: $input) {
      error
    }
  }
`
export type ResetPaymentMutationFn = Apollo.MutationFunction<
  ResetPaymentMutation,
  ResetPaymentMutationVariables
>

/**
 * __useResetPaymentMutation__
 *
 * To run a mutation, you first call `useResetPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPaymentMutation, { data, loading, error }] = useResetPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetPaymentMutation, ResetPaymentMutationVariables>,
) {
  return Apollo.useMutation<ResetPaymentMutation, ResetPaymentMutationVariables>(
    ResetPaymentDocument,
    baseOptions,
  )
}
export type ResetPaymentMutationHookResult = ReturnType<typeof useResetPaymentMutation>
export type ResetPaymentMutationResult = Apollo.MutationResult<ResetPaymentMutation>
export type ResetPaymentMutationOptions = Apollo.BaseMutationOptions<
  ResetPaymentMutation,
  ResetPaymentMutationVariables
>
export const SwitchSubscriptionOptionDocument = gql`
  mutation SwitchSubscriptionOption($input: SwitchSubscriptionOptionInput!) {
    switchSubscriptionOption(input: $input) {
      success
      error
    }
  }
`
export type SwitchSubscriptionOptionMutationFn = Apollo.MutationFunction<
  SwitchSubscriptionOptionMutation,
  SwitchSubscriptionOptionMutationVariables
>

/**
 * __useSwitchSubscriptionOptionMutation__
 *
 * To run a mutation, you first call `useSwitchSubscriptionOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchSubscriptionOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchSubscriptionOptionMutation, { data, loading, error }] = useSwitchSubscriptionOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSwitchSubscriptionOptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SwitchSubscriptionOptionMutation,
    SwitchSubscriptionOptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    SwitchSubscriptionOptionMutation,
    SwitchSubscriptionOptionMutationVariables
  >(SwitchSubscriptionOptionDocument, baseOptions)
}
export type SwitchSubscriptionOptionMutationHookResult = ReturnType<
  typeof useSwitchSubscriptionOptionMutation
>
export type SwitchSubscriptionOptionMutationResult = Apollo.MutationResult<
  SwitchSubscriptionOptionMutation
>
export type SwitchSubscriptionOptionMutationOptions = Apollo.BaseMutationOptions<
  SwitchSubscriptionOptionMutation,
  SwitchSubscriptionOptionMutationVariables
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
export const ToggleSubscriptionActiveDocument = gql`
  mutation ToggleSubscriptionActive($input: ToggleSubscriptionActiveInput!) {
    toggleSubscriptionActive(input: $input) {
      success
      error
    }
  }
`
export type ToggleSubscriptionActiveMutationFn = Apollo.MutationFunction<
  ToggleSubscriptionActiveMutation,
  ToggleSubscriptionActiveMutationVariables
>

/**
 * __useToggleSubscriptionActiveMutation__
 *
 * To run a mutation, you first call `useToggleSubscriptionActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSubscriptionActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSubscriptionActiveMutation, { data, loading, error }] = useToggleSubscriptionActiveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleSubscriptionActiveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleSubscriptionActiveMutation,
    ToggleSubscriptionActiveMutationVariables
  >,
) {
  return Apollo.useMutation<
    ToggleSubscriptionActiveMutation,
    ToggleSubscriptionActiveMutationVariables
  >(ToggleSubscriptionActiveDocument, baseOptions)
}
export type ToggleSubscriptionActiveMutationHookResult = ReturnType<
  typeof useToggleSubscriptionActiveMutation
>
export type ToggleSubscriptionActiveMutationResult = Apollo.MutationResult<
  ToggleSubscriptionActiveMutation
>
export type ToggleSubscriptionActiveMutationOptions = Apollo.BaseMutationOptions<
  ToggleSubscriptionActiveMutation,
  ToggleSubscriptionActiveMutationVariables
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
export const UpdateGroupDescriptionDocument = gql`
  mutation UpdateGroupDescription($input: UpdateGroupDescriptionInput!) {
    updateGroupDescription(input: $input) {
      description
    }
  }
`
export type UpdateGroupDescriptionMutationFn = Apollo.MutationFunction<
  UpdateGroupDescriptionMutation,
  UpdateGroupDescriptionMutationVariables
>

/**
 * __useUpdateGroupDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateGroupDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupDescriptionMutation, { data, loading, error }] = useUpdateGroupDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupDescriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupDescriptionMutation,
    UpdateGroupDescriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateGroupDescriptionMutation,
    UpdateGroupDescriptionMutationVariables
  >(UpdateGroupDescriptionDocument, baseOptions)
}
export type UpdateGroupDescriptionMutationHookResult = ReturnType<
  typeof useUpdateGroupDescriptionMutation
>
export type UpdateGroupDescriptionMutationResult = Apollo.MutationResult<
  UpdateGroupDescriptionMutation
>
export type UpdateGroupDescriptionMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupDescriptionMutation,
  UpdateGroupDescriptionMutationVariables
>
export const UpdateGroupSubscriptionDocument = gql`
  mutation UpdateGroupSubscription($input: UpdateGroupSubscriptionInput!) {
    updateGroupSubscription(input: $input) {
      success
      error
    }
  }
`
export type UpdateGroupSubscriptionMutationFn = Apollo.MutationFunction<
  UpdateGroupSubscriptionMutation,
  UpdateGroupSubscriptionMutationVariables
>

/**
 * __useUpdateGroupSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpdateGroupSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupSubscriptionMutation, { data, loading, error }] = useUpdateGroupSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupSubscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupSubscriptionMutation,
    UpdateGroupSubscriptionMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateGroupSubscriptionMutation,
    UpdateGroupSubscriptionMutationVariables
  >(UpdateGroupSubscriptionDocument, baseOptions)
}
export type UpdateGroupSubscriptionMutationHookResult = ReturnType<
  typeof useUpdateGroupSubscriptionMutation
>
export type UpdateGroupSubscriptionMutationResult = Apollo.MutationResult<
  UpdateGroupSubscriptionMutation
>
export type UpdateGroupSubscriptionMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupSubscriptionMutation,
  UpdateGroupSubscriptionMutationVariables
>
export const UpdateMembershipRoleDocument = gql`
  mutation UpdateMembershipRole($input: UpdateMembershipRoleInput!) {
    updateMembershipRole(input: $input) {
      id
      role
    }
  }
`
export type UpdateMembershipRoleMutationFn = Apollo.MutationFunction<
  UpdateMembershipRoleMutation,
  UpdateMembershipRoleMutationVariables
>

/**
 * __useUpdateMembershipRoleMutation__
 *
 * To run a mutation, you first call `useUpdateMembershipRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMembershipRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMembershipRoleMutation, { data, loading, error }] = useUpdateMembershipRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMembershipRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMembershipRoleMutation,
    UpdateMembershipRoleMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateMembershipRoleMutation, UpdateMembershipRoleMutationVariables>(
    UpdateMembershipRoleDocument,
    baseOptions,
  )
}
export type UpdateMembershipRoleMutationHookResult = ReturnType<
  typeof useUpdateMembershipRoleMutation
>
export type UpdateMembershipRoleMutationResult = Apollo.MutationResult<UpdateMembershipRoleMutation>
export type UpdateMembershipRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateMembershipRoleMutation,
  UpdateMembershipRoleMutationVariables
>
export const UpdateMembershipStatusDocument = gql`
  mutation UpdateMembershipStatus($input: UpdateMembershipStatusInput!) {
    updateMembershipStatus(input: $input) {
      id
      status
    }
  }
`
export type UpdateMembershipStatusMutationFn = Apollo.MutationFunction<
  UpdateMembershipStatusMutation,
  UpdateMembershipStatusMutationVariables
>

/**
 * __useUpdateMembershipStatusMutation__
 *
 * To run a mutation, you first call `useUpdateMembershipStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMembershipStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMembershipStatusMutation, { data, loading, error }] = useUpdateMembershipStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMembershipStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMembershipStatusMutation,
    UpdateMembershipStatusMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateMembershipStatusMutation,
    UpdateMembershipStatusMutationVariables
  >(UpdateMembershipStatusDocument, baseOptions)
}
export type UpdateMembershipStatusMutationHookResult = ReturnType<
  typeof useUpdateMembershipStatusMutation
>
export type UpdateMembershipStatusMutationResult = Apollo.MutationResult<
  UpdateMembershipStatusMutation
>
export type UpdateMembershipStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateMembershipStatusMutation,
  UpdateMembershipStatusMutationVariables
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
      success
      error
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
export const VerifySignUpCodeDocument = gql`
  mutation VerifySignUpCode($input: VerifySignUpCodeInput!) {
    verifySignUpCode(input: $input) {
      success
      error
    }
  }
`
export type VerifySignUpCodeMutationFn = Apollo.MutationFunction<
  VerifySignUpCodeMutation,
  VerifySignUpCodeMutationVariables
>

/**
 * __useVerifySignUpCodeMutation__
 *
 * To run a mutation, you first call `useVerifySignUpCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifySignUpCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifySignUpCodeMutation, { data, loading, error }] = useVerifySignUpCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifySignUpCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifySignUpCodeMutation,
    VerifySignUpCodeMutationVariables
  >,
) {
  return Apollo.useMutation<VerifySignUpCodeMutation, VerifySignUpCodeMutationVariables>(
    VerifySignUpCodeDocument,
    baseOptions,
  )
}
export type VerifySignUpCodeMutationHookResult = ReturnType<typeof useVerifySignUpCodeMutation>
export type VerifySignUpCodeMutationResult = Apollo.MutationResult<VerifySignUpCodeMutation>
export type VerifySignUpCodeMutationOptions = Apollo.BaseMutationOptions<
  VerifySignUpCodeMutation,
  VerifySignUpCodeMutationVariables
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
export const GetActivePlatformFeeDocument = gql`
  query GetActivePlatformFee {
    activePlatformFee {
      ...PlatformFeeDetails
    }
  }
  ${PlatformFeeDetailsFragmentDoc}
`

/**
 * __useGetActivePlatformFeeQuery__
 *
 * To run a query within a React component, call `useGetActivePlatformFeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivePlatformFeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivePlatformFeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivePlatformFeeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetActivePlatformFeeQuery,
    GetActivePlatformFeeQueryVariables
  >,
) {
  return Apollo.useQuery<GetActivePlatformFeeQuery, GetActivePlatformFeeQueryVariables>(
    GetActivePlatformFeeDocument,
    baseOptions,
  )
}
export function useGetActivePlatformFeeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActivePlatformFeeQuery,
    GetActivePlatformFeeQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetActivePlatformFeeQuery, GetActivePlatformFeeQueryVariables>(
    GetActivePlatformFeeDocument,
    baseOptions,
  )
}
export type GetActivePlatformFeeQueryHookResult = ReturnType<typeof useGetActivePlatformFeeQuery>
export type GetActivePlatformFeeLazyQueryHookResult = ReturnType<
  typeof useGetActivePlatformFeeLazyQuery
>
export type GetActivePlatformFeeQueryResult = Apollo.QueryResult<
  GetActivePlatformFeeQuery,
  GetActivePlatformFeeQueryVariables
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
export const GetBasicGroupSubscriptionOptionsDocument = gql`
  query GetBasicGroupSubscriptionOptions($input: GroupInput!) {
    group(input: $input) {
      id
      subscriptionOptions {
        ...BasicGroupSubscriptionDetails
      }
    }
  }
  ${BasicGroupSubscriptionDetailsFragmentDoc}
`

/**
 * __useGetBasicGroupSubscriptionOptionsQuery__
 *
 * To run a query within a React component, call `useGetBasicGroupSubscriptionOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBasicGroupSubscriptionOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBasicGroupSubscriptionOptionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBasicGroupSubscriptionOptionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBasicGroupSubscriptionOptionsQuery,
    GetBasicGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetBasicGroupSubscriptionOptionsQuery,
    GetBasicGroupSubscriptionOptionsQueryVariables
  >(GetBasicGroupSubscriptionOptionsDocument, baseOptions)
}
export function useGetBasicGroupSubscriptionOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBasicGroupSubscriptionOptionsQuery,
    GetBasicGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetBasicGroupSubscriptionOptionsQuery,
    GetBasicGroupSubscriptionOptionsQueryVariables
  >(GetBasicGroupSubscriptionOptionsDocument, baseOptions)
}
export type GetBasicGroupSubscriptionOptionsQueryHookResult = ReturnType<
  typeof useGetBasicGroupSubscriptionOptionsQuery
>
export type GetBasicGroupSubscriptionOptionsLazyQueryHookResult = ReturnType<
  typeof useGetBasicGroupSubscriptionOptionsLazyQuery
>
export type GetBasicGroupSubscriptionOptionsQueryResult = Apollo.QueryResult<
  GetBasicGroupSubscriptionOptionsQuery,
  GetBasicGroupSubscriptionOptionsQueryVariables
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
export const GetCurrenciesBasicDocument = gql`
  query GetCurrenciesBasic {
    bitmexCurrencies {
      ...BitmexCurrencyDetails
    }
  }
  ${BitmexCurrencyDetailsFragmentDoc}
`

/**
 * __useGetCurrenciesBasicQuery__
 *
 * To run a query within a React component, call `useGetCurrenciesBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrenciesBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrenciesBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrenciesBasicQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCurrenciesBasicQuery, GetCurrenciesBasicQueryVariables>,
) {
  return Apollo.useQuery<GetCurrenciesBasicQuery, GetCurrenciesBasicQueryVariables>(
    GetCurrenciesBasicDocument,
    baseOptions,
  )
}
export function useGetCurrenciesBasicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrenciesBasicQuery,
    GetCurrenciesBasicQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetCurrenciesBasicQuery, GetCurrenciesBasicQueryVariables>(
    GetCurrenciesBasicDocument,
    baseOptions,
  )
}
export type GetCurrenciesBasicQueryHookResult = ReturnType<typeof useGetCurrenciesBasicQuery>
export type GetCurrenciesBasicLazyQueryHookResult = ReturnType<
  typeof useGetCurrenciesBasicLazyQuery
>
export type GetCurrenciesBasicQueryResult = Apollo.QueryResult<
  GetCurrenciesBasicQuery,
  GetCurrenciesBasicQueryVariables
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
export const GetFullGroupSubscriptionOptionsDocument = gql`
  query GetFullGroupSubscriptionOptions($input: GroupInput!) {
    group(input: $input) {
      id
      subscriptionOptions {
        ...FullGroupSubscriptionDetails
      }
    }
  }
  ${FullGroupSubscriptionDetailsFragmentDoc}
`

/**
 * __useGetFullGroupSubscriptionOptionsQuery__
 *
 * To run a query within a React component, call `useGetFullGroupSubscriptionOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFullGroupSubscriptionOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFullGroupSubscriptionOptionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFullGroupSubscriptionOptionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFullGroupSubscriptionOptionsQuery,
    GetFullGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetFullGroupSubscriptionOptionsQuery,
    GetFullGroupSubscriptionOptionsQueryVariables
  >(GetFullGroupSubscriptionOptionsDocument, baseOptions)
}
export function useGetFullGroupSubscriptionOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFullGroupSubscriptionOptionsQuery,
    GetFullGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetFullGroupSubscriptionOptionsQuery,
    GetFullGroupSubscriptionOptionsQueryVariables
  >(GetFullGroupSubscriptionOptionsDocument, baseOptions)
}
export type GetFullGroupSubscriptionOptionsQueryHookResult = ReturnType<
  typeof useGetFullGroupSubscriptionOptionsQuery
>
export type GetFullGroupSubscriptionOptionsLazyQueryHookResult = ReturnType<
  typeof useGetFullGroupSubscriptionOptionsLazyQuery
>
export type GetFullGroupSubscriptionOptionsQueryResult = Apollo.QueryResult<
  GetFullGroupSubscriptionOptionsQuery,
  GetFullGroupSubscriptionOptionsQueryVariables
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
  query GetGroupExchangeAccounts(
    $groupInput: GroupInput!
    $exchangeAccountsInput: MemberExchangeAccountsInput
  ) {
    group(input: $groupInput) {
      id
      members {
        members {
          id
          member {
            id
            username
          }
          exchangeAccounts(input: $exchangeAccountsInput) {
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
 *      exchangeAccountsInput: // value for 'exchangeAccountsInput'
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
    $ordersInput: OrderSetOrdersInput!
  ) {
    group(input: $groupInput) {
      id
      orderSet(input: $orderSetInput) {
        ...OrderSetDetails
        orders(input: $ordersInput) {
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
 *      ordersInput: // value for 'ordersInput'
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
export const GetGroupStatsDocument = gql`
  query GetGroupStats($input: GroupInput!) {
    group(input: $input) {
      id
      orderSets {
        totalCount
      }
      members {
        totalCount
      }
    }
  }
`

/**
 * __useGetGroupStatsQuery__
 *
 * To run a query within a React component, call `useGetGroupStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetGroupStatsQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupStatsQuery, GetGroupStatsQueryVariables>,
) {
  return Apollo.useQuery<GetGroupStatsQuery, GetGroupStatsQueryVariables>(
    GetGroupStatsDocument,
    baseOptions,
  )
}
export function useGetGroupStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupStatsQuery, GetGroupStatsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetGroupStatsQuery, GetGroupStatsQueryVariables>(
    GetGroupStatsDocument,
    baseOptions,
  )
}
export type GetGroupStatsQueryHookResult = ReturnType<typeof useGetGroupStatsQuery>
export type GetGroupStatsLazyQueryHookResult = ReturnType<typeof useGetGroupStatsLazyQuery>
export type GetGroupStatsQueryResult = Apollo.QueryResult<
  GetGroupStatsQuery,
  GetGroupStatsQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      username
      userType
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
export const GetMyGroupDocument = gql`
  query GetMyGroup {
    myGroup {
      ...GroupDetails
      subscriptionOptions {
        ...FullGroupSubscriptionDetails
      }
    }
  }
  ${GroupDetailsFragmentDoc}
  ${FullGroupSubscriptionDetailsFragmentDoc}
`

/**
 * __useGetMyGroupQuery__
 *
 * To run a query within a React component, call `useGetMyGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyGroupQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyGroupQuery, GetMyGroupQueryVariables>,
) {
  return Apollo.useQuery<GetMyGroupQuery, GetMyGroupQueryVariables>(GetMyGroupDocument, baseOptions)
}
export function useGetMyGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyGroupQuery, GetMyGroupQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMyGroupQuery, GetMyGroupQueryVariables>(
    GetMyGroupDocument,
    baseOptions,
  )
}
export type GetMyGroupQueryHookResult = ReturnType<typeof useGetMyGroupQuery>
export type GetMyGroupLazyQueryHookResult = ReturnType<typeof useGetMyGroupLazyQuery>
export type GetMyGroupQueryResult = Apollo.QueryResult<GetMyGroupQuery, GetMyGroupQueryVariables>
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
export const GetMyGroupSubscriptionOptionsDocument = gql`
  query GetMyGroupSubscriptionOptions {
    myGroup {
      id
      subscriptionOptions {
        ...FullGroupSubscriptionDetails
      }
    }
  }
  ${FullGroupSubscriptionDetailsFragmentDoc}
`

/**
 * __useGetMyGroupSubscriptionOptionsQuery__
 *
 * To run a query within a React component, call `useGetMyGroupSubscriptionOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyGroupSubscriptionOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyGroupSubscriptionOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyGroupSubscriptionOptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyGroupSubscriptionOptionsQuery,
    GetMyGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useQuery<
    GetMyGroupSubscriptionOptionsQuery,
    GetMyGroupSubscriptionOptionsQueryVariables
  >(GetMyGroupSubscriptionOptionsDocument, baseOptions)
}
export function useGetMyGroupSubscriptionOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyGroupSubscriptionOptionsQuery,
    GetMyGroupSubscriptionOptionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    GetMyGroupSubscriptionOptionsQuery,
    GetMyGroupSubscriptionOptionsQueryVariables
  >(GetMyGroupSubscriptionOptionsDocument, baseOptions)
}
export type GetMyGroupSubscriptionOptionsQueryHookResult = ReturnType<
  typeof useGetMyGroupSubscriptionOptionsQuery
>
export type GetMyGroupSubscriptionOptionsLazyQueryHookResult = ReturnType<
  typeof useGetMyGroupSubscriptionOptionsLazyQuery
>
export type GetMyGroupSubscriptionOptionsQueryResult = Apollo.QueryResult<
  GetMyGroupSubscriptionOptionsQuery,
  GetMyGroupSubscriptionOptionsQueryVariables
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
export const GetMyOrdersDocument = gql`
  query GetMyOrders($ordersInput: MemberOrdersInput!) {
    me {
      id
      memberships {
        id
        group {
          id
          name
        }
        orders(input: $ordersInput) {
          totalCount
          orders {
            ...OrderDetails
          }
        }
      }
    }
  }
  ${OrderDetailsFragmentDoc}
`

/**
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *      ordersInput: // value for 'ordersInput'
 *   },
 * });
 */
export function useGetMyOrdersQuery(
  baseOptions: Apollo.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>,
) {
  return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(
    GetMyOrdersDocument,
    baseOptions,
  )
}
export function useGetMyOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(
    GetMyOrdersDocument,
    baseOptions,
  )
}
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>
export type GetMyOrdersQueryResult = Apollo.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>
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
export const GetPendingMemberRequestsDocument = gql`
  query GetPendingMemberRequests($groupInput: GroupInput!, $membersInput: GroupMembersInput!) {
    group(input: $groupInput) {
      id
      members(input: $membersInput) {
        totalCount
        members {
          id
          member {
            id
            username
          }
        }
      }
    }
  }
`

/**
 * __useGetPendingMemberRequestsQuery__
 *
 * To run a query within a React component, call `useGetPendingMemberRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingMemberRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingMemberRequestsQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *      membersInput: // value for 'membersInput'
 *   },
 * });
 */
export function useGetPendingMemberRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPendingMemberRequestsQuery,
    GetPendingMemberRequestsQueryVariables
  >,
) {
  return Apollo.useQuery<GetPendingMemberRequestsQuery, GetPendingMemberRequestsQueryVariables>(
    GetPendingMemberRequestsDocument,
    baseOptions,
  )
}
export function useGetPendingMemberRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPendingMemberRequestsQuery,
    GetPendingMemberRequestsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetPendingMemberRequestsQuery, GetPendingMemberRequestsQueryVariables>(
    GetPendingMemberRequestsDocument,
    baseOptions,
  )
}
export type GetPendingMemberRequestsQueryHookResult = ReturnType<
  typeof useGetPendingMemberRequestsQuery
>
export type GetPendingMemberRequestsLazyQueryHookResult = ReturnType<
  typeof useGetPendingMemberRequestsLazyQuery
>
export type GetPendingMemberRequestsQueryResult = Apollo.QueryResult<
  GetPendingMemberRequestsQuery,
  GetPendingMemberRequestsQueryVariables
>
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
