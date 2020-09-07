import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MemberPositionsProps {
  membership: Membership
}

export const MemberPositions: FC<MemberPositionsProps> = ({ membership }) => {
  return <p>Positions for member id: {membership.memberId}</p>
}
