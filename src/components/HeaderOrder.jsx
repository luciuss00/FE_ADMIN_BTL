import { Link } from 'react-router-dom';

const TABS = [
    { id: 1, name: 'all', label: 'Tất cả', link: '/order-management/all' },
    { id: 2, name: 'access', label: 'Chờ xác nhận', link: '/order-management/access' },
    { id: 3, name: 'ship', label: 'Chờ giao hàng', link: '/order-management/ship' },
    { id: 4, name: 'finish', label: 'Hoàn thành', link: '/order-management/finish' },
];

function HeaderOrder({ activeTab }) {
    return (
        <div>
            <div className="mt-10 w-300 ml-30 bg-white shadow-sm sticky top-0 z-10 w-250">
                {TABS.map((tab) => (
                    <Link to={tab.link} key={tab.id}>
                        <button
                            className={`px-[114px] py-4 text-center text-sm transition-colors duration-200 border-b-2 cursor-pointer 
                        ${
                            activeTab === tab.name
                                ? 'text-red-500 border-red-500'
                                : 'text-gray-800 border-transparent hover:text-red-500'
                        }`}
                        >
                            {tab.label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HeaderOrder;
