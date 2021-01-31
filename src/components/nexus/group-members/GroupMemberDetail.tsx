import React, { FC } from 'react'
import { Button, Divider, PageHeader, Spin } from 'antd'

/* eslint-disable */
import { useGetGroupMemberQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
import { MembershipRole } from 'types/membership'
/* eslint-enable */

interface GroupMemberDetailProps {
  groupMemberId: string
  onClickBack: () => void
}

export const GroupMemberDetail: FC<GroupMemberDetailProps> = ({ groupMemberId, onClickBack }) => {
  const { data: memberData, loading: fetchingMemberData } = useGetGroupMemberQuery({
    variables: { input: { membershipId: groupMemberId } },
  })
  const membership = memberData?.membership

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Member Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={fetchingMemberData} tip="Fetching Member...">
        <div className="card-body">
          <Divider orientation="left">
            <strong>General</strong>
          </Divider>
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Username</strong>
            {membership && membership.member.username}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Role</strong>
            {membership && membership.role}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Status</strong>
            {membership && membership.status}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Joined</strong>
            {membership && displayTimeBeforeNow(membership.createdAt)}
          </div>
          <Divider orientation="left">
            <strong>Trading</strong>
          </Divider>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Exchange Accounts</strong>
            {membership && membership.exchangeAccounts.length}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Total Orders</strong>
            {membership && membership.orders.totalCount}
          </div>

          {membership && [MembershipRole.Member, MembershipRole.Trader].includes(membership.role) && (
            <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
              <Button danger disabled={fetchingMemberData}>
                Remove Member
              </Button>
            </div>
          )}
        </div>
      </Spin>
    </>
  )
}
