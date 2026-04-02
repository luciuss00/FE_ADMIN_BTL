import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const tokenData = localStorage.getItem('token');

        if (tokenData) {
            try {
                const parsedData = JSON.parse(tokenData);

                if (parsedData && parsedData.accessToken) {
                    config.headers.Authorization = `Bearer ${parsedData.accessToken}`;
                }
            } catch (error) {
                console.error('Lỗi parse token:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default apiClient;
