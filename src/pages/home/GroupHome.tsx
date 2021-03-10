import React from 'react'
import { Spin } from 'antd'

/* eslint-disable */
import OrderStats from '../../components/nexus/OrderStats'
import { Group } from '../../types/group'
import MemberStats from '../../components/nexus/MemberStats'
import { useGetGroupStatsQuery } from '../../graphql'
/* eslint-enable */

interface GroupHomeProps {
  group: Group
}

const GroupHome = ({ group }: GroupHomeProps) => {
  const { data } = useGetGroupStatsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: { groupId: group.id },
    },
  })

  if (!data) {
    return <Spin />
  }

  const membersCount = data.group?.members?.totalCount
  const orderSetCount = data.group?.orderSets.totalCount

  return (
    <div>
      <h3>{group.name}</h3>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-body">
              <OrderStats totalOrders={orderSetCount} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-body">
              <MemberStats totalMembers={membersCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupHome
