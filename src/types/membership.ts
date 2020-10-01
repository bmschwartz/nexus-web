/* eslint-disable */
import { IOrder } from './order'
import { IExchangeAccount } from './exchange'

export interface Membership {
  id: string
  groupId: string
  memberId: string
  username: string
  active: boolean
  orders: IOrder[]
  exchangeAccounts: IExchangeAccount[]
  role: MembershipRole
  status: MembershipStatus
}

export enum MembershipStatus {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Pending = 'PENDING',
}

export enum MembershipRole {
  Member = 'MEMBER',
  Trader = 'TRADER',
  Admin = 'ADMIN',
}

export const statusFromString = (status: string): MembershipStatus | null => {
  switch (status) {
    case 'APPROVED':
      return MembershipStatus.Approved
    case 'DENIED':
      return MembershipStatus.Denied
    case 'PENDING':
      return MembershipStatus.Pending
    default:
      return null
  }
}

export const roleFromString = (role: string): MembershipRole | null => {
  switch (role) {
    case 'ADMIN':
      return MembershipRole.Admin
    case 'TRADER':
      return MembershipRole.Trader
    case 'MEMBER':
      return MembershipRole.Member
    default:
      return null
  }
}
