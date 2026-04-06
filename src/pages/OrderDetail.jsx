import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

function OrderDetail() {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy dữ liệu từ state được truyền sang
    const { order } = location.state || {};
    const productOrder = order.orderItermList;
    console.log(productOrder);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-xl font-semibold">Không tìm thấy dữ liệu đơn hàng!</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">
                    Quay lại
                </button>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div>
            <Header />
            <div className="flex bg-gray-50 min-h-screen">
                <SidebarAdmin activeTab="order" />
                <div className="flex-1 ml-24 mt-13 mr-20 pb-10">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        {/* Header của Card */}
                        <div className="bg-red-500 p-6 flex justify-between items-center text-white">
                            <div>
                                <h2 className="text-2xl font-bold">Chi Tiết Đơn Hàng #{order.idOrder}</h2>
                            </div>
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-white/20 cursor-pointer hover:bg-white/30 px-4 py-2 rounded-lg transition font-medium"
                            >
                                Quay lại
                            </button>
                        </div>

                        <div className="p-8">
                            {/* Phần 1: Thông tin chung */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                {/* Cột 1: Thông tin đơn hàng */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase tracking-wider">
                                        📦 Thông tin đơn hàng
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-sm">Nội dung đơn hàng</span>
                                            <span className="text-gray-700 font-medium text-lg">{order.des}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-400 text-sm">Trạng thái hiện tại</span>
                                            <span
                                                className={`w-fit px-3 py-1 rounded-full text-xs font-bold mt-1 
                                                ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Cột 2: Thông tin khách hàng */}
                                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase tracking-wider">
                                        👤 Khách hàng
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-400 italic">Email liên hệ</p>
                                            <p className="font-medium text-gray-700">{order.userEmail}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 italic">Số điện thoại</p>
                                            <p className="font-medium text-gray-700 tracking-wide">{order.userPhone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phần 2: Danh sách sản phẩm (MỚI BỔ SUNG) */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-800 pb-2 uppercase tracking-wider">
                                    🛒 Danh sách sản phẩm
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                                                <th className="p-3 rounded-l-lg">Sản phẩm</th>
                                                <th className="p-3 text-center">Số lượng</th>
                                                <th className="p-3 text-right">Đơn giá</th>
                                                <th className="p-3 text-right rounded-r-lg">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {/* Giả sử order.items là mảng chứa sản phẩm */}
                                            {productOrder.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition">
                                                    <td className="p-3">
                                                        <div className="font-medium text-gray-800">
                                                            <div className="flex">
                                                                <img
                                                                    src={item.imagelink}
                                                                    className="w-17 h-17 object-cover"
                                                                ></img>
                                                                <p className="ml-4 mt-5">{item.nameProduct}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center text-gray-700">{item.quantity}</td>
                                                    <td className="p-3 text-right text-gray-700">
                                                        {formatCurrency(item.price)}
                                                    </td>
                                                    <td className="p-3 text-right font-semibold text-gray-800">
                                                        {formatCurrency(item.quantity * item.price)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Tổng kết tiền */}
                                <div className="mt-6 flex flex-col items-end space-y-2 border-t pt-4">
                                    <div className="flex justify-between w-full max-w-xs text-gray-500">
                                        <span>Tổng tiền sản phẩm:</span>
                                        <span>{formatCurrency(order.total_amount)}</span>
                                    </div>
                                    <div className="flex justify-between w-full max-w-xs text-gray-500">
                                        <span>Phí vận chuyển:</span>
                                        <span>{formatCurrency(30000)}</span>
                                    </div>
                                    <div className="flex justify-between w-full max-w-xs border-t pt-2">
                                        <span className="text-lg font-bold text-gray-800">Tổng thanh toán:</span>
                                        <span className="text-2xl font-bold text-red-500">
                                            {formatCurrency(order.total_amount + 30000)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
