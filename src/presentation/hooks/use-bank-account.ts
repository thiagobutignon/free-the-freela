import { useEffect, useState } from 'react';

import { GetBankAccount } from '../../domain/models';

const useBankAccount = (getBankAccount: GetBankAccount): any => {
  const [state, setState] = useState({
    accounts: [] as GetBankAccount.Response,
    isLoading: false,
    error: ''
  });
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
  const [showBarChart, setShowBarChart] = useState<boolean>(false);
  const [barChartData, setBarChartData] = useState<Array<{ x: string, y: number }>>([]);
  const [transactionDescriptions, setTransactionDescriptions] = useState<string[]>([]);

  useEffect(() => {
    setState(old => ({ ...old, isLoading: true }));
    getBankAccount.perform()
      .then(accounts => {
        setState(old => ({ ...old, accounts, isLoading: false }));
      })
      .catch(error => {
        console.log(error);
        setState(old => ({ ...old, accounts: [], error: 'An error occurred', isLoading: false }));
      });
  }, [getBankAccount]);

  const handleDataPointSelection = (event: any, chartContext: any, config: any): void => {
    setSelectedAccountIndex(config.dataPointIndex);
    const accountType = chartLabels[config.dataPointIndex];
    const selectedAccount = state.accounts.find(account => account.accountType === accountType);

    if (selectedAccount?.transactions) {
      const transactionData = selectedAccount.transactions.reduce<Record<string, number>>((acc, transaction) => {
        acc[transaction.date] = (acc[transaction.date] || 0) + transaction.amount;
        return acc;
      }, {});
      const descriptions = selectedAccount.transactions.map(transaction => transaction.description);
      setTransactionDescriptions(descriptions);
      setBarChartData(Object.entries(transactionData).map(([date, amount]) => ({ x: date, y: amount })));
      setShowBarChart(true);
    }
  };

  const makeAccountTypes = (): string[] => state.accounts.map(account => account.accountType);

  const aggregateBalances = (): number[] => {
    const balanceMap: Record<string, number> = {};
    state.accounts.forEach(account => {
      const { accountType, balance } = account;
      balanceMap[accountType] = (balanceMap[accountType] || 0) + balance.current;
    });
    return Object.values(balanceMap);
  };

  const aggregateDates = (): string[] | undefined => {
    return selectedAccountIndex != null ? state.accounts[selectedAccountIndex].transactions?.map(transaction => transaction.date) : []
  }

  const chartLabels = makeAccountTypes()

  return {
    state,
    handleDataPointSelection,
    makeAccountTypes,
    aggregateBalances,
    aggregateDates,
    showBarChart,
    setShowBarChart,
    barChartData,
    setBarChartData,
    transactionDescriptions
  };
};

export default useBankAccount;
