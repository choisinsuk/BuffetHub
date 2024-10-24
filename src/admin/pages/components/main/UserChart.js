import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const DonutChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // API 호출하여 데이터 가져오기
        const fetchReservationData = async () => {
            try {
                const response = await fetch('/api/reserve'); // API 경로에 맞게 수정
                const result = await response.json();
                // result를 적절히 가공하여 data 상태에 저장
                setData([
                    ['Category', 'Count'],
                    ['Adults', result.adultCount],
                    ['Teenagers', result.teenagerCount],
                    ['Preschoolers', result.preaCount],
                ]);
            } catch (error) {
                console.error('Failed to fetch reservation data:', error);
            }
        };

        fetchReservationData();
    }, []);

    useEffect(() => {
        // 스크립트 로드 및 차트 그리기
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.async = true;
            script.onload = () => {
                window.google.charts.load('current', { packages: ['corechart'] });
                window.google.charts.setOnLoadCallback(drawChart);
            };
            document.body.appendChild(script);
        };

        const drawChart = () => {
            if (!window.google || data.length === 0) {
                console.error('Google Charts not loaded or no data');
                return;
            }

            const chartData = window.google.visualization.arrayToDataTable(data);

            const options = {
                title: 'Reservation Ratios',
                pieHole: 0.4, // 도넛 차트로 만들기
                is3D: false, // 3D 차트 설정
            };

            const chart = new window.google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(chartData, options);
        };

        loadGoogleCharts();

        // clean up function
        return () => {
            const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
            if (script) script.remove();
        };
    }, [data]); // data가 변경될 때마다 차트를 다시 그림

    return (
        <div>
            <div id="piechart_3d" style={{ width: '900px', height: '500px' }}></div>
        </div>
    );
};

export default DonutChart;
