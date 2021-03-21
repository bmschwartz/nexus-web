import React, { FC } from 'react'

import { Group } from 'types/group'
import { Membership } from 'types/membership'

/* eslint-disable */
import { GroupReadOnlyProfile } from './GroupReadOnlyProfile'
/* eslint-enable */

interface MemberDashboardProps {
  group: Group
  membership: Membership
}

export const MemberDashboard: FC<MemberDashboardProps> = ({ group }) => {
  return (
    <div className="card">
      <div className="card-body">
        <GroupReadOnlyProfile group={group} />
      </div>
    </div>
  )
}
