import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import ProductManagement from './pages/ProductManagement';
import BillManagement from './pages/BillManagement';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/product-management" element={<ProductManagement />} />
                    <Route path="/bill-management" element={<BillManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
