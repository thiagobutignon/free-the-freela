import './home.css'

import { AccountList, ChartBox } from '../components'

import { ApexOptions } from 'apexcharts'
import { GetBankAccount } from '../../domain/models'
import React from 'react'
import useBankAccount from '../hooks/use-bank-account'

type Props = {
  getBankAccount: GetBankAccount
}

export const Home: React.FC<Props> = ({ getBankAccount }) => {
  const {
    state,
    handleDataPointSelection,
    makeAccountTypes,
    aggregateBalances,
    aggregateDates,
    showBarChart,
    barChartData,
    transactionDescriptions
  } = useBankAccount(getBankAccount);

  const chartSeries = aggregateBalances()

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
