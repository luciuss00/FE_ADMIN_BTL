import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Sidebar from './Sidebar/SidebarAdmin';

function SearchProduct() {
    const navigate = useNavigate();
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const typingTimeoutRef = useRef(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // 1. Xóa bộ hẹn giờ cũ nếu người dùng vẫn đang gõ
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        if (value.trim() === '') {
            setFilteredResults([]);
            setIsDropdownOpen(false);
            return;
        }
        typingTimeoutRef.current = setTimeout(() => {
            console.log('Đang tìm kiếm cho:', value);
            const results = products.filter((item) => item.nameProduct.toLowerCase().includes(value.toLowerCase()));
            setFilteredResults(results.slice(0, 5));
            setIsDropdownOpen(true);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setIsDropdownOpen(false);
            navigate(`/search?name=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="flex justify-center mt-10 mb-10">
            <div>
                <div>
                    <div className="mx-20 w-150 flex flex-col justify-center relative">
                        <form onSubmit={handleSubmit} className="flex bg-white p-1 rounded-full shadow-sm h-[36px]">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                onFocus={() => searchTerm && setIsDropdownOpen(true)}
                                placeholder="Tìm kiếm ..."
                                className="flex-1 px-4 outline-none text-black text-sm"
                            />
                            <Link
                                to={`/search?name=${encodeURIComponent(searchTerm)}`}
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center w-10 justify-center rounded-full hover:bg-gray-100 transition-opacity"
                            >
                                <i className="fa-solid fa-magnifying-glass text-red-500"></i>
                            </Link>
                        </form>

                        {/* Danh sách gợi ý đổ xuống (Dropdown) */}
                        {isDropdownOpen && (
                            <div className="absolute top-[40px] left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
                                {filteredResults.length > 0 ? (
                                    <>
                                        {filteredResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                state={{
                                                    id: product.id,
                                                    name: product.nameProduct,
                                                    description: product.descriptionProduct,
                                                    type: product.categoryProduct,
                                                    cost: product.priceProduct,
                                                    quantity: product.quantity,
                                                    img: product.imageLink,
                                                }}
                                                to={`/detail?name=${encodeURIComponent(product.nameProduct)}`}
                                                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 border-b"
                                            >
                                                {product.nameProduct}
                                            </Link>
                                        ))}
                                        {/* Nút Xem tất cả */}
                                        <Link
                                            to={`/search?name=${encodeURIComponent(searchTerm)}`}
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="block w-full text-center py-2 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors"
                                        >
                                            Xem tất cả cho "{searchTerm}"
                                        </Link>
                                    </>
                                ) : (
                                    <div className="p-3 text-sm text-gray-500 text-center">Không tìm thấy sản phẩm</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div></div>
            </div>
        </div>
    );
}

export default SearchProduct;
