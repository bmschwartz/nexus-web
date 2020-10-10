import React, { FC } from 'react'
import { Button, PageHeader, Spin, Table } from 'antd'

/* eslint-disable */
import { createPositionTableData, PositionsTableItem } from './memberPositionTableUtils'
import { useGetMemberPositionsQuery } from '../../../graphql'
/* eslint-enable */

interface MemberPositionsTableProps {
  membershipId: string
  onClickPosition: (positionId: string) => void
}

const positionTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <Button type="link">{text}</Button>,
  },
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
  },
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
    title: 'Avg Price',
    dataIndex: 'avgPrice',
    key: 'avgPrice',
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
  },
]

const PAGE_SIZE = 15

export const MemberPositionsTable: FC<MemberPositionsTableProps> = ({
  membershipId,
  onClickPosition,
}) => {
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

  const {
    data: memberPositionsData,
    loading: fetchingMemberPositions,
    fetchMore,
  } = useGetMemberPositionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { membershipId }, limit: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  })

  const totalCount = memberPositionsData?.membership.positions.totalCount
  const positionTableData: PositionsTableItem[] = createPositionTableData(memberPositionsData)

  const onRow = (row: PositionsTableItem) => {
    return {
      onClick: () => {
        onClickPosition(row.id)
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
          <Spin spinning={fetchingMemberPositions}>
            <Table
              rowKey="id"
              onRow={onRow}
              columns={positionTableColumns}
              dataSource={positionTableData}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: PAGE_SIZE,
                total: totalCount,
                onChange: onChangePage,
                showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </Spin>
        </div>
      </div>
    </>
  )
}
