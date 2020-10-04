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
  exchangeAccounts: Array<ExchangeAccount>
}

export type GroupMembersInput = {
  groupId: Scalars['ID']
}

export type MembershipInput = {
  groupId: Scalars['ID']
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
  orderId: Scalars['String']
}

export type CreateExchangeAccountInput = {
  exchange: Exchange
  membershipId: Scalars['ID']
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
}

export type CreateOrderSetInput = {
  groupId: Scalars['ID']
  exchangeAccountIds: Array<Scalars['ID']>
  symbol: Scalars['String']
  exchange: Exchange
  description?: Maybe<Scalars['String']>
  side: OrderSide
  orderType: OrderType
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
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
  membership: GroupMembership
  apiKey: Scalars['String']
  apiSecret: Scalars['String']
  orders: Array<Order>
}

export type GroupOrderSets = {
  __typename?: 'GroupOrderSets'
  orderSets: Array<OrderSet>
  totalCount: Scalars['Int']
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  membership: GroupMembership
  orderSet: OrderSet
  side?: Maybe<OrderSide>
  orderType?: Maybe<OrderType>
  price?: Maybe<Scalars['Float']>
  quantity?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  symbol: Scalars['String']
  lastTimestamp: Scalars['DateTime']
}

export type OrderSet = {
  __typename?: 'OrderSet'
  id: Scalars['ID']
  exchange: Exchange
  symbol: Scalars['String']
  price?: Maybe<Scalars['Float']>
  side: OrderSide
  orderType: OrderType
  orders: Array<Order>
  percent: Scalars['Float']
  stopPrice?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type OrderSetInput = {
  id: Scalars['ID']
}

export enum OrderSide {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum OrderType {
  Market = 'MARKET',
  Limit = 'LIMIT',
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
  myMemberships?: Maybe<Array<GroupMembership>>
  groupMembers?: Maybe<Array<GroupMembership>>
  membershipRequests?: Maybe<Array<GroupMembership>>
  orderSet?: Maybe<OrderSet>
  binanceCurrencies: Array<BinanceCurrency>
  bitmexCurrencies: Array<BitmexCurrency>
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

export type QueryMyMembershipsArgs = {
  input?: Maybe<MyMembershipsInput>
}

export type QueryGroupMembersArgs = {
  input: GroupMembersInput
}

export type QueryMembershipRequestsArgs = {
  input: MembershipRequestsInput
}

export type QueryOrderSetArgs = {
  input: OrderSetInput
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
  cancelOrder?: Maybe<Order>
  createExchangeAccount?: Maybe<ExchangeAccount>
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

export type MutationCancelOrderArgs = {
  input: CancelOrderInput
}

export type MutationCreateExchangeAccountArgs = {
  input: CreateExchangeAccountInput
}

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationSignupUserArgs = {
  input: SignupUserInput
}

export type ExchangeAccountDetailsFragment = { __typename?: 'ExchangeAccount' } & Pick<
  ExchangeAccount,
  'id' | 'active' | 'exchange'
> & {
    orders: Array<{ __typename?: 'Order' } & OrderDetailsFragment>
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
  | 'price'
  | 'side'
  | 'symbol'
  | 'quantity'
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
  bitmexCurrencies: Array<
    { __typename?: 'BitmexCurrency' } & Pick<
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
  >
  binanceCurrencies: Array<
    { __typename?: 'BinanceCurrency' } & Pick<
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
  >
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
}>

export type GetGroupOrderSetDetailsQuery = { __typename?: 'Query' } & {
  group?: Maybe<
    { __typename?: 'Group' } & Pick<Group, 'id'> & {
        orderSet?: Maybe<
          { __typename?: 'OrderSet' } & {
            orders: Array<
              { __typename?: 'Order' } & {
                membership: { __typename?: 'GroupMembership' } & {
                  member: { __typename?: 'User' } & Pick<User, 'username'>
                }
              } & OrderDetailsFragment
            >
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

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'admin' | 'username'>>
}

export type GetMembershipQueryVariables = Exact<{
  input: MembershipInput
}>

export type GetMembershipQuery = { __typename?: 'Query' } & {
  membership: { __typename?: 'GroupMembership' } & GroupMembershipDetailsFragment
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
    price
    side
    symbol
    quantity
    stopPrice
    orderType
    createdAt
    updatedAt
  }
`
export const ExchangeAccountDetailsFragmentDoc = gql`
  fragment ExchangeAccountDetails on ExchangeAccount {
    id
    active
    exchange
    orders {
      ...OrderDetails
    }
  }
  ${OrderDetailsFragmentDoc}
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
      id
      symbol
      underlying
      active
      fractionalDigits
      lastPrice
      markPrice
      tickSize
    }
    binanceCurrencies {
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
  }
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
  query GetGroupOrderSetDetails($groupInput: GroupInput!, $orderSetInput: OrderSetInput!) {
    group(input: $groupInput) {
      id
      orderSet(input: $orderSetInput) {
        ...OrderSetDetails
        orders {
          ...OrderDetails
          membership {
            member {
              username
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
export const GetMembershipDocument = gql`
  query GetMembership($input: MembershipInput!) {
    membership(input: $input) {
      ...GroupMembershipDetails
    }
  }
  ${GroupMembershipDetailsFragmentDoc}
`

/**
 * __useGetMembershipQuery__
 *
 * To run a query within a React component, call `useGetMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembershipQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMembershipQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>,
) {
  return Apollo.useQuery<GetMembershipQuery, GetMembershipQueryVariables>(
    GetMembershipDocument,
    baseOptions,
  )
}
export function useGetMembershipLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembershipQuery, GetMembershipQueryVariables>,
) {
  return Apollo.useLazyQuery<GetMembershipQuery, GetMembershipQueryVariables>(
    GetMembershipDocument,
    baseOptions,
  )
}
export type GetMembershipQueryHookResult = ReturnType<typeof useGetMembershipQuery>
export type GetMembershipLazyQueryHookResult = ReturnType<typeof useGetMembershipLazyQuery>
export type GetMembershipQueryResult = Apollo.QueryResult<
  GetMembershipQuery,
  GetMembershipQueryVariables
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
