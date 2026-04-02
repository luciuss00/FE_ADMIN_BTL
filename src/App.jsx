import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import BillManagement from './pages/BillManagement';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
function App() {
    return (
        <UserProvider>
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
                            <Route path="/update-product" element={<UpdateProduct />} />
                        </Routes>
                    </div>
                </Router>
            </ProductProvider>
        </UserProvider>
    );
}

export default App;
