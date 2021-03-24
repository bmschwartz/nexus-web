import React, { FC, useState } from 'react'

/* eslint-disable */
import { Group } from 'types/group'
import { Membership } from 'types/membership'
import { MemberDashboard } from './MemberDashboard'
import { MemberPositions, MemberPositionsTabState } from './MemberPositions'
import { MemberOrders, MemberOrdersTabState } from '../../orders/MemberOrders'
import {
  MemberSubscription,
  MemberSubscriptionTabState,
} from '../../subscription/MemberSubscription'
import { MemberExchanges, MemberExchangesTabState } from './MemberExchanges'
/* eslint-enable */

interface GroupDetailCardProps {
  group: Group
  page?: string
  myMembership: Membership
}

export const GroupMemberDetailComponent: FC<GroupDetailCardProps> = ({
  page,
  group,
  myMembership,
}) => {
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

  const onClickAddSubscription = (): void => {
    setMemberSubscriptionTabState(MemberSubscriptionTabState.VIEW_ALL)
    // changeTab(TabKey.MemberSubscription)
  }

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12">
        <div>
          <div className="card-body">
            {page === 'dashboard' && (
              <MemberDashboard
                group={group}
                membership={myMembership}
                onClickAddSubscription={onClickAddSubscription}
              />
            )}
            {page === 'orders' && (
              <MemberOrders
                membership={myMembership}
                tabState={memberOrdersTabState}
                setTabState={setMemberOrdersTabState}
                onClickAddSubscription={onClickAddSubscription}
              />
            )}
            {page === 'positions' && (
              <MemberPositions
                membership={myMembership}
                tabState={memberPositionsTabState}
                setTabState={setMemberPositionsTabState}
                onClickAddSubscription={onClickAddSubscription}
              />
            )}
            {page === 'subscription' && (
              <MemberSubscription
                membership={myMembership}
                tabState={memberSubscriptionTabState}
                setTabState={setMemberSubscriptionTabState}
              />
            )}
            {page === 'exchanges' && (
              <MemberExchanges
                membership={myMembership}
                tabState={memberExchangesTabState}
                setTabState={setMemberExchangesTabState}
                onClickAddSubscription={onClickAddSubscription}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
