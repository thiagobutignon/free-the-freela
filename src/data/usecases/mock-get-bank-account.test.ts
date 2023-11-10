import { MockGetBankAccount } from './mock-get-bank-account';
import { faker } from '@faker-js/faker';
import { mockBankAccounts } from '../../domain/mocks';

jest.mock('timers');

describe('MockGetBankAccount', () => {
  let mockGetBankAccount: MockGetBankAccount;
  let setTimeoutSpy: jest.SpyInstance

  beforeEach(() => {
    mockGetBankAccount = new MockGetBankAccount();
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return a list of bank accounts when perform is called successfully', async () => {
    jest.spyOn(faker.datatype, 'boolean').mockReturnValue(true);

    const promise = mockGetBankAccount.perform();
    jest.runAllTimers();

    const sut = await promise;
    expect(sut).toEqual(mockBankAccounts);
    expect(setTimeoutSpy).toHaveBeenCalled();
  });

  it('should throw an error when perform is called and fails', async () => {
    jest.spyOn(faker.datatype, 'boolean').mockReturnValue(false);

    const promise = mockGetBankAccount.perform();
    jest.runAllTimers();

    await expect(promise).rejects.toThrow('An error occurred while retrieving bank accounts')
    expect(setTimeoutSpy).toHaveBeenCalled();
  });
});
