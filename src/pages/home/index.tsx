import React from 'react'
import { Helmet } from 'react-helmet'
import * as apollo from 'services/apollo'

/* eslint-disable */
import { GroupOwnerTraderHome } from './GroupOwnerTraderHome'
/* eslint-enable */

const Home = () => {
  return (
    <div>
      <Helmet title="Home" />
      {apollo.isGroupOwnerOrTraderUserType() ? (
        <GroupOwnerTraderHome />
      ) : (
        <h4>Showing MEMBER home page</h4>
      )}
    </div>
  )
}

export default Home
