import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import BillManagement from './pages/BillManagement';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';

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
                        <Route path="/detail" element={<ProductDetail />} />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Routes>
                </div>
            </Router>
        </ProductProvider>
    );
}

export default App;
