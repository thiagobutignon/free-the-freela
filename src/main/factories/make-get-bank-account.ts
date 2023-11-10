import { GetBankAccount } from '../../domain/models'
import { MockGetBankAccount } from '../../data/usecases'

export const makeGetBankAccount = (): GetBankAccount => {
  return new MockGetBankAccount()
}
