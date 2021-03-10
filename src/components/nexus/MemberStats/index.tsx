import React from 'react'
import { Spin } from 'antd'

interface MemberStatsProps {
  totalMembers?: number
}

const MemberStats = ({ totalMembers }: MemberStatsProps) => {
  const countLabel = totalMembers !== undefined ? totalMembers : <Spin />

  return (
    <>
      <div className="d-flex flex-wrap align-items-center">
        <div className="mr-auto">
          <p className="text-uppercase text-dark font-weight-bold mb-1">Members</p>
        </div>
        <p className="text-primary font-weight-bold font-size-24 mb-0">{countLabel}</p>
      </div>
    </>
  )
}

export default MemberStats
