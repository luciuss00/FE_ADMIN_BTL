import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState('Tiếng Việt');
    const [view, setView] = useState('main');
    const navigate = useNavigate();

    // Kiểm tra thông tin user khi component load
    useEffect(() => {
        const savedUser = localStorage.getItem('admin');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const languages = [
        { label: 'Tiếng Việt', value: 'Tiếng Việt' },
        { label: 'English', value: 'English' },
        { label: 'Japan', value: 'Japan' },
    ];

    const handleLogout = () => {
        //localStorage.removeItem('user');
        setUser(null);
        navigate('/signin');
        window.location.reload(); // Đảm bảo trạng thái được làm mới hoàn toàn
    };

    const handleMouseLeave = () => {
        setView('main');
    };

    const userData = JSON.parse(localStorage.getItem('admin'));

    return (
        <div className="flex items-center gap-x-6 text-gray-700 text-[14px]">
            <div className="group relative flex items-center hover:text-white/70 mx-3 py-2">
                <div className="flex mt-[1.2px] cursor-pointer hover:text-red-500">
                    <i className="fa-regular fa-bell mr-1.5 text-[20px]"></i>
                    <p>Thông Báo</p>
                </div>

                <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white text-gray-800 p-4 rounded-sm shadow-xl border border-gray-200 z-50">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200"></div>

                    {user ? (
                        <div className="py-8 text-center">
                            <i className="fa-solid fa-envelope-open text-[50px] text-gray-200 mb-3"></i>
                            <p className="text-sm text-gray-500">Chưa có thông báo nào mới</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col items-center py-5">
                                <i className="fa-regular fa-circle-user text-[60px] text-red-500 mb-4"></i>
                                <p className="text-sm text-center mb-4">Đăng nhập để xem thông báo</p>
                            </div>
                            <div className="flex gap-2 justify-center text-[14px]">
                                <Link
                                    to="/signup"
                                    className="bg-gray-100 hover:bg-gray-200 py-2 px-6 rounded-sm transition"
                                >
                                    Đăng ký
                                </Link>
                                <Link
                                    to="/signin"
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-sm transition"
                                >
                                    Đăng nhập
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* TÀI KHOẢN & NGÔN NGỮ */}
            <div className="relative group ml-3 py-2 hover:text-red-500" onMouseLeave={handleMouseLeave}>
                <div className="flex items-center  cursor-pointer ">
                    {user ? (
                        <img
                            src={userData.image}
                            className="w-5 h-5 rounded-full mr-2 border border-white"
                            alt="avatar"
                        />
                    ) : (
                        <i className="fa-regular fa-user text-[18px] mr-2"></i>
                    )}
                    <span className="max-w-[100px] truncate">{user && user.name}</span>
                    <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] hidden group-hover:block pt-2 z-50">
                    <div className="absolute top-0 left-0 w-full h-3 bg-transparent"></div>
                    <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200 z-10"></div>

                    <div className="relative bg-white  rounded-sm shadow-md border border-gray-100 overflow-hidden text-black min-h-[120px]">
                        {view === 'main' && (
                            <div className="animate-in fade-in slide-in-from-right-1 duration-200">
                                <div className="flex flex-col border-b border-gray-100  ">
                                    {user ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="px-4 py-3 hover:bg-gray-50 hover:text-red-500 transition-colors"
                                            >
                                                <i className="fa-regular fa-id-card mr-2 w-5"></i>
                                                Thông tin tài khoản
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 hover:text-red-500 transition-colors border-t border-gray-50"
                                            >
                                                <i className="fa-solid fa-right-from-bracket mr-2 w-5"></i>
                                                Đăng xuất
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/signin"
                                                className="px-4 py-3 hover:bg-gray-50 hover:text-red-500 transition-colors"
                                            >
                                                <i className="fa-solid fa-arrow-right-to-bracket mr-2 w-5"></i>
                                                Đăng nhập
                                            </Link>
                                        </>
                                    )}
                                </div>

                                <div
                                    onClick={() => setView('language')}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 hover:text-red-500 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-earth-americas mr-2 w-5"></i>
                                        <span>{language}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>
                                </div>
                            </div>
                        )}

                        {/* VIEW NGÔN NGỮ (Giữ nguyên logic của bạn) */}
                        {view === 'language' && (
                            <div className="animate-in fade-in slide-in-from-left-1 duration-200">
                                <div className="flex items-center px-4 py-3 border-b border-gray-100 font-medium">
                                    <i
                                        className="fa-solid fa-arrow-left mr-3 cursor-pointer hover:text-red-500"
                                        onClick={() => setView('main')}
                                    ></i>
                                    Chọn ngôn ngữ
                                </div>
                                {languages.map((lang) => (
                                    <div
                                        key={lang.value}
                                        onClick={() => {
                                            setLanguage(lang.value);
                                            setView('main');
                                        }}
                                        className={`px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer ${language === lang.value ? 'text-red-500 font-medium' : ''}`}
                                    >
                                        {lang.label}
                                        {language === lang.value && <i className="fa-solid fa-check"></i>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
