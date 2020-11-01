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
import {
  DeleteExchangeAccountResponse,
  ToggleExchangeAccountResponse,
} from 'services/apollo/exchangeAccount'
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
  const [submittingAccountOperation, setSubmittingAccountOperation] = useState<boolean>(false)
  const {
    startPolling,
    stopPolling,
    data: asyncOperationData,
    loading: pollingAsyncResult,
  } = useGetAsyncOperationStatusQuery({
    variables: { input: { id: asyncOperationId } },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (asyncOperationId && !pollingAsyncResult) {
      console.log('starting polling')
      startPolling(500)
    }
  }, [asyncOperationId, pollingAsyncResult, startPolling, stopPolling])

  if (
    asyncOperationId !== '' &&
    asyncOperationData?.asyncOperationStatus?.operation.complete === true
  ) {
    stopPolling()
    setAsyncOperationId('')
    setSubmittingAccountOperation(false)

    const {
      asyncOperationStatus: { operation },
    } = asyncOperationData

    Promise.resolve(refetchExchangeAccounts())

    if (operation.success) {
      console.log('success!')
    } else {
      console.log('error!')
    }
  }

  const exchangeAccountsTableData: ExchangeAccountTableItem[] = createExchangeAccountTableData(
    exchangeAccountsData?.exchangeAccounts,
  )

  const onClickDeleteAccount = async (row: ExchangeAccountTableItem) => {
    const { id: accountId, exchange } = row

    Modal.confirm({
      title: `Deleting ${exchange} Account`,
      icon: <ExclamationCircleOutlined />,
      content: 'All exchange orders and positions will be removed',
      okText: 'Delete',
      okType: 'danger',
      async onOk() {
        setSubmittingAccountOperation(true)
        const {
          error,
          operationId,
        }: DeleteExchangeAccountResponse = await apollo.deleteExchangeAccount({ accountId })

        if (operationId) {
          setAsyncOperationId(operationId)
        } else {
          notification.error({
            message: `Error deleting ${exchange} account`,
            description: error,
            type: 'error',
            duration: 3, // seconds
          })
        }
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

    if (operationId) {
      setAsyncOperationId(operationId)
    } else {
      notification.error({
        message: `Toggle ${exchange} Account Error`,
        description: error,
        type: 'error',
        duration: 3, // seconds
      })
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
          onClick={async () => onClickDeleteAccount(record)}
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
        {/* {showSuccessNotification &&
          notification.success({
            message: 'Finished Account Change',
          })}
        {showErrorNotification &&
          notification.error({
            message: 'Failed Account Change',
            description: asyncOperationData?.asyncOperationStatus?.operation.error || '',
            duration: 3, // seconds
          })} */}
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
