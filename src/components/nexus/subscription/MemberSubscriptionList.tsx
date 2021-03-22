import React from 'react'
import _ from 'lodash'
import { v4 } from 'uuid'

/* eslint-disable */
import { MemberSubscriptionOption } from './MemberSubscriptionOption'
import { useGetBasicGroupSubscriptionOptionsQuery } from '../../../graphql'
import { GroupSubscription, convertRemoteSubscriptionOption } from '../../../types/subscription'
/* eslint-enable */

const SUBSCRIPTION_ROW_LENGTH = 3

export interface MemberSubscriptionListProps {
  groupId: string
  isGroupMember: boolean
  selectedOptionId?: string
  subscriptionInactive?: boolean
  onSelect: (subscriptionOption: GroupSubscription, onFinish: () => void) => void
}

export const MemberSubscriptionList = ({
  groupId,
  onSelect,
  isGroupMember,
  selectedOptionId,
  subscriptionInactive,
}: MemberSubscriptionListProps) => {
  const { data: groupSubscriptions } = useGetBasicGroupSubscriptionOptionsQuery({
    variables: { input: { groupId } },
    fetchPolicy: 'cache-and-network',
  })

  const isPaymentButton = (optionId: string) => {
    return isSelectedOption(optionId) && !!subscriptionInactive
  }

  const getOptionButtonText = (optionId: string) => {
    if (!isGroupMember) {
      return 'Join Now!'
    }
    if (!selectedOptionId) {
      return 'Select Plan'
    }
    if (!!selectedOptionId && optionId !== selectedOptionId) {
      return 'Change Plan'
    }
    if (isPaymentButton(optionId)) {
      return 'Make Payment'
    }
    return 'Select'
  }

  const isSelectedOption = (optionId: string) => {
    return optionId === selectedOptionId
  }

  let subscriptions: GroupSubscription[][] = []
  if (groupSubscriptions?.group?.subscriptionOptions) {
    const localOptions = groupSubscriptions.group.subscriptionOptions
      .map(convertRemoteSubscriptionOption)
      .filter(option => option.active || option.id === selectedOptionId)
      .sort((a, b) => {
        if (a.duration === b.duration) {
          return a.price < b.price ? -1 : 1
        }
        return a.duration < b.duration ? -1 : 1
      })

    subscriptions = _.chunk(localOptions, SUBSCRIPTION_ROW_LENGTH)
  }

  return (
    <div>
      {subscriptions.map(row => (
        <div key={v4()} className="row">
          {row.map(subscriptionOption => (
            <div key={`col-${subscriptionOption.id}`} className="col-lg-4 col-md-12">
              <MemberSubscriptionOption
                key={subscriptionOption.id}
                onSelect={onSelect}
                paymentButton={isPaymentButton(subscriptionOption.id)}
                buttonText={getOptionButtonText(subscriptionOption.id)}
                subscriptionOption={subscriptionOption}
                selected={isSelectedOption(subscriptionOption.id)}
                changePlan={!!selectedOptionId && subscriptionOption.id !== selectedOptionId}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
