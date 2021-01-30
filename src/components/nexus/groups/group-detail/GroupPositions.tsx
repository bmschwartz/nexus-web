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
  const [selectedPositionId, setSelectedPositionId] = useState<string>()
  const [selectedExchange, setSelectedExchange] = useState<Exchange>()
  const [selectedSymbol, setSelectedSymbol] = useState<string>()

  const onClickPosition = (positionId: string) => {
    setSelectedPositionId(positionId)
    console.log(selectedPositionId)
    setTabState(GroupPositionsTabState.VIEW_DETAIL)
  }
  const onClickClosePositions = () => {
    setTabState(GroupPositionsTabState.CLOSE_POSITIONS)
  }
  const onPositionsClosed = () => {
    setTabState(GroupPositionsTabState.VIEW_ALL)
  }
  const onClickBack = () => {
    setTabState(GroupPositionsTabState.VIEW_ALL)
  }

  function shouldShowViewAll() {
    return (
      tabState === GroupPositionsTabState.VIEW_ALL ||
      (tabState === GroupPositionsTabState.VIEW_DETAIL && !selectedPositionId)
    )
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
          onClickPosition={onClickPosition}
          onClickClosePositions={onClickClosePositions}
        />
      )}
      {tabState === GroupPositionsTabState.CLOSE_POSITIONS &&
        selectedSymbol &&
        selectedExchange && (
          <ClosePositionsForm
            groupId={group.id}
            symbol={selectedSymbol}
            exchange={selectedExchange}
            onClickBack={onClickBack}
            onClosePositions={onPositionsClosed}
          />
        )}
      {/*
      {tabState === GroupPositionsTabState.VIEW_DETAIL && selectedPositionId && (
        <PositionDetail
          groupId={group.id}
          onClickBack={onClickBack}
          positionId={selectedPositionId}
        />
      )} */}
    </div>
  )
}
