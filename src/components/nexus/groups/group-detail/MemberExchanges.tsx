import React, { FC, useState } from 'react'
import { Membership, MembershipStatus } from 'types/membership'

/* eslint-disable */
import { ExchangeAccountTable } from 'components/nexus/exchange-accounts/ExchangeAccountTable'
import { CreateExchangeAccountForm } from 'components/nexus/exchange-accounts/CreateExchangeAccountForm'
import { ExchangeAccountDetail } from 'components/nexus/exchange-accounts/ExchangeAccountDetail'
import { hasActiveSubscription, NoActiveSubscription } from '../../membership/common'
/* eslint-enable */

interface MemberExchangesProps {
  membership: Membership
  tabState: MemberExchangesTabState
  setTabState: (tabState: MemberExchangesTabState) => void
}

export enum MemberExchangesTabState {
  VIEW_ALL,
  CREATE_EXCHANGE_ACCOUNT,
  VIEW_DETAIL_EXCHANGE_ACCOUNT,
}

export const MemberExchanges: FC<MemberExchangesProps> = ({
  membership,
  tabState,
  setTabState,
}) => {
  const [selectedExchangeName, setSelectedExchangeName] = useState<string>()
  const [selectedExchangeAccountId, setSelectedExchangeAccountId] = useState<string>()

  const onClickBack = () => {
    setTabState(MemberExchangesTabState.VIEW_ALL)
  }

  const onExchangeAccountCreated = () => {
    setTabState(MemberExchangesTabState.VIEW_ALL)
  }

  const onClickCreateExchangeAccount = () => {
    setTabState(MemberExchangesTabState.CREATE_EXCHANGE_ACCOUNT)
  }

  const onClickExchangeAccount = (exchangeAccountId: string, exchange: string) => {
    setSelectedExchangeAccountId(exchangeAccountId)
    setSelectedExchangeName(exchange)
    setTabState(MemberExchangesTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT)
  }

  function shouldShowViewAll() {
    return (
      (hasActiveSubscription(membership) && tabState === MemberExchangesTabState.VIEW_ALL) ||
      (tabState === MemberExchangesTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT &&
        !selectedExchangeAccountId)
    )
  }
  return (
    <div>
      {!hasActiveSubscription(membership) && NoActiveSubscription}
      {shouldShowViewAll() && (
        <>
          {membership.status === MembershipStatus.Approved && (
            <ExchangeAccountTable
              membership={membership}
              onClickCreate={onClickCreateExchangeAccount}
              onClickExchangeAccount={onClickExchangeAccount}
            />
          )}
        </>
      )}
      {tabState === MemberExchangesTabState.CREATE_EXCHANGE_ACCOUNT && (
        <CreateExchangeAccountForm
          membership={membership}
          onClickBack={onClickBack}
          onCreated={onExchangeAccountCreated}
        />
      )}
      {tabState === MemberExchangesTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT &&
        selectedExchangeAccountId && (
          <ExchangeAccountDetail
            exchange={selectedExchangeName}
            onClickBack={onClickBack}
            exchangeAccountId={selectedExchangeAccountId}
          />
        )}
    </div>
  )
}
