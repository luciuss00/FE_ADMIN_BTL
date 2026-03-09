import Sidebar from '../components/Sidebar';

function Home({ activeTab }) {
    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-red-600">Danh sách sản phẩm</h2>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
                            [Bảng sản phẩm sẽ hiển thị ở đây]
                        </div>
                    </div>
                );
            case 'invoices':
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-red-600">Lịch sử hóa đơn</h2>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
                            [Danh sách hóa đơn sẽ hiển thị ở đây]
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-700">Chào mừng đến với Hệ thống quản trị</h2>
                        <p className="text-gray-500 mt-2">Vui lòng chọn chức năng ở menu bên trái.</p>
                    </div>
                );
        }
    };

    return (
        <div>
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm min-h-full">{renderContent()}</div>
            </main>
        </div>
    );
}

export default Home;
