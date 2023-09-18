import { Alchemy, Network } from 'alchemy-sdk';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
};

const alchemy = new Alchemy(settings);

export function WalletText({walletHash}) {
    return (<Link to={`/wallet/${walletHash}`}>{walletHash}</Link>);
}

export function WalletFromRouter() {
    const { walletHash } = useParams();
    const [walletTokens, setWalletTokens] = useState();

    useEffect(() => {
        async function getWalletTokens() {
            if(walletHash) {
                setWalletTokens(await alchemy.core.getTokenBalances(walletHash));
            }
        }

        getWalletTokens();
    }, [walletHash])

    const token_table = [];

    if (walletHash && walletTokens) {
        walletTokens.tokenBalances.forEach(item => {
            token_table.push(
                <>
                <tr>
                    <td>{item.contractAddress}</td>
                    <td>{item.tokenBalance}</td>
                </tr>
                </>
            );
        });
        return (
            <Stack gap={3}>
                <div className="p-2"><h3>Wallet <WalletText walletHash={walletHash} /></h3></div>
                <Table striped bordered hover>
                    <tr>
                        <th>Token Balances </th>
                    </tr>
                    <tr>
                        <th>Contract Address</th>
                        <th>Token Balance</th>
                    </tr>
                    {token_table}
                </Table>
            <div className="p-2"><Link to="/">Go back to latest block </Link></div>
            </Stack>
        )
    } else {
        return (<div>loading?..</div>);
    }
}
