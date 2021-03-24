import { Button, Result } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

/* eslint-disable */
import { Membership } from '../../../types/membership'
import { InvoiceStatus, SubscriptionInvoice } from '../../../types/subscription'

/* eslint-enable */

export function hasActiveSubscription(membership: Membership) {
  return membership.subscription?.active
}

interface NoActiveSubscriptionProps {
  groupId: string
  onClickAddSubscription: () => void
}

export const NoActiveSubscription: FC<NoActiveSubscriptionProps> = ({
  groupId,
  onClickAddSubscription,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <Result
          status="warning"
          title="You do not have an active subscription"
          extra={
            <Link to={`/groups/${groupId}/subscription`}>
              <Button type="primary" key="subscription" onClick={onClickAddSubscription}>
                Go to Subscription
              </Button>
            </Link>
          }
        />
      </div>
    </div>
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
