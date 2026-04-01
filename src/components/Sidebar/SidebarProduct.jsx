import { useSearchParams } from 'react-router-dom';

function SideBar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categories = [
        'Áo',
        'Âm thanh',
        'Công nghệ',
        'Học tập',
        'Đồ ăn',
        'Đồ dùng',
        'Gaming',
        'Gia dụng',
        'Giày',
        'Mũ',
        'Nội thất',
        'Phụ kiện',
        'Quần',
        'Thể thao',
        'Thiết bị',
        'Tiện ích',
        'Trang sức',
        'Trang trí',
        'Văn phòng',
    ];

    const selectedCat = searchParams.get('category');
    const priceSort = searchParams.get('priceSort');
    const stockSort = searchParams.get('stockSort');

    const updateParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (newParams.get(key) === value) {
            newParams.delete(key);
        } else {
            // Nếu chọn sắp xếp giá thì bỏ sắp xếp kho và ngược lại
            if (key === 'priceSort') newParams.delete('stockSort');
            if (key === 'stockSort') newParams.delete('priceSort');
            newParams.set(key, value);
        }
        setSearchParams(newParams);
    };

    return (
        <div className="ml-10 w-60  flex-shrink-0 bg-white p-5 sticky top-0 h-screen overflow-y-auto shadow-sm">
            {/* PHẦN SẮP XẾP */}
            <div className="flex items-center justify-between cursor-pointer py-4 border-b border-gray-100 group">
                <h3 className="font-bold text-gray-800 text-sm tracking-wide">SẮP XẾP SẢN PHẨM</h3>
            </div>

            <div className={'overflow-hidden transition-all duration-500 max-h-64 opacity-100 py-4 max-h-0 opacity-0'}>
                <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3 text-sm cursor-pointer hover:text-red-500 transition-colors">
                        <input
                            type="checkbox"
                            checked={priceSort === 'asc'}
                            onChange={() => updateParams('priceSort', 'asc')}
                            className="w-4 h-4 accent-red-500 rounded"
                        />
                        Giá: Thấp đến Cao
                    </label>
                    <label className="flex items-center gap-3 text-sm cursor-pointer hover:text-red-500 transition-colors">
                        <input
                            type="checkbox"
                            checked={priceSort === 'desc'}
                            onChange={() => updateParams('priceSort', 'desc')}
                            className="w-4 h-4 accent-red-500 rounded"
                        />
                        Giá: Cao đến Thấp
                    </label>
                    <label className="flex items-center gap-3 text-sm cursor-pointer hover:text-red-500">
                        <input
                            type="checkbox"
                            checked={stockSort === 'asc'}
                            onChange={() => updateParams('stockSort', 'asc')}
                            className="w-4 h-4 accent-red-500 rounded"
                        />
                        Kho: Ít nhất
                    </label>
                    <label className="flex items-center gap-3 text-sm cursor-pointer hover:text-red-500 transition-colors">
                        <input
                            type="checkbox"
                            checked={stockSort === 'desc'}
                            onChange={() => updateParams('stockSort', 'desc')}
                            className="w-4 h-4 accent-red-500 rounded"
                        />
                        Kho: Nhiều nhất
                    </label>
                </div>
            </div>

            {/* PHẦN DANH MỤC */}
            <div className="flex items-center justify-between cursor-pointer py-4 border-b border-gray-100 group">
                <h3 className="font-bold text-gray-800 text-sm tracking-wide">DANH MỤC SẢN PHẨM</h3>
            </div>

            <div className="overflow-hidden transition-all duration-500 max-h-[1000px] opacity-100 py-4 ">
                <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCat === cat}
                                onChange={() => updateParams('category', cat)}
                                className="cursor-pointer w-4 h-4 accent-red-500 rounded border-gray-300"
                            />
                            <span
                                className={`transition-colors ${selectedCat === cat ? 'text-red-600 font-bold' : 'text-gray-600 group-hover:text-black'}`}
                            >
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Nút Reset nhanh (Tùy chọn) */}
            {(selectedCat || priceSort || stockSort) && (
                <button
                    onClick={() => setSearchParams({})}
                    className="mt-6 w-full py-2 text-xs text-gray-400 hover:text-red-500 underline transition-colors"
                >
                    Xóa tất cả bộ lọc
                </button>
            )}
        </div>
    );
}

export default SideBar;
