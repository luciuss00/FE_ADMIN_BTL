import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    User as UserIcon,
    Shield,
    CheckCircle,
    UserCircle,
} from 'lucide-react';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

const UserDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state;
    console.log(user);

    if (!user) {
        return (
            <div className="p-8 text-center">
                <p>Không tìm thấy dữ liệu người dùng hoặc trang vừa được tải lại.</p>
                <button onClick={() => navigate('/admin/users')} className="text-blue-500 underline cursor-pointer">
                    Quay lại danh sách
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin activeTab="user" />

                <div className="flex-1 p-8 mt-4">
                    {/* Nút quay lại */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer transition-colors mb-6"
                    >
                        <ArrowLeft size={20} /> Quay lại danh sách
                    </button>

                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                        {/* Banner Header */}
                        <div className="h-32 bg-gradient-to-r from-red-500 to-orange-600"></div>

                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-12 mb-6">
                                {/* Avatar */}
                                <div className="p-1 bg-white rounded-2xl shadow-sm">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt="Avatar"
                                            className="w-32 h-32 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                            <UserCircle size={80} />
                                        </div>
                                    )}
                                </div>

                                {/* Status Badge */}
                                <div
                                    className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm border ${
                                        user.status === 'active'
                                            ? 'bg-green-50 text-green-600 border-green-100'
                                            : 'bg-red-50 text-red-600 border-red-100'
                                    }`}
                                >
                                    <CheckCircle size={16} />
                                    {user.status === 'active' ? 'Đang hoạt động' : 'Bị khóa'}
                                </div>
                            </div>

                            {/* Thông tin chính */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-extrabold text-gray-800">{user.realName}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1">
                                    <span className="font-medium text-orange-600">@{user.fullName}</span>• ID: #
                                    {user.idUser}
                                </p>
                            </div>

                            <hr className="border-gray-100 mb-8" />

                            {/* Lưới thông tin chi tiết */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <UserIcon size={18} className="text-orange-500" /> Thông tin cá nhân
                                    </h3>

                                    <div className="space-y-4">
                                        <InfoItem icon={<Mail />} label="Email" value={user.email} />
                                        <InfoItem icon={<Phone />} label="Số điện thoại" value={user.numberPhone} />
                                        <InfoItem
                                            icon={<UserIcon />}
                                            label="Giới tính"
                                            value={user.sex === 'Male' ? 'Nam' : 'Nữ'}
                                        />
                                        <InfoItem icon={<Calendar />} label="Ngày sinh" value={user.birthDay} />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <Shield size={18} className="text-orange-500" /> Hệ thống & Địa chỉ
                                    </h3>

                                    <div className="space-y-4">
                                        <InfoItem
                                            icon={<Shield />}
                                            label="Vai trò"
                                            value={
                                                <span className="capitalize px-2 py-0.5 bg-gray-100 rounded text-sm font-semibold">
                                                    {user.role}
                                                </span>
                                            }
                                        />
                                        <InfoItem icon={<MapPin />} label="Địa chỉ" value={user.address} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100">
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all">
                                Khóa tài khoản
                            </button>
                            <button className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 shadow-md transition-all">
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component con để hiển thị từng dòng thông tin
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-400">{React.cloneElement(icon, { size: 18 })}</div>
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</p>
            <p className="text-gray-700 font-medium">{value || 'Chưa cập nhật'}</p>
        </div>
    </div>
);

export default UserDetail;
