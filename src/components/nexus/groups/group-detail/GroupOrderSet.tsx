import React, { FC } from 'react'
import { Group } from 'types/group'
import { OrderSetTable } from 'components/nexus/order-sets/OrderSetTable'

interface GroupOrderSetsProps {
  group: Group
  tabState: OrderSetTabState
  setTabState: (tabState: OrderSetTabState) => void
}

export enum OrderSetTabState {
  VIEW_ALL,
  CREATE,
  VIEW_DETAIL,
}

export const GroupOrderSets: FC<GroupOrderSetsProps> = ({ tabState, setTabState }) => {
  const onClickCreateOrderSet = () => {
    setTabState(OrderSetTabState.CREATE)
  }

  return (
    <div className="card">
      {tabState === OrderSetTabState.VIEW_ALL && (
        <OrderSetTable onClickCreate={onClickCreateOrderSet} />
      )}
      {tabState === OrderSetTabState.CREATE && <div>Create order set</div>}
      {tabState === OrderSetTabState.VIEW_DETAIL && <div>View orderset detail</div>}
    </div>
  )
}
