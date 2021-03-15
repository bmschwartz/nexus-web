import React, { FC, useState } from 'react'
import { Table, PageHeader, Switch, InputNumber, Input, Button, Modal } from 'antd'

/* eslint-disable */
import { createSubscriptionTableData, SubscriptionOptionTableItem } from './subscriptionTableUtils'
import { GroupSubscription } from '../../../types/subscription'
import labelTooltip from '../labelTooltip'
import { ExclamationCircleOutlined } from '@ant-design/icons'
// import * as apollo from "../../../services/apollo";
/* eslint-enable */

interface SubscriptionTableProps {
  subscriptionOptions: GroupSubscription[]
}

export const SubscriptionTable: FC<SubscriptionTableProps> = ({ subscriptionOptions }) => {
  const [savingSubscriptionOption, setSavingSubscriptionOption] = useState<boolean>(false)
  const [deletingSubscriptionOption, setDeletingSubscriptionOption] = useState<boolean>(false)
  const [togglingSubscriptionActive, setTogglingSubscriptionActive] = useState<boolean>(false)
  const [editingSubscriptionOption, setEditingSubscriptionOption] = useState<string | null>(null)

  const subscriptionOptionTableData: SubscriptionOptionTableItem[] = createSubscriptionTableData(
    subscriptionOptions,
  )

  const toggleSubscriptionActive = (subscriptionOption: SubscriptionOptionTableItem) => {
    setTogglingSubscriptionActive(true)
    console.log('toggling subscription active', subscriptionOption.id)
    setTimeout(() => {
      setTogglingSubscriptionActive(false)
    }, 1500)
  }

  const onClickSaveSubscriptionOption = (subscriptionOptionId: string) => {
    console.log('saving', subscriptionOptionId)
    setEditingSubscriptionOption(null)
    setSavingSubscriptionOption(true)
    setTimeout(() => {
      setSavingSubscriptionOption(false)
    }, 1500)
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

        console.log('deleting', subscriptionOptionId)

        setDeletingSubscriptionOption(false)

        // if (success) {
        //   notification.success({
        //     message: `Deleted Subscription Option`,
        //   })
        // } else {
        //   notification.error({
        //     message: `Error Deleting Subscription Option`,
        //     description: error,
        //     duration: 3, // seconds
        //   })
        // }

        window.location.reload()
      },
      onCancel() {},
    })
  }

  const subscriptionTableColumns = [
    {
      title: labelTooltip(
        'Active',
        'This subscription option is available to members when signing up',
      ),
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
              onClick={() => onClickSaveSubscriptionOption(option.id)}
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
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="id"
            pagination={false}
            columns={subscriptionTableColumns}
            dataSource={subscriptionOptionTableData}
          />
        </div>
      </div>
    </>
  )
}
