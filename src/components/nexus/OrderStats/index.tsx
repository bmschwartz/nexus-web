import React from 'react'
import { Spin } from 'antd'

interface OrderStatsProps {
  totalOrders?: number
}

const OrderStats = ({ totalOrders }: OrderStatsProps) => {
  const countLabel = totalOrders !== undefined ? totalOrders : <Spin />

  return (
    <>
      <div className="d-flex flex-wrap align-items-center">
        <div className="mr-auto">
          <p className="text-uppercase text-dark font-weight-bold mb-1">Orders</p>
          <p className="text-gray-5 mb-0">All Time Orders</p>
        </div>
        <p className="text-primary font-weight-bold font-size-24 mb-0">{countLabel}</p>
      </div>
    </>
  )
}

export default OrderStats
