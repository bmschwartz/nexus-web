import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { Membership } from 'types/membership'

/* eslint-disable */
import * as dotenv from 'dotenv'
import * as apollo from '../../../services/apollo'
import { getCurrentInvoiceStatus } from './common'
import useScript from '../hooks'
import { InvoiceStatus } from '../../../types/subscription'
import { MemberSubscriptionList } from './MemberSubscriptionList'

/* eslint-enable */

dotenv.config()

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  useScript(process.env.REACT_APP_BTCPAY_SCRIPT_URL || '')

  const { subscription } = membership

  const onClickActivateSubscription = async () => {
    await apollo.activateMemberSubscription({ subscriptionId: subscription.id })
  }

  const onClickMakePayment = async () => {
    // Modal.success({
    //   title: `Make a Payment`,
    //   content: `A bill will be sent to your email with payment instructions`,
    //   okText: 'OK',
    //   okType: 'primary',
    //   onOk: () => {
    //     window.location.reload()
    //   },
    // })
    const { invoiceId, error } = await apollo.payMemberSubscription({
      groupId: membership.groupId,
      membershipId: membership.id,
    })

    if (error) {
      Modal.error({
        title: 'Make a Payment',
        content: error,
        maskClosable: true,
      })
    } else {
      // @ts-ignore
      window.btcpay.showInvoice(invoiceId)

      // @ts-ignore
      window.btcpay.onModalReceiveMessage((event: any) => {
        if (event.data === 'close') {
          window.location.reload()
        }
      })
    }
  }

  const onClickCancelSubscription = async () => {
    await apollo.cancelMemberSubscription({ subscriptionId: subscription.id })
  }

  const currentInvoiceStatus = getCurrentInvoiceStatus(subscription.invoices)

  return (
    <>
      {subscription.active ? (
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
                onClick={() => onClickCancelSubscription()}
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
                  onClick={() => onClickActivateSubscription()}
                >
                  Reactivate Subscription
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {currentInvoiceStatus !== InvoiceStatus.Complete && currentInvoiceStatus !== null ? (
            <>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <strong className="mr-3 font-italic">
                  -- Awaiting Payment. Check email for bill --
                </strong>
              </div>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <Button type="primary" onClick={() => onClickMakePayment()}>
                  Resend Bill
                </Button>
              </div>
            </>
          ) : (
            <MemberSubscriptionList
              isGroupMember
              groupId={membership.groupId}
              onSelect={async (optionId: string) => () => console.log(optionId)}
            />
          )}
        </>
      )}
    </>
  )
}
