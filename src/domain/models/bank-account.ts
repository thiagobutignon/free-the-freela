export interface GetBankAccount {
  perform: () => GetBankAccount.Response
}

export namespace GetBankAccount {
  export type Response = BankAccount[]
}

export type BankAccount = {
  accountId: string
  accountType: BankAccount.AccountType
  balance: BankAccount.Balance
  transactions?: BankAccount.Transaction[]
  interestRate?: number
  creditLimit?: number
  loanTerm?: string
}

export namespace BankAccount {
  export type AccountType = 'checking' | 'savings' | 'creditCard' | 'loan'
  export type Balance = {
    available: number
    current: number
    totalLoan?: number
    amountPaid?: number
    outstanding?: number
  }
  export type Transaction = {
    transactionId: string
    amount: number
    description: string
    date: string
  }
}
