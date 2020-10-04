import React, { FC, useState } from 'react'
import { Membership, MembershipStatus } from 'types/membership'

/* eslint-disable */
import { MembershipInfo } from './MembershipInfo'
import { ExchangeAccountTable } from 'components/nexus/exchange-accounts/ExchangeAccountTable'
import { CreateExchangeAccountForm } from 'components/nexus/exchange-accounts/CreateExchangeAccountForm'
/* eslint-enable */

interface MemberSettingsProps {
  membership: Membership
  tabState: MemberSettingsTabState
  setTabState: (tabState: MemberSettingsTabState) => void
}

export enum MemberSettingsTabState {
  VIEW_ALL,
  CREATE_EXCHANGE_ACCOUNT,
  VIEW_DETAIL_EXCHANGE_ACCOUNT,
}

export const MemberSettings: FC<MemberSettingsProps> = ({ membership, tabState, setTabState }) => {
  const [selectedExchangeAccountId, setSelectedExchangeAccountId] = useState<string>()

  const onClickBack = () => {
    setTabState(MemberSettingsTabState.VIEW_ALL)
  }

  const onExchangeAccountCreated = () => {
    setTabState(MemberSettingsTabState.VIEW_ALL)
  }

  const onClickCreateExchangeAccount = () => {
    setTabState(MemberSettingsTabState.CREATE_EXCHANGE_ACCOUNT)
  }

  const onClickExchangeAccount = (exchangeAccountId: string) => {
    setSelectedExchangeAccountId(exchangeAccountId)
    setTabState(MemberSettingsTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT)
  }

  function shouldShowViewAll() {
    return (
      tabState === MemberSettingsTabState.VIEW_ALL ||
      (tabState === MemberSettingsTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT &&
        !selectedExchangeAccountId)
    )
  }
  return (
    <div>
      {shouldShowViewAll() && (
        <>
          <MembershipInfo membership={membership} />
          {membership.status === MembershipStatus.Approved && (
            <ExchangeAccountTable
              membership={membership}
              onClickCreate={onClickCreateExchangeAccount}
              onClickExchangeAccount={onClickExchangeAccount}
            />
          )}
        </>
      )}
      {tabState === MemberSettingsTabState.CREATE_EXCHANGE_ACCOUNT && (
        <CreateExchangeAccountForm
          membership={membership}
          onClickBack={onClickBack}
          onCreated={onExchangeAccountCreated}
        />
      )}
      {/* {tabState === MemberSettingsTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT && selectedExchangeAccountId && (
        <ExchangeAccountDetail
          onClickBack={onClickBack}
          exchangeAccountId={selectedExchangeAccountId}
        />
      )} */}
    </div>
  )
}
