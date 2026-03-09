import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar({ activeTab, setActiveTab }) {
    const menuItems = [
        {
            id: 'products',
            name: 'Quản lý sản phẩm',
            icon: <i className="fa-solid fa-bag-shopping"></i>,
            link: '/product-management',
        },
        {
            id: 'bills',
            name: 'Quản lý hóa đơn',
            icon: <i className="fa-solid fa-receipt"></i>,
            link: '/bill-management',
        },
    ];

    return (
        <div className="w-25 bg-red-500 text-white h-screen flex flex-col items-center">
            <div className="pt-8 text-[22px] border-red-500 text-center">ADMIN</div>

            <div className="mt-6 mr-1">
                {menuItems.map((item) => (
                    <Link to={item.link} key={item.id} className="relative group flex justify-center">
                        <button
                            onClick={() => setActiveTab(item.id)}
                            className={`px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                                activeTab === item.id
                                    ? 'bg-white text-red-500 shadow-md transform scale-110'
                                    : 'hover:bg-red-700 text-white opacity-80 hover:opacity-100'
                            }`}
                        >
                            <div className="text-[36px]">{item.icon}</div>
                        </button>

                        {/* Tooltip hiện tên khi hover */}
                        <span
                            className="absolute left-full ml-4 mt-4 px-2 py-2 bg-gray-500 text-white text-[14px] rounded-md 
                            whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                            pointer-events-none z-50 shadow-lg"
                        >
                            {item.name}
                            {/* Mũi tên nhỏ cho tooltip */}
                            <div className="absolute top-1/2 -left-4 -translate-y-1/2 border-8 border-transparent border-r-gray-500"></div>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
