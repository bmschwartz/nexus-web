import { Membership } from './membership'

export interface Group {
  id: number
  name: string
  description?: string
  active: boolean
  memberships: Membership[]
}
