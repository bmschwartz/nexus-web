import { Button, Result } from 'antd'
import React, { FC } from 'react'

/* eslint-disable */
import { Membership } from '../../../types/membership'
import { InvoiceStatus, SubscriptionInvoice } from '../../../types/subscription'

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

export const getCurrentInvoiceStatus = (invoices: SubscriptionInvoice[]): InvoiceStatus | null => {
  if (invoices.length === 0) {
    return null
  }

  const orderedInvoices = invoices.sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1,
  )

  return orderedInvoices[0].status
}
