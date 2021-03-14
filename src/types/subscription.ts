export interface GroupSubscription {
  id: string
  price: number
  active: boolean
  duration: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionInvoice {
  id: string
  email: string
  amountPaid: number
  amountCharged: number

  status: InvoiceStatus | null
  token?: string | null
  remoteId?: string | null

  periodStart?: Date | null
  periodEnd?: Date | null
  expiresAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export enum InvoiceStatus {
  New = 'New',
  Paid = 'Paid',
  Confirmed = 'Confirmed',
  Complete = 'Complete',
  Expired = 'Expired',
  Invalid = 'Invalid',
}
