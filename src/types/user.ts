import { Membership } from './membership'

export interface User {
  id: string
  username: string
  email: string
  memberships: Membership[]
}
