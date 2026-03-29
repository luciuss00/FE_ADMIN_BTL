import Sidebar from '../components/Sidebar';
import SearchProduct from '../components/SearchProduct';
import ProductList from '../components/ProductList';

function ProductManagement() {
    return (
        <div className="flex">
            <Sidebar activeTab="product" />
            <div>
                <SearchProduct />
                <ProductList />
            </div>
        </div>
    );
}

export default ProductManagement;
