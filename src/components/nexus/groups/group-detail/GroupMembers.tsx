import React, { FC, useState } from 'react'

import { Group } from 'types/group'
import { GroupMembersTable } from 'components/nexus/group-members/GroupMembersTable'
import { GroupMemberDetail } from 'components/nexus/group-members/GroupMemberDetail'
import { GroupMemberInviteForm } from 'components/nexus/group-members/GroupMemberInviteForm'

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
    setSelectedMemberId(undefined)
  }
  const onClickBack = () => {
    setTabState(GroupMembersTabState.VIEW_ALL)
    setSelectedMemberId(undefined)
  }
  const onClickMember = (memberId: string) => {
    setSelectedMemberId(memberId)
    setTabState(GroupMembersTabState.VIEW_DETAIL)
  }
  const onRemovedMember = () => {
    setSelectedMemberId(undefined)
    setTabState(GroupMembersTabState.VIEW_ALL)
  }
  const onMemberInvited = () => {
    setTabState(GroupMembersTabState.VIEW_ALL)
  }

  function shouldShowViewAll() {
    return (
      tabState === GroupMembersTabState.VIEW_ALL ||
      (tabState === GroupMembersTabState.VIEW_DETAIL && !selectedMemberId)
    )
  }

  return (
    <div>
      {shouldShowViewAll() && (
        <GroupMembersTable
          groupId={group.id}
          onClickInvite={onClickInvite}
          onClickGroupMember={onClickMember}
        />
      )}
      {tabState === GroupMembersTabState.INVITE && (
        <GroupMemberInviteForm
          group={group}
          onClickBack={onClickBack}
          onInvited={onMemberInvited}
        />
      )}
      {tabState === GroupMembersTabState.VIEW_DETAIL && selectedMemberId && (
        <GroupMemberDetail
          groupMemberId={selectedMemberId}
          onClickBack={onClickBack}
          onRemovedMember={onRemovedMember}
        />
      )}
    </div>
  )
}
