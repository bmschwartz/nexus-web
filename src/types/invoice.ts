/* eslint-disable */
import { SubscriptionInvoice as RemoteSubscriptionInvoice } from '../graphql'
import { SubscriptionInvoice } from './subscription'
import { convertToLocalInvoiceStatus } from './membership'
/* eslint-enable */

export function transformInvoices(invoices: RemoteSubscriptionInvoice[]): SubscriptionInvoice[] {
  return invoices.map(transformInvoice)
}

export function transformInvoice(invoice: RemoteSubscriptionInvoice): SubscriptionInvoice {
  const { status, ...rest } = invoice
  return {
    status: convertToLocalInvoiceStatus(status),
    ...rest,
  }
}
