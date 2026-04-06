import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function RightMenu() {
    const [user, setUser] = useState(null);
    const [view, setView] = useState('main');
    const navigate = useNavigate();

    // 1. Lấy user từ localStorage khi load trang
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Xóa user khỏi storage
        localStorage.removeItem('token');
        setUser(null);
        navigate('/signin');
    };

    const handleMouseLeave = () => {
        setView('main');
    };

    return (
        <div className="flex items-center gap-x-6 text-gray-700 text-[14px]">
            {/* THÔNG BÁO (Giữ nguyên hoặc tùy biến) */}
            <div className="group relative flex items-center hover:text-red-500 mx-3 py-2 cursor-pointer">
                <i className="fa-regular fa-bell mr-1.5 text-[20px]"></i>
                <p>Thông Báo</p>
            </div>

            {/* TÀI KHOẢN & NGÔN NGỮ */}
            <div className="relative group ml-3 py-2 hover:text-red-500" onMouseLeave={handleMouseLeave}>
                <div className="flex items-center cursor-pointer">
                    {user ? (
                        // Hiển thị ảnh đại diện nếu có, không thì hiện icon user mặc định
                        <img
                            src={user.image || 'https://via.placeholder.com/150'}
                            className="w-6 h-6 rounded-full mr-2 border border-gray-200"
                            alt="avatar"
                        />
                    ) : (
                        <i className="fa-regular fa-user text-[18px] mr-2"></i>
                    )}

                    {/* HIỆN TÊN: Nếu có user hiện fullName (hoặc email), không thì hiện "Tài khoản" */}
                    <span className="max-w-[120px] truncate font-medium">
                        {user ? user.fullName || user.email : 'Tài khoản'}
                    </span>
                    <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
                </div>

                {/* DROPDOWN MENU */}
                <div className="absolute top-full right-0 w-[220px] hidden group-hover:block pt-2 z-50">
                    {/* Mũi tên nhọn của Popover */}
                    <div className="absolute top-0.5 right-10 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200 z-10"></div>

                    <div className="relative bg-white rounded-sm shadow-xl border border-gray-100 overflow-hidden text-black min-h-[50px]">
                        {view === 'main' && (
                            <div className="flex flex-col py-1">
                                <button
                                    onClick={handleLogout}
                                    className=" cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 hover:text-red-500 transition-colors border-t border-gray-100 flex items-center"
                                >
                                    <i className="fa-solid fa-right-from-bracket mr-3 w-5 "></i>
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightMenu;
