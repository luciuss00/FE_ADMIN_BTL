import apiClient from '../api/productApi';

const ProductService = {
    getAllProduct() {
        const url = '/showProductUser';
        return apiClient.get(url);
    },
};

export default ProductService;
