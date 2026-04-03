import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import UserProtectedRoute from './components/Protected/UseProtectedRoute';

import Home from './pages/Home';
import SignIn from './pages/Signin';
import UserManagement from './pages/UserManagement';
import ProductManagement from './pages/ProductManagement';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import UserDetail from './pages/UserDetail';
import Search from './pages/Search';

import All from './pages/OrderManagement/All';
import Access from './pages/OrderManagement/Access';
import Cancel from './pages/OrderManagement/Cancel';
import Finish from './pages/OrderManagement/Finish';
import Ship from './pages/OrderManagement/Ship';

import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContex';

function App() {
    return (
        <OrderProvider>
            <UserProvider>
                <ProductProvider>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/" element={<Navigate to="/signin" replace />} />

                                <Route element={<UserProtectedRoute />}>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/user-management" element={<UserManagement />} />
                                    <Route path="/product-management" element={<ProductManagement />} />
                                    <Route path="/detail" element={<ProductDetail />} />
                                    <Route path="/add-product" element={<AddProduct />} />
                                    <Route path="/update-product" element={<UpdateProduct />} />
                                    <Route path="/user-detail" element={<UserDetail />} />
                                    <Route path="/search" element={<Search />} />

                                    <Route path="/order-management/all" element={<All />} />
                                    <Route path="/order-management/access" element={<Access />} />
                                    <Route path="/order-management/ship" element={<Ship />} />
                                    <Route path="/order-management/finish" element={<Finish />} />
                                    <Route path="/order-management/cancel" element={<Cancel />} />
                                </Route>

                                <Route path="/signin" element={<SignIn />} />
                            </Routes>
                        </div>
                    </Router>
                </ProductProvider>
            </UserProvider>
        </OrderProvider>
    );
}

export default App;
