import React, { useState } from 'react'

/* eslint-disable */
import { GroupSubscription } from '../../../types/subscription'
import { Button } from 'antd'
/* eslint-enable */

interface MemberSubscriptionOptionProps {
  selected: boolean
  buttonText: string
  changePlan: boolean
  paymentButton: boolean
  subscriptionOption: GroupSubscription
  onSelect: (optionId: string, onFinish: () => void) => void
}

export const MemberSubscriptionOption = ({
  selected,
  onSelect,
  buttonText,
  changePlan,
  subscriptionOption,
}: MemberSubscriptionOptionProps) => {
  const [loading, setLoading] = useState<boolean>()
  const { id: optionId, duration, price } = subscriptionOption
  console.log(selected)

  const buttonType = changePlan ? 'default' : 'primary'

  return (
    <div className="card">
      <div className="card-body">
        <div className="pt-3 pb-3 pl-3 pr-3 text-center flex-grow-1">
          <div className="text-dark font-weight-bold font-size-30">
            {duration} Month{duration > 1 ? 's' : ''}
          </div>
          <div className="mb-3">
            <span className="text-dark font-size-24">${price}</span>
            <span> + Platform Fee</span>
          </div>
          <Button
            type={buttonType}
            loading={loading}
            onClick={async () => {
              setLoading(true)
              onSelect(optionId, () => {
                setLoading(false)
              })
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
