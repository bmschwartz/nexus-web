import { PageHeader } from 'antd'
import React, { FC } from 'react'
import { Group } from 'types/group'

interface GroupDetailHeaderProps {
  className?: string
  group: Group
}

export const GroupDetailHeader: FC<GroupDetailHeaderProps> = ({ className, group }) => {
  return (
    <div className={className}>
      <PageHeader className="site-page-header" title={group.name.toUpperCase()} />
    </div>
  )
}
