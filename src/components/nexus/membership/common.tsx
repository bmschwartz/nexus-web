import { Button, Result } from 'antd'
import React, { FC } from 'react'

/* eslint-disable */
import { BillStatus, Membership, SubscriptionBill } from '../../../types/membership'

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
          Go to Subscription
        </Button>
      }
    />
  )
}

export const getCurrentBillStatus = (bills: SubscriptionBill[]): BillStatus | null => {
  if (bills.length === 0) {
    return null
  }

  const orderedBills = bills.sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
  )

  return orderedBills[0].billStatus
}
