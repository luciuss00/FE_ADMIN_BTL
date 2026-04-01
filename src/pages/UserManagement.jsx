import React, { useState, useEffect } from 'react'; // Thêm useEffect
import { Trash2, UserPlus } from 'lucide-react';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import ProductService from '../services/userService'; // Import service của bạn

const UserManagement = () => {
    // 1. Khởi tạo state là mảng rỗng
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Gọi API khi component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await ProductService.getAllUser();
            // Tùy vào cấu trúc backend trả về (thường là response.data hoặc response.data.data)
            // Ở đây tôi giả định response trả về trực tiếp mảng user
            setUsers(response.data || []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            alert('Không thể tải dữ liệu người dùng!');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            // Lưu ý: Thực tế bạn nên gọi API delete ở đây trước khi setUsers ở local
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin />
                <div className="flex-1 p-8">
                    {' '}
                    {/* Thêm padding và flex-1 để layout đẹp hơn */}
                    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Quản lý người dùng</h2>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                                <UserPlus size={18} /> Thêm người dùng
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                        <th className="px-6 py-3 font-medium">Họ tên</th>
                                        <th className="px-6 py-3 font-medium">Giới tính</th>
                                        <th className="px-6 py-3 font-medium">Số điện thoại</th>
                                        <th className="px-6 py-3 font-medium">Email</th>
                                        <th className="px-6 py-3 font-medium text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-gray-500">
                                                Đang tải dữ liệu...
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            user.gender === 'Nam'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-pink-100 text-pink-700'
                                                        }`}
                                                    >
                                                        {user.gender}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                                                        title="Xóa người dùng"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {!loading && users.length === 0 && (
                            <div className="py-10 text-center text-gray-500">Không có dữ liệu người dùng.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
