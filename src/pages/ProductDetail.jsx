import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import NotificationRedo from '../components/NotificationRedo'; // Sử dụng bản Redo
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import ProductService from '../services/productService';
import { useProducts } from '../context/ProductContext';

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;
    const { deleteProductFromState } = useProducts();
    console.log(product);

    const [isExpanded, setIsExpanded] = useState(false);
    const [undoTimer, setUndoTimer] = useState(null); // Lưu ref của bộ đếm 5s

    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        check: false,
        showUndo: false,
    });

    // Cleanup timer khi component unmount để tránh memory leak
    useEffect(() => {
        return () => {
            if (undoTimer) clearTimeout(undoTimer);
        };
    }, [undoTimer]);

    // Hàm xử lý khi bấm nút HOÀN TÁC
    const handleUndo = async () => {
        try {
            // Gọi API redo (nếu cần thiết, hoặc đơn giản là hủy lệnh xóa chưa gửi)
            if (product?.id) {
                await ProductService.redoProduct(product.id);
            }

            // Hủy bộ đếm xóa thật
            clearTimeout(undoTimer);
            setUndoTimer(null);

            // Đóng thông báo
            setNotification({ ...notification, isOpen: false });
        } catch (error) {
            console.error('Lỗi hoàn tác:', error);
        }
    };

    const executeDelete = async () => {
        try {
            await ProductService.deleteProduct(product.id);
            if (deleteProductFromState) {
                deleteProductFromState(product.id);
            }
            navigate(-1); // Quay lại trang trước
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            setNotification({
                isOpen: true,
                message: 'Lỗi khi xóa sản phẩm!',
                check: false,
                showUndo: false,
            });
        }
    };

    // Sửa lại hàm handleDelete để dùng executeDelete
    const handleDelete = () => {
        if (!product?.id) return;

        setNotification({
            isOpen: true,
            message: 'Đã xóa sản phẩm!',
            check: true,
            showUndo: true,
        });

        const timer = setTimeout(() => {
            executeDelete(); // Hết 5s thì xóa
        }, 5000);

        setUndoTimer(timer);
    };

    const closeNotification = () => {
        if (undoTimer) {
            clearTimeout(undoTimer); // Dừng bộ đếm 5s
            setUndoTimer(null);
            executeDelete(); // Thực hiện xóa ngay lập tức
        }
        setNotification((prev) => ({ ...prev, isOpen: false }));
    };

    if (!product) {
        return <div className="p-10 text-center">Không tìm thấy thông tin sản phẩm.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin activeTab="product" />
                <div className="w-[1200px] h-fit min-h-[630px] mx-auto mt-10 bg-white pt-3 px-6 pb-10 shadow-lg rounded-sm">
                    <h1 className="text-center text-[30px] my-3 text-red-500 font-bold uppercase">
                        Thông tin chi tiết sản phẩm
                    </h1>

                    <div className="flex gap-10 mt-6">
                        {/* Ảnh sản phẩm */}
                        <div className="w-[450px]">
                            <div className="border p-2">
                                <img src={product.img} alt={product.name} className="w-full h-[400px] object-contain" />
                            </div>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="flex-1">
                            <h1 className="text-[26px] font-semibold text-gray-800">{product.name}</h1>
                            <p className="mt-4 text-[14px] text-gray-500">
                                Thể loại: <span className="text-gray-800 font-medium">{product.type}</span>
                            </p>

                            {/* Mô tả */}
                            <div className="mt-4 text-[14px]">
                                <p className="text-gray-500 font-medium">Mô tả: </p>
                                <div className={`text-gray-700 mt-1 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                                    {product.description}
                                </div>
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-blue-500 cursor-pointer mt-1 hover:underline"
                                >
                                    {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                </button>
                            </div>

                            {/* Giá */}
                            <div className="mt-6">
                                <p className="font-bold text-[18px] text-gray-700">GIÁ BÁN:</p>
                                <div className="bg-gray-100 p-4 rounded-md mt-1">
                                    <span className="text-red-500 text-[32px] font-bold">
                                        {Number(product.cost).toLocaleString('vi-VN')}₫
                                    </span>
                                </div>
                            </div>

                            <p className="mt-4 text-[14px] text-gray-500">
                                Số lượng: <span className="text-gray-800 font-medium">{product.quantity}</span>
                            </p>

                            {/* Nút bấm */}

                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                                >
                                    XÓA SẢN PHẨM
                                </button>

                                <Link
                                    to="/update-product"
                                    state={product}
                                    className="bg-green-600 text-white px-10 py-3 rounded-md hover:bg-green-700 font-bold"
                                >
                                    SỬA SẢN PHẨM
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Component thông báo có nút hoàn tác */}
            <NotificationRedo
                isOpen={notification.isOpen}
                message={notification.message}
                check={notification.check}
                showUndo={notification.showUndo}
                onClose={closeNotification}
                onUndo={handleUndo}
            />
        </div>
    );
}

export default ProductDetail;
