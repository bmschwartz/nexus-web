import { PageHeader } from 'antd'
import React, { FC } from 'react'

interface ExchangeAccountDetailProps {
  onClickBack: () => void
  exchangeAccountId: string
}

export const ExchangeAccountDetail: FC<ExchangeAccountDetailProps> = ({
  onClickBack,
  exchangeAccountId,
}) => {
  return (
    <>
      <div className="card-header card-header-flex">
        <div className="d-flex flex-column justify-content-center mr-auto">
          <PageHeader
            className="site-page-header"
            title="Exchange Account Detail"
            onBack={onClickBack}
          />
        </div>
      </div>
      <p>{exchangeAccountId}</p>
    </>
  )
}
