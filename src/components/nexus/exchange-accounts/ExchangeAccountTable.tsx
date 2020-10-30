import React, { FC, useEffect, useState } from 'react'
import { Table, Button, PageHeader, Spin, Modal, notification, Switch } from 'antd'

import { Membership } from 'types/membership'

/* eslint-disable */
import {
  createExchangeAccountTableData,
  ExchangeAccountTableItem,
} from './exchangeAccountTableUtils'
import { useGetAsyncOperationStatusQuery, useGetExchangeAccountsQuery } from '../../../graphql'
import * as apollo from 'services/apollo'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ToggleExchangeAccountResponse } from 'services/apollo/exchangeAccount'
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
  const [asyncOperationId, setAsyncOperationId] = useState<string>('')
  const { startPolling, stopPolling, data: asyncOperationData } = useGetAsyncOperationStatusQuery({
    variables: { input: { id: asyncOperationId } },
    fetchPolicy: 'network-only',
  })
  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false)
  const [showErrorNotification, setShowErrorNotification] = useState<boolean>(false)
  const [submittingAccountOperation, setSubmittingAccountOperation] = useState<boolean>(false)

  useEffect(() => {
    if (asyncOperationId) {
      startPolling(500)
    } else {
      stopPolling()
    }
  }, [asyncOperationId, stopPolling, startPolling])

  if (
    asyncOperationId !== '' &&
    asyncOperationData?.asyncOperationStatus?.operation.complete === true
  ) {
    setAsyncOperationId('')

    setSubmittingAccountOperation(false)

    const {
      asyncOperationStatus: { operation },
    } = asyncOperationData

    if (operation.success) {
      console.log('success!')
      setShowSuccessNotification(true)
    } else {
      console.log('error!')
      setShowErrorNotification(true)
    }
  }

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
        setSubmittingAccountOperation(true)
        const { error, success } = await apollo.deleteExchangeAccount({ accountId })
        setSubmittingAccountOperation(false)

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

    setSubmittingAccountOperation(true)
    const {
      error,
      operationId,
    }: ToggleExchangeAccountResponse = await apollo.toggleExchangeAccountActive({
      accountId,
      active,
    })
    setSubmittingAccountOperation(false)

    const newActiveState = !active
    console.log(newActiveState)

    if (!operationId) {
      notification.error({
        message: `Toggle ${exchange} Account Error`,
        description: error,
        duration: 3, // seconds
      })
    } else {
      await refetchExchangeAccounts()
    }
  }

  const exchangeAccountTableColumns = [
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (_: string, record: ExchangeAccountTableItem) => (
        <Switch
          checked={record.active}
          disabled={submittingAccountOperation}
          onClick={async () => toggleExchangeAccountActive(record)}
        />
      ),
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange',
      render: (text: string, { id, exchange }: ExchangeAccountTableItem) => (
        <Button
          type="link"
          disabled={submittingAccountOperation}
          onClick={() => onClickExchangeAccount(id, exchange)}
        >
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
        <Button
          type="link"
          disabled={submittingAccountOperation}
          onClick={async () => clickedDelete(record)}
        >
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
        {showSuccessNotification &&
          notification.success({
            message: 'Finished Account Change',
          })}
        {showErrorNotification &&
          notification.error({
            message: 'Failed Account Change',
            description: asyncOperationData?.asyncOperationStatus?.operation.error || '',
            duration: 3, // seconds
          })}
        {membership.active && (
          <div className="d-flex flex-column justify-content-center">
            <Button
              className="btn btn-primary"
              disabled={!membership.active || submittingAccountOperation}
              onClick={() => membership.active && onClickCreate()}
            >
              Create Exchange Account
            </Button>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Spin spinning={fetchingExchangeAccounts}>
            <Table
              rowKey="id"
              columns={exchangeAccountTableColumns}
              dataSource={exchangeAccountsTableData}
            />
          </Spin>
        </div>
      </div>
    </div>
  )
}
