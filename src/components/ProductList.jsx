import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

function ProductList({ filterType, name = '' }) {
    const { products, fetchProductsOnce } = useProducts();
    const [visibleCount, setVisibleCount] = useState(12);
    const [searchParams] = useSearchParams();

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

    let filtered = products.filter((p) => {
        const matchCategory = filterType ? p.categoryProduct === filterType : true;
        const matchName = name === '' ? true : p.nameProduct.toLowerCase().includes(name.toLowerCase());
        return matchCategory && matchName;
    });

    const subCategory = searchParams.get('subCategory');
    if (subCategory) {
        // Giả sử field subCategory trong data của bạn tên là 'type' hoặc 'description'
        // Bạn hãy đổi 'p.descriptionProduct' thành field chứa loại chi tiết của bạn nhé
        filtered = filtered.filter((p) => p.descriptionProduct === subCategory);
    }

    const priceSort = searchParams.get('priceSort');
    const stockSort = searchParams.get('stockSort');

    if (priceSort) {
        filtered.sort((a, b) =>
            priceSort === 'asc' ? a.priceProduct - b.priceProduct : b.priceProduct - a.priceProduct,
        );
    } else if (stockSort) {
        filtered.sort((a, b) => (stockSort === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity));
    }

    const displayProducts = filtered.slice(0, visibleCount);

    const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            console.log('Xóa sản phẩm ID:', id);
            // Gọi hàm xóa từ context ở đây nếu có, ví dụ: deleteProduct(id);
        }
    };

    return (
        <div className="w-250 ml-10 mr-30 py-6 ">
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
                            displayProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    id={product.id}
                                    name={product.nameProduct}
                                    description={product.descriptionProduct}
                                    type={product.categoryProduct}
                                    cost={product.priceProduct}
                                    quantity={product.quantity}
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
        </div>
    );
}

export default ProductList;
