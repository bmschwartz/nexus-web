import React, { FC } from 'react'
import { PageHeader, Spin } from 'antd'

/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { useGetPositionQuery } from '../../../graphql'
/* eslint-enable */

interface MemberPositionDetailProps {
  positionId: string
  onClickBack: () => void
}

export const MemberPositionDetail: FC<MemberPositionDetailProps> = ({
  onClickBack,
  positionId,
}) => {
  const { data, loading } = useGetPositionQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: { id: positionId },
    },
    notifyOnNetworkStatusChange: true,
  })

  const position = data?.position

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Position Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={loading} tip="Fetching Position">
        <div className="card-body">
          <div className="d-flex flex-nowrap align-items-center mt-3 pb-3 pl-4 pr-4">
            <strong className="mr-3">Exchange</strong>
            {position && position.exchange}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Symbol</strong>
            {position && position.symbol}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Side</strong>
            {position && position.side}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Quantity</strong>
            {position && position.quantity}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Avg Price</strong>
            {position && position.avgPrice}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Created</strong>
            {position && displayTimeBeforeNow(position.createdAt)}
          </div>
          <div className="d-flex flex-nowrap align-items-center mt-1 pb-3 pl-4 pr-4">
            <strong className="mr-3">Last Updated</strong>
            {position && displayTimeBeforeNow(position.updatedAt)}
          </div>
        </div>
      </Spin>
    </>
  )
}
