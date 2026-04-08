import apiClient from '../api/productApi';

const ProductService = {
    getAllProduct() {
        const url = '/getProductAdmin';
        return apiClient.post(url);
    },

    deleteProduct(id) {
        const url = '/deleteProduct';
        return apiClient.delete(url, {
            params: { id },
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

    redoProduct(id) {
        const url = '/redoProductForAdmin';
        return apiClient.post(url, null, {
            params: { id: id },
        });
    },

    discountProduct() {
        const url = '/admin/smart-discount';
        return apiClient.post(url);
    },
};

export default ProductService;
