import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { Membership, PaymentStatus } from 'types/membership'

/* eslint-disable */
import * as apollo from '../../../services/apollo'

/* eslint-enable */

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  const { subscription } = membership

  const onClickActivateSubscription = async (subscriptionId: string) => {
    await apollo.activateMemberSubscription({ subscriptionId })
  }

  const onClickMakePayment = async (subscriptionId: string) => {
    console.log(subscriptionId)
    Modal.success({
      title: `Make a Payment`,
      content: `An invoice will be sent to your email with payment instructions`,
      okText: 'OK',
      okType: 'primary',
    })
    await apollo.payMemberSubscription({ subscriptionId })
  }

  const onClickCancelSubscription = async (subscriptionId: string) => {
    await apollo.cancelMemberSubscription({ subscriptionId })
  }

  return (
    <>
      {subscription.outstandingBalance === 0 ? (
        <>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Active</strong>
            {subscription.active ? 'Yes' : 'No'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Auto Renew</strong>
            {subscription.recurring ? 'Yes' : 'No'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Price</strong>${subscription.price} USD
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Paid</strong>
            {subscription.outstandingBalance === 0 ? 'Yes' : 'No'}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Start Date</strong>
            {subscription.startDate}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">End Date</strong>
            {subscription.endDate}
          </div>
          {subscription.active && subscription.recurring && (
            <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
              <Button
                danger
                disabled={!subscription.active || !subscription.recurring}
                onClick={() => onClickCancelSubscription(subscription.id)}
              >
                Cancel Subscription
              </Button>
            </div>
          )}
          {subscription.active && !subscription.recurring && (
            <>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <strong className="mr-3 font-italic">-- Subscription will not Renew --</strong>
              </div>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <Button
                  type="primary"
                  disabled={!subscription.active && !subscription.recurring}
                  onClick={() => onClickActivateSubscription(subscription.id)}
                >
                  Activate Subscription
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {subscription.paymentStatus === PaymentStatus.Pending ? (
            <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
              <strong className="mr-3 font-italic">
                -- Awaiting Payment. Check email for invoice --
              </strong>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <Button type="primary" onClick={() => onClickMakePayment(subscription.id)}>
                  Resend Payment Invoice
                </Button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
              <Button type="primary" onClick={() => onClickMakePayment(subscription.id)}>
                Make a Payment
              </Button>
            </div>
          )}
        </>
      )}
    </>
  )
}
