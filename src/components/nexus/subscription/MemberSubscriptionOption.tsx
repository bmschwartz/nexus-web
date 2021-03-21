import React from 'react'

/* eslint-disable */
import { GroupSubscription } from '../../../types/subscription'
import { Button } from 'antd'
/* eslint-enable */

interface MemberSubscriptionOptionProps {
  selected: boolean
  buttonText: string
  subscriptionOption: GroupSubscription
  onSelect: (optionId: string) => void
}

export const MemberSubscriptionOption = ({
  selected,
  onSelect,
  buttonText,
  subscriptionOption,
}: MemberSubscriptionOptionProps) => {
  const { id: optionId, duration, price } = subscriptionOption
  console.log(selected)

  return (
    <div className="card">
      <div className="card-body">
        <div className="pt-3 pb-3 pl-3 pr-3 text-center flex-grow-1">
          <div className="text-dark font-weight-bold font-size-48">${price}</div>
          <div className="text-dark font-weight-bold font-size-24 mb-3">
            {duration} Month{duration > 1 ? 's' : ''}
          </div>
          <Button type="primary" onClick={() => onSelect(optionId)}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
