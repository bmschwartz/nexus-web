import React, { FC } from 'react'
import { PageHeader, Spin } from 'antd'

/* eslint-disable */
import { useGetGroupOrderSetDetailsQuery } from '../../../graphql'
/* eslint-enable */

interface OrderSetDetailProps {
  groupId: string
  orderSetId: string
  onClickBack: () => void
}

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, groupId, orderSetId }) => {
  console.log(groupId, orderSetId)
  const { data, loading } = useGetGroupOrderSetDetailsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupInput: { groupId },
      orderSetInput: { id: orderSetId },
    },
  })

  console.log(data?.group?.orderSet)

  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader className="site-page-header" title="Order Set Detail" onBack={onClickBack} />
        </div>
      </div>
      <Spin spinning={loading} tip="Fetching Order Set...">
        <div className="card-body">
          <div className="text-nowrap">Hey!</div>
        </div>
      </Spin>
    </>
  )
}
