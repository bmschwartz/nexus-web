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

export function transformGroupData(group: any): Group {
  return {
    id: group.id,
    name: group.name,
    active: group.active,
    description: group.description,
    memberships: [],
    subscriptionOptions: group.subscriptionOptions,
  }
}

export function transformGroups(groups: any[]): Group[] {
  if (!groups) {
    return []
  }

  return groups.map(transformGroupData)
}
