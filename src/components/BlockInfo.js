import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {  Transactions } from './Transactions';
import Table from 'react-bootstrap/Table';


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);
function BlockInfo({blockNumber}) {
    const [blockTransactions, setTransactions] = useState();

    useEffect(() => {
        async function getTransactions() {
            if (blockNumber) {
                setTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));
                console.log("Fetching Transactions, for blockNumber: " + blockNumber);
            }
        }

        getTransactions();
    },[blockNumber]);

    if (blockTransactions) {

        console.dir(blockTransactions);
        return (
            <>
            <Table stripped>
                <tr>
                    <th>Hash</th>
                    <td>{blockTransactions.hash}</td>
                </tr>
                <tr>
                    <th>Miner</th>
                    <td>{blockTransactions.miner}</td>
                </tr>
                <tr>
                    <th>Parent</th>
                    <td>{blockTransactions.parentHash}</td>
                </tr>
            </Table>
            <div>Transactions <Transactions transactionList={blockTransactions.transactions} /></div>
            </>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default BlockInfo;
