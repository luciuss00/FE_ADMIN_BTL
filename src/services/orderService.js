import apiClient from '../api/productApi';

const OrderService = {
    getAllOrder() {
        const url = '/admin/orders';
        return apiClient.post(url);
    },
};

export default OrderService;
