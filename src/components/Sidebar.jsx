import { Link } from 'react-router-dom';

function Sidebar({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'products', name: 'Quản lý Sản phẩm', link: '/product-management' },
        { id: 'bills', name: 'Quản lý Hóa đơn', link: '/bill-management' },
    ];

    return (
        <aside className="w-64 bg-red-500 text-white flex flex-col h-screen shadow-xl sticky top-0">
            <div className="p-6 text-2xl font-bold border-b border-red-500 text-center">MY ADMIN</div>

            <nav className="flex-1 mt-6 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link to>
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                                activeTab === item.id
                                    ? 'bg-white text-red-600 shadow-md transform scale-105 font-bold'
                                    : 'hover:bg-red-700 text-white opacity-80 hover:opacity-100'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span>{item.name}</span>
                            </div>
                        </button>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-red-500 text-xs text-center opacity-60">v1.0.0 Powered by React</div>
        </aside>
    );
}

export default Sidebar;
