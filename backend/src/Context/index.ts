export interface BankingRoutesLinkData {
  linkSuccess: boolean
  isItemAccess: boolean
  isPaymentInitiation: boolean
  linkToken: string | null
  accessToken: string | null
  itemId: string | null
  isError: boolean
  backend: boolean
  products: string[]
  linkTokenError: {
    error_message: string
    error_code: string
    error_type: string
  }
}
