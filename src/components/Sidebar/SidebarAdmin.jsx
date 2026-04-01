import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SidebarAdmin({ activeTab }) {
    const menuItems = [
        {
            id: 'user',
            name: 'Quản lý người dùng',
            icon: <i className="fa-solid fa-user"></i>,
            link: '/user-management',
        },
        {
            id: 'product',
            name: 'Quản lý sản phẩm',
            icon: <i className="fa-solid fa-bag-shopping"></i>,
            link: '/product-management',
        },
        {
            id: 'bill',
            name: 'Quản lý hóa đơn',
            icon: <i className="fa-solid fa-receipt"></i>,
            link: '/bill-management',
        },
    ];

    return (
        <div className="w-18 bg-red-500 text-white min-h-screen flex flex-col items-center">
            <div className="mt-10 mr-1">
                {menuItems.map((item) => (
                    <Link to={item.link} key={item.id} className="relative group flex justify-center">
                        <button
                            className={`px-[10px] py-[5px] mt-4 hover:bg-white hover:text-red-500 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                                activeTab === item.id && 'bg-white text-red-500 shadow-md'
                            }`}
                        >
                            <div className="text-[30px]">{item.icon}</div>
                        </button>

                        {/* Tooltip hiện tên khi hover */}
                        <span
                            className="absolute left-full ml-4 mt-[27px] px-2 py-2 bg-gray-500 text-white text-[14px] rounded-md 
                            whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                            pointer-events-none z-50 shadow-lg"
                        >
                            {item.name}
                            {/* Mũi tên nhỏ cho tooltip */}
                            <div className="absolute top-1/2 -left-[15px] -translate-y-1/2 border-8 border-transparent border-r-gray-500"></div>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SidebarAdmin;
