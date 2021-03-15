import React, { FC, useState } from 'react'
import { Table, PageHeader, Switch, InputNumber, Input, Button, Modal, notification } from 'antd'

/* eslint-disable */
import { createSubscriptionTableData, SubscriptionOptionTableItem } from './subscriptionTableUtils'
import labelTooltip from '../labelTooltip'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import * as apollo from '../../../services/apollo'
import { useGetGroupSubscriptionOptionsQuery } from '../../../graphql'
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
  } = useGetGroupSubscriptionOptionsQuery({
    fetchPolicy: 'cache-and-network',
  })

  const subscriptionOptionTableData:
    | SubscriptionOptionTableItem[]
    | undefined = createSubscriptionTableData(subscriptionOptions)

  const toggleSubscriptionActive = async (subscriptionOption: SubscriptionOptionTableItem) => {
    setTogglingSubscriptionActive(true)

    const { success, error } = await apollo.toggleSubscriptionActive({
      subscriptionId: subscriptionOption.id,
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
    setEditingSubscriptionOption(null)
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
  }

  const onClickDeleteSubscriptionOption = (subscriptionOptionId: string) => {
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

  const subscriptionTableColumns = [
    {
      title: labelTooltip('Active', 'Active subscription options are available to new members'),
      dataIndex: 'active',
      key: 'active',
      width: '15%',
      render: (_: boolean, record: SubscriptionOptionTableItem) => (
        <Switch
          checked={record.active}
          disabled={togglingSubscriptionActive}
          onClick={async () => toggleSubscriptionActive(record)}
        />
      ),
    },
    {
      title: 'Duration (Months)',
      dataIndex: 'duration',
      key: 'duration',
      width: '15%',
    },
    {
      title: 'Price (USD)',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price: string, record: SubscriptionOptionTableItem) => {
        return editingSubscriptionOption === record.id ? (
          <InputNumber min={0} step={1} max={999999} defaultValue={Number(price)} />
        ) : (
          <p>{price}</p>
        )
      },
    },
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string, record: SubscriptionOptionTableItem) => {
        return editingSubscriptionOption === record.id ? (
          <Input maxLength={100} defaultValue={description} />
        ) : (
          <p>{description}</p>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, option: SubscriptionOptionTableItem) => {
        const SaveOrEditButton =
          editingSubscriptionOption === option.id ? (
            <Button
              type="link"
              disabled={savingSubscriptionOption || deletingSubscriptionOption}
              onClick={() => onClickSaveSubscriptionOption(option)}
            >
              Save
            </Button>
          ) : (
            <Button
              type="link"
              disabled={savingSubscriptionOption || deletingSubscriptionOption}
              onClick={() => setEditingSubscriptionOption(option.id)}
            >
              Edit
            </Button>
          )
        const DeleteButton = (
          <Button
            danger
            type="link"
            disabled={savingSubscriptionOption || deletingSubscriptionOption}
            onClick={() => onClickDeleteSubscriptionOption(option.id)}
          >
            Delete
          </Button>
        )

        return (
          <div>
            {SaveOrEditButton}
            {DeleteButton}
          </div>
        )
      },
    },
  ]

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
            columns={subscriptionTableColumns}
            loading={fetchingSubscriptionOptions}
            dataSource={subscriptionOptionTableData}
          />
        </div>
      </div>
    </>
  )
}
