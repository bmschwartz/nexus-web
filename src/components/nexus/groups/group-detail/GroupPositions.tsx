import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { GroupPositionTable } from 'components/nexus/positions/GroupPositionTable'
import { Exchange } from 'types/exchange'
import { GroupPositionExchangeTable } from 'components/nexus/positions/GroupPositionExchanges'
// import { CreatePositionForm } from 'components/nexus/positions/CreatePositionForm'
// import { PositionDetail } from 'components/nexus/positions/PositionDetail'

interface GroupPositionsProps {
  group: Group
  tabState: GroupPositionsTabState
  setTabState: (tabState: GroupPositionsTabState) => void
}

export enum GroupPositionsTabState {
  CREATE,
  VIEW_ALL,
  VIEW_DETAIL,
  VIEW_EXCHANGES,
}

export const GroupPositions: FC<GroupPositionsProps> = ({ tabState, group, setTabState }) => {
  const [selectedPositionId, setSelectedPositionId] = useState<string>()
  const [selectedExchange, setSelectedExchange] = useState<Exchange>()

  const onClickCreateOrderSet = () => {
    setTabState(GroupPositionsTabState.CREATE)
  }
  const onClickBack = () => {
    setTabState(GroupPositionsTabState.VIEW_EXCHANGES)
  }
  const onClickPosition = (positionId: string) => {
    setSelectedPositionId(positionId)
    console.log(selectedPositionId)
    setTabState(GroupPositionsTabState.VIEW_DETAIL)
  }
  const onClickExchange = (exchange: Exchange) => {
    setSelectedExchange(exchange)
    setTabState(GroupPositionsTabState.VIEW_ALL)
  }
  // const onPositionCreated = () => {
  //   setTabState(GroupPositionsTabState.VIEW_ALL)
  // }

  return (
    <div className="card">
      {tabState === GroupPositionsTabState.VIEW_EXCHANGES && (
        <GroupPositionExchangeTable groupId={group.id} onClickExchange={onClickExchange} />
      )}
      {tabState === GroupPositionsTabState.VIEW_ALL && selectedExchange && (
        <GroupPositionTable
          groupId={group.id}
          exchange={selectedExchange}
          onClickBack={onClickBack}
          onClickCreate={onClickCreateOrderSet}
          onClickPosition={onClickPosition}
        />
      )}
      {/* {tabState === GroupPositionsTabState.CREATE && (
        <CreatePositionForm group={group} onClickBack={onClickBack} onCreated={onPositionCreated} />
      )}
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
