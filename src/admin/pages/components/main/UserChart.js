import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import jwtAxios from '../../../../util/jwtUtil';

const ReservationStatsChart = ({ setTotalCounts }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    jwtAxios.get('http://localhost:8080/api/admin/reserves/totalCounts')
      .then((response) => response.data)
      .then((result) => {
        const chartData = [
          ['Category', 'Total'],
          ['성인', result['성인']],
          ['청소년', result['청소년']],
          ['미취학', result['미취학']],
        ];
        setData(chartData);
        setTotalCounts(result);  // Main 컴포넌트로 totalCounts 전달
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [setTotalCounts]);

  const options = {
    is3D: true,
  };

  return (
    <div>
      {data.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={'100%'}
          height={'400px'}
        />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default ReservationStatsChart;
