/* eslint-disable */
import { SubscriptionInvoice as RemoteSubscriptionInvoice } from '../graphql'
import { SubscriptionInvoice } from './subscription'
import { convertToLocalInvoiceStatus } from './membership'
/* eslint-enable */

export function transformInvoices(invoices: RemoteSubscriptionInvoice[]): SubscriptionInvoice[] {
  return invoices.map((invoice: RemoteSubscriptionInvoice) => {
    const { status, ...rest } = invoice
    return {
      status: convertToLocalInvoiceStatus(status),
      ...rest,
    }
  })
}
