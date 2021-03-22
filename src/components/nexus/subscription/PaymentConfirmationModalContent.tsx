import React, { FC } from 'react'

import { PlatformFee } from 'types/platformFee'
import { GroupSubscription } from 'types/subscription'
import { Divider, Skeleton } from 'antd'
/* eslint-disable */
/* eslint-enable */

interface PaymentConfirmationModalContentProps {
  platformFee?: PlatformFee | null
  subscriptionOption: GroupSubscription
}

export const PaymentConfirmationModalContent: FC<PaymentConfirmationModalContentProps> = ({
  platformFee,
  subscriptionOption,
}) => {
  if (!platformFee) {
    return <Skeleton />
  }

  const { price: subscriptionPrice, duration } = subscriptionOption

  return (
    <>
      <Divider orientation="left">Summary</Divider>
      <p className="mr-3 font-size-14">
        Group Fee: ${subscriptionPrice} for {duration} Month{duration > 1 ? 's' : ''}
      </p>
      <p className="mr-3 font-size-14">Platform Fee: ${platformFee.price} per month</p>
      <Divider orientation="left">Total</Divider>
      <p className="mr-3 font-size-14">
        Total Cost: ${platformFee.price * duration + subscriptionPrice}
      </p>
    </>
  )
}
