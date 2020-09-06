import React, { FC } from 'react'
import { Group } from 'types/group'
import { Membership } from 'types/membership'

interface GroupDetailCardProps {
  group: Group
  membership: Membership
}

export const GroupDetailCard: FC<GroupDetailCardProps> = ({ group, membership }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-nowrap">
          {group.name} {membership.id}
        </div>
      </div>
    </div>
  )
}
