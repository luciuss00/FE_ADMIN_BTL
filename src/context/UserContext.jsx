import { createContext, useState, useContext } from 'react';
import UserService from '../services/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]); // Khởi tạo là mảng để tránh lỗi .length
    const [isLoaded, setIsLoaded] = useState(false);
    const fetchUsers = async () => {
        if (isLoaded) return;
        try {
            const response = await UserService.getAllUser();
            setUsers(response.data);
            setIsLoaded(true);
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
        }
    };

    return <UserContext.Provider value={{ users, fetchUsers }}>{children}</UserContext.Provider>;
};

// Custom hook để dùng cho nhanh
export const useUser = () => {
    const context = useContext(UserContext);

    return context;
};
