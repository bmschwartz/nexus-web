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
  openPositions: number
}
const exchangeTableColumns = [
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
    render: (text: string) => <Button type="link">{text}</Button>,
  },
  {
    title: 'Open Positions',
    dataIndex: 'openPositions',
    key: 'openPositions',
  },
]

export const GroupPositionExchangeTable: FC<GroupPositionExchangeTableProps> = ({
  onClickExchange,
}) => {
  const exchangeTableData = [
    {
      exchange: Exchange.BINANCE,
      openPositions: 0,
    },
    {
      exchange: Exchange.BITMEX,
      openPositions: 0,
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
            rowKey="id"
            onRow={onRow}
            columns={exchangeTableColumns}
            dataSource={exchangeTableData}
          />
        </div>
      </div>
    </>
  )
}
