import React, { FC, useState } from 'react'
import { Alert, Button, Modal, notification } from 'antd'
import * as dotenv from 'dotenv'

/* eslint-disable */
import useScript from '../hooks'
import * as apollo from 'services/apollo'
import { Membership } from 'types/membership'
import { GroupSubscription, InvoiceStatus } from '../../../types/subscription'
import { MemberSubscriptionList } from './MemberSubscriptionList'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { PaymentConfirmationModalContent } from './PaymentConfirmationModalContent'
import { useGetActivePlatformFeeQuery } from '../../../graphql'
/* eslint-enable */

dotenv.config()

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  useScript(process.env.REACT_APP_BTCPAY_SCRIPT_URL || '')
  const [cancelingSubscription, setCancelingSubscription] = useState<boolean>(false)
  const [reactivatingSubscription, setReactivatingSubscription] = useState<boolean>(false)
  const { data: platformFeeData } = useGetActivePlatformFeeQuery({
    fetchPolicy: 'cache-and-network',
  })

  const { subscription } = membership
  const { pendingInvoice } = subscription
  console.log(pendingInvoice)
  const currentInvoiceStatus = pendingInvoice?.status

  const onClickActivateSubscription = async () => {
    setReactivatingSubscription(true)

    const { error } = await apollo.activateMemberSubscription({ subscriptionId: subscription.id })

    if (error) {
      notification.error({
        message: 'Reactivate Subscription',
        description: error,
        duration: 3, // seconds
      })
      setReactivatingSubscription(false)
    } else {
      notification.success({
        message: 'Reactivated Subscription',
        duration: 1.5,
        onClose: () => {
          setReactivatingSubscription(false)
          window.location.reload()
        },
      })
    }
  }

  const onClickCancelSubscription = async () => {
    setCancelingSubscription(true)

    const { error } = await apollo.cancelMemberSubscription({ subscriptionId: subscription.id })

    if (error) {
      notification.error({
        message: 'Cancel Subscription',
        description: error,
        duration: 3, // seconds
      })
      setCancelingSubscription(false)
    } else {
      notification.success({
        message: 'Canceled Subscription',
        duration: 1.5,
        onClose: () => {
          setCancelingSubscription(false)
          window.location.reload()
        },
      })
    }
  }

  const openInvoice = (invoiceId?: string | null, onFinish?: () => void) => {
    if (!invoiceId) {
      return
    }

    // @ts-ignore
    window.btcpay.showInvoice(invoiceId)

    // @ts-ignore
    window.btcpay.onModalReceiveMessage((event: any) => {
      if (event.data === 'close') {
        if (onFinish) {
          onFinish()
        }
        window.location.reload()
      }
    })
  }

  const makePayment = async (subscriptionOption: GroupSubscription, onFinish: () => void) => {
    Modal.confirm({
      okType: 'primary',
      okText: 'Make Payment',
      title: <h5>Subscription Payment</h5>,
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      content: (
        <PaymentConfirmationModalContent
          platformFee={platformFeeData?.activePlatformFee}
          subscriptionOption={subscriptionOption}
        />
      ),
      async onOk() {
        const { invoiceId, error } = await apollo.payMemberSubscription({
          groupId: membership.groupId,
          membershipId: membership.id,
          subscriptionOptionId: subscriptionOption.id,
        })

        if (error || !invoiceId) {
          Modal.error({
            title: 'Make a Payment',
            content: error,
            maskClosable: true,
          })
        } else {
          openInvoice(invoiceId, onFinish)
        }
      },
      onCancel() {
        onFinish()
      },
    })
  }

  const onClickSubscriptionOption = async (
    subscriptionOption: GroupSubscription,
    onFinish: () => void,
  ) => {
    if (subscription.groupSubscriptionId === subscriptionOption.id) {
      await makePayment(subscriptionOption, onFinish)
    } else {
      await switchSubscriptionOption(subscriptionOption, onFinish)
    }
  }

  const switchSubscriptionOption = async (
    subscriptionOption: GroupSubscription,
    onFinish: () => void,
  ) => {
    const { error } = await apollo.switchSubscriptionOption({
      membershipId: membership.id,
      subscriptionOptionId: subscriptionOption.id,
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
                loading={cancelingSubscription}
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
                  loading={reactivatingSubscription}
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
          currentInvoiceStatus === InvoiceStatus.Confirmed ||
          currentInvoiceStatus === InvoiceStatus.New ? (
            <>
              {currentInvoiceStatus !== InvoiceStatus.New ? (
                <div className="row mb-3">
                  <div className="col-lg-6 col-md-6">
                    <Alert
                      message="Received Payment"
                      description="Waiting for more confirmations"
                      type="success"
                      showIcon
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-6">
                      <Alert
                        message="Payment Not on Blockchain"
                        description="This may take 10 to 15 minutes after sending funds"
                        type="info"
                        showIcon
                      />
                    </div>
                  </div>
                  <Button type="primary" onClick={() => openInvoice(pendingInvoice?.remoteId)}>
                    Reopen Invoice
                  </Button>
                </>
              )}
            </>
          ) : (
            <div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6">
                  {(pendingInvoice?.status === InvoiceStatus.Expired ||
                    pendingInvoice?.status === InvoiceStatus.Invalid) && (
                    <Alert
                      message={`Payment ${pendingInvoice.status}`}
                      description="Click Make Payment or Change Plan"
                      type="error"
                      showIcon
                    />
                  )}
                </div>
              </div>
              <MemberSubscriptionList
                isGroupMember
                subscriptionInactive
                groupId={membership.groupId}
                selectedOptionId={subscription.groupSubscriptionId}
                onSelect={onClickSubscriptionOption}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
