import React from 'react'
import { Group } from 'types/group'

/* eslint-disable */
import { MemberSubscriptionList } from '../../subscription/MemberSubscriptionList'
import { GroupReadOnlyProfile } from './GroupReadOnlyProfile'
/* eslint-enable */

interface GroupPublicDetailComponentProps {
  group: Group
}

export const GroupPublicDetailComponent = ({ group }: GroupPublicDetailComponentProps) => {
  console.log({ ...group })
  return (
    <>
      <MemberSubscriptionList
        groupId={group.id}
        onSelect={(optionId: string) => console.log(optionId)}
      />
      <div className="card">
        <div className="card-body">
          <GroupReadOnlyProfile group={group} />
        </div>
      </div>
    </>
  )
}
