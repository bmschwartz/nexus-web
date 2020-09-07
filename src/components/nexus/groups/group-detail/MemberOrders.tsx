import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MemberOrdersProps {
  membership: Membership
}

export const MemberOrders: FC<MemberOrdersProps> = ({ membership }) => {
  return <p>Orders for member id: {membership.memberId}</p>
}
