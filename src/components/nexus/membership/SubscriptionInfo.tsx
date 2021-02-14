import React, { FC } from 'react'
import { Membership } from 'types/membership'
import { Button } from 'antd'

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  const { subscription } = membership

  return (
    <>
      {subscription ? (
        <>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Active</strong>
            {subscription.active ? 'Active' : 'Inactive'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Auto Renew</strong>
            {subscription.recurring ? 'Yes' : 'No'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Price</strong>${subscription.price} USD
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Outstanding Balance</strong>${subscription.outstandingBalance}{' '}
            USD
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Start Date</strong>
            {subscription.startDate}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">End Date</strong>
            {subscription.endDate}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <Button type="primary" onClick={() => console.log('clicked make payment!')}>
              Make a Payment
            </Button>
          </div>
        </>
      ) : (
        <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
          <Button type="primary" onClick={() => console.log('clicked create subscription!')}>
            Create Subscription
          </Button>
        </div>
      )}
    </>
  )
}
