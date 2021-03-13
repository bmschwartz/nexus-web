import React, { FC, useState } from 'react'
import { Membership } from 'types/membership'

/* eslint-disable */
import { MemberPositionsTable } from '../../positions/MemberPositionsTable'
import { MemberPositionDetail } from '../../positions/MemberPositionDetail'
import { hasActiveSubscription, NoActiveSubscription } from '../../subscription/common'
/* eslint-enable */

interface MemberPositionsProps {
  membership: Membership
  tabState: MemberPositionsTabState
  setTabState: (tabState: MemberPositionsTabState) => void
  onClickAddSubscription: () => void
}

export enum MemberPositionsTabState {
  VIEW_ALL,
  VIEW_DETAIL,
}

export const MemberPositions: FC<MemberPositionsProps> = ({
  membership,
  setTabState,
  tabState,
  onClickAddSubscription,
}) => {
  const [selectedPositionId, setSelectedPositionId] = useState<string>()

  const onClickBack = () => {
    setTabState(MemberPositionsTabState.VIEW_ALL)
  }

  const onClickPosition = (orderId: string) => {
    setSelectedPositionId(orderId)
    setTabState(MemberPositionsTabState.VIEW_DETAIL)
  }

  function shouldShowViewAll() {
    return (
      (hasActiveSubscription(membership) && tabState === MemberPositionsTabState.VIEW_ALL) ||
      (tabState === MemberPositionsTabState.VIEW_DETAIL && !selectedPositionId)
    )
  }

  return (
    <div>
      {!hasActiveSubscription(membership) && (
        <NoActiveSubscription onClickAddSubscription={onClickAddSubscription} />
      )}
      {shouldShowViewAll() && (
        <MemberPositionsTable membershipId={membership.id} onClickPosition={onClickPosition} />
      )}
      {tabState === MemberPositionsTabState.VIEW_DETAIL && selectedPositionId && (
        <MemberPositionDetail onClickBack={onClickBack} positionId={selectedPositionId} />
      )}
    </div>
  )
}
