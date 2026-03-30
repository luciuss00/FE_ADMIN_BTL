import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import BillManagement from './pages/BillManagement';

import { ProductProvider } from './context/ProductContext';
function App() {
    return (
        <ProductProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/user-management" element={<UserManagement />} />
                        <Route path="/product-management" element={<ProductManagement />} />
                        <Route path="/bill-management" element={<BillManagement />} />
                    </Routes>
                </div>
            </Router>
        </ProductProvider>
    );
}

export default App;
