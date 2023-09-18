import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import {  Transactions } from './Transactions';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);


export function BlockText({blockNumber}) {
    return (<Link to={`/block/${blockNumber}`}>{blockNumber}</Link>);
}

export function BlockInfo({blockNumber}) {
    const [blockTransactions, setTransactions] = useState(null);

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
            <Stack gap={3}>
            <div className="p-2">
                <Table striped bordered hover>
                    <tr>
                        <th>Hash</th>
                        <td><BlockText blockNumber={blockTransactions.hash}/></td>
                    </tr>
                    <tr>
                        <th>Miner</th>
                        <td>{blockTransactions.miner}</td>
                    </tr>
                    <tr>
                        <th>Parent</th>
                        <td><BlockText blockNumber={blockTransactions.parentHash}/></td>
                    </tr>
                </Table>
            </div>
            <div className="p-2" >Transactions <Transactions transactionList={blockTransactions.transactions} /></div>
            </Stack>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export function Block({blockNumber}) {
     if (! blockNumber.startsWith("0x"))
        blockNumber = parseInt(blockNumber)

    if (!blockNumber) {
        return (<LatestBlock/>)
    }

    return (
        <>
            <div className="App">
                Block Number: {blockNumber}
            </div>
            <BlockInfo blockNumber={blockNumber} />
        </>
    );   
}

export function BlockFromRouter() {
    let { blockNumber } = useParams();
    return (<Block blockNumber={blockNumber}/>)
}

export function BlockHash() {
    let { blockNumber } = useParams();
    blockNumber = parseInt(blockNumber)

    console.log(blockNumber)
    if (!blockNumber) {
        return (<LatestBlock/>)
    }

    return (
        <>
            <div className="App">
                Block Number: {blockNumber}
            </div>
            <BlockInfo blockNumber={blockNumber} />
        </>
    );
}

export function LatestBlock() {
    const [blockNumber, setBlockNumber] = useState();

    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
        }

        getBlockNumber();
    }, []);

    return (
    <>
        <div className="App">
            Block Number: {blockNumber}
        </div>
        <BlockInfo blockNumber={blockNumber} />
    </>
    );
}
