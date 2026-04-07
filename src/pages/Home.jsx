import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import Header from '../components/Header';
import { useProducts } from '../context/ProductContext';
import { useUser } from '../context/UserContext';
import { useOrder } from '../context/OrderContext';

import HomeService from '../services/homeService'; // Import service của bạn
import {
    FaBox,
    FaUsers,
    FaMoneyBillWave,
    FaClipboardList,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTruck,
    FaClock,
    FaFire,
} from 'react-icons/fa'; // Nhớ cài react-icons: npm install react-icons

function Home() {
    const navigate = useNavigate();
    const { products, fetchProductsOnce } = useProducts();
    const { users, fetchUsers } = useUser();
    const { orders, fetchOrders } = useOrder();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductsOnce();
    }, [fetchProductsOnce]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const res = await HomeService.showDashboard();
                setDashboardData(res.data);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        getDashboard();
    }, []);

    if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

    // Giả sử doanh thu bạn tính từ danh sách orders hoặc lấy từ API
    function getTotalCompleted() {
        return orders
            .filter((order) => order.status === 'COMPLETED') // Giữ lại các đơn hàng thành công
            .reduce((sum, order) => sum + Number(order.total_amount), 0); // Cộng dồn
    }

    const handleProductClick = (product) => {
        navigate(`/detail?name=${encodeURI(product.nameProduct)}`, {
            state: { product: product },
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển hệ thống</h1>
                            <p className="text-gray-500">Tổng quan tình hình kinh doanh hôm nay</p>
                        </header>

                        {/* Thống kê tổng quát */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Sản phẩm"
                                value={products.length}
                                icon={<FaBox />}
                                color="blue"
                                link="/product-management"
                            />
                            <StatCard
                                title="Người dùng"
                                value={users.length - 1}
                                icon={<FaUsers />}
                                color="indigo"
                                link="/user-management"
                            />
                            <StatCard
                                title="Doanh thu"
                                value={getTotalCompleted().toLocaleString('vi-VN') + ' đ'}
                                icon={<FaMoneyBillWave />}
                                color="green"
                            />
                            <StatCard
                                title="Tổng Đơn hàng"
                                value={dashboardData?.totalOrders || 0}
                                icon={<FaClipboardList />}
                                color="purple"
                                link="/order-management/all"
                            />
                        </div>

                        {/* Trạng thái đơn hàng chi tiết */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Link to="/order-management/access" className="hover:bg-gray-50">
                                <StatusMiniCard
                                    label="Chờ xử lý"
                                    count={dashboardData?.orderStatusSummary?.PENDING || 0}
                                    icon={<FaClock className="text-yellow-500" />}
                                    borderColor="border-yellow-500"
                                />
                            </Link>
                            <Link to="/order-management/ship" className="hover:bg-gray-50">
                                <StatusMiniCard
                                    label="Đang giao"
                                    count={dashboardData?.orderStatusSummary?.DELIVERING || 0}
                                    icon={<FaTruck className="text-blue-500" />}
                                    borderColor="border-blue-500"
                                />
                            </Link>
                            <Link to="/order-management/finish" className="hover:bg-gray-50">
                                <StatusMiniCard
                                    label="Hoàn thành"
                                    count={dashboardData?.orderStatusSummary?.COMPLETED || 0}
                                    icon={<FaCheckCircle className="text-green-500" />}
                                    borderColor="border-green-500"
                                />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Bảng sản phẩm sắp hết hàng */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                                        <FaExclamationTriangle className="text-red-500 mr-2" />
                                        Sản phẩm sắp hết kho
                                    </h2>
                                    <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
                                        Cảnh báo
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-gray-400 text-sm uppercase">
                                                <th className="pb-3 font-medium">Sản phẩm</th>
                                                <th className="pb-3 font-medium text-center">Tồn kho</th>
                                                <th className="pb-3 font-medium text-right">Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {dashboardData.lowStockProducts
                                                // Sắp xếp: lấy số lượng a trừ số lượng b (tăng dần)
                                                .sort((a, b) => a.quantityProduct - b.quantityProduct)
                                                .map((product) => (
                                                    <tr
                                                        key={product.id}
                                                        className="hover:bg-gray-50 cursor-pointer transition"
                                                    >
                                                        <td className="py-3 flex items-center">
                                                            <img
                                                                src={product.imageLink}
                                                                alt=""
                                                                className="w-10 h-10 rounded object-cover mr-3"
                                                            />
                                                            <span
                                                                className="text-sm font-medium text-gray-700 truncate max-w-[150px]"
                                                                title={product.nameProduct}
                                                            >
                                                                {product.nameProduct}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center">
                                                            <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-xs">
                                                                {product.quantityProduct}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-right text-sm text-gray-600">
                                                            {product.priceProduct.toLocaleString()}đ
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                                        <FaFire className="text-orange-500 mr-2" />
                                        Sản phẩm bán chạy nhất
                                    </h2>
                                </div>
                                <div className="overflow-y-auto max-h-[400px]">
                                    <table className="w-full text-left">
                                        <thead className="sticky top-0 bg-white">
                                            <tr className="text-gray-400 text-xs uppercase border-b">
                                                <th className="pb-2 font-medium">Sản phẩm</th>
                                                <th className="pb-2 font-medium text-center">Đã bán</th>
                                                <th className="pb-2 font-medium text-right">Doanh thu</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {/* Nếu API chưa có topSellingProducts, bạn có thể map tạm từ dashboardData.lowStockProducts hoặc data giả */}
                                            {dashboardData.topSellingProducts
                                                // Sắp xếp theo doanh thu: (Giá * Số lượng)
                                                .sort(
                                                    (a, b) =>
                                                        b.product.priceProduct * b.salesQuantity -
                                                        a.product.priceProduct * a.salesQuantity,
                                                )
                                                .map((top, index) => (
                                                    <tr
                                                        key={top.product.id}
                                                        onClick={() => handleProductClick(top.product)}
                                                        className="hover:bg-gray-50 transition"
                                                    >
                                                        <td className="py-3 flex items-center">
                                                            <div className="relative">
                                                                <img
                                                                    src={top.product.imageLink}
                                                                    className="w-12 h-12 rounded object-cover ml-2 mr-3 border shadow-sm"
                                                                    alt=""
                                                                />
                                                                {/* Hiển thị huy chương cho Top 3 */}
                                                                {index < 3 && (
                                                                    <span
                                                                        className={`absolute -top-2 -left-[1px] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold shadow-sm ${
                                                                            index === 0
                                                                                ? 'bg-yellow-500'
                                                                                : index === 1
                                                                                  ? 'bg-gray-400'
                                                                                  : 'bg-orange-400'
                                                                        }`}
                                                                    >
                                                                        {index + 1}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-700 truncate max-w-[120px]"
                                                                title={top.product.nameProduct}
                                                            >
                                                                {top.product.nameProduct}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-center text-sm font-semibold text-gray-600">
                                                            {top.salesQuantity}
                                                        </td>
                                                        <td className="py-3 text-right text-sm font-bold text-green-600">
                                                            {(
                                                                top.product.priceProduct * top.salesQuantity
                                                            ).toLocaleString()}{' '}
                                                            đ
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                    {!dashboardData?.topSellingProducts && (
                                        <p className="text-center text-gray-400 text-sm mt-10">
                                            Chưa có dữ liệu bán hàng
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Card lớn cho các thông số chính
function StatCard({ title, value, icon, color, link }) {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        indigo: 'bg-indigo-500',
    };

    const content = (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
                </div>
                <div
                    className={`${colorClasses[color]} p-3 rounded-lg text-white text-xl shadow-lg shadow-${color}-200 group-hover:scale-110 transition-transform`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );

    return link ? <Link to={link}>{content}</Link> : content;
}

// Card nhỏ cho trạng thái đơn hàng
function StatusMiniCard({ label, count, icon, borderColor }) {
    return (
        <div
            className={`hover:bg-gray-50 bg-white p-4 rounded-lg border-l-4 ${borderColor} shadow-sm flex items-center justify-between`}
        >
            <div className="flex items-center gap-3">
                <div className="text-lg">{icon}</div>
                <span className="text-gray-600 font-medium">{label}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">{count}</span>
        </div>
    );
}

export default Home;
