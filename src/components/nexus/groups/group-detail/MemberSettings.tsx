import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MemberSettingsProps {
  membership: Membership
}

export const MemberSettings: FC<MemberSettingsProps> = ({ membership }) => {
  return <p>Member settings for {membership.memberId}</p>
}
