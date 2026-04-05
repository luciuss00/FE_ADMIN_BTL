import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { useUser } from '../context/UserContext';
import { useOrder } from '../context/OrderContext';

function Home() {
    const { products, fetchProductsOnce } = useProducts();
    const { users, fetchUsers } = useUser();
    const { orders, fetchOrders } = useOrder();

    useEffect(() => {
        fetchProductsOnce();
    }, [fetchProductsOnce]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    console.log(orders);

    function getTotalCompleted() {
        return orders
            .filter((order) => order.status === 'COMPLETED') // Giữ lại các đơn hàng thành công
            .reduce((sum, order) => sum + Number(order.total_amount), 0); // Cộng dồn
    }

    return (
        <div>
            {/* 1. Sidebar - Cố định chiều rộng */}
            <Header />

            {/* 2. Phần nội dung chính bên phải */}
            <div className="flex">
                {/* Header nằm trên cùng của phần nội dung */}
                <SidebarAdmin />

                {/* 3. Vùng hiển thị nội dung chi tiết (Dashboard) */}
                <main className="mt-5 overflow-x-hidden overflow-y-auto p-6">
                    <div className="ml-20 w-300 container mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Chào mừng quay trở lại, Admin!</h1>

                        {/* Các thẻ thống kê nhanh (Widgets) */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link to="/product-management">
                                <StatCard title="Sản phẩm" value={products.length} color="bg-red-500" />
                            </Link>
                            <Link to="/user-management">
                                <StatCard title="Người dùng " value={users.length} color="bg-blue-500" />
                            </Link>
                            <StatCard
                                title="Doanh thu"
                                value={getTotalCompleted().toLocaleString('vi-VN') + ' đ'}
                                color="bg-green-500"
                            />
                            <Link to="/order-management/all">
                                <StatCard title="Đơn hàng" value={orders.length} color="bg-purple-500" />
                            </Link>
                        </div>

                        {/* Khu vực biểu đồ hoặc danh sách bảng biểu bên dưới */}
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Hoạt động gần đây</h2>
                            <div className="h-64 border-2 border-dashed border-gray-200 flex items-center justify-center">
                                <p className="text-gray-400">Biểu đồ hoặc Bảng dữ liệu sẽ đặt ở đây</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Component phụ trợ để giao diện sạch sẽ hơn
function StatCard({ title, value, color }) {
    return (
        <div
            className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-solid hover:bg-gray-100"
            style={{ borderColor: 'transparent', borderLeftColor: 'red' }}
        >
            <div className={`text-xs font-bold uppercase mb-1 text-gray-500`}>{title}</div>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
        </div>
    );
}

export default Home;
