import React from 'react'
import { Group } from 'types/group'
import { Divider } from 'antd'

/* eslint-disable */
import { MemberSubscriptionList } from '../../subscription/MemberSubscriptionList'
/* eslint-enable */

interface GroupPublicDetailComponentProps {
  group: Group
}

export const GroupPublicDetailComponent = ({ group }: GroupPublicDetailComponentProps) => {
  console.log({ ...group })
  return (
    <>
      <Divider orientation="left">Subscriptions</Divider>
      <MemberSubscriptionList
        groupId={group.id}
        onSelect={(optionId: string) => console.log(optionId)}
      />
    </>
  )
}
