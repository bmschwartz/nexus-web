import { Button, Result } from 'antd'
import React, { FC } from 'react'

// eslint-disable-next-line import/extensions
import { Membership } from '../../../types/membership'

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
          Create Subscription
        </Button>
      }
    />
  )
}
