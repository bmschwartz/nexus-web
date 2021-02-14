import { Result } from 'antd'
import React from 'react'

// eslint-disable-next-line import/extensions
import { Membership } from '../../../types/membership'

export function hasActiveSubscription(membership: Membership) {
  return membership.subscription?.active
}

export const NoActiveSubscription = (
  <Result status="warning" title="You do not have an active subscription" />
)
