import React, { FC } from 'react'
import { Button } from 'antd'

/* eslint-disable */
/* eslint-enable */

interface OrderSetDetailProps {
  orderSetId?: String
  onClickBack: () => void
}

export const OrderSetDetail: FC<OrderSetDetailProps> = ({ onClickBack, orderSetId }) => {
  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <h5 className="mb-0">Order Set Detail: {`${orderSetId}`}</h5>
          <Button onClick={onClickBack}>Back</Button>
        </div>
      </div>
    </>
  )
}
