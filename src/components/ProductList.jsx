import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductService from '../services/productService';
import ProductCard from './ProductCard';
import NotificationRedo from './NotificationRedo';

function ProductList({ filterType, name = '' }) {
    const { products, fetchProductsOnce, deleteProductFromState, addProductBackToState } = useProducts();

    const [undoTimer, setUndoTimer] = useState(null);
    const [tempDeletedProduct, setTempDeletedProduct] = useState(null);

    const [visibleCount, setVisibleCount] = useState(12);
    const [searchParams] = useSearchParams();

    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        check: false,
        showUndo: false,
    });

    useEffect(() => {
        fetchProductsOnce();
    }, [fetchProductsOnce]);

    // Logic lọc sản phẩm
    let filterProduct =
        name === ''
            ? filterType
                ? products.filter((p) => p.categoryProduct === filterType)
                : products
            : products.filter((p) => p.nameProduct.toLowerCase().includes(name.toLowerCase()));

    const subCategory = searchParams.get('subCategory');

    const selectedCat = searchParams.get('category');
    const priceSort = searchParams.get('priceSort');
    const stockSort = searchParams.get('stockSort');

    let filtered = products.filter((p) => {
        // Lọc theo search name (nếu có)
        const matchName = name === '' ? true : p.nameProduct.toLowerCase().includes(name.toLowerCase());

        // Lọc theo Category từ SideBar (URL)
        const matchCategory = selectedCat ? p.categoryProduct === selectedCat : true;

        return matchName && matchCategory;
    });

    if (subCategory) {
        // Giả sử field subCategory trong data của bạn tên là 'type' hoặc 'description'
        // Bạn hãy đổi 'p.descriptionProduct' thành field chứa loại chi tiết của bạn nhé
        filtered = filtered.filter((p) => p.descriptionProduct === subCategory);
    }

    if (priceSort) {
        filtered.sort((a, b) =>
            priceSort === 'asc' ? a.priceProduct - b.priceProduct : b.priceProduct - a.priceProduct,
        );
    } else if (stockSort) {
        filtered.sort((a, b) =>
            stockSort === 'asc' ? a.quantityProduct - b.quantityProduct : b.quantityProduct - a.quantityProduct,
        );
    }

    const displayProducts = filtered.slice(0, visibleCount);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

    const handleUndo = async () => {
        if (!tempDeletedProduct) return;

        try {
            // 1. Gọi API Redo

            await ProductService.redoProduct(tempDeletedProduct.id);

            // 2. CẬP NHẬT STATE NGAY LẬP TỨC (Không load lại trang)
            addProductBackToState(tempDeletedProduct);

            // 3. Hủy bộ đếm xóa vĩnh viễn
            clearTimeout(undoTimer);

            // 4. Đóng thông báo
            setNotification({ ...notification, isOpen: false });
            setTempDeletedProduct(null);
        } catch (error) {
            console.error('Lỗi khi hoàn tác:', error);
        }
    };

    const executeFinalDelete = async (id) => {
        try {
            await ProductService.deleteProduct(id);
            setTempDeletedProduct(null);
            setUndoTimer(null);
            // Đóng thông báo ngay lập tức
            setNotification((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
            console.error('Lỗi xóa vĩnh viễn:', error);
        }
    };

    // Hàm đóng thông báo - SỬA ĐỔI CHÍNH Ở ĐÂY
    const closeNotificationAndConfirmDelete = () => {
        if (undoTimer && tempDeletedProduct) {
            // Nếu đang trong trạng thái chờ (có timer), xóa ngay lập tức
            clearTimeout(undoTimer);
            executeFinalDelete(tempDeletedProduct.id);
        }
        setNotification({ ...notification, isOpen: false });
    };

    const handleDelete = async (id) => {
        const productToDelete = products.find((p) => p.id === id);
        if (!productToDelete) return;

        setTempDeletedProduct(productToDelete);
        deleteProductFromState(id); // Xóa khỏi UI ngay

        setNotification({
            isOpen: true,
            message: 'Đã chuyển sản phẩm vào thùng rác.',
            check: true,
            showUndo: true,
        });

        // Thiết lập 5 giây
        const timer = setTimeout(() => {
            // Hết 5s là gọi hàm xóa và hàm này sẽ tự đóng notification luôn
            executeFinalDelete(id);
        }, 5000);

        setUndoTimer(timer);
    };

    return (
        <div className="w-240 ml-10 mr-30 py-6 ">
            <div className="flex justify-end mb-4">
                <Link
                    to="/add-product"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md"
                >
                    <i className="fa-solid fa-plus"></i>
                    Thêm sản phẩm
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b-2 border-gray-200">
                        <tr>
                            <th className="py-3 px-4 font-semibold text-sm text-gray-700">Tên sản phẩm</th>
                            <th className="py-3 px-4 font-semibold text-sm text-gray-700">Loại</th>
                            <th className="py-3 px-4 font-semibold text-sm text-gray-700 text-center">Số lượng</th>
                            <th className="py-3 px-4 font-semibold text-sm text-gray-700">Giá</th>
                            <th className="py-3 px-4 font-semibold text-sm text-gray-700 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayProducts.length > 0 ? (
                            displayProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.nameProduct}
                                    description={product.descriptionProduct}
                                    type={product.categoryProduct}
                                    subCategory={product.subCategoryProduct}
                                    cost={product.priceProduct}
                                    quantity={product.quantityProduct}
                                    img={product.imageLink}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-gray-500">
                                    Đang tải hoặc không có sản phẩm...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {filterProduct.length > visibleCount && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Xem tiếp
                    </button>
                </div>
            )}
            <NotificationRedo
                isOpen={notification.isOpen}
                message={notification.message}
                check={notification.check}
                showUndo={notification.showUndo}
                onUndo={handleUndo}
                onClose={closeNotificationAndConfirmDelete} // Truyền hàm xử lý "Đóng = Xóa luôn"
            />
        </div>
    );
}

export default ProductList;
