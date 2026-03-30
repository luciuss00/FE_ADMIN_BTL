import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import ProductList from '../components/ProductList';
import SidebarProduct from '../components/Sidebar/SidebarProduct';
function ProductManagement() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header nằm trên cùng */}
            <Header />

            <div className="flex">
                {/* Sidebar nằm bên trái, bên dưới Header */}
                <SidebarAdmin activeTab="product" />

                <div className="flex-1 p-6">
                    <div className="mt-4">
                        <h2 className="text-center text-[40px] text-red-500">Quản lý sản phẩm</h2>

                        <div className="flex mt-6">
                            <SidebarProduct />
                            <div className="flex-1">
                                <ProductList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagement;
