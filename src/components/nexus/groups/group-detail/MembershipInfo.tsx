import { PageHeader } from 'antd'
import React, { FC } from 'react'
import { Membership } from 'types/membership'

interface MembershipInfoProps {
  membership: Membership
}

export const MembershipInfo: FC<MembershipInfoProps> = ({ membership }) => {
  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Membership" backIcon={false} />
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
          <strong className="mr-3">Role</strong>
          {membership.role}
        </div>
        <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
          <strong className="mr-3">Status</strong>
          {membership.status}
        </div>
        <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
          <strong className="mr-3">Active</strong>
          {`${membership.active ? 'Yes' : 'No'}`}
        </div>
      </div>
    </div>
  )
}
