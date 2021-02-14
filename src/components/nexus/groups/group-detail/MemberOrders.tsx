import React, { FC, useState } from 'react'

import { Membership } from 'types/membership'
import { MemberOrdersTable } from 'components/nexus/orders/MemberOrdersTable'
import { MemberOrderDetail } from 'components/nexus/orders/MemberOrderDetail'
import { hasActiveSubscription, NoActiveSubscription } from 'components/nexus/membership/common'

interface MemberOrdersProps {
  membership: Membership
  tabState: MemberOrdersTabState
  setTabState: (tabState: MemberOrdersTabState) => void
  onClickAddSubscription: () => void
}

export enum MemberOrdersTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}

export const MemberOrders: FC<MemberOrdersProps> = ({
  membership,
  tabState,
  setTabState,
  onClickAddSubscription,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>()

  const onClickBack = () => {
    setTabState(MemberOrdersTabState.VIEW_ALL)
  }

  const onClickOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    setTabState(MemberOrdersTabState.VIEW_DETAIL)
  }

  function shouldShowViewAll() {
    return (
      hasActiveSubscription(membership) &&
      (tabState === MemberOrdersTabState.VIEW_ALL ||
        (tabState === MemberOrdersTabState.VIEW_DETAIL && !selectedOrderId))
    )
  }

  return (
    <div>
      {!hasActiveSubscription(membership) && (
        <NoActiveSubscription onClickAddSubscription={onClickAddSubscription} />
      )}
      {shouldShowViewAll() && (
        <MemberOrdersTable membershipId={membership.id} onClickOrder={onClickOrder} />
      )}
      {tabState === MemberOrdersTabState.VIEW_DETAIL && selectedOrderId && (
        <MemberOrderDetail onClickBack={onClickBack} orderId={selectedOrderId} />
      )}
    </div>
  )
}
