import { ApexOptions } from 'apexcharts';
import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartBoxProps = {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  type: 'bar' | 'pie'
};

const ChartBox: React.FC<ChartBoxProps> = ({ options, series, type }) => {
  return (
    <Box width={['100%', '50%']} minWidth="390px" mt="16px">
      <ReactApexChart
        options={options}
        series={series}
        type={type}
      />
    </Box>
  );
};

export default ChartBox;
