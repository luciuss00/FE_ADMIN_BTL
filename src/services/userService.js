import apiClient from '../api/productApi';

const ProductService = {
    getAllUser() {
        const url = '/showAllUser';
        return apiClient.post(url);
    },
};

export default ProductService;
