/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { GroupSubscription } from '../../../types/subscription'

/* eslint-enable */

export interface SubscriptionOptionTableItem {
  id: string
  price: number
  active: boolean
  duration: number
  description: string
  createdAt: string
}

export const createSubscriptionTableData = (
  subscriptionOptions: GroupSubscription[],
): SubscriptionOptionTableItem[] => {
  return subscriptionOptions.map(option => {
    const { id, active, price, duration, description, createdAt } = option
    return {
      id,
      price,
      active,
      duration,
      description: description ?? '',
      createdAt: displayTimeBeforeNow(createdAt),
    }
  })
}
