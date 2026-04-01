import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import Header from '../components/Header';
import Notification from '../components/Notification';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import ProductService from '../services/productService'; // Import Service của bạn
import { useProducts } from '../context/ProductContext'; // Import context để xóa state

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;
    const { deleteProductFromState } = useProducts(); // Lấy hàm xóa từ context

    const [isExpanded, setIsExpanded] = useState(false);
    const [ratingData, setRatingData] = useState({ stars: 5, reviews: 0 });
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        check: false,
    });

    // Hàm xử lý xóa
    const handleDelete = async () => {
        if (!product?.id) return;

        const isConfirm = window.confirm(`Bạn có chắc chắn muốn xóa "${product.name}"?`);
        if (!isConfirm) return;

        try {
            // 1. Gọi API xóa
            await ProductService.deleteProduct(product.id);

            // 2. Cập nhật state cục bộ (nếu danh sách sản phẩm nằm trong context)
            if (deleteProductFromState) {
                deleteProductFromState(product.id);
            }

            // 3. Thông báo thành công
            setNotification({
                isOpen: true,
                message: 'Xóa sản phẩm thành công!',
                check: true,
            });

            // 4. Chuyển hướng sau 1.5 giây
            setTimeout(() => {
                navigate(-1); // Quay lại trang trước đó (thường là danh sách sản phẩm)
            }, 1000);
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            setNotification({
                isOpen: true,
                message: 'Xóa thất bại. Vui lòng thử lại!',
                check: false,
            });
        }
    };

    const closeNotification = () => {
        setNotification({ ...notification, isOpen: false });
    };

    useEffect(() => {
        if (product?.id) {
            const storageKey = `product_rating_${product.id}`;
            const savedData = localStorage.getItem(storageKey);

            if (savedData) {
                setRatingData(JSON.parse(savedData));
            } else {
                const newStars = Math.floor(Math.random() * 2) + 3;
                const newReviews = Math.floor(Math.random() * 400) + 50;
                const newData = { stars: newStars, reviews: newReviews };
                localStorage.setItem(storageKey, JSON.stringify(newData));
                setRatingData(newData);
            }
        }
    }, [product?.id]);

    if (!product) {
        return <div className="p-10 text-center">Không tìm thấy thông tin sản phẩm.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="flex">
                <SidebarAdmin />
                <div className="w-[1200px] h-fit min-h-[630px] mx-auto mt-10 bg-white pt-3 px-6 pb-10 shadow-lg rounded-sm">
                    <h1 className="text-center text-[30px] my-3 text-red-500 font-bold uppercase">
                        Thông tin chi tiết sản phẩm
                    </h1>

                    <div className="flex gap-10 mt-6">
                        {/* Cột trái: Ảnh */}
                        <div className="w-[450px]">
                            <div className="border p-2">
                                <img src={product.img} alt={product.name} className="w-full h-[400px] object-contain" />
                            </div>
                        </div>

                        {/* Cột phải: Thông tin */}
                        <div className="flex-1">
                            <h1 className="text-[26px] font-semibold text-gray-800">{product.name}</h1>

                            <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="text-yellow-500">
                                    {'★'.repeat(ratingData.stars)}
                                    {'☆'.repeat(5 - ratingData.stars)}
                                </span>
                                <span className="text-gray-500">{ratingData.reviews} Đánh giá</span>
                            </div>

                            <p className="mt-4 text-[14px] text-gray-500">
                                Thể loại: <span className="text-gray-800 font-medium">{product.type}</span>
                            </p>

                            <div className="mt-4 text-[14px]">
                                <p className="text-gray-500 font-medium">Mô tả: </p>
                                <div
                                    className={`text-gray-700 leading-relaxed mt-1 ${!isExpanded ? 'line-clamp-3' : ''}`}
                                >
                                    {product.description || 'Không có mô tả cho sản phẩm này.'}
                                </div>
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-blue-500 cursor-pointer mt-1 hover:underline text-[13px] font-medium transition-all"
                                >
                                    {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                </button>
                            </div>

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

                            {/* BUTTONS */}
                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-10 py-3 rounded-md hover:bg-red-600 cursor-pointer transition-all font-bold shadow-md active:scale-95"
                                >
                                    <i className="fa-solid fa-trash-can mr-2"></i> XÓA SẢN PHẨM
                                </button>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="border border-gray-300 text-gray-600 px-10 py-3 rounded-md hover:bg-gray-50 cursor-pointer transition-all font-bold"
                                >
                                    QUAY LẠI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Notification
                isOpen={notification.isOpen}
                message={notification.message}
                check={notification.check}
                onClose={closeNotification}
            />
        </div>
    );
}

export default ProductDetail;
