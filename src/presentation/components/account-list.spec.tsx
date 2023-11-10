import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import AccountList from './account-list';
import { BankAccount } from '../../domain/models';

describe('AccountList Component', () => {
  const mockAccounts: BankAccount[] = [
    {
      accountId: '1',
      accountType: 'checking',
      balance: { available: 1000, current: 1200 },
      transactions: [
        { transactionId: 't1', amount: 100, description: 'Transaction 1', date: '2023-01-01' },
        { transactionId: 't2', amount: 200, description: 'Transaction 2', date: '2023-01-02' }
      ]
    },
    {
      accountId: '2',
      accountType: 'savings',
      balance: { available: 2000, current: 2200 },
      transactions: [
        { transactionId: 't3', amount: 300, description: 'Transaction 3', date: '2023-01-03' }
      ]
    }
  ];

  const makeSut = (accounts: BankAccount[]): void => {
    render(<AccountList accounts={accounts} />);
  }

  it('renders correctly with accounts', () => {
    makeSut(mockAccounts)

    expect(screen.getByText('Account Type: checking')).toBeInTheDocument();
    expect(screen.getByText('Account Type: savings')).toBeInTheDocument();

    expect(screen.getByText('Current Balance: $1200.00')).toBeInTheDocument();
    expect(screen.getByText('Current Balance: $2200.00')).toBeInTheDocument();

    expect(screen.getByText('Number of Transactions: 2')).toBeInTheDocument();
    expect(screen.getByText('Number of Transactions: 1')).toBeInTheDocument();
  });

  it('renders empty list correctly', () => {
    makeSut([])

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
