import React from 'react'
import _ from 'lodash'

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
  onSelect: (optionId: string) => void
}

export const MemberSubscriptionList = ({
  groupId,
  onSelect,
  isGroupMember,
  selectedOptionId,
}: MemberSubscriptionListProps) => {
  const { data: groupSubscriptions } = useGetBasicGroupSubscriptionOptionsQuery({
    variables: { input: { groupId } },
    fetchPolicy: 'cache-and-network',
  })

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
        <div className="row">
          {row.map(subscriptionOption => (
            <div key={`col-${subscriptionOption.id}`} className="col-lg-4 col-md-12">
              <MemberSubscriptionOption
                key={subscriptionOption.id}
                onSelect={onSelect}
                buttonText={isGroupMember ? 'Select Plan' : 'Join Now!'}
                subscriptionOption={subscriptionOption}
                selected={subscriptionOption.id === selectedOptionId}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
