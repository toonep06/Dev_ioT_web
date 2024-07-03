import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SimpleLineChart({ tdsData, phData }) {
  const tdsValues = tdsData.map(entry => entry.value / 10);
  const phValues = phData.map(entry => entry.value / 10); // แปลงค่า ph
  const timezoneOffset = 0//7 * 60 * 60 * 1000; // Offset สำหรับเวลาประเทศไทย (GMT+7)
  const xLabels = tdsData.map(entry => {
    const date = new Date(entry.ts + timezoneOffset); // ปรับเวลาเป็นเวลาประเทศไทย
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  return (
    <LineChart
      series={[
        {
          data: tdsValues,
          label: 'TDS',
          point: { visible: false },
          showMark: false,
        },
        {
          data: phValues,
          label: 'PH',
          point: { visible: false },
          showMark: false,
          
        },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      grid={{ vertical: false, horizontal: true }}
    />
  );
}
