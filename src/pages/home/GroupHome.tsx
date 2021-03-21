import React from 'react'
import { Spin } from 'antd'

/* eslint-disable */
import { Group } from '../../types/group'
import { useGetGroupStatsQuery } from '../../graphql'
import OrderStats from '../../components/nexus/OrderStats'
import MemberStats from '../../components/nexus/MemberStats'
import IncomeStats from '../../components/nexus/IncomeStats'
import { GroupReadOnlyProfile } from '../../components/nexus/groups/group-detail/GroupReadOnlyProfile'
/* eslint-enable */

interface GroupHomeProps {
  group: Group
}

class OurCustomElement extends HTMLElement {}
window.customElements.define('coingecko-coin-list-widget', OurCustomElement)

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
      <h3 className="mb-5">{group.name}</h3>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div
                style={{
                  height: '250px',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  border: '1px solid #56667F',
                  borderRadius: '4px',
                  textAlign: 'right',
                  lineHeight: '14px',
                  blockSize: '62px',
                  fontSize: '12px',
                  fontFeatureSettings: 'normal',
                  textSizeAdjust: '100%',
                  boxShadow: 'inset 0 -20px 0 0 #56667F',
                  padding: '0px',
                  margin: '0px',
                  width: '100%',
                }}
              >
                <div style={{ height: '200px', padding: '0px', margin: '0px', width: '100%' }}>
                  <iframe
                    title="widget-iframe"
                    src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=no"
                    width="100%"
                    height="36px"
                    scrolling="auto"
                    marginWidth={0}
                    marginHeight={0}
                    frameBorder={0}
                    style={{ border: 0, margin: 0, padding: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <OrderStats totalOrders={orderSetCount} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <IncomeStats />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <MemberStats totalMembers={membersCount} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <GroupReadOnlyProfile group={group} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupHome
