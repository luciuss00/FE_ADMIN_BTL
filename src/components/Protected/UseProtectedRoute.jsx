import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
    const tokenData = localStorage.getItem('token');

    // 1. Kiểm tra nếu không có dữ liệu trong localStorage
    if (!tokenData) {
        return <Navigate to="/signin" replace />;
    }

    try {
        // 2. Parse dữ liệu
        const token = JSON.parse(tokenData);

        // 3. Kiểm tra xem có accessToken hợp lệ không
        if (token && token.accessToken) {
            return <Outlet />;
        } else {
            // Trường hợp có dữ liệu nhưng cấu trúc sai hoặc không có accessToken
            return <Navigate to="/signin" replace />;
        }
    } catch (error) {
        // 4. Phòng trường hợp JSON lỗi (ví dụ ai đó sửa bậy vào localStorage)
        console.error('Token format invalid:', error);
        return <Navigate to="/signin" replace />;
    }
};

export default UserProtectedRoute;
