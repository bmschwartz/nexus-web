import React, { FC, useState } from 'react'
import { Button, Divider, Modal, PageHeader, Spin, notification } from 'antd'
import * as apollo from 'services/apollo'

/* eslint-disable */
import { useGetGroupMemberQuery, MembershipRole as RemoteMembershipRole } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
import {
  convertToLocalMembershipRole,
  convertToLocalMembershipStatus,
  MembershipRole,
} from 'types/membership'
import { ExclamationCircleOutlined } from '@ant-design/icons'
/* eslint-enable */

interface GroupMemberDetailProps {
  groupMemberId: string
  onClickBack: () => void
  onRemovedMember: () => void
}

const canRemoveMember = (memberRole: RemoteMembershipRole) => {
  const localRole = convertToLocalMembershipRole(memberRole)
  if (!localRole) {
    return false
  }
  return [MembershipRole.Member, MembershipRole.Trader].includes(localRole)
}

export const GroupMemberDetail: FC<GroupMemberDetailProps> = ({
  groupMemberId,
  onClickBack,
  onRemovedMember,
}) => {
  const [removingMember, setRemovingMember] = useState<boolean>(false)

  const { data: memberData, loading: fetchingMemberData } = useGetGroupMemberQuery({
    variables: { input: { membershipId: groupMemberId } },
  })
  const membership = memberData?.membership

  const onClickRemoveMember = async () => {
    Modal.confirm({
      title: `Removing ${membership?.member.username} from ${membership?.group.name}`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove ${membership?.member.username}?`,
      okText: 'Yes',
      okType: 'danger',
      async onOk() {
        setRemovingMember(true)

        const groupId = membership!.group.id
        const membershipId = membership!.id
        const { error, success } = await apollo.removeMember({ groupId, membershipId })

        setRemovingMember(false)

        if (success) {
          notification.success({
            message: `Removed ${membership?.member.username}`,
          })
        } else {
          notification.error({
            message: `Error Removing ${membership?.member.username}`,
            description: error,
            duration: 3, // seconds
          })
          return
        }

        onRemovedMember()
      },
      onCancel() {},
    })
  }

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
            {membership && convertToLocalMembershipRole(membership.role)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Status</strong>
            {membership && convertToLocalMembershipStatus(membership.status)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Joined</strong>
            {membership && displayTimeBeforeNow(membership.createdAt)}
          </div>
          <Divider orientation="left">
            <strong>Trading</strong>
          </Divider>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Active Accounts</strong>
            {membership && membership.exchangeAccounts.length}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Total Orders</strong>
            {membership && membership.orders.totalCount}
          </div>

          {membership && canRemoveMember(membership.role) && (
            <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
              <Button
                danger
                disabled={fetchingMemberData || removingMember}
                onClick={() => onClickRemoveMember()}
              >
                Remove Member
              </Button>
            </div>
          )}
        </div>
      </Spin>
    </>
  )
}
