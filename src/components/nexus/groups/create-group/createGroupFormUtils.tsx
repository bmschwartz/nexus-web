import { Input, InputNumber } from 'antd'
import React from 'react'

export const validPayoutCurrencies = ['BTC', 'ETH', 'LTC']

export interface SubscriptionOption {
  duration: number
  fee: number
  description?: string
}

export const subscriptionTableColumns = (
  onChange: (index: number, field: string, value: any) => void,
) => {
  return [
    {
      title: 'Duration (Months)',
      dataIndex: 'duration',
      key: 'duration',
      width: '10%',
      render: (_: any, option: SubscriptionOption, row: number) => (
        <InputNumber
          min={1}
          step={1}
          max={12}
          defaultValue={option.duration}
          onChange={(duration: any) => onChange(row, 'duration', duration)}
        />
      ),
    },
    {
      title: 'Fee (USD)',
      dataIndex: 'fee',
      key: 'fee',
      width: '25%',
      render: (_: any, option: SubscriptionOption, row: number) => (
        <InputNumber
          min={0}
          step={1}
          max={999999}
          defaultValue={option.fee}
          onChange={(fee: any) => onChange(row, 'fee', fee)}
        />
      ),
    },
    {
      title: 'Description (Optional)',
      dataIndex: 'description',
      key: 'description',
      render: (_: any, option: SubscriptionOption, row: number) => (
        <Input
          maxLength={100}
          defaultValue={option.description}
          onChange={(e: any) => onChange(row, 'description', e.target.value)}
        />
      ),
    },
  ]
}
