const WAValidator = require('@swyftx/api-crypto-address-validator')

export const validateAddress = (address: string, currency: string) => {
  return WAValidator.validate(address, currency)
}
