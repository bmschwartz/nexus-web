import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { Membership } from 'types/membership'
import { Tabs } from 'antd'

/* eslint-disable */
import { availableTabs, Tab } from './groupTabs'
import { GroupDashboard } from './GroupDashboard'
import { GroupOrderSets, OrderSetTabState } from './GroupOrderSet'
import { GroupPositions } from './GroupPositions'
import { GroupSettings } from './GroupSettings'
import { MemberDashboard } from './MemberDashboard'
import { MemberPositions } from './MemberPositions'
import { MemberOrders, MemberOrdersTabState } from './MemberOrders'
import { MembershipTab, MembershipTabTabState } from './MembershipTab'
import { MemberExchanges, MemberExchangesTabState } from './MemberExchanges'
import { GroupProfile } from './GroupProfile'
import { GroupMembers } from './GroupMembers'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
/* eslint-enable */

interface GroupDetailCardProps {
  group: Group
  myMembership: Membership
}

export const GroupDetailCard: FC<GroupDetailCardProps> = ({ group, myMembership }) => {
  const menuTabs: Tab[] = availableTabs(myMembership.role)
  const accessibleTabKeys = menuTabs.map(menuTab => menuTab.key)

  const [tabKey, setTabKey] = useQueryParam('tab', withDefault(StringParam, menuTabs[0].key))

  const [groupOrdersTabState, setGroupOrdersTabState] = useState<OrderSetTabState>(
    OrderSetTabState.VIEW_ALL,
  )
  const [membershipTabTabState, setMembershipTabTabState] = useState<MembershipTabTabState>(
    MembershipTabTabState.VIEW_ALL,
  )
  const [memberExchangesTabState, setMemberExchangesTabState] = useState<MemberExchangesTabState>(
    MemberExchangesTabState.VIEW_ALL,
  )
  const [memberOrdersTabState, setMemberOrdersTabState] = useState<MemberOrdersTabState>(
    MemberOrdersTabState.VIEW_ALL,
  )

  const changeTab = (key: string): void => {
    setTabKey(key)
  }

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
            {!accessibleTabKeys.includes(tabKey) ? (
              <p>No access!</p>
            ) : (
              <>
                {/* Member tabs */}
                {tabKey === 'memberDashboard' && <MemberDashboard membership={myMembership} />}
                {tabKey === 'memberOrders' && (
                  <MemberOrders
                    membership={myMembership}
                    tabState={memberOrdersTabState}
                    setTabState={setMemberOrdersTabState}
                  />
                )}
                {tabKey === 'memberPositions' && <MemberPositions membership={myMembership} />}
                {tabKey === 'membershipTab' && (
                  <MembershipTab
                    membership={myMembership}
                    tabState={membershipTabTabState}
                    setTabState={setMembershipTabTabState}
                  />
                )}
                {tabKey === 'memberExchanges' && (
                  <MemberExchanges
                    membership={myMembership}
                    tabState={memberExchangesTabState}
                    setTabState={setMemberExchangesTabState}
                  />
                )}

                {/* Group Admin/Trader tabs */}
                {tabKey === 'groupDashboard' && <GroupDashboard group={group} />}
                {tabKey === 'groupMembers' && <GroupMembers group={group} />}
                {tabKey === 'groupOrders' && (
                  <GroupOrderSets
                    group={group}
                    tabState={groupOrdersTabState}
                    setTabState={setGroupOrdersTabState}
                  />
                )}
                {tabKey === 'groupPositions' && <GroupPositions group={group} />}
                {tabKey === 'groupProfile' && <GroupProfile group={group} />}
                {tabKey === 'groupSettings' && <GroupSettings group={group} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
