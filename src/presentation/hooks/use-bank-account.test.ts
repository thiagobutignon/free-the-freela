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

  it('sets isLoading to true while fetching data', async () => {
    const { result } = renderHook(() => useBankAccount(getBankAccountSpy));

    expect(result.current.state.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });
  });

  it('updates state correctly on error', async () => {
    const error = new Error('An error occurred');
    getBankAccountSpy.perform = async () => await Promise.reject(error);
    const { result } = renderHook(() => useBankAccount(getBankAccountSpy));

    await waitFor(() => {
      expect(result.current.state.error).toBe(error.message);
      expect(result.current.state.accounts).toEqual([]);
    });
  });

  it('makes account types correctly', async () => {
    const { result } = renderHook(() => useBankAccount(getBankAccountSpy));
    await waitFor(() => { expect(result.current.state.isLoading).toBe(false); });

    const accountTypes = result.current.makeAccountTypes();
    expect(accountTypes).toEqual(mockBankAccounts.map(account => account.accountType));
  });

  it('reacts to changes in getBankAccount dependency', async () => {
    const newGetBankAccountSpy = new GetBankAccountSpy();
    const { result, rerender } = renderHook(({ getBankAccount }) => useBankAccount(getBankAccount), {
      initialProps: { getBankAccount: getBankAccountSpy }
    });

    rerender({ getBankAccount: newGetBankAccountSpy });

    await waitFor(() => {
      expect(result.current.state.accounts).not.toEqual(mockBankAccounts);
    });
  });
});
