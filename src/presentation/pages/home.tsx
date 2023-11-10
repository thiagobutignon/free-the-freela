import './home.css'

import { AccountList, ChartBox } from '../components'
import React, { useEffect, useState } from 'react'

import { ApexOptions } from 'apexcharts'
import { GetBankAccount } from '../../domain/models'

type Props = {
  getBankAccount: GetBankAccount
}

export const Home: React.FC<Props> = ({ getBankAccount }) => {
  const [state, setState] = useState({
    accounts: [] as GetBankAccount.Response,
    isLoading: false,
    error: ''
  })
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
  const [showBarChart, setShowBarChart] = useState<boolean>(false)
  const [barChartData, setBarChartData] = useState<Array<{ x: string, y: number }>>([]);
  const [transactionDescriptions, setTransactionDescriptions] = useState<string[]>([]);

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

  const pieOptions: ApexOptions = {
    chart: {
      events: {
        dataPointSelection: handleDataPointSelection
      },
      type: 'pie'
    },
    labels: makeAccountTypes()
  }

  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: false,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      }
    },

    xaxis: {
      categories: aggregateDates(),
      tickPlacement: 'on'
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="arrow_box">
                  <span>${transactionDescriptions[dataPointIndex]}</span>
                </div>`;
      }
    }
  }

  const chartLabels = makeAccountTypes()
  const chartSeries = aggregateBalances()

  useEffect(() => {
    setState(old => ({ ...old, isLoading: true }))
    getBankAccount.perform()
      .then(accounts => {
        setState(old => ({ ...old, accounts, isLoading: false }));
      })
      .catch(error => {
        console.log(error)
        setState(old => ({ ...old, accounts: [], isLoading: false }))
      })
  }, [getBankAccount])

  return (
    <>
    <div className="chart-container" style={{ padding: '16px' }}>
      <ChartBox
        options={pieOptions}
        series={chartSeries}
        type={'pie'}
      />
      {showBarChart && (
        <ChartBox
          options={barOptions}
          series={[{ data: barChartData }]}
          type={'bar'}
        />
      )}
    </div>
    <AccountList accounts={state.accounts}/>
  </>
  )
}
