import { GetBankAccount } from '@/domain/models';
import { faker } from '@faker-js/faker';
import { mockBankAccounts } from '../../domain/mocks';

export class MockGetBankAccount implements GetBankAccount {
  async perform(): Promise<GetBankAccount.Response> {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    if (faker.datatype.boolean()) {
      return mockBankAccounts;
    } else {
      throw new Error('An error occurred while retrieving bank accounts');
    }
  }
}
