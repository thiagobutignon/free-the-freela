import { BankAccount, GetBankAccount } from "@/domain/models";

import { faker } from '@faker-js/faker';

class MockBankAccountFactory {
  static createAccount(accountType: BankAccount.AccountType): BankAccount {
    return {
      accountId: faker.string.uuid(),
      accountType: accountType,
      balance: this.createBalance(accountType),
      transactions: this.createTransactions(),
      interestRate: accountType === 'savings' || accountType === 'loan' ? faker.number.float({ min: 0, max: 0.1 }) : undefined,
      creditLimit: accountType === 'creditCard' ? faker.number.int({ min: 1000, max: 10000 }) : undefined,
      loanTerm: accountType === 'loan' ? `${faker.number.int({ min: 1, max: 30 })} years` : undefined
    };
  }

  private static createBalance(accountType: BankAccount.AccountType): BankAccount.Balance {
    const current = faker.number.int({ min: 1000, max: 100000 });
    const balance: BankAccount.Balance = {
      available: current - faker.number.int({ min: 0, max: 500 }),
      current: current
    };

    if (accountType === 'loan') {
      balance.totalLoan = current + faker.number.int({ min: 1000, max: 50000 });
      balance.amountPaid = faker.number.int({ min: 0, max: balance.totalLoan - 1000 });
      balance.outstanding = balance.totalLoan - balance.amountPaid;
    }

    return balance;
  }

  private static createTransactions(): BankAccount.Transaction[] {
    return Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
      transactionId: faker.string.uuid(),
      amount: faker.number.int({ min: 1, max: 1000 }),
      description: faker.commerce.productName(),
      date: faker.date.recent().toISOString().split('T')[0]
    }));
  }
}


export const mockBankAccounts: GetBankAccount.Response = [
  MockBankAccountFactory.createAccount('checking'),
  MockBankAccountFactory.createAccount('savings'),
  MockBankAccountFactory.createAccount('creditCard'),
  MockBankAccountFactory.createAccount('loan'),
];
