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

    addProduct(productData) {
        const url = '/deleteProductById';
        return apiClient.post(url, productData);
    },

    updateProduct(product) {
        const url = '/updateProduct';
        return apiClient.patch(url, product);
    },
};

export default ProductService;
