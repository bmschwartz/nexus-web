import React, { FC, useState } from 'react'

import { MyOrdersTable } from 'components/nexus/orders/MyOrdersTable'
import { MemberOrderDetail } from 'components/nexus/orders/MemberOrderDetail'

interface MyOrdersProps {
  tabState: MyOrdersTabState
  setTabState: (tabState: MyOrdersTabState) => void
}

export enum MyOrdersTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}

export const MyOrders: FC<MyOrdersProps> = ({ tabState, setTabState }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>()

  const onClickBack = () => {
    setTabState(MyOrdersTabState.VIEW_ALL)
  }

  const onClickOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    setTabState(MyOrdersTabState.VIEW_DETAIL)
  }

  function shouldShowViewAll() {
    return (
      tabState === MyOrdersTabState.VIEW_ALL ||
      (tabState === MyOrdersTabState.VIEW_DETAIL && !selectedOrderId)
    )
  }

  return (
    <div>
      {shouldShowViewAll() && <MyOrdersTable onClickOrder={onClickOrder} />}
      {tabState === MyOrdersTabState.VIEW_DETAIL && selectedOrderId && (
        <MemberOrderDetail onClickBack={onClickBack} orderId={selectedOrderId} />
      )}
    </div>
  )
}
