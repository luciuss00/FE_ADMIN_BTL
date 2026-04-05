import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
import Notification from '../../components/Notification';
import OrderService from '../../services/orderService';
import { useOrder } from '../../context/OrderContext';

function All() {
    const { orders, fetchOrders } = useOrder();
    const [notif, setNotif] = useState({ isOpen: false, message: '', check: false });

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Hàm xử lý Xác nhận (PENDING -> DELIVERING)
    const handleConfirm = async (id) => {
        try {
            await OrderService.setDelivering(id);
            setNotif({ isOpen: true, message: 'Đã xác nhận đơn hàng!', check: true });
            await fetchOrders();
        } catch (error) {
            setNotif({ isOpen: true, message: 'Lỗi xác nhận đơn hàng', check: false });
            console.log(error);
        }
    };

    // Hàm xử lý Hoàn thành (DELIVERING -> COMPLETED)
    const handleComplete = async (id) => {
        try {
            await OrderService.setFinishing(id);
            setNotif({ isOpen: true, message: 'Đơn hàng đã hoàn thành!', check: true });
            await fetchOrders();
        } catch (error) {
            setNotif({ isOpen: true, message: 'Lỗi cập nhật hoàn thành', check: false });
            console.log(error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderStatus = (status) => {
        const statusStyles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            DELIVERING: 'bg-blue-100 text-blue-800',
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

    // Hàm render nút thao tác dựa trên logic status
    const renderActionButtons = (order) => {
        switch (order.status) {
            case 'PENDING':
                return (
                    <button
                        onClick={() => handleConfirm(order.idOrder)}
                        className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer text-[14px] px-4 py-[4px] rounded shadow text-xs font-bold transition"
                    >
                        Xác nhận
                    </button>
                );
            case 'DELIVERING':
                return (
                    <button
                        onClick={() => handleComplete(order.idOrder)}
                        className="bg-green-500 hover:bg-green-600 text-white  cursor-pointer text-[14px] px-4 py-[4px] rounded shadow text-xs font-bold transition"
                    >
                        Hoàn thành
                    </button>
                );
            case 'COMPLETED':
                return <span className="text-gray-400 italic text-xs"></span>;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <div className="flex bg-gray-100 min-h-screen">
                <SidebarAdmin activeTab="order" />
                <div className="flex-1">
                    <HeaderOrder activeTab="all" />
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
                                        <th className="py-3 px-6 text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <tr
                                                key={order.idOrder}
                                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                                            >
                                                <td className="py-3 px-6 whitespace-nowrap  font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-6 text-left text-[16px]">{order.des}</td>
                                                <td className="py-3 px-6 text-center">{renderStatus(order.status)}</td>
                                                <td className="py-3 px-6 text-right text-[16px] font-semibold text-blue-600">
                                                    {formatCurrency(order.total_amount)}
                                                </td>
                                                <td className="py-3 px-6 text-center text-[16px]">
                                                    {renderActionButtons(order)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500 italic">
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
            <Notification
                isOpen={notif.isOpen}
                message={notif.message}
                check={notif.check}
                onClose={() => setNotif({ ...notif, isOpen: false })}
            />
        </div>
    );
}

export default All;
