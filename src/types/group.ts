import { Membership } from './membership'

export interface Group {
  id: string
  name: string
  description?: string
  active: boolean
  memberships: Membership[]
}
