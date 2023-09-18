import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { LatestBlock, BlockFromRouter} from './components/Block';
import { TransactionFromRouter } from './components/Transactions';
import { WalletFromRouter } from './components/Wallet';
import 'bootstrap/dist/css/bootstrap.min.css';

//import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LatestBlock />} />
                <Route path="block/:blockNumber" element={<BlockFromRouter />} />
                <Route path="transaction/:transactionHash" element={<TransactionFromRouter />} />
                <Route path="wallet/:walletHash" element={<WalletFromRouter />} />
            </Routes>
        </Router>
    );
}


export default App;
