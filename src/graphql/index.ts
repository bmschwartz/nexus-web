import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
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

export type DeleteMembershipInput = {
  membershipId: Scalars['ID']
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
  memberships: Array<GroupMembership>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  orderSets: GroupOrderSets
  orderSet?: Maybe<OrderSet>
  positions: GroupPositions
  position?: Maybe<Position>
}

export type GroupOrderSetsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type GroupOrderSetArgs = {
  input: OrderSetInput
}

export type GroupPositionsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type GroupPositionArgs = {
  input: PositionInput
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
  orders: MemberOrders
  positions: MemberPositions
  exchangeAccounts: Array<ExchangeAccount>
}

export type GroupMembershipOrdersArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type GroupMembershipPositionsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type GroupMembersInput = {
  groupId: Scalars['ID']
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
  tickSize?: Maybe<Scalars['Float']>
}

export type CancelOrderInput = {
  id: Scalars['String']
}

export type CancelOrderResponse = {
  __typename?: 'CancelOrderResponse'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type CancelOrderSetInput = {
  orderSetId: Scalars['ID']
}

export type CreateExchangeAccountInput = {
  exchange: Exchange
  membershipId: Scalars['ID']
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
}

export type CreateOrderSetInput = {
  groupId: Scalars['ID']
  membershipIds: Array<Scalars['ID']>
  symbol: Scalars['String']
  exchange: Exchange
  description?: Maybe<Scalars['String']>
  side: OrderSide
  orderType: OrderType
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
}

export type DeleteExchangeAccountInput = {
  id: Scalars['ID']
}

export type DeleteExchangeAccountResult = {
  __typename?: 'DeleteExchangeAccountResult'
  success: Scalars['Boolean']
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
  positions: Array<Position>
  membershipId: Scalars['ID']
  membership: GroupMembership
}

export type ExchangeAccountInput = {
  id: Scalars['ID']
}

export type ExchangeAccountsInput = {
  membershipId: Scalars['ID']
}

export type GroupOrderSets = {
  __typename?: 'GroupOrderSets'
  orderSets: Array<OrderSet>
  totalCount: Scalars['Int']
}

export type GroupPositions = {
  __typename?: 'GroupPositions'
  positions: Array<Position>
  totalCount: Scalars['Int']
}

export type MemberOrders = {
  __typename?: 'MemberOrders'
  orders: Array<Order>
  totalCount: Scalars['Int']
}

export type MemberPositions = {
  __typename?: 'MemberPositions'
  positions: Array<Position>
  totalCount: Scalars['Int']
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  orderSet: OrderSet
  side: OrderSide
  exchange: Exchange
  orderType: OrderType
  status: OrderStatus
  price?: Maybe<Scalars['Float']>
  quantity?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
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
  orders: OrderSetOrders
  percent: Scalars['Float']
  stopPrice?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type OrderSetOrdersArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OrderSetInput = {
  id: Scalars['ID']
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

export type ToggleExchangeAccountActiveInput = {
  id: Scalars['ID']
}

export type ToggleExchangeAccountActiveResult = {
  __typename?: 'ToggleExchangeAccountActiveResult'
  success: Scalars['Boolean']
}

export type UpdateExchangeAccountInput = {
  id: Scalars['ID']
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
}

export type UpdateExchangeAccountResult = {
  __typename?: 'UpdateExchangeAccountResult'
  success: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
}

export type UpdateOrderSetInput = {
  orderSetId: Scalars['ID']
  description: Scalars['String']
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
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
  binanceCurrencies: Array<BinanceCurrency>
  bitmexCurrencies: Array<BitmexCurrency>
  position?: Maybe<Position>
  exchangeAccount?: Maybe<ExchangeAccount>
  exchangeAccounts: Array<ExchangeAccount>
  me?: Maybe<User>
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

export type QueryPositionArgs = {
  input: PositionInput
}

export type QueryExchangeAccountArgs = {
  input: ExchangeAccountInput
}

export type QueryExchangeAccountsArgs = {
  input: ExchangeAccountsInput
}

export type Mutation = {
  __typename?: 'Mutation'
  createGroup?: Maybe<Group>
  renameGroup?: Maybe<Group>
  updateGroupDescription?: Maybe<Group>
  disableGroup?: Maybe<Group>
  requestGroupAccess?: Maybe<GroupMembership>
  createMembership?: Maybe<GroupMembership>
  updateMembershipRole?: Maybe<GroupMembership>
  updateMembershipStatus?: Maybe<GroupMembership>
  updateMembershipActive?: Maybe<GroupMembership>
  deleteMembership?: Maybe<GroupMembership>
  createOrderSet?: Maybe<OrderSet>
  updateOrderSet?: Maybe<OrderSet>
  cancelOrderSet?: Maybe<OrderSet>
  cancelOrder: CancelOrderResponse
  createExchangeAccount?: Maybe<ExchangeAccount>
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
  | 'tickSize'
>

export type ExchangeAccountDetailsFragment = { __typename?: 'ExchangeAccount' } & Pick<
  ExchangeAccount,
  'id' | 'active' | 'exchange' | 'createdAt'
> & {
    orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment>
    positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment>
  }

export type GroupDetailsFragment = { __typename?: 'Group' } & Pick<
  Group,
  'id' | 'name' | 'description' | 'active'
>

export type GroupMembershipDetailsFragment = { __typename?: 'GroupMembership' } & Pick<
  GroupMembership,
  'id' | 'active' | 'role' | 'status'
> & {
    member: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    group: { __typename?: 'Group' } & Pick<Group, 'id' | 'name'>
    exchangeAccounts: Array<{ __typename?: 'ExchangeAccount' } & ExchangeAccountDetailsFragment>
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
  | 'percent'
  | 'stopPrice'
  | 'description'
  | 'createdAt'
>

export type PositionDetailsFragment = { __typename?: 'Position' } & Pick<
  Position,
  'id' | 'side' | 'symbol' | 'exchange' | 'quantity' | 'avgPrice' | 'createdAt' | 'updatedAt'
>

export type CancelOrderMutationVariables = Exact<{
  input: CancelOrderInput
}>

export type CancelOrderMutation = { __typename?: 'Mutation' } & {
  cancelOrder: { __typename?: 'CancelOrderResponse' } & Pick<
    CancelOrderResponse,
    'success' | 'error'
  >
}

export type CreateExchangeAccountMutationVariables = Exact<{
  input: CreateExchangeAccountInput
}>

export type CreateExchangeAccountMutation = { __typename?: 'Mutation' } & {
  createExchangeAccount?: Maybe<{ __typename?: 'ExchangeAccount' } & Pick<ExchangeAccount, 'id'>>
}

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput
}>

export type CreateGroupMutation = { __typename?: 'Mutation' } & {
  createGroup?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'id'>>
}

export type CreateOrderSetMutationVariables = Exact<{
  input: CreateOrderSetInput
}>

export type CreateOrderSetMutation = { __typename?: 'Mutation' } & {
  createOrderSet?: Maybe<{ __typename?: 'OrderSet' } & Pick<OrderSet, 'id'>>
}

export type DeleteExchangeAccountMutationVariables = Exact<{
  input: DeleteExchangeAccountInput
}>

export type DeleteExchangeAccountMutation = { __typename?: 'Mutation' } & {
  deleteExchangeAccount: { __typename?: 'DeleteExchangeAccountResult' } & Pick<
    DeleteExchangeAccountResult,
    'success'
  >
}

export type ToggleExchangeAccountActiveMutationVariables = Exact<{
  input: ToggleExchangeAccountActiveInput
}>

export type ToggleExchangeAccountActiveMutation = { __typename?: 'Mutation' } & {
  toggleExchangeAccountActive: { __typename?: 'ToggleExchangeAccountActiveResult' } & Pick<
    ToggleExchangeAccountActiveResult,
    'success'
  >
}

export type UpdateExchangeAccountMutationVariables = Exact<{
  input: UpdateExchangeAccountInput
}>

export type UpdateExchangeAccountMutation = { __typename?: 'Mutation' } & {
  updateExchangeAccount: { __typename?: 'UpdateExchangeAccountResult' } & Pick<
    UpdateExchangeAccountResult,
    'success' | 'error'
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

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrenciesQuery = { __typename?: 'Query' } & {
  bitmexCurrencies: Array<{ __typename?: 'BitmexCurrency' } & BitmexCurrencyDetailsFragment>
  binanceCurrencies: Array<{ __typename?: 'BinanceCurrency' } & BinanceCurrencyDetailsFragment>
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
  group?: Maybe<
    { __typename?: 'Group' } & {
      memberships: Array<{ __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment>
    } & GroupDetailsFragment
  >
}

export type GetGroupOrderSetDetailsQueryVariables = Exact<{
  groupInput: GroupInput
  orderSetInput: OrderSetInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
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
                        > & {
                            member: { __typename?: 'User' } & Pick<User, 'username'>
                          }
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

export type GetGroupPositionDetailsQueryVariables = Exact<{
  groupInput: GroupInput
  positionInput: PositionInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetGroupPositionDetailsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        position?: Maybe<{ __typename?: 'Position' } & PositionDetailsFragment>
      }
  >
}

export type GetGroupPositionsQueryVariables = Exact<{
  input: GroupInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetGroupPositionsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        positions: { __typename?: 'GroupPositions' } & Pick<GroupPositions, 'totalCount'> & {
            positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment>
          }
      }
  >
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'admin' | 'username'>>
}

export type GetMemberOrdersQueryVariables = Exact<{
  input: MembershipInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetMemberOrdersQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
      orders: { __typename?: 'MemberOrders' } & Pick<MemberOrders, 'totalCount'> & {
          orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment>
        }
    }
}

export type GetMemberPositionsQueryVariables = Exact<{
  input: MembershipInput
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}>

export type GetMemberPositionsQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & Pick<GroupMembership, 'id'> & {
      positions: { __typename?: 'MemberPositions' } & Pick<MemberPositions, 'totalCount'> & {
          positions: Array<{ __typename?: 'Position' } & PositionDetailsFragment>
        }
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
    tickSize
  }
`
export const GroupDetailsFragmentDoc = gql`
  fragment GroupDetails on Group {
    id
    name
    description
    active
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
      ...PositionDetails
    }
  }
  ${OrderDetailsFragmentDoc}
  ${PositionDetailsFragmentDoc}
`
export const GroupMembershipDetailsFragmentDoc = gql`
  fragment GroupMembershipDetails on GroupMembership {
    id
    active
    role
    status
    member {
      id
      username
    }
    group {
      id
      name
    }
    exchangeAccounts {
      ...ExchangeAccountDetails
    }
  }
  ${ExchangeAccountDetailsFragmentDoc}
`
export const OrderSetDetailsFragmentDoc = gql`
  fragment OrderSetDetails on OrderSet {
    id
    exchange
    symbol
    price
    side
    orderType
    percent
    stopPrice
    description
    createdAt
  }
`
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
export const CreateExchangeAccountDocument = gql`
  mutation CreateExchangeAccount($input: CreateExchangeAccountInput!) {
    createExchangeAccount(input: $input) {
      id
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
export const CreateOrderSetDocument = gql`
  mutation CreateOrderSet($input: CreateOrderSetInput!) {
    createOrderSet(input: $input) {
      id
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
      success
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
export const ToggleExchangeAccountActiveDocument = gql`
  mutation ToggleExchangeAccountActive($input: ToggleExchangeAccountActiveInput!) {
    toggleExchangeAccountActive(input: $input) {
      success
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
      success
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
  baseOptions?: Apollo.QueryHookOptions<GetExchangeAccountQuery, GetExchangeAccountQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<
    GetExchangeAccountsQuery,
    GetExchangeAccountsQueryVariables
  >,
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
      memberships {
        ...GroupMembershipDetails
      }
    }
  }
  ${GroupDetailsFragmentDoc}
  ${GroupMembershipDetailsFragmentDoc}
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
  baseOptions?: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>,
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
export const GetGroupOrderSetDetailsDocument = gql`
  query GetGroupOrderSetDetails(
    $groupInput: GroupInput!
    $orderSetInput: OrderSetInput!
    $limit: Int
    $offset: Int
  ) {
    group(input: $groupInput) {
      id
      orderSet(input: $orderSetInput) {
        ...OrderSetDetails
        orders(limit: $limit, offset: $offset) {
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
 *   },
 * });
 */
export function useGetGroupOrderSetDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<
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
  baseOptions?: Apollo.QueryHookOptions<GetGroupOrderSetsQuery, GetGroupOrderSetsQueryVariables>,
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
export const GetGroupPositionDetailsDocument = gql`
  query GetGroupPositionDetails(
    $groupInput: GroupInput!
    $positionInput: PositionInput!
    $limit: Int
    $offset: Int
  ) {
    group(input: $groupInput) {
      id
      position(input: $positionInput) {
        ...PositionDetails
      }
    }
  }
  ${PositionDetailsFragmentDoc}
`

/**
 * __useGetGroupPositionDetailsQuery__
 *
 * To run a query within a React component, call `useGetGroupPositionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupPositionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupPositionDetailsQuery({
 *   variables: {
 *      groupInput: // value for 'groupInput'
 *      positionInput: // value for 'positionInput'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetGroupPositionDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGroupPositionDetailsQuery,
    GetGroupPositionDetailsQueryVariables
  >,
) {
  return Apollo.useQuery<GetGroupPositionDetailsQuery, GetGroupPositionDetailsQueryVariables>(
    GetGroupPositionDetailsDocument,
    baseOptions,
  )
}
export function useGetGroupPositionDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupPositionDetailsQuery,
    GetGroupPositionDetailsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<GetGroupPositionDetailsQuery, GetGroupPositionDetailsQueryVariables>(
    GetGroupPositionDetailsDocument,
    baseOptions,
  )
}
export type GetGroupPositionDetailsQueryHookResult = ReturnType<
  typeof useGetGroupPositionDetailsQuery
>
export type GetGroupPositionDetailsLazyQueryHookResult = ReturnType<
  typeof useGetGroupPositionDetailsLazyQuery
>
export type GetGroupPositionDetailsQueryResult = Apollo.QueryResult<
  GetGroupPositionDetailsQuery,
  GetGroupPositionDetailsQueryVariables
>
export const GetGroupPositionsDocument = gql`
  query GetGroupPositions($input: GroupInput!, $limit: Int, $offset: Int) {
    group(input: $input) {
      id
      positions(limit: $limit, offset: $offset) {
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
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetGroupPositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetGroupPositionsQuery, GetGroupPositionsQueryVariables>,
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
  query GetMemberOrders($input: MembershipInput!, $limit: Int, $offset: Int) {
    membership(input: $input) {
      id
      orders(limit: $limit, offset: $offset) {
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
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMemberOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberOrdersQuery, GetMemberOrdersQueryVariables>,
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
  query GetMemberPositions($input: MembershipInput!, $limit: Int, $offset: Int) {
    membership(input: $input) {
      id
      positions(limit: $limit, offset: $offset) {
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
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMemberPositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberPositionsQuery, GetMemberPositionsQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<GetMyMembershipQuery, GetMyMembershipQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<GetPositionQuery, GetPositionQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<GroupExistsQuery, GroupExistsQueryVariables>,
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
  baseOptions?: Apollo.QueryHookOptions<MyMembershipsQuery, MyMembershipsQueryVariables>,
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
