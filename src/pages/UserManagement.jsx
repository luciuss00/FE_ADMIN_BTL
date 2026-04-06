import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // 1. Thêm import Link
import { User as UserIcon } from 'lucide-react';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import { useUser } from '../context/UserContext';

const UserManagement = () => {
    const { users, fetchUsers } = useUser();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        if (!currentUser || !currentUser.email) return users;

        return users.filter((user) => user.email !== currentUser.email);
    }, [users, currentUser]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin activeTab="user" />
                <div className="flex-1 p-8 mt-8">
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-widest">
                                        <th className="px-6 py-4 font-bold">Tên tài khoản</th>
                                        <th className="px-6 py-4 font-bold">Email</th>
                                        <th className="px-6 py-4 font-bold">Số điện thoại</th>
                                        <th className="px-6 py-4 font-bold text-center">Giới tính</th>
                                        <th className="px-6 py-4 font-bold text-center">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers && filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => {
                                            return (
                                                <tr
                                                    key={user.idUser || user.id}
                                                    className="hover:bg-orange-50/50 transition-colors group cursor-pointer"
                                                >
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            to={`/user-detail?name=${encodeURIComponent(user.fullName)}`}
                                                            state={user}
                                                            className="block w-full h-full text-gray-800 font-medium hover:text-orange-600"
                                                        >
                                                            {user.fullName}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-800">
                                                        <Link
                                                            to={`/user-detail?name=${encodeURIComponent(user.fullName)}`}
                                                            state={user}
                                                            className="block w-full h-full font-semibold"
                                                        >
                                                            {user.email}
                                                        </Link>
                                                    </td>
                                                    {/* Làm tương tự cho các cột SĐT và Giới tính để bấm đâu cũng nhận được state */}
                                                    <td className="px-6 py-4 text-gray-600 font-mono">
                                                        <Link
                                                            to={`/user-detail?name=${encodeURIComponent(user.fullName)}`}
                                                            state={user}
                                                            className="block w-full h-full"
                                                        >
                                                            {user.numberPhone || '—'}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <Link
                                                            to={`/user-detail?name=${encodeURIComponent(user.fullName)}`}
                                                            state={user}
                                                            className="inline-block"
                                                        >
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                                                    user.sex === 'Nam'
                                                                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                                        : 'bg-pink-50 text-pink-600 border-pink-100'
                                                                }`}
                                                            >
                                                                {user.sex}
                                                            </span>
                                                        </Link>
                                                    </td>
                                                    {/* Cột thao tác giữ nguyên nút xóa kèm stopPropagation */}
                                                    <td className="px-6 py-4 text-center">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                                user.status === 'active'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-24 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <UserIcon size={40} className="mb-4 opacity-20" />
                                                    <p>Hiện tại chưa có người dùng nào trong hệ thống</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
