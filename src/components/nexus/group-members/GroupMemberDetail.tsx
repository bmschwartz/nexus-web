import React, { FC, useState } from 'react'
import { Button, Divider, Modal, notification, PageHeader, Select, Spin } from 'antd'
import * as apollo from 'services/apollo'

/* eslint-disable */
import { MembershipRole as RemoteMembershipRole, useGetGroupMemberQuery } from '../../../graphql'
import { displayTimeBeforeNow } from '../dateUtil'
import {
  convertToLocalMembershipRole,
  convertToLocalMembershipStatus,
  convertToRemoteMembershipRole,
  MembershipRole,
} from 'types/membership'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { updateMembershipRole } from 'services/apollo'

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
  const [selectedMemberRole, setSelectedMemberRole] = useState<MembershipRole | null>()
  const [editingMemberRole, setEditingMemberRole] = useState<boolean>(false)
  const [savingMemberRole, setSavingMemberRole] = useState<boolean>(false)

  const { data: memberData, loading: fetchingMemberData } = useGetGroupMemberQuery({
    variables: { input: { membershipId: groupMemberId } },
  })
  const membership = memberData?.membership

  if (!selectedMemberRole && membership && membership.role) {
    setSelectedMemberRole(convertToLocalMembershipRole(membership.role))
    setEditingMemberRole(false)
    setSavingMemberRole(false)
  }

  const onClickSaveRole = async () => {
    if (!membership || !selectedMemberRole) {
      return
    }
    const currentRole = convertToLocalMembershipRole(membership.role)

    if (currentRole === selectedMemberRole) {
      setEditingMemberRole(false)
      return
    }
    setSavingMemberRole(true)

    const newRole = convertToRemoteMembershipRole(selectedMemberRole)
    if (!newRole) {
      return
    }

    const { success, error } = await updateMembershipRole({
      membershipId: membership.id,
      groupId: membership.group.id,
      role: newRole,
    })

    if (success) {
      notification.success({
        message: `Changed Role to ${selectedMemberRole}`,
        duration: 3, // seconds
      })
    } else {
      notification.error({
        message: `Error`,
        description: error,
        duration: 3, // seconds
      })
    }

    setEditingMemberRole(false)
    setSavingMemberRole(false)
  }

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
            {membership &&
            convertToLocalMembershipRole(membership.role) !== MembershipRole.Admin ? (
              <>
                {editingMemberRole ? (
                  <>
                    <Select
                      disabled={savingMemberRole}
                      loading={savingMemberRole}
                      style={{ width: 100 }}
                      size="large"
                      value={selectedMemberRole ?? MembershipRole.Member}
                      onChange={setSelectedMemberRole}
                    >
                      {[MembershipRole.Trader, MembershipRole.Member].map(
                        (role: MembershipRole) => (
                          <Select.Option key={role} value={String(role)}>
                            {role}
                          </Select.Option>
                        ),
                      )}
                    </Select>
                    <Button type="link" disabled={savingMemberRole} onClick={onClickSaveRole}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    {membership && convertToLocalMembershipRole(membership.role)}
                    <Button type="link" onClick={() => setEditingMemberRole(true)}>
                      Edit
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>{membership && convertToLocalMembershipRole(membership.role)}</>
            )}
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
