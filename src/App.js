import './App.css';
import React, {useState} from 'react';

function App() {
  const key = 'pk_a2934b2aa0e64cc8b09f0014ccd0b4ca';
  const [data, setData] = useState([{}]);
  const [symbol, setSymbol] = useState('');
  const [noData, setNoData] = useState(false);

  const getData = (e => {
    if(e.keyCode === 13) {
      fetch(`https://api.iex.cloud/v1/data/core/quote/${symbol}?token=${key}`).then(
        response => response.json()
      ).then(
        data => {
          if(data[0].companyName === undefined){
            setNoData(true)
          }else{
            setNoData(false)
          }
          setData(data)
          setSymbol('')
        }
      )
    }
  })

  return (
    <div className='app'>
      <h1>Stock Data Lookup</h1>
      <input className='searchbar' placeholder='Search Stock Symbol'
        onChange={e => setSymbol(e.target.value)}
        value={symbol}
        onKeyDown={getData}
      />
      
      <div className='data-container'>
        <div>
          <p className='data-item'>Company: {data[0].companyName === undefined ? '--' : `${data[0].companyName} (${data[0].symbol})`}</p>
          <p className='data-item'>Current Price: {data[0].latestPrice === undefined ? '--' : `$${data[0].latestPrice}`}</p>
          <p className='data-item'>Change in Price: {data[0].change === undefined ? '--' : data[0].change}</p>
          <p className='data-item'>Percentage Change: {data[0].changePercent === undefined ? '--' : `${Math.round(data[0].changePercent*10000)/100}%`}</p>
        </div>
        {noData === false ? null : <p className='data-not-found'>Data not found. Try again.</p>}
      </div>
    </div>
  );
}

export default App;
