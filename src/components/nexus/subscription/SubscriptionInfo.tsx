import React, { FC, useState } from 'react'
import { Button, Modal, notification } from 'antd'
import * as dotenv from 'dotenv'

/* eslint-disable */
import useScript from '../hooks'
import * as apollo from 'services/apollo'
import { Membership } from 'types/membership'
import { getCurrentInvoiceStatus } from './common'
import { InvoiceStatus } from '../../../types/subscription'
import { MemberSubscriptionList } from './MemberSubscriptionList'

/* eslint-enable */

dotenv.config()

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  useScript(process.env.REACT_APP_BTCPAY_SCRIPT_URL || '')
  const [receivedPayment, setReceivedPayment] = useState<boolean>(false)

  const { subscription } = membership

  const onClickActivateSubscription = async () => {
    await apollo.activateMemberSubscription({ subscriptionId: subscription.id })
  }

  const makePayment = async (subscriptionOptionId: string, onFinish: () => void) => {
    const { invoiceId, error } = await apollo.payMemberSubscription({
      groupId: membership.groupId,
      membershipId: membership.id,
      subscriptionOptionId,
    })

    if (error || !invoiceId) {
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
        console.log(event)
        if (typeof event.data === 'object') {
          if (event.data.status === 'paid' && event.data.invoiceId === invoiceId) {
            setReceivedPayment(true)
            console.log('set received payment to true')
          }
        }
        if (event.data === 'close') {
          if (receivedPayment) {
            onFinish()
            console.log('received payment is true')
            window.location.reload()
          } else {
            console.log('received payment is false')
            resetPayment(invoiceId)
              .then(() => window.location.reload())
              .catch(() => window.location.reload())
              .finally(() => onFinish())
          }
        }
      })
    }
  }

  const resetPayment = async (invoiceId: string) => {
    const { error } = await apollo.resetPayment({ invoiceId })
    if (error) {
      console.error(error)
    }
    console.log('reset payment!')
  }

  const onClickSubscriptionOption = async (subscriptionOptionId: string, onFinish: () => void) => {
    if (subscription.groupSubscriptionId === subscriptionOptionId) {
      await makePayment(subscriptionOptionId, onFinish)
    } else {
      await switchSubscriptionOption(subscriptionOptionId, onFinish)
    }
  }

  const switchSubscriptionOption = async (subscriptionOptionId: string, onFinish: () => void) => {
    const { error } = await apollo.switchSubscriptionOption({
      membershipId: membership.id,
      subscriptionOptionId,
    })

    if (error) {
      Modal.error({
        title: 'Switch Subscription Option',
        content: error,
        maskClosable: true,
      })
      return
    }

    notification.success({
      duration: 1.5,
      message: 'Switched Subscription Option',
      onClose: () => {
        onFinish()
        window.location.reload()
      },
    })
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
          {currentInvoiceStatus === InvoiceStatus.Paid ||
          currentInvoiceStatus === InvoiceStatus.Confirmed ? (
            <>
              <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
                <strong className="mr-3 font-italic">
                  -- Awaiting Payment. Check email for bill --
                </strong>
              </div>
              {/* <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4"> */}
              {/*  <Button type="primary" onClick={() => onClickMakePayment()}> */}
              {/*    Resend Bill */}
              {/*  </Button> */}
              {/* </div> */}
            </>
          ) : (
            <MemberSubscriptionList
              isGroupMember
              subscriptionInactive
              groupId={membership.groupId}
              selectedOptionId={subscription.groupSubscriptionId}
              onSelect={onClickSubscriptionOption}
            />
          )}
        </>
      )}
    </>
  )
}
