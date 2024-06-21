import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function StockChart({ symbol }) {
  const [stockData, setStockData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'bOFaH4gIqy4r6KVTbUpFulWVoyGklgKQ';
        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-05-01/2024-05-04?apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        
        if (response.data.results) {
          setStockData(response.data.results);
        }
      } catch (error) {
        console.error('Hubo un error al obtener los datos del stock:', error);
      }
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (stockData.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destruye el gráfico existente antes de crear uno nuevo
      }

      const ctx = document.getElementById('stockChart');
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockData.map(data => data.t),
          datasets: [{
            label: 'Precio de cierre',
            data: stockData.map(data => data.c),
            borderColor: 'blue',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Precio'
              }
            }
          }
        }
      });
    }
  }, [stockData]);

  return <canvas id="stockChart" width="400" height="200"></canvas>;
}

export default StockChart;
