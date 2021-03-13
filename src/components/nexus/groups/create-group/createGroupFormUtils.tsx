import { Input, InputNumber } from 'antd'
import React from 'react'

export const validPayoutCurrencies = ['BTC', 'ETH', 'LTC']

export const membershipTableColumns = [
  {
    title: 'Duration (Months)',
    dataIndex: 'duration',
    key: 'duration',
    width: '10%',
    render: () => <InputNumber min={1} step={1} max={12} defaultValue={1} />,
  },
  {
    title: 'Fee (USD)',
    dataIndex: 'fee',
    key: 'fee',
    width: '25%',
    render: () => <InputNumber min={0} max={999999} step={1} defaultValue={100} />,
  },
  {
    title: 'Description (Optional)',
    dataIndex: 'description',
    key: 'description',
    render: () => <Input maxLength={100} />,
  },
]
