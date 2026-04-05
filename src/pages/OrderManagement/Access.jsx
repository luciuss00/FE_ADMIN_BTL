import { useState, useEffect, useMemo } from 'react';
import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
import Notification from '../../components/Notification';
import OrderService from '../../services/orderService';
import { useOrder } from '../../context/OrderContext';

function Access() {
    const { orders, fetchOrders } = useOrder();

    // 1. State quản lý thông báo (Notification)
    const [notif, setNotif] = useState({
        isOpen: false,
        message: '',
        check: false,
    });

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // 2. Logic lọc: Chỉ lấy đơn hàng PENDING
    // Khi fetchOrders chạy lại, đơn vừa xác nhận sẽ đổi status và tự động bị filter loại bỏ
    const pendingOrders = useMemo(() => {
        return orders.filter((order) => order.status === 'PENDING');
    }, [orders]);

    // 3. Hàm xử lý gọi API xác nhận giao hàng
    const handleConfirm = async (id) => {
        try {
            await OrderService.setDelivering(id); // Gọi API của bạn

            // Hiện thông báo thành công
            setNotif({
                isOpen: true,
                message: `Đơn hàng đã được xác nhận và chuyển sang mục Giao hàng!`,
                check: true,
            });

            // Cập nhật lại danh sách từ Context để đơn hàng này biến mất khỏi danh sách lọc
            await fetchOrders();
        } catch (error) {
            console.error('Lỗi xác nhận:', error);
            setNotif({
                isOpen: true,
                message: 'Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại.',
                check: false,
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderStatus = (status) => {
        const statusStyles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
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
            <div className="flex bg-gray-100 min-h-screen">
                <SidebarAdmin activeTab="order" />
                <div className="flex-1">
                    <HeaderOrder activeTab="access" />
                    <div className="container mx-auto p-6 ml-24 w-312">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Đơn Hàng Chờ Xác Nhận</h2>

                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">STT</th>
                                        <th className="py-3 px-6 text-left">Mô tả</th>
                                        <th className="py-3 px-6 text-center">Trạng thái</th>
                                        <th className="py-3 px-6 text-right">Tổng tiền</th>
                                        <th className="py-3 px-6 text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {pendingOrders.length > 0 ? (
                                        pendingOrders.map((order, index) => (
                                            <tr
                                                key={order.idOrder}
                                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                                            >
                                                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-6 text-left text-[16px]">{order.des}</td>
                                                <td className="py-3 px-6 text-center">{renderStatus(order.status)}</td>
                                                <td className="py-3 px-6 text-right font-semibold text-[16px] text-blue-500">
                                                    {formatCurrency(order.total_amount)}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <button
                                                        onClick={() => handleConfirm(order.idOrder)}
                                                        className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-[14px] px-4 py-[4px] text-white rounded shadow text-xs font-bold transition active:scale-95"
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500 italic">
                                                Không có đơn hàng nào chờ xác nhận.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Component Thông báo */}
            <Notification
                isOpen={notif.isOpen}
                message={notif.message}
                check={notif.check}
                onClose={() => setNotif({ ...notif, isOpen: false })}
            />
        </div>
    );
}

export default Access;
