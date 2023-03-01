import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockHash, setBlockHash] = useState();
  const [blockTimestamp, setBlockTimestamp] = useState();
  const [txTo, setTxTo] = useState();
  const [txFrom, setTxFrom] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getTXs() {
      const blockWithTxs = await alchemy.core.getBlockWithTransactions();
      console.log(blockWithTxs);
      setBlockHash(blockWithTxs.hash);
      setTxTo(blockWithTxs.transactions[0].to);
      setTxFrom(blockWithTxs.transactions[0].from);
      };    
    
    getTXs();
    getBlockNumber();
  });


  return <div>
    <div className="App">Block Number: {blockNumber}</div>
    <div className="App">Block Hash: {blockHash}</div>
    <div className="App">Block Timestamp: {blockTimestamp}</div>
    <br/>
    <div className="App">THE LAST TRANSACTION</div>
    <div className="App">From: {txFrom} To: {txTo}</div>
  </div>  
  ;
}

export default App;
