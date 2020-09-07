import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { Membership } from 'types/membership'
import { Tabs } from 'antd'

/* eslint-disable */
import { availableTabs, Tab } from './groupTabs'
import { GroupDashboard } from './GroupDashboard'
import { GroupOrders } from './GroupOrders'
import { GroupPositions } from './GroupPositions'
import { GroupSettings } from './GroupSettings'
import { MemberDashboard } from './MemberDashboard'
import { MemberPositions } from './MemberPositions'
import { MemberOrders } from './MemberOrders'
import { MemberSettings } from './MemberSettings'
import { GroupProfile } from './GroupProfile'
import { GroupMembers } from './GroupMembers'
/* eslint-enable */

interface GroupDetailCardProps {
  group: Group
  membership: Membership
}

export const GroupDetailCard: FC<GroupDetailCardProps> = ({ group, membership }) => {
  const menuTabs: Tab[] = availableTabs(membership.role)

  const [tabKey, setTabKey] = useState<string>(menuTabs[0].key)

  const changeTab = (key: string): void => {
    setTabKey(key)
  }

  console.log(tabKey)
  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header card-header-flex flex-column">
            <Tabs activeKey={tabKey} className="mr-auto kit-tabs-bold" onChange={changeTab}>
              {menuTabs.map(({ key, name }: Tab) => {
                return <Tabs.TabPane key={key} tab={name} />
              })}
            </Tabs>
          </div>
          <div className="card-body">
            {/* Member tabs */}
            {tabKey === 'memberDashboard' && <MemberDashboard membership={membership} />}
            {tabKey === 'memberOrders' && <MemberOrders membership={membership} />}
            {tabKey === 'memberPositions' && <MemberPositions membership={membership} />}
            {tabKey === 'memberSettings' && <MemberSettings membership={membership} />}

            {/* Group tabs */}
            {tabKey === 'groupDashboard' && <GroupDashboard group={group} />}
            {tabKey === 'groupMembers' && <GroupMembers memberships={group.memberships} />}
            {tabKey === 'groupOrders' && <GroupOrders group={group} />}
            {tabKey === 'groupPositions' && <GroupPositions group={group} />}
            {tabKey === 'groupProfile' && <GroupProfile group={group} />}
            {tabKey === 'groupSettings' && <GroupSettings group={group} />}
          </div>
        </div>
      </div>
    </div>
  )
}
