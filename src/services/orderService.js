import apiClient from '../api/productApi';

const OrderService = {
    getAllOrder() {
        const url = '/admin/getAllOrders';
        return apiClient.post(url);
    },

    setDelivering(id) {
        const url = '/admin/orders/shipping';
        return apiClient.post(url, null, {
            params: { id },
        });
    },

    setFinishing(id) {
        const url = '/admin/orders/completed';
        return apiClient.post(url, null, {
            params: { id },
        });
    },
};

export default OrderService;
