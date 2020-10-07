import React, { FC, useState } from 'react'
import { Membership } from 'types/membership'

interface MemberOrdersProps {
  membership: Membership
  tabState: MemberOrdersTabState
  setTabState: (tabState: MemberOrdersTabState) => void
}

export enum MemberOrdersTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}

export const MemberOrders: FC<MemberOrdersProps> = ({ membership, tabState, setTabState }) => {
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
      tabState === MemberOrdersTabState.VIEW_ALL ||
      (tabState === MemberOrdersTabState.VIEW_DETAIL && !selectedOrderId)
    )
  }

  return (
    <div className="card">
      {shouldShowViewAll() && (
        <MemberOrdersTable membershipId={membership.id} onClickOrder={onClickOrder} />
      )}
      {tabState === MemberOrdersTabState.VIEW_DETAIL && selectedOrderId && (
        <MemberOrderDetail
          membershipId={membership.id}
          onClickBack={onClickBack}
          orderId={selectedOrderId}
        />
      )}
    </div>
  )
}
