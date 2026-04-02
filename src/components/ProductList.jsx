import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductService from '../services/productService';
import ProductCard from './ProductCard';
import Notification from './Notification';

function ProductList({ filterType, name = '' }) {
    const { products, fetchProductsOnce, deleteProductFromState } = useProducts();

    const [visibleCount, setVisibleCount] = useState(12);
    const [searchParams] = useSearchParams();

    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        check: false,
    });

    const closeNotification = () => {
        setNotification({ ...notification, isOpen: false });
    };

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

    const handleDelete = async (id) => {
        if (!id) return;

        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await ProductService.deleteProduct(id);
                deleteProductFromState(id);

                // Thông báo thành công (check = true)
                setNotification({
                    isOpen: true,
                    message: 'Xóa sản phẩm thành công!',
                    check: true,
                });
            } catch (error) {
                console.error('Lỗi khi xóa:', error);

                // Thông báo thất bại (check = false)
                setNotification({
                    isOpen: true,
                    message: 'Xóa thất bại. Vui lòng thử lại sau.',
                    check: false,
                });
            }
        }
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
            <Notification
                isOpen={notification.isOpen}
                message={notification.message}
                check={notification.check}
                onClose={closeNotification}
            />
        </div>
    );
}

export default ProductList;
