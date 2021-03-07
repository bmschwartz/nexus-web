/* eslint-disable */
import { ExchangeAccount } from './exchange'
import {
  InvoiceStatus as RemoteInvoiceStatus,
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
  recurring: boolean
  startDate: string
  endDate: string
  invoices: SubscriptionInvoice[]
}

export interface SubscriptionInvoice {
  id: string
  email: string
  amountPaid: number
  amountCharged: number

  status: InvoiceStatus | null
  token?: string | null
  remoteId?: string | null

  periodStart?: Date | null
  periodEnd?: Date | null
  expiresAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export enum InvoiceStatus {
  New = 'New',
  Paid = 'Paid',
  Confirmed = 'Confirmed',
  Complete = 'Complete',
  Expired = 'Expired',
  Invalid = 'Invalid',
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

export function convertToLocalInvoiceStatus(
  invoiceStatus?: RemoteInvoiceStatus,
): InvoiceStatus | null {
  switch (invoiceStatus) {
    case RemoteInvoiceStatus.New:
      return InvoiceStatus.New
    case RemoteInvoiceStatus.Paid:
      return InvoiceStatus.Paid
    case RemoteInvoiceStatus.Confirmed:
      return InvoiceStatus.Confirmed
    case RemoteInvoiceStatus.Complete:
      return InvoiceStatus.Complete
    case RemoteInvoiceStatus.Expired:
      return InvoiceStatus.Expired
    case RemoteInvoiceStatus.Invalid:
      return InvoiceStatus.Invalid
    default:
      return null
  }
}

export function convertToRemoteInvoiceStatus(
  invoiceStatus?: InvoiceStatus,
): RemoteInvoiceStatus | null {
  switch (invoiceStatus) {
    case InvoiceStatus.New:
      return RemoteInvoiceStatus.New
    case InvoiceStatus.Paid:
      return RemoteInvoiceStatus.Paid
    case InvoiceStatus.Confirmed:
      return RemoteInvoiceStatus.Confirmed
    case InvoiceStatus.Complete:
      return RemoteInvoiceStatus.Complete
    case InvoiceStatus.Expired:
      return RemoteInvoiceStatus.Expired
    case InvoiceStatus.Invalid:
      return RemoteInvoiceStatus.Invalid
    default:
      return null
  }
}
