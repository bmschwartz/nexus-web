import React from 'react'
import { notification } from 'antd'

import { Group } from 'types/group'
import * as apollo from 'services/apollo'
import { GroupSubscription } from 'types/subscription'

/* eslint-disable */
import useScript from '../../hooks'
import { GroupReadOnlyProfile } from './GroupReadOnlyProfile'
import { MemberSubscriptionList } from '../../subscription/MemberSubscriptionList'
/* eslint-enable */

interface GroupPublicDetailComponentProps {
  group: Group
}

export const GroupPublicDetailComponent = ({ group }: GroupPublicDetailComponentProps) => {
  useScript(process.env.REACT_APP_BTCPAY_SCRIPT_URL || '')

  // eslint-disable-next-line no-unused-vars
  const onClickJoinGroup = async (subscriptionOption: GroupSubscription, onFinish: () => void) => {
    const groupId = group.id

    const { membershipId, error: joinGroupError } = await apollo.joinGroup({
      groupId,
      subscriptionOptionId: subscriptionOption.id,
    })

    if (!membershipId) {
      notification.error({
        message: 'Join Group',
        description: joinGroupError,
        duration: 3, // seconds
      })
    }

    setTimeout(() => {
      onFinish()
      window.location.reload()
    }, 1500)
  }

  return (
    <>
      <MemberSubscriptionList
        groupId={group.id}
        isGroupMember={false}
        onSelect={onClickJoinGroup}
      />
      <div className="card">
        <div className="card-body">
          <GroupReadOnlyProfile group={group} />
        </div>
      </div>
    </>
  )
}
