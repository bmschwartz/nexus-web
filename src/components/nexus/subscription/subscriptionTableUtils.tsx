/* eslint-disable */
import { displayTimeBeforeNow } from '../dateUtil'
import { GetGroupSubscriptionOptionsQuery } from '../../../graphql'
import labelTooltip from '../labelTooltip'
import { Button, Input, InputNumber, Switch } from 'antd'
import React from 'react'

/* eslint-enable */

export interface SubscriptionOptionTableItem {
  id: string
  price: number
  active: boolean
  duration: number
  memberCount: number
  description: string
  createdAt: string
}

export const createSubscriptionTableData = (
  subscriptionOptionsResponse?: GetGroupSubscriptionOptionsQuery,
): SubscriptionOptionTableItem[] | undefined => {
  return subscriptionOptionsResponse?.myGroup?.subscriptionOptions.map(option => {
    const { id, active, price, duration, memberCount, description, createdAt } = option
    return {
      id,
      price,
      active,
      duration,
      memberCount,
      description: description ?? '',
      createdAt: displayTimeBeforeNow(createdAt),
    }
  })
}

export interface SubscriptionTableColumnsProps {
  disabledState: boolean
  editingOptionId: string | null
  onClickEdit: (optionId: string) => void
  onClickDelete: (optionId: string) => void
  onToggleActive: (optionId: string) => void
  onClickSave: (option: SubscriptionOptionTableItem) => void
  onChange: (index: number, field: string, value: any) => void
}

export const subscriptionTableColumns = ({
  disabledState,
  editingOptionId,
  onClickEdit,
  onClickDelete,
  onToggleActive,
  onClickSave,
  onChange,
}: SubscriptionTableColumnsProps) => {
  return [
    {
      title: labelTooltip('Active', 'Active subscription options are available to new members'),
      dataIndex: 'active',
      key: 'active',
      width: '10%',
      render: (_: boolean, option: SubscriptionOptionTableItem) => (
        <Switch
          checked={option.active}
          disabled={disabledState}
          onClick={async () => onToggleActive(option.id)}
        />
      ),
    },
    {
      title: 'Duration (Months)',
      dataIndex: 'duration',
      key: 'duration',
      width: '10%',
    },
    {
      title: 'Price (USD)',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      render: (price: string, option: SubscriptionOptionTableItem, index: number) => {
        return editingOptionId === option.id ? (
          <InputNumber
            min={0}
            step={1}
            max={999999}
            defaultValue={Number(price)}
            onChange={newPrice => onChange(index, 'price', newPrice)}
          />
        ) : (
          <span>{price}</span>
        )
      },
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'members',
      width: '10%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string, option: SubscriptionOptionTableItem, index: number) => {
        return editingOptionId === option.id ? (
          <Input
            maxLength={100}
            defaultValue={description}
            onChange={(e: any) => onChange(index, 'description', e.target.value)}
          />
        ) : (
          <span>{description}</span>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (_: any, option: SubscriptionOptionTableItem) => {
        const SaveOrEditButton =
          editingOptionId === option.id ? (
            <Button type="link" disabled={disabledState} onClick={() => onClickSave(option)}>
              Save
            </Button>
          ) : (
            <Button type="link" disabled={disabledState} onClick={() => onClickEdit(option.id)}>
              Edit
            </Button>
          )
        const DeleteButton = (
          <Button
            danger
            type="link"
            disabled={disabledState}
            onClick={() => onClickDelete(option.id)}
          >
            Delete
          </Button>
        )

        return (
          <div>
            {SaveOrEditButton}
            {DeleteButton}
          </div>
        )
      },
    },
  ]
}
