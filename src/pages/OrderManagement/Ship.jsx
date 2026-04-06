import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
import Notification from '../../components/Notification';
import OrderService from '../../services/orderService'; // Đảm bảo đã import service này
import { useOrder } from '../../context/OrderContext';

function Ship() {
    const navigate = useNavigate();
    const { orders, fetchOrders } = useOrder();

    const [notif, setNotif] = useState({
        isOpen: false,
        message: '',
        check: false,
    });

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const deliveringOrders = useMemo(() => {
        return orders.filter((order) => order.status === 'DELIVERING' || order.status === 'SHIPPING');
    }, [orders]);

    const handleFinish = async (e, id) => {
        e.stopPropagation();
        try {
            await OrderService.setFinishing(id);

            setNotif({
                isOpen: true,
                message: `Đơn hàng đã giao thành công!`,
                check: true,
            });

            await fetchOrders();
        } catch (error) {
            console.error('Lỗi hoàn thành đơn:', error);
            setNotif({
                isOpen: true,
                message: 'Không thể cập nhật trạng thái. Vui lòng thử lại.',
                check: false,
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderStatus = (status) => {
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{status}</span>;
    };

    const handleRowClick = (order) => {
        navigate(`/order-management/${order.idOrder}`, { state: { order } });
    };

    return (
        <div>
            <Header />
            <div className="flex bg-gray-100 min-h-screen">
                <SidebarAdmin activeTab="order" />
                <div className="flex-1">
                    <HeaderOrder activeTab="ship" />
                    <div className="container mx-auto p-6 ml-24 w-312">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Đơn Hàng Đang Giao</h2>

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
                                    {deliveringOrders.length > 0 ? (
                                        deliveringOrders.map((order, index) => (
                                            <tr
                                                key={order.idOrder}
                                                onClick={() => handleRowClick(order)}
                                                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition duration-300"
                                            >
                                                <td className="py-3 px-6 whitespace-nowrap font-medium">{index + 1}</td>
                                                <td className="py-3 px-6 text-left text-[16px]">{order.des}</td>
                                                <td className="py-3 px-6 text-center">{renderStatus(order.status)}</td>
                                                <td className="py-3 px-6 text-right text-[16px] font-semibold text-blue-600">
                                                    {formatCurrency(order.total_amount)}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <button
                                                        onClick={(e) => handleFinish(e, order.idOrder)}
                                                        className="bg-green-500 hover:bg-green-600 cursor-pointer text-[14px] px-4 py-[4px] text-white rounded shadow text-xs font-bold transition active:scale-95"
                                                    >
                                                        Hoàn thành
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500 italic">
                                                Không có đơn hàng nào đang trong quá trình giao.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Component Thông báo */}
            <Notification
                isOpen={notif.isOpen}
                message={notif.message}
                check={notif.check}
                onClose={() => setNotif({ ...notif, isOpen: false })}
            />
        </div>
    );
}

export default Ship;
