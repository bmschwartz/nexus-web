import React, { FC } from 'react'
import { Alert, Modal, notification } from 'antd'
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
import { PendingInvoiceComponent } from './PendingInvoiceComponent'
/* eslint-enable */

dotenv.config()

interface SubscriptionInfoProps {
  membership: Membership
}

export const SubscriptionInfo: FC<SubscriptionInfoProps> = ({ membership }) => {
  useScript(process.env.REACT_APP_BTCPAY_SCRIPT_URL || '')
  const { data: platformFeeData } = useGetActivePlatformFeeQuery({
    fetchPolicy: 'cache-and-network',
  })

  const { subscription } = membership
  const { pendingInvoice } = subscription

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
      duration: 1,
      message: 'Switched Subscription Option',
      onClose: () => {
        onFinish()
        window.location.reload()
      },
    })
  }

  const showSubscriptionExpired = (() => {
    if (pendingInvoice) {
      return false
    }
    return subscription.endDate && new Date(subscription.endDate) < new Date()
  })()

  const showSubscriptionOptions = (() => {
    if (!pendingInvoice) {
      return true
    }
    const { status } = pendingInvoice
    return status === InvoiceStatus.Expired || status === InvoiceStatus.Invalid
  })()

  const timeUntilExpiration = (() => {
    const now = new Date().getTime()
    const expiration = new Date(subscription.endDate).getTime()
    return expiration - now
  })()

  const hoursUntilExpiration = (() => {
    return Math.floor(timeUntilExpiration / (1000 * 60 * 60))
  })()

  const daysUntilExpiration = (() => {
    return Math.floor(hoursUntilExpiration / 24)
  })()

  const formattedExpirationDate = (() => {
    return new Date(subscription.endDate).toLocaleDateString()
  })()

  const expirationText = (() => {
    if (hoursUntilExpiration < 24) {
      const pluralize = hoursUntilExpiration !== 1
      return `Expiring in ${hoursUntilExpiration} hour${pluralize ? 's' : ''}`
    }
    const pluralize = daysUntilExpiration !== 1
    return `Expiring in ${daysUntilExpiration} day${
      pluralize ? 's' : ''
    } (${formattedExpirationDate})`
  })()

  return (
    <>
      {showSubscriptionExpired && (
        <div className="row mb-3">
          <div className="col-lg-6 col-md-6">
            <Alert
              message="Subscription Expired"
              description="Reactivate your subscription"
              type="warning"
              showIcon
            />
          </div>
        </div>
      )}
      {subscription.active && (
        <div className="row mb-3">
          <div className="col-lg-6 col-md-6">
            <Alert
              message="Subscription Active"
              description={expirationText}
              type="success"
              showIcon
            />
          </div>
        </div>
      )}

      {pendingInvoice && (
        <PendingInvoiceComponent invoice={pendingInvoice} openInvoice={openInvoice} />
      )}

      {showSubscriptionOptions && (
        <MemberSubscriptionList
          isGroupMember
          groupId={membership.groupId}
          subscriptionInactive={!subscription.active}
          selectedOptionId={subscription.groupSubscriptionId}
          onSelect={onClickSubscriptionOption}
        />
      )}
    </>
  )
}
