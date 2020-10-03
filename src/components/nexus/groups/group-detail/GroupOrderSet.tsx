import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { OrderSetTable } from 'components/nexus/order-sets/OrderSetTable'
import CreateOrderSetForm from 'components/nexus/order-sets/CreateOrderSetForm'
import { OrderSetDetail } from 'components/nexus/order-sets/OrderSetDetail'

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

export const GroupOrderSets: FC<GroupOrderSetsProps> = ({ tabState, group, setTabState }) => {
  const [selectedOrderSetId, setSelectedOrderSetId] = useState<String>()

  const onClickCreateOrderSet = () => {
    setTabState(OrderSetTabState.CREATE)
  }
  const onClickBack = () => {
    setTabState(OrderSetTabState.VIEW_ALL)
  }
  const onClickOrderSet = (orderSetId: String) => {
    setSelectedOrderSetId(orderSetId)
    setTabState(OrderSetTabState.VIEW_DETAIL)
  }
  const onOrderSetCreated = () => {
    setTabState(OrderSetTabState.VIEW_ALL)
  }

  return (
    <div className="card">
      {tabState === OrderSetTabState.VIEW_ALL && (
        <OrderSetTable
          groupId={group.id}
          onClickCreate={onClickCreateOrderSet}
          onClickOrderSet={onClickOrderSet}
        />
      )}
      {tabState === OrderSetTabState.CREATE && (
        <CreateOrderSetForm group={group} onClickBack={onClickBack} onCreated={onOrderSetCreated} />
      )}
      {tabState === OrderSetTabState.VIEW_DETAIL && (
        <OrderSetDetail onClickBack={onClickBack} orderSetId={selectedOrderSetId} />
      )}
    </div>
  )
}
