import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MembershipInfoProps {
  membership: Membership
}

export const MembershipInfo: FC<MembershipInfoProps> = ({ membership }) => {
  return (
    <>
      <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
        <strong className="mr-3">Role</strong>
        {membership.role}
      </div>
      <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
        <strong className="mr-3">Status</strong>
        {membership.status}
      </div>
    </>
  )
}
