import apiClient from '../api/productApi';

const ProductService = {
    getAllProduct() {
        const url = '/getProductAdmin';
        return apiClient.post(url);
    },
};

export default ProductService;
