import { useEffect } from 'react';
import { useOrder } from '../context/OrderContext'; // Điều chỉnh đường dẫn cho đúng file của bạn

const OrderList = () => {
    const { orders, fetchOrders } = useOrder();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Hàm format tiền tệ (VND)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Hàm format ngày tháng cho dễ nhìn
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    // Hàm render màu sắc cho Status
    const renderStatus = (status) => {
        const statusStyles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            COMPLETED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh Sách Đơn Hàng</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Mô tả</th>
                            <th className="py-3 px-6 text-center">Trạng thái</th>
                            <th className="py-3 px-6 text-right">Tổng tiền</th>
                            <th className="py-3 px-6 text-center">Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">#{order.id}</td>
                                    <td className="py-3 px-6 text-left">{order.description}</td>
                                    <td className="py-3 px-6 text-center">{renderStatus(order.status)}</td>
                                    <td className="py-3 px-6 text-right font-semibold text-blue-600">
                                        {formatCurrency(order.totalAmount)}
                                    </td>
                                    <td className="py-3 px-6 text-center">{formatDate(order.orderDate)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-gray-500">
                                    Không có đơn hàng nào được tìm thấy.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
