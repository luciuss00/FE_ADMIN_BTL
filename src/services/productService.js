import apiClient from '../api/productApi';

const ProductService = {
    getAllProduct() {
        const url = '/getProductAdmin';
        return apiClient.post(url);
    },

    deleteProduct(id) {
        const url = '/deleteProduct';
        return apiClient.delete(url, {
            data: id,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};

export default ProductService;
