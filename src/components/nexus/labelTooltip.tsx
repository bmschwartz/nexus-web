import { Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import React from 'react'

export default function labelTooltip(label: string, tooltipText: string) {
  return (
    <>
      <span className="mr-2">{label}</span>
      <Tooltip title={tooltipText} color="blue">
        <InfoCircleOutlined color="blue" />
      </Tooltip>
    </>
  )
}
