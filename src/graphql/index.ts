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
  orders: Array<Order>
}

export type GroupMembersInput = {
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
  symbol: Scalars['String']
  lastPrice?: Maybe<Scalars['Float']>
  openPrice?: Maybe<Scalars['Float']>
  highPrice?: Maybe<Scalars['Float']>
  lowPrice?: Maybe<Scalars['Float']>
  priceChange?: Maybe<Scalars['Float']>
  priceChangePercent?: Maybe<Scalars['Float']>
}

export type BitmexCurrency = {
  __typename?: 'BitmexCurrency'
  id: Scalars['ID']
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

export type CreateOrderSetInput = {
  groupId: Scalars['ID']
  description?: Maybe<Scalars['String']>
  side: OrderSide
  orderType: OrderType
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
  percent?: Maybe<Scalars['Float']>
}

export type GroupOrderSetsInput = {
  groupId: Scalars['ID']
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
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
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  orders: Array<Order>
  orderSide?: Maybe<OrderSide>
  orderType?: Maybe<OrderType>
  percent: Scalars['Float']
  price?: Maybe<Scalars['Float']>
  stopPrice?: Maybe<Scalars['Float']>
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
  myMemberships?: Maybe<Array<GroupMembership>>
  groupMembers?: Maybe<Array<GroupMembership>>
  membershipRequests?: Maybe<Array<GroupMembership>>
  orderSet?: Maybe<OrderSet>
  groupOrderSets?: Maybe<Array<OrderSet>>
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

export type QueryGroupOrderSetsArgs = {
  input: GroupOrderSetsInput
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

export type MutationLoginUserArgs = {
  input: LoginUserInput
}

export type MutationSignupUserArgs = {
  input: SignupUserInput
}

export type GroupDetailsFragment = { __typename?: 'Group' } & Pick<
  Group,
  'id' | 'name' | 'description' | 'active'
>

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

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email' | 'admin' | 'username'>>
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
      > & { group: { __typename?: 'Group' } & GroupDetailsFragment }
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
      group {
        ...GroupDetails
      }
    }
  }
  ${GroupDetailsFragmentDoc}
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
