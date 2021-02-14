import { Button, Result } from 'antd'
import React, { FC } from 'react'

/* eslint-disable */
import { Membership } from '../../../types/membership'
/* eslint-enable */

export function hasActiveSubscription(membership: Membership) {
  return membership.subscription?.active
}

interface NoActiveSubscriptionProps {
  onClickAddSubscription: () => void
}

export const NoActiveSubscription: FC<NoActiveSubscriptionProps> = ({ onClickAddSubscription }) => {
  return (
    <Result
      status="warning"
      title="You do not have an active subscription"
      extra={
        <Button type="primary" key="subscription" onClick={onClickAddSubscription}>
          Go to Subscriptions
        </Button>
      }
    />
  )
}
