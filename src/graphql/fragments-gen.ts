export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Currency: ['BitmexCurrency', 'BinanceCurrency'],
  },
}
export default result
