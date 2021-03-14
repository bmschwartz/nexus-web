/* eslint-disable */
import { Membership } from './membership'
import { GroupSubscription } from './subscription'
/* eslint-enable */

export interface Group {
  id: string
  name: string
  description?: string
  active: boolean
  memberships: Membership[]
  subscriptionOptions: GroupSubscription[]
}

export function transformGroups(groups: any[]): Group[] {
  if (!groups) {
    return []
  }

  return groups.map(group => ({
    id: group.id,
    name: group.name,
    description: group.description,
    active: group.active,
    memberships: [],
    subscriptionOptions: group.subscriptionOptions,
  }))
}
