import React, { FC } from 'react'
import { Membership } from 'types/membership'

/* eslint-disable */
import { PageHeader } from 'antd'
import { SubscriptionInfo } from './SubscriptionInfo'
/* eslint-enable */

interface MemberSubscriptionProps {
  membership: Membership
  tabState: MemberSubscriptionTabState
  setTabState: (tabState: MemberSubscriptionTabState) => void
}

export enum MemberSubscriptionTabState {
  VIEW_ALL,
  CREATE_SUBSCRIPTION,
  VIEW_DETAIL_SUBSCRIPTION,
}

export const MemberSubscription: FC<MemberSubscriptionProps> = ({ membership, tabState }) => {
  // const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>()

  // const onClickBack = () => {
  //   setTabState(MembershipTabTabState.VIEW_ALL)
  // }
  //
  // const onSubscriptionCreated = () => {
  //   setTabState(MembershipTabTabState.VIEW_ALL)
  // }

  // const onClickCreateSubscription = (membership: string) => {
  //   setSelectedSubscriptionId(exchangeAccountId)
  //   setTabState(MembershipTabTabState.VIEW_DETAIL_SUBSCRIPTION)
  // }

  function shouldShowViewAll() {
    return (
      tabState === MemberSubscriptionTabState.VIEW_ALL
      // (tabState === MembershipTabTabState.VIEW_DETAIL_SUBSCRIPTION &&
      //   !selectedSubscriptionId)
    )
  }
  return (
    <div>
      {shouldShowViewAll() && (
        <>
          <div className="card-header card-header-flex">
            <div className="d-flex flex-column justify-content-center mr-auto">
              <PageHeader className="site-page-header" title="Subscription" backIcon={false} />
            </div>
          </div>
          <div className="card-body">
            <SubscriptionInfo membership={membership} />
          </div>
        </>
      )}
      {tabState === MemberSubscriptionTabState.CREATE_SUBSCRIPTION && (
        <div>CreateSubscriptionTable</div>
        // <CreateSubscriptionForm
        //   membership={membership}
        //   onClickBack={onClickBack}
        //   onCreated={onSubscriptionCreated}
        // />
      )}
      {/* {tabState === MembershipTabTabState.VIEW_DETAIL_SUBSCRIPTION && selectedSubscriptionId && (
        <SubscriptionDetail
          onClickBack={onClickBack}
          subscriptionId={selectedSubscriptionId}
        />
      )} */}
    </div>
  )
}
