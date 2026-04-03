import { createContext, useState, useContext } from 'react';
import OrderService from '../services/orderService';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchOrders = async () => {
        if (isLoaded) return;
        try {
            const response = await OrderService.getAllOrder();
            setOrders(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
        }
    };

    return <OrderContext.Provider value={{ orders, fetchOrders }}>{children}</OrderContext.Provider>;
};

// Custom hook để dùng cho nhanh
export const useOrder = () => {
    const context = useContext(OrderContext);

    return context;
};
