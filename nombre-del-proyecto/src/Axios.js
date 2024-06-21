import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import StockChart from './chart';

function Axios() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!symbol) {
      setError(new Error('Por favor, ingrese el símbolo de la acción.'));
      return;
    }

    setLoading(true);

    try {
      const apiKey = 'bOFaH4gIqy4r6KVTbUpFulWVoyGklgKQ';
      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/2024-05-01/2024-05-04?apiKey=${apiKey}`;
      
      const response = await axios.get(apiUrl);

      if (response.data.results) {
        setStockData(response.data.results);
        setError(null);
      } else {
        setError(new Error('No se encontraron datos para el símbolo proporcionado.'));
        setStockData(null);
      }
    } catch (error) {
      setError(new Error('Hubo un error al obtener los datos del stock.'));
      setStockData(null);
    }

    setLoading(false);
  };

  const handleSearch = async () => {
    await fetchData();
  };

  return (
    <div>
      <h1 className='header'>Consulta de Acciones</h1>
      <div>
        <label htmlFor="symbolInput">Ingrese el símbolo de la acción:</label>
        <input
          type="text"
          id="symbolInput"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {stockData && <StockChart symbol={symbol} />}
    </div>
  );
}

export default Axios;
