import React, { FC, useState } from 'react'
import { Table, Button, PageHeader, Spin, Modal, notification } from 'antd'

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
  onClickExchangeAccount: (accountId: string) => void
}

export const ExchangeAccountTable: FC<ExchangeAccountTableProps> = ({
  membership,
  onClickCreate,
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
  const [deletingExchangeAccount, setDeletingExchangeAccount] = useState<boolean>(false)

  const exchangeAccountsTableData: ExchangeAccountTableItem[] = createExchangeAccountTableData(
    exchangeAccountsData?.exchangeAccounts,
  )

  const clickedDelete = async (row: ExchangeAccountTableItem) => {
    const { id: accountId, exchange } = row

    Modal.confirm({
      title: `Deleting ${exchange} Account`,
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you to delete this exchange account?',
      okText: 'Delete',
      okType: 'danger',
      async onOk() {
        setDeletingExchangeAccount(true)

        const { error, success } = await apollo.deleteExchangeAccount({ accountId })

        setDeletingExchangeAccount(false)

        if (success) {
          notification.success({
            message: `Created ${exchange} Account`,
          })
        } else {
          notification.error({
            message: `Error creating ${exchange} account`,
            description: error,
            duration: 3, // seconds
          })
        }

        await refetchExchangeAccounts()
      },
      onCancel() {},
    })
  }

  const exchangeAccountTableColumns = [
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: 'Orders',
      dataIndex: 'orderCount',
      key: 'orderCount',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: string, record: ExchangeAccountTableItem) => (
        <Button type="link" onClick={async () => clickedDelete(record)}>
          Delete
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
          <Spin spinning={fetchingExchangeAccounts || deletingExchangeAccount}>
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
