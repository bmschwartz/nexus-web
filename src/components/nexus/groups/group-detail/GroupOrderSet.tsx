import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { OrderSetTable } from 'components/nexus/order-sets/OrderSetTable'

interface GroupOrderSetsProps {
  group: Group
}

enum OrderSetPageState {
  ORDER_SET_TABLE,
  ORDER_SET_CREATE,
  ORDER_SET_REVIEW,
}

export const GroupOrderSets: FC<GroupOrderSetsProps> = ({ group }) => {
  const [pageState, setPageState] = useState<OrderSetPageState>(OrderSetPageState.ORDER_SET_TABLE)

  console.log(`group id: ${group.id}`)

  const onClickCreateOrderSet = () => {
    setPageState(OrderSetPageState.ORDER_SET_CREATE)
  }

  return (
    <div className="card">
      {pageState === OrderSetPageState.ORDER_SET_TABLE && (
        <OrderSetTable onClickCreate={onClickCreateOrderSet} />
      )}
    </div>
  )
}
