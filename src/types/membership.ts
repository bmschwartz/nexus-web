/* eslint-disable */
import { Group } from './group'
import { User } from './user'
import { Order } from './order'

export interface Membership {
  group: Group
  member: User
  active: boolean
  orders: Order[]
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
