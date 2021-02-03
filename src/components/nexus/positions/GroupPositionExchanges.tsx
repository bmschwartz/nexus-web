import React, { FC } from 'react'
import { Table, Button, PageHeader } from 'antd'
import { Exchange } from 'types/exchange'

/* eslint-disable */
/* eslint-enable */

interface GroupPositionExchangeTableProps {
  groupId: string
  onClickExchange: (exchange: Exchange) => void
}

interface PositionExchangeTableItem {
  exchange: Exchange
  members: number
}
const exchangeTableColumns = [
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
    render: (text: string) => <Button type="link">{text.split('-')[0]}</Button>,
  },
  {
    title: 'Members',
    dataIndex: 'members',
    key: 'members',
  },
]

export const GroupPositionExchangeTable: FC<GroupPositionExchangeTableProps> = ({
  onClickExchange,
}) => {
  const exchangeTableData = [
    {
      exchange: Exchange.BINANCE,
      members: 0,
    },
    {
      exchange: Exchange.BITMEX,
      members: 0,
    },
  ]

  const onRow = (row: PositionExchangeTableItem) => {
    return {
      onClick: () => {
        onClickExchange(row.exchange)
      },
    }
  }

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Positions" backIcon={false} />
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Table
            rowKey="exchange"
            onRow={onRow}
            columns={exchangeTableColumns}
            dataSource={exchangeTableData}
          />
        </div>
      </div>
    </>
  )
}
