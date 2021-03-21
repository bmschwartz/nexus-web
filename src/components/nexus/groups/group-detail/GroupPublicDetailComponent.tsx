import React from 'react'
import { Modal, notification } from 'antd'

import { Group } from 'types/group'
import * as apollo from 'services/apollo'
/* eslint-disable */
import { GroupReadOnlyProfile } from './GroupReadOnlyProfile'
import { MemberSubscriptionList } from '../../subscription/MemberSubscriptionList'
/* eslint-enable */

interface GroupPublicDetailComponentProps {
  group: Group
}

export const GroupPublicDetailComponent = ({ group }: GroupPublicDetailComponentProps) => {
  const onClickJoinGroup = async (optionId: string) => {
    const groupId = group.id

    const { membershipId, error: joinGroupError } = await apollo.joinGroup({ groupId })

    if (!membershipId) {
      notification.error({
        message: 'Join Group',
        description: joinGroupError,
        duration: 3, // seconds
      })
      return
    }

    const { invoiceId, error } = await apollo.payMemberSubscription({ groupId, membershipId })

    if (error) {
      Modal.error({
        title: 'Join Group',
        content: error,
        maskClosable: true,
      })
    } else {
      // @ts-ignore
      window.btcpay.showInvoice(invoiceId)

      // @ts-ignore
      window.btcpay.onModalReceiveMessage((event: any) => {
        if (event.data === 'close') {
          window.location.reload()
        }
      })
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
