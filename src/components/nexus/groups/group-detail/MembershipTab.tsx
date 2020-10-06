import React, { FC } from 'react'
import { Membership } from 'types/membership'

/* eslint-disable */
import { MembershipInfo } from './MembershipInfo'
// import { SubscriptionTable } from 'components/nexus/subscriptions/SubscriptionTable'
// import { CreateSubscriptionForm } from 'components/nexus/subscriptions/CreateSubscriptionForm'
/* eslint-enable */

interface MembershipTabProps {
  membership: Membership
  tabState: MembershipTabTabState
  setTabState: (tabState: MembershipTabTabState) => void
}

export enum MembershipTabTabState {
  VIEW_ALL,
  CREATE_SUBSCRIPTION,
  VIEW_DETAIL_SUBSCRIPTION,
}

export const MembershipTab: FC<MembershipTabProps> = ({ membership, tabState }) => {
  // const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>()

  // const onClickBack = () => {
  //   setTabState(MembershipTabTabState.VIEW_ALL)
  // }

  // const onSubscriptionCreated = () => {
  //   setTabState(MembershipTabTabState.VIEW_ALL)
  // }

  // const onClickCreateSubscription = () => {
  //   setTabState(MembershipTabTabState.CREATE_SUBSCRIPTION)
  // }

  // const onClickSubscription = (exchangeAccountId: string) => {
  //   setSelectedSubscriptionId(exchangeAccountId)
  //   setTabState(MembershipTabTabState.VIEW_DETAIL_SUBSCRIPTION)
  // }

  function shouldShowViewAll() {
    return (
      tabState === MembershipTabTabState.VIEW_ALL
      // (tabState === MembershipTabTabState.VIEW_DETAIL_SUBSCRIPTION &&
      //   !selectedSubscriptionId)
    )
  }
  return (
    <div>
      {shouldShowViewAll() && (
        <>
          <MembershipInfo membership={membership} />
          {/* {membership.status === MembershipStatus.Approved && (
            <SubscriptionTable
              membership={membership}
              onClickCreate={onClickCreateSubscription}
              onClickSubscription={onClickSubscription}
            />
          )} */}
        </>
      )}
      {tabState === MembershipTabTabState.CREATE_SUBSCRIPTION && (
        <div>CreateSubscriptionTable</div>
        // <CreateSubscriptionForm
        //   membership={membership}
        //   onClickBack={onClickBack}
        //   onCreated={onSubscriptionCreated}
        // />
      )}
      {/* {tabState === MembershipTabTabState.VIEW_DETAIL_EXCHANGE_ACCOUNT && selectedSubscriptionId && (
        <SubscriptionDetail
          onClickBack={onClickBack}
          exchangeAccountId={selectedSubscriptionId}
        />
      )} */}
    </div>
  )
}
