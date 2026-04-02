import apiClient from '../api/productApi';

const ProductService = {
    getAllUser() {
        const url = '/showAllUser';
        return apiClient.post(url);
    },

    lockUser(id) {
        const url = '/blockUser';
        // Body gửi null, id truyền vào query string
        return apiClient.post(url, null, {
            params: { id: id },
        });
    },

    unlockUser(id) {
        const url = '/unlockUser';
        return apiClient.post(url, null, {
            params: { id: id },
        });
    },
};

export default ProductService;
