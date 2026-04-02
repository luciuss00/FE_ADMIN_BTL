import apiClient from '../api/productApi';

const AuthService = {
    login(credentials) {
        const url = '/loginRes';
        return apiClient.post(url, credentials);
    },
};

export default AuthService;
