import React, { FC } from 'react'
import { Table, Button, PageHeader } from 'antd'

import { Membership } from 'types/membership'

/* eslint-disable */
import {
  createExchangeAccountTableData,
  ExchangeAccountTableItem,
} from './exchangeAccountTableUtils'
/* eslint-enable */

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
    dataIndex: 'orders',
    key: 'orders',
  },
]

interface ExchangeAccountTableProps {
  membership: Membership
  onClickCreate: () => void
  onClickExchangeAccount: (accountId: string) => void
}

export const ExchangeAccountTable: FC<ExchangeAccountTableProps> = ({
  membership,
  onClickCreate,
  onClickExchangeAccount,
}) => {
  const exchangeAccountData: ExchangeAccountTableItem[] = createExchangeAccountTableData(
    membership.exchangeAccounts,
  )

  const onRow = (row: ExchangeAccountTableItem) => {
    return {
      onClick: () => {
        onClickExchangeAccount(row.id)
      },
    }
  }

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
          <Table
            rowKey="id"
            onRow={onRow}
            columns={exchangeAccountTableColumns}
            dataSource={exchangeAccountData}
            // onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  )
}
