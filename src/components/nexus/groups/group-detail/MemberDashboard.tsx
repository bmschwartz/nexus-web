import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MemberDashboardProps {
  membership: Membership
}

export const MemberDashboard: FC<MemberDashboardProps> = ({ membership }) => {
  return <p>Dashboard for member id: {membership.memberId}</p>
}
