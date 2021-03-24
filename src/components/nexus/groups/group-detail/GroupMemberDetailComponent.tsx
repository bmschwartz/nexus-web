import React, { FC, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

/* eslint-disable */
import { Group } from 'types/group'
import { Membership } from 'types/membership'
import { availableTabs, Tab, TabKey } from './groupTabs'
import { GroupDashboard } from './GroupDashboard'
import { GroupOrderSets, OrderSetTabState } from './GroupOrderSet'
import { GroupPositions, GroupPositionsTabState } from './GroupPositions'
import { GroupSettings } from './GroupSettings'
import { MemberDashboard } from './MemberDashboard'
import { MemberPositions, MemberPositionsTabState } from './MemberPositions'
import { MemberOrders, MemberOrdersTabState } from '../../orders/MemberOrders'
import {
  MemberSubscription,
  MemberSubscriptionTabState,
} from '../../subscription/MemberSubscription'
import { MemberExchanges, MemberExchangesTabState } from './MemberExchanges'
import { GroupEditProfile } from './GroupEditProfile'
import { GroupRequests } from './GroupRequests'
import { GroupMembers, GroupMembersTabState } from './GroupMembers'
import { useParams } from 'react-router-dom'

/* eslint-enable */

interface GroupDetailCardProps {
  group: Group
  page?: string
  myMembership: Membership
}

interface RouteParams {
  groupId: string
  orderId?: string
}

export const GroupMemberDetailComponent: FC<GroupDetailCardProps> = ({
  group,
  myMembership,
  page,
}) => {
  const { groupId }: RouteParams = useParams()
  console.log(groupId, page)
  const menuTabs: Tab[] = availableTabs(myMembership)
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
  const [memberSubscriptionTabState, setMemberSubscriptionTabState] = useState<
    MemberSubscriptionTabState
  >(MemberSubscriptionTabState.VIEW_ALL)
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
    setMemberSubscriptionTabState(MemberSubscriptionTabState.VIEW_ALL)
    changeTab(TabKey.MemberSubscription)
  }

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12">
        <div>
          <div className="card-body">
            {!accessibleTabKeys.includes(tabKey) ? (
              <p>No access!</p>
            ) : (
              <>
                {/* Member tabs */}
                {tabKey === 'memberDashboard' && (
                  <MemberDashboard
                    group={group}
                    membership={myMembership}
                    onClickAddSubscription={onClickAddSubscription}
                  />
                )}
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
                {tabKey === 'memberSubscription' && (
                  <MemberSubscription
                    membership={myMembership}
                    tabState={memberSubscriptionTabState}
                    setTabState={setMemberSubscriptionTabState}
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
                {tabKey === 'groupProfile' && <GroupEditProfile group={group} />}
                {tabKey === 'groupSettings' && <GroupSettings group={group} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
