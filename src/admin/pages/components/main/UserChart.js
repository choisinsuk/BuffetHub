import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const DonutChart = () => {
    useEffect(() => {
        // 스크립트 로드
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

        loadGoogleCharts();

        const drawChart = () => {
            if (!window.google) {
                console.error('Google Charts not loaded');
                return;
            }

            const data = window.google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
            ]);

            const options = {
                title: 'My Daily Activities',
                is3D: true, // 3D 차트 설정
            };

            const chart = new window.google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
        };

        // clean up function
        return () => {
            // 스크립트 제거
            const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
            if (script) script.remove();
        };
    }, []);

    return (
        <div>
            <div id="piechart_3d" style={{ width: '900px', height: '500px' }}></div>
        </div>
    );
};

export default DonutChart;
