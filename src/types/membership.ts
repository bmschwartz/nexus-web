/* eslint-disable */
import { ExchangeAccount } from './exchange'
import {
  PaymentStatus as RemotePaymentStatus,
  MembershipRole as RemoteMembershipRole,
  MembershipStatus as RemoteMembershipStatus,
} from '../graphql'

export interface Membership {
  id: string
  groupId: string
  memberId: string
  username: string
  active: boolean
  exchangeAccounts: ExchangeAccount[]
  role: MembershipRole
  status: MembershipStatus
  subscription: MemberSubscription
}

export enum MembershipStatus {
  Approved = 'Approved',
  Denied = 'Denied',
  Pending = 'Pending',
}

export enum MembershipRole {
  Member = 'Member',
  Trader = 'Trader',
  Admin = 'Admin',
}

export interface MemberSubscription {
  id: string
  active: boolean
  price: number
  recurring: boolean
  startDate: string
  endDate: string
  outstandingBalance: number
  paymentStatus?: PaymentStatus
}

export enum PaymentStatus {
  Pending = 'Pending',
  Approved = 'Approved',
}

export function convertToLocalMembershipRole(role: RemoteMembershipRole): MembershipRole | null {
  switch (role) {
    case RemoteMembershipRole.Admin:
      return MembershipRole.Admin
    case RemoteMembershipRole.Trader:
      return MembershipRole.Trader
    case RemoteMembershipRole.Member:
      return MembershipRole.Member
    default:
      return null
  }
}

export function convertToLocalMembershipStatus(
  status: RemoteMembershipStatus,
): MembershipStatus | null {
  console.log(status)
  switch (status) {
    case RemoteMembershipStatus.Approved:
      return MembershipStatus.Approved
    case RemoteMembershipStatus.Pending:
      return MembershipStatus.Pending
    case RemoteMembershipStatus.Denied:
      return MembershipStatus.Denied
    default:
      return null
  }
}

export function convertToRemoteMembershipRole(role: MembershipRole): RemoteMembershipRole | null {
  switch (role) {
    case MembershipRole.Admin:
      return RemoteMembershipRole.Admin
    case MembershipRole.Trader:
      return RemoteMembershipRole.Trader
    case MembershipRole.Member:
      return RemoteMembershipRole.Member
    default:
      return null
  }
}

export function convertToRemoteMembershipStatus(
  status: MembershipStatus,
): RemoteMembershipStatus | null {
  switch (status) {
    case MembershipStatus.Approved:
      return RemoteMembershipStatus.Approved
    case MembershipStatus.Pending:
      return RemoteMembershipStatus.Pending
    case MembershipStatus.Denied:
      return RemoteMembershipStatus.Denied
    default:
      return null
  }
}

export function convertToLocalPaymentStatus(
  paymentStatus: RemotePaymentStatus,
): PaymentStatus | null {
  switch (paymentStatus) {
    case RemotePaymentStatus.Approved:
      return PaymentStatus.Approved
    case RemotePaymentStatus.Pending:
      return PaymentStatus.Pending
    default:
      return null
  }
}

export function convertToRemotePaymentStatus(
  paymentStatus: PaymentStatus,
): RemotePaymentStatus | null {
  switch (paymentStatus) {
    case PaymentStatus.Approved:
      return RemotePaymentStatus.Approved
    case PaymentStatus.Pending:
      return RemotePaymentStatus.Pending
    default:
      return null
  }
}
