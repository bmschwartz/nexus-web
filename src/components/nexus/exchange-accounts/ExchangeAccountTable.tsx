import React, { FC, useState } from 'react'
import { Table, Button, PageHeader, Spin, Modal, notification, Switch } from 'antd'

import { Membership } from 'types/membership'

/* eslint-disable */
import {
  createExchangeAccountTableData,
  ExchangeAccountTableItem,
} from './exchangeAccountTableUtils'
import { useGetExchangeAccountsQuery } from '../../../graphql'
import * as apollo from 'services/apollo'
import { ExclamationCircleOutlined } from '@ant-design/icons'
/* eslint-enable */

interface ExchangeAccountTableProps {
  membership: Membership
  onClickCreate: () => void
  onClickExchangeAccount: (accountId: string, exchange: string) => void
}

const DELETE_TEXT = 'Delete'

export const ExchangeAccountTable: FC<ExchangeAccountTableProps> = ({
  membership,
  onClickCreate,
  onClickExchangeAccount,
}) => {
  const {
    data: exchangeAccountsData,
    loading: fetchingExchangeAccounts,
    refetch: refetchExchangeAccounts,
  } = useGetExchangeAccountsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { membershipId: membership.id } },
    notifyOnNetworkStatusChange: true,
  })
  const [togglingAccountActive, setTogglingAccountActive] = useState<boolean>(false)
  const [deletingExchangeAccount, setDeletingExchangeAccount] = useState<boolean>(false)

  const exchangeAccountsTableData: ExchangeAccountTableItem[] = createExchangeAccountTableData(
    exchangeAccountsData?.exchangeAccounts,
  )

  const clickedDelete = async (row: ExchangeAccountTableItem) => {
    const { id: accountId, exchange } = row

    Modal.confirm({
      title: `Deleting ${exchange} Account`,
      icon: <ExclamationCircleOutlined />,
      content: 'All exchange orders and positions will be removed',
      okText: 'Delete',
      okType: 'danger',
      async onOk() {
        setDeletingExchangeAccount(true)

        const { error, success } = await apollo.deleteExchangeAccount({ accountId })

        setDeletingExchangeAccount(false)

        if (success) {
          notification.success({
            message: `Deleted ${exchange} Account`,
          })
        } else {
          notification.error({
            message: `Error deleting ${exchange} account`,
            description: error,
            duration: 3, // seconds
          })
        }

        await refetchExchangeAccounts()
      },
      onCancel() {},
    })
  }

  const toggleExchangeAccountActive = async (row: ExchangeAccountTableItem) => {
    const { id: accountId, exchange, active } = row

    setTogglingAccountActive(true)
    const { error, success } = await apollo.toggleExchangeAccountActive({ accountId, active })

    const newActiveState = !active

    if (success) {
      notification.success({
        message: `${newActiveState ? 'Disabled' : 'Enabled'} ${exchange} Account`,
        duration: 3, // seconds
      })
    } else {
      notification.error({
        message: `${exchange} Account Error`,
        description: error,
        duration: 3, // seconds
      })
    }
    setTogglingAccountActive(false)
    await refetchExchangeAccounts()
  }

  const exchangeAccountTableColumns = [
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_: string, record: ExchangeAccountTableItem) => (
        <Switch checked={record.active} onClick={async () => toggleExchangeAccountActive(record)} />
      ),
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange',
      render: (text: string, { id, exchange }: ExchangeAccountTableItem) => (
        <Button type="link" onClick={() => onClickExchangeAccount(id, exchange)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Orders',
      dataIndex: 'orderCount',
      key: 'orderCount',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: string, record: ExchangeAccountTableItem) => (
        <Button type="link" onClick={async () => clickedDelete(record)}>
          {DELETE_TEXT}
        </Button>
      ),
    },
  ]

  return (
    <div className="card">
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Exchange Accounts" backIcon={false} />
        </div>
        {membership.active && (
          <div className="d-flex flex-column justify-content-center">
            <Button
              className="btn btn-primary"
              disabled={!membership.active}
              onClick={() => membership.active && onClickCreate()}
            >
              Create Exchange Account
            </Button>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Spin
            spinning={fetchingExchangeAccounts || deletingExchangeAccount || togglingAccountActive}
          >
            <Table
              rowKey="id"
              columns={exchangeAccountTableColumns}
              dataSource={exchangeAccountsTableData}
              // onChange={handleTableChange}
            />
          </Spin>
        </div>
      </div>
    </div>
  )
}
