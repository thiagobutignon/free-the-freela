import { renderHook, waitFor } from '@testing-library/react';

import { GetBankAccount } from '../../domain/models';
import { mockBankAccounts } from '../../domain/mocks';
import useBankAccount from './use-bank-account';

class GetBankAccountSpy implements GetBankAccount {
  callsCount = 0;
  response: GetBankAccount.Response = [];

  constructor (response?: GetBankAccount.Response) {
    if (response) {
      this.response = response;
    }
  }

  perform = async (): Promise<GetBankAccount.Response> => {
    this.callsCount++;
    return await Promise.resolve(this.response);
  }
}

describe('useBankAccount', () => {
  let getBankAccountSpy: GetBankAccountSpy;

  beforeEach(() => {
    getBankAccountSpy = new GetBankAccountSpy(mockBankAccounts);
  });

  it('initializes with the correct state', async () => {
    const { result } = renderHook(() => useBankAccount(getBankAccountSpy));

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
      expect(result.current.state.accounts).toEqual(mockBankAccounts);
    });

    expect(getBankAccountSpy.callsCount).toBe(1);
  });
});
