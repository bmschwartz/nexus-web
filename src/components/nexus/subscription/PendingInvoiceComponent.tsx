import React, { FC } from 'react'
import { InvoiceStatus, SubscriptionInvoice } from 'types/subscription'
import { Alert, Button } from 'antd'

interface PendingInvoiceComponentProps {
  invoice: SubscriptionInvoice
  openInvoice: (invoiceId?: string | null, onFinish?: () => void) => void
}

export const PendingInvoiceComponent: FC<PendingInvoiceComponentProps> = ({
  invoice,
  openInvoice,
}) => {
  const { status } = invoice
  return (
    <>
      {(status === InvoiceStatus.Paid || status === InvoiceStatus.Confirmed) && (
        <div className="row mb-3">
          <div className="col-lg-6 col-md-6">
            <Alert
              message="Received Payment"
              description="Waiting for more confirmations"
              type="success"
              showIcon
            />
          </div>
        </div>
      )}
      {status === InvoiceStatus.New && (
        <>
          <div className="row mb-3">
            <div className="col-lg-6 col-md-6">
              <Alert
                message="Payment Not on Blockchain"
                description="This may take 10 to 15 minutes after sending funds"
                type="info"
                showIcon
              />
            </div>
          </div>
          <Button type="primary" onClick={() => openInvoice(invoice.remoteId)}>
            Reopen Invoice
          </Button>
        </>
      )}
      {(status === InvoiceStatus.Expired || status === InvoiceStatus.Invalid) && (
        <div>
          <div className="row mb-3">
            <div className="col-lg-6 col-md-6">
              <Alert message={`Payment ${status}`} type="error" showIcon closable />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
