import React, { FC } from 'react'

import { Group } from 'types/group'
import { Membership } from 'types/membership'

/* eslint-disable */
import { GroupReadOnlyProfile } from './GroupReadOnlyProfile'
import { hasActiveSubscription, NoActiveSubscription } from '../../subscription/common'
/* eslint-enable */

interface MemberDashboardProps {
  group: Group
  membership: Membership
  onClickAddSubscription: () => void
}

export const MemberDashboard: FC<MemberDashboardProps> = ({
  group,
  membership,
  onClickAddSubscription,
}) => {
  return (
    <>
      {!hasActiveSubscription(membership) && (
        <NoActiveSubscription
          groupId={membership.groupId}
          onClickAddSubscription={onClickAddSubscription}
        />
      )}
      <div className="card">
        <div className="card-body">
          <GroupReadOnlyProfile group={group} />
        </div>
      </div>
    </>
  )
}
