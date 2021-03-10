/* eslint-disable */
import { Membership } from './membership'
/* eslint-enable */

export interface Group {
  id: string
  name: string
  description?: string
  active: boolean
  memberships: Membership[]
}

export function transformGroups(groups: any[]): Group[] {
  return groups.map(group => ({
    id: group.id,
    name: group.name,
    description: group.description,
    active: group.active,
    memberships: [],
  }))
}
