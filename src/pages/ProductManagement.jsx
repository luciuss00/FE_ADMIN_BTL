import Header from '../components/Header';
import Sidebar from '../components/Sidebar/SidebarAdmin';
import ProductList from '../components/ProductList';
import SidebarProduct from '../components/Sidebar/SidebarProduct';
function ProductManagement() {
    return (
        <div className="flex">
            <Sidebar activeTab="product" />
            <div>
                <Header />

                <div className="mt-10">
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
