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
  selectedOptionId?: string
  onSelect: (optionId: string) => void
}

export const MemberSubscriptionList = ({
  groupId,
  selectedOptionId,
  onSelect,
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
