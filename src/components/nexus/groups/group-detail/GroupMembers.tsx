import React, { FC, useState } from 'react'

import { Group } from 'types/group'
import { GroupMembersTable } from 'components/nexus/group-members/GroupMembersTable'
import { GroupMemberDetail } from 'components/nexus/group-members/GroupMemberDetail'

interface GroupMembersProps {
  group: Group
  tabState: GroupMembersTabState
  setTabState: (tabState: GroupMembersTabState) => void
}

export enum GroupMembersTabState {
  VIEW_ALL,
  INVITE,
  VIEW_DETAIL,
}

export const GroupMembers: FC<GroupMembersProps> = ({ group, tabState, setTabState }) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>()

  const onClickInvite = () => {
    setTabState(GroupMembersTabState.INVITE)
  }
  const onClickBack = () => {
    setTabState(GroupMembersTabState.VIEW_ALL)
  }
  const onClickMember = (memberId: string) => {
    setSelectedMemberId(memberId)
    setTabState(GroupMembersTabState.VIEW_DETAIL)
  }
  // const onMemberInvited = () => {
  //   setTabState(GroupMembersTabState.VIEW_ALL)
  // }

  function shouldShowViewAll() {
    return (
      tabState === GroupMembersTabState.VIEW_ALL ||
      (tabState === GroupMembersTabState.VIEW_DETAIL && !selectedMemberId)
    )
  }

  return (
    <div className="card">
      {shouldShowViewAll() && (
        <GroupMembersTable
          groupId={group.id}
          onClickInvite={onClickInvite}
          onClickGroupMember={onClickMember}
        />
      )}
      {/* {tabState === GroupMembersTabState.INVITE && (
        <CreateOrderSetForm group={group} onClickBack={onClickBack} onCreated={onOrderSetCreated} />
      )} */}
      {tabState === GroupMembersTabState.VIEW_DETAIL && selectedMemberId && (
        <GroupMemberDetail onClickBack={onClickBack} groupMemberId={selectedMemberId} />
      )}
    </div>
  )
}
