import React from 'react'
import { notification } from 'antd'

import { Group } from 'types/group'
import * as apollo from 'services/apollo'
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
  const onClickJoinGroup = async (optionId: string): Promise<() => void> => {
    const groupId = group.id

    const { membershipId, error: joinGroupError } = await apollo.joinGroup({ groupId })

    if (!membershipId) {
      notification.error({
        message: 'Join Group',
        description: joinGroupError,
        duration: 3, // seconds
      })
    }

    return () => {
      window.location.reload()
    }
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
