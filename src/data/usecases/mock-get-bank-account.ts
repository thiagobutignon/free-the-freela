import { GetBankAccount } from '@/domain/models'
import { mockBankAccounts } from '../../domain/mocks'

export class MockGetBankAccount implements GetBankAccount {
  async perform (): Promise<GetBankAccount.Response> {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))
    const makeRequest = true
    if (makeRequest) {
      return mockBankAccounts
    } else {
      throw new Error('An error occurred while retrieving bank accounts')
    }
  }
}
