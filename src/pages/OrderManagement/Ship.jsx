import { useEffect, useMemo } from 'react';
import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
import { useOrder } from '../../context/OrderContext';

function All() {
    const { orders, fetchOrders } = useOrder();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const deliveringOrders = useMemo(() => {
        return orders.filter((order) => order.status === 'DELIVERING');
    }, [orders]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderStatus = (status) => {
        const statusStyles = {
            SHIPPING: 'bg-blue-100 text-blue-800',
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
        <div>
            <Header />
            <div className="flex bg-gray-100">
                <SidebarAdmin activeTab="order" />
                <div>
                    <HeaderOrder activeTab="ship" />
                    <div className="container mx-auto p-6 ml-24 w-312">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh Sách Đơn Hàng</h2>

                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">STT</th>
                                        <th className="py-3 px-6 text-left">Mô tả</th>
                                        <th className="py-3 px-6 text-center">Trạng thái</th>
                                        <th className="py-3 px-6 text-right">Tổng tiền</th>
                                        <th className="py-3 px-6 text-center">Thao tác</th>{' '}
                                        {/* Thay cột ngày đặt bằng Thao tác hoặc thêm mới */}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {deliveringOrders.length > 0 ? (
                                        deliveringOrders.map((order, index) => (
                                            <tr
                                                key={order.idOrder}
                                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                                            >
                                                <td className="py-3 px-6 whitespace-nowrap font-medium">{index + 1}</td>
                                                <td className="py-3 px-6 text-left">{order.des}</td>
                                                <td className="py-3 px-6 text-center">{renderStatus(order.status)}</td>
                                                <td className="py-3 px-6 text-right font-semibold text-red-500">
                                                    {formatCurrency(order.total_amount)}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {/* Chỉ hiện nút xác nhận nếu trạng thái là PENDING và có hàm onConfirm */}

                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow text-xs font-bold transition">
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500">
                                                Không có đơn hàng nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default All;
