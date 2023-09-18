import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { BlockText } from './Block'
import { WalletText } from './Wallet'
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

export function TransactionFromRouter() {
    const [transaction, setTransaction] = useState();
    const { transactionHash } = useParams();

    useEffect(() => {
        async function getTransaction() {
            if (transactionHash) {
                setTransaction(await alchemy.core.getTransactionReceipt(transactionHash))
            }
        }

        getTransaction()

    }, [transactionHash]);


    if (transaction) {
        return Transaction({transaction});
    } else {
        return (<div>Loading?</div>);
    }
}

export function Transaction({transaction}) {
    console.dir(transaction)
    return (
        <Stack gap={3}>
        <div className="p-2"><h3>Transaction <TransactionText transaction={transaction} /></h3></div>
        <Table striped bordered hover>
            <tr>
                <th>Transaction Hash</th>
                <td><TransactionText transaction={transaction} /></td>
            </tr>
            <tr>
                <th>Block Hash</th>
                <td><BlockText blockNumber={transaction.blockHash} /></td>
            </tr>
            <tr>
                <th>Block Number</th>
                <td><BlockText blockNumber={transaction.blockNumber} /></td>
            </tr>
            <tr>
                <th>Confirmations</th>
                <td>{transaction.confirmations}</td>
            </tr>
            <tr>
                <th>To</th>
                <td><WalletText walletHash={transaction.to} /></td>
            </tr>
            <tr>
                <th>From</th>
                <td><WalletText walletHash={transaction.from} /></td>
            </tr>
        </Table>
        </Stack>
    )
}

export function TransactionText({transaction}) {
    console.log(transaction)
    if (transaction.hasOwnProperty('hash')) {
        return (
            <>
            <Link to={`/transaction/${transaction.hash}`}>{transaction.hash}</Link>
            </>
        );
    }

    return (
        <>
        <Link to={`/transaction/${transaction.transactionHash}`}>{transaction.transactionHash}</Link>
        </>
    );

}

export function Transactions({transactionList}) {
    let container = [];

    transactionList.forEach((v, i) => {
       container.push(
           <li>
           Transaction Hash: <TransactionText transaction={v}/>
           </li>
       );
    });

    return(
        <div>{container}</div>
    )
}

