import React, { FC, useEffect, useState } from 'react'
import { Table, Button, PageHeader, Spin, Select } from 'antd'

import { PositionSide } from 'types/position'
import { Exchange } from 'types/exchange'
import { extractCurrencyData } from 'types/currency'

/* eslint-disable */
import { createPositionTableData, PositionTableItem } from './groupPositionTableUtils'
import { useGetCurrenciesQuery, useGetGroupPositionsQuery } from '../../../graphql'
/* eslint-enable */

interface PositionTableProps {
  groupId: string
  exchange: Exchange
  onClickBack: () => void
  onClickCreate: (exchange: Exchange, symbol: string | undefined) => void
  onClickPosition: (positionId: string) => void
}

const positionTableColumns = [
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Side',
    dataIndex: 'side',
    key: 'side',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Avg Price',
    dataIndex: 'avgPrice',
    key: 'price',
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
  },
]

const PAGE_SIZE = 50

export const GroupPositionTable: FC<PositionTableProps> = ({
  groupId,
  exchange,
  onClickBack,
  onClickCreate,
  onClickPosition,
}) => {
  const {
    data: groupPositionsData,
    loading: fetchingGroupPositions,
    fetchMore,
  } = useGetGroupPositionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { groupId }, limit: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  })

  const { data: getCurrenciesData } = useGetCurrenciesQuery({
    fetchPolicy: 'cache-and-network',
  })
  const [selectedSymbol, setSelectedSymbol] = useState<string>()

  useEffect(() => {
    console.log(selectedSymbol)
  }, [selectedSymbol])

  const onChangePage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    fetchMore({
      variables: { offset },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        return { ...result.fetchMoreResult }
      },
    })
  }

  const totalCount = groupPositionsData?.group?.positions.totalCount
  const positionTableData: PositionTableItem[] = createPositionTableData(groupPositionsData)
  const currencyData = extractCurrencyData(getCurrenciesData)

  const onRow = (row: PositionTableItem) => {
    return {
      onClick: () => {
        onClickPosition(row.id)
      },
    }
  }

  const PositionsTable = (side: PositionSide) => (
    <div className="card-body">
      <div className="text-nowrap">
        <Spin spinning={fetchingGroupPositions}>
          <Table
            bordered
            rowKey="id"
            onRow={onRow}
            title={() => <strong>{`${side} Positions`}</strong>}
            columns={positionTableColumns}
            dataSource={positionTableData}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: PAGE_SIZE,
              total: totalCount,
              onChange: onChangePage,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Spin>
      </div>
    </div>
  )

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader
            className="site-page-header"
            title={`${exchange} Positions`}
            onBack={onClickBack}
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Button
            className="btn btn-primary"
            onClick={() => onClickCreate(exchange, selectedSymbol)}
          >
            Close Positions
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <strong className="mt-3 mr-3">Symbol</strong>
          <Select
            showSearch
            allowClear
            placeholder="Select Symbol..."
            style={{ width: 200 }}
            size="large"
            onChange={(symbol: string) => {
              setSelectedSymbol(symbol)
            }}
          >
            {currencyData &&
              Object.keys(currencyData[exchange])
                .sort()
                .map(symbol => (
                  <Select.Option key={symbol} value={symbol}>
                    {symbol}
                  </Select.Option>
                ))}
          </Select>
        </div>
      </div>
      {PositionsTable(PositionSide.LONG)}
      {PositionsTable(PositionSide.SHORT)}
    </>
  )
}
