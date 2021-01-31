import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { GroupPositionTable } from 'components/nexus/positions/GroupPositionTable'
import { ClosePositionsForm } from 'components/nexus/positions/ClosePositionsForm'
import { Exchange } from 'types/exchange'
// import { GroupPositionExchangeTable } from 'components/nexus/positions/GroupPositionExchanges'
// import { CreatePositionForm } from 'components/nexus/positions/CreatePositionForm'
// import { PositionDetail } from 'components/nexus/positions/PositionDetail'

interface GroupPositionsProps {
  group: Group
  tabState: GroupPositionsTabState
  setTabState: (tabState: GroupPositionsTabState) => void
}

export enum GroupPositionsTabState {
  VIEW_ALL,
  VIEW_DETAIL,
  CLOSE_POSITIONS,
}

export const GroupPositions: FC<GroupPositionsProps> = ({ tabState, setTabState, group }) => {
  const [selectedExchange, setSelectedExchange] = useState<Exchange>()
  const [selectedSymbol, setSelectedSymbol] = useState<string>()

  const onClickClosePositions = () => {
    setTabState(GroupPositionsTabState.CLOSE_POSITIONS)
  }
  const onPositionsClosed = (orderSetId: string) => {
    setTabState(GroupPositionsTabState.VIEW_ALL)
    // TODO: Go to OrderSetDetail page?
    console.log(orderSetId)
  }
  const onClickBack = () => {
    setTabState(GroupPositionsTabState.VIEW_ALL)
  }

  function shouldShowViewAll() {
    return tabState === GroupPositionsTabState.VIEW_ALL
  }

  return (
    <div className="card">
      {shouldShowViewAll() && (
        <GroupPositionTable
          groupId={group.id}
          selectedSymbol={selectedSymbol}
          selectedExchange={selectedExchange}
          clearSymbol={() => setSelectedSymbol(undefined)}
          onChangeSymbol={setSelectedSymbol}
          onChangeExchange={setSelectedExchange}
          onClickClosePositions={onClickClosePositions}
        />
      )}
      {tabState === GroupPositionsTabState.CLOSE_POSITIONS &&
        selectedSymbol &&
        selectedExchange && (
          <ClosePositionsForm
            group={group}
            symbol={selectedSymbol}
            exchange={selectedExchange}
            onClickBack={onClickBack}
            onClosePositions={onPositionsClosed}
          />
        )}
    </div>
  )
}
