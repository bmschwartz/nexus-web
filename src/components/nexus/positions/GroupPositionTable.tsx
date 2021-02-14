import React, { FC } from 'react'
import { Button, PageHeader, Select, Spin, Table } from 'antd'

import { PositionSide } from 'types/position'
import { convertToRemoteExchange, Exchange } from 'types/exchange'
import { extractSymbols } from 'types/currency'

/* eslint-disable */
import { createPositionTableData, PositionTableItem } from './groupPositionTableUtils'
import { useGetGroupPositionsQuery, useGetSymbolsQuery } from '../../../graphql'

/* eslint-enable */

interface PositionTableProps {
  groupId: string
  selectedSymbol?: string
  selectedExchange?: Exchange
  clearSymbol: () => void
  onChangeSymbol: (symbol: string) => void
  onChangeExchange: (exchange: Exchange) => void
  onClickClosePositions: () => void
}

const positionTableColumns = [
  {
    title: 'Member',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Leverage',
    dataIndex: 'leverage',
    key: 'leverage',
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

const PAGE_SIZE = 25

export const GroupPositionTable: FC<PositionTableProps> = ({
  groupId,
  selectedSymbol,
  selectedExchange,
  clearSymbol,
  onChangeSymbol,
  onChangeExchange,
  onClickClosePositions,
}) => {
  const {
    data: groupPositionsData,
    loading: fetchingGroupPositions,
    fetchMore,
  } = useGetGroupPositionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      positionsInput: {
        symbol: selectedSymbol,
        exchange: convertToRemoteExchange(selectedExchange),
        limit: PAGE_SIZE,
      },
    },
    notifyOnNetworkStatusChange: true,
  })
  // const [getGroupPositions, { data: groupPositionsData, loading: fetchingGroupPositions, fetchMore }] = useGetGroupPositionsLazyQuery({
  //   fetchPolicy: 'cache-and-network',
  //   notifyOnNetworkStatusChange: true
  // })

  const { data: getSymbolsData, loading: fetchingSymbols } = useGetSymbolsQuery({
    fetchPolicy: 'cache-and-network',
  })

  const onChangePage = (page: number, pageSize?: number) => {
    const offset = pageSize ? pageSize * (page - 1) : 0
    if (!fetchMore) {
      return
    }
    fetchMore({
      variables: { offset },
      updateQuery: (prev, result) => {
        if (!result.fetchMoreResult) {
          return prev
        }
        const fetchedResult: object = result.fetchMoreResult as object
        return { ...fetchedResult }
      },
    })
  }

  const memberships = groupPositionsData?.group?.members?.members
  const positions = memberships?.map(membership => membership.positions)
  const totalCount = positions?.map(pos => pos.totalCount).reduce((sum, current) => sum + current)

  const longPositionTableData: PositionTableItem[] = createPositionTableData(
    groupPositionsData,
    PositionSide.LONG,
  )
  const shortPositionTableData: PositionTableItem[] = createPositionTableData(
    groupPositionsData,
    PositionSide.SHORT,
  )
  const symbolsData = extractSymbols(getSymbolsData)
  console.log(symbolsData)

  const PositionsTable = (side: PositionSide) => (
    <div className="card-body">
      <div className="text-nowrap">
        <Spin spinning={fetchingGroupPositions}>
          <Table
            bordered
            rowKey="id"
            title={() => <strong>{`${side} Positions`}</strong>}
            columns={positionTableColumns}
            dataSource={side === PositionSide.LONG ? longPositionTableData : shortPositionTableData}
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
          <PageHeader className="site-page-header" title="Positions" />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <Button
            disabled={
              !selectedSymbol || (!longPositionTableData.length && !shortPositionTableData.length)
            }
            className="btn btn-primary"
            onClick={onClickClosePositions}
          >
            Close Positions
          </Button>
        </div>
      </div>
      <div className="card-body">
        <div className="text-nowrap">
          <Spin spinning={fetchingSymbols}>
            <span className="mr-4">
              <strong className="mt-3 mr-3">Exchange</strong>
              <Select
                loading={fetchingSymbols}
                placeholder="Select Exchange..."
                style={{ width: 200 }}
                size="large"
                value={selectedExchange}
                onChange={(exchange: Exchange) => {
                  onChangeExchange(exchange)
                  clearSymbol()
                }}
              >
                {symbolsData &&
                  Object.keys(symbolsData).map(exchange => (
                    <Select.Option key={exchange} value={exchange}>
                      {exchange}
                    </Select.Option>
                  ))}
              </Select>
            </span>
            <strong className="mt-3 mr-3">Symbol</strong>
            <Select
              showSearch
              allowClear
              loading={fetchingSymbols}
              placeholder="Select Symbol..."
              style={{ width: 200 }}
              size="large"
              value={selectedSymbol}
              onChange={(symbol: string) => {
                onChangeSymbol(symbol)
              }}
            >
              {symbolsData &&
                selectedExchange &&
                Object.values(symbolsData[selectedExchange])
                  .sort()
                  .map(symbol => (
                    <Select.Option key={symbol} value={symbol}>
                      {symbol}
                    </Select.Option>
                  ))}
            </Select>
          </Spin>
        </div>
      </div>
      {selectedSymbol && selectedExchange && (
        <>
          {PositionsTable(PositionSide.LONG)}
          {PositionsTable(PositionSide.SHORT)}
        </>
      )}
    </>
  )
}
