import Sidebar from '../components/Sidebar/SidebarAdmin';
import SearchProduct from '../components/SearchProduct';
import ProductList from '../components/ProductList';
import SidebarProduct from '../components/Sidebar/SidebarProduct';
function ProductManagement() {
    return (
        <div className="flex">
            <Sidebar activeTab="product" />
            <div>
                <SearchProduct />

                <div>
                    <h2 className="text-center text-[40px] text-red-500">Quản lý sản phẩm </h2>

                    <div className="flex">
                        <SidebarProduct />
                        <ProductList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagement;
