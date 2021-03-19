import React, { FC, useState } from 'react'
import { Table, PageHeader, Button, Modal, notification } from 'antd'

/* eslint-disable */
import {
  createSubscriptionTableData,
  SubscriptionOptionTableItem,
  subscriptionTableColumns,
} from './subscriptionTableUtils'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import * as apollo from '../../../services/apollo'
import { useGetMyGroupSubscriptionOptionsQuery } from '../../../graphql'
/* eslint-enable */

interface SubscriptionTableProps {
  onClickCreateOption: () => void
}

export const SubscriptionTable: FC<SubscriptionTableProps> = ({ onClickCreateOption }) => {
  const [savingSubscriptionOption, setSavingSubscriptionOption] = useState<boolean>(false)
  const [deletingSubscriptionOption, setDeletingSubscriptionOption] = useState<boolean>(false)
  const [togglingSubscriptionActive, setTogglingSubscriptionActive] = useState<boolean>(false)
  const [editingSubscriptionOption, setEditingSubscriptionOption] = useState<string | null>(null)
  const {
    data: subscriptionOptions,
    refetch: refetchSubscriptionOptions,
    loading: fetchingSubscriptionOptions,
  } = useGetMyGroupSubscriptionOptionsQuery({
    fetchPolicy: 'cache-and-network',
  })
  const disabledState =
    togglingSubscriptionActive || savingSubscriptionOption || deletingSubscriptionOption

  const subscriptionOptionTableData:
    | SubscriptionOptionTableItem[]
    | undefined = createSubscriptionTableData(subscriptionOptions)

  const toggleSubscriptionActive = async (optionId: string) => {
    setTogglingSubscriptionActive(true)

    const { success, error } = await apollo.toggleSubscriptionActive({
      subscriptionId: optionId,
    })

    if (success) {
      notification.success({
        message: `Toggled Subscription Option`,
        duration: 1.5,
      })
    } else {
      notification.error({
        message: `Error Toggling Subscription Option`,
        description: error,
        duration: 3, // seconds
      })
    }

    setTogglingSubscriptionActive(false)
    await refetchSubscriptionOptions()
  }

  const onClickSaveSubscriptionOption = async (subscriptionOption: SubscriptionOptionTableItem) => {
    setSavingSubscriptionOption(true)

    const { success, error } = await apollo.updateGroupSubscription({
      fee: subscriptionOption.price,
      subscriptionId: subscriptionOption.id,
      description: subscriptionOption.description,
    })

    if (success) {
      notification.success({
        message: 'Saved Subscription Option',
        duration: 1.5,
      })
    } else {
      notification.error({
        message: 'Error Saving Subscription Option',
        description: error,
        duration: 3, // seconds
      })
    }

    setSavingSubscriptionOption(false)
    await refetchSubscriptionOptions()
    setEditingSubscriptionOption(null)
  }

  const onClickEditSubscriptionOption = (optionId: string) => {
    setEditingSubscriptionOption(optionId)
  }

  const onClickDeleteSubscriptionOption = (subscriptionOptionId: string, memberCount: number) => {
    if (memberCount > 0) {
      Modal.error({
        title: 'Delete Error',
        content: `This subscription option is being used by ${memberCount} members`,
        maskClosable: true,
      })
      return
    }
    Modal.confirm({
      title: `Deleting Subscription Option`,
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this subscription option?',
      okText: 'Yes',
      okType: 'danger',
      async onOk() {
        setDeletingSubscriptionOption(true)

        const { success, error } = await apollo.deleteGroupSubscription({
          subscriptionId: subscriptionOptionId,
        })

        if (success) {
          notification.success({
            message: `Deleted Subscription Option`,
            duration: 1.5,
          })
        } else {
          notification.error({
            message: `Error Deleting Subscription Option`,
            description: error,
            duration: 3, // seconds
          })
        }

        setDeletingSubscriptionOption(false)
        await refetchSubscriptionOptions()
      },
      onCancel() {},
    })
  }

  const onChangeSubscriptionOption = (index: number, field: string, value: any) => {
    if (!subscriptionOptionTableData) {
      return
    }

    switch (field) {
      case 'price':
        subscriptionOptionTableData[index].price = value
        break
      case 'description':
        subscriptionOptionTableData[index].description = value
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Subscriptions" backIcon={false} />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Button className="btn btn-primary" onClick={onClickCreateOption}>
            Create New
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            pagination={false}
            loading={fetchingSubscriptionOptions || disabledState}
            dataSource={subscriptionOptionTableData}
            columns={subscriptionTableColumns({
              disabledState,
              editingOptionId: editingSubscriptionOption,
              onToggleActive: toggleSubscriptionActive,
              onClickEdit: onClickEditSubscriptionOption,
              onClickSave: onClickSaveSubscriptionOption,
              onClickDelete: onClickDeleteSubscriptionOption,
              onChange: onChangeSubscriptionOption,
            })}
          />
        </div>
      </div>
    </>
  )
}
