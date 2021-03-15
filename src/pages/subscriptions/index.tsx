import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

/* eslint-disable */
import * as apollo from '../../services/apollo'
import { SubscriptionTable } from '../../components/nexus/subscription/SubscriptionTable'
import { CreateSubscriptionOptionForm } from '../../components/nexus/subscription/CreateSubscriptionOptionForm'
/* eslint-enable */

export enum GroupSubscriptionState {
  VIEW_ALL,
  CREATE_NEW,
}

const Subscriptions = () => {
  const [tabState, setTabState] = useState<GroupSubscriptionState>(GroupSubscriptionState.VIEW_ALL)

  const onClickCreateOption = () => {
    setTabState(GroupSubscriptionState.CREATE_NEW)
  }

  const onClickBack = () => {
    setTabState(GroupSubscriptionState.VIEW_ALL)
  }

  const onCreatedOption = () => {
    setTabState(GroupSubscriptionState.VIEW_ALL)
  }

  if (!apollo.isGroupOwnerOrTraderUserType()) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      {tabState === GroupSubscriptionState.VIEW_ALL && (
        <SubscriptionTable onClickCreateOption={onClickCreateOption} />
      )}
      {tabState === GroupSubscriptionState.CREATE_NEW && (
        <CreateSubscriptionOptionForm onClickBack={onClickBack} onCreatedOption={onCreatedOption} />
      )}
    </div>
  )
}

export default Subscriptions
