import apiClient from '../api/productApi';

const HomeService = {
    showDashboard() {
        const url = '/admin/dashboard';
        return apiClient.post(url);
    },
};

export default HomeService;
