import React from 'react'
import _ from 'lodash'

/* eslint-disable */
import { MemberSubscriptionOption } from './MemberSubscriptionOption'
import { useGetGroupSubscriptionOptionsQuery, useGetMyMembershipQuery } from '../../../graphql'
import { GroupSubscription, convertRemoteSubscriptionOption } from '../../../types/subscription'
/* eslint-enable */

const SUBSCRIPTION_ROW_LENGTH = 3

export interface MemberSubscriptionListProps {
  groupId: string
  onSelect: (optionId: string) => void
}

export const MemberSubscriptionList = ({ groupId, onSelect }: MemberSubscriptionListProps) => {
  const { data: groupSubscriptions } = useGetGroupSubscriptionOptionsQuery({
    variables: { input: { groupId } },
    fetchPolicy: 'cache-and-network',
  })
  const { data: groupMembership } = useGetMyMembershipQuery({
    variables: { input: { groupId } },
    fetchPolicy: 'cache-first',
  })

  if (!groupMembership?.myMembership.subscription?.groupSubscription) {
    return <></>
  }

  const { id: selectedGroupSubId } = groupMembership.myMembership.subscription.groupSubscription

  let subscriptions: GroupSubscription[][] = []
  if (groupSubscriptions?.group?.subscriptionOptions) {
    const localOptions = groupSubscriptions.group.subscriptionOptions
      .map(convertRemoteSubscriptionOption)
      .filter(option => option.active || option.id === selectedGroupSubId)

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
                selected={subscriptionOption.id === selectedGroupSubId}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
