import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { Membership } from 'types/membership'
import { Tabs } from 'antd'

/* eslint-disable */
import { availableTabs, Tab, TabKey } from './groupTabs'
import { GroupDashboard } from './GroupDashboard'
import { GroupOrderSets, OrderSetTabState } from './GroupOrderSet'
import { GroupPositions, GroupPositionsTabState } from './GroupPositions'
import { GroupSettings } from './GroupSettings'
import { MemberDashboard } from './MemberDashboard'
import { MemberPositions, MemberPositionsTabState } from './MemberPositions'
import { MemberOrders, MemberOrdersTabState } from '../../orders/MemberOrders'
import { MembershipTab, MembershipTabTabState } from '../../membership/MembershipTab'
import { MemberExchanges, MemberExchangesTabState } from './MemberExchanges'
import { GroupProfile } from './GroupProfile'
import { GroupRequests } from './GroupRequests'
import { GroupMembers, GroupMembersTabState } from './GroupMembers'
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
  const [groupMembersTabState, setGroupMembersTabState] = useState<GroupMembersTabState>(
    GroupMembersTabState.VIEW_ALL,
  )
  const [groupPositionsTabState, setGroupPositionsTabState] = useState<GroupPositionsTabState>(
    GroupPositionsTabState.VIEW_ALL,
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
  const [memberPositionsTabState, setMemberPositionsTabState] = useState<MemberPositionsTabState>(
    MemberPositionsTabState.VIEW_ALL,
  )

  const changeTab = (key: string): void => {
    setTabKey(key)
  }

  const onClickAddSubscription = (): void => {
    setMembershipTabTabState(MembershipTabTabState.VIEW_ALL)
    changeTab(TabKey.MemberMembership)
  }

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12">
        <div>
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
                    onClickAddSubscription={onClickAddSubscription}
                  />
                )}
                {tabKey === 'memberPositions' && (
                  <MemberPositions
                    membership={myMembership}
                    tabState={memberPositionsTabState}
                    setTabState={setMemberPositionsTabState}
                    onClickAddSubscription={onClickAddSubscription}
                  />
                )}
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
                    onClickAddSubscription={onClickAddSubscription}
                  />
                )}

                {/* Group Admin/Trader tabs */}
                {tabKey === 'groupDashboard' && <GroupDashboard group={group} />}
                {tabKey === 'groupMembers' && (
                  <GroupMembers
                    group={group}
                    tabState={groupMembersTabState}
                    setTabState={setGroupMembersTabState}
                  />
                )}
                {tabKey === 'groupOrders' && (
                  <GroupOrderSets
                    group={group}
                    tabState={groupOrdersTabState}
                    setTabState={setGroupOrdersTabState}
                  />
                )}
                {tabKey === 'groupPositions' && (
                  <GroupPositions
                    group={group}
                    tabState={groupPositionsTabState}
                    setTabState={setGroupPositionsTabState}
                  />
                )}
                {tabKey === 'groupRequests' && <GroupRequests group={group} />}
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
