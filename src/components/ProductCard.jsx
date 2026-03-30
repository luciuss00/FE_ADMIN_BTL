import { useNavigate } from 'react-router-dom';

function ProductCard({ id, name, description, type, cost, quantity, img, onDelete }) {
    const navigate = useNavigate();

    // Chuyển hướng khi click vào hàng (trừ nút xóa)
    const handleRowClick = () => {
        navigate(`/detail?name=${encodeURIComponent(name)}`, {
            state: { id, name, description, type, cost, quantity, img },
        });
    };

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors cursor-pointer group">
            <td onClick={handleRowClick} className="py-3 px-4 flex items-center gap-3">
                <img className="w-10 h-10 object-cover rounded" src={img} alt={name} />
                <span className="font-medium line-clamp-1">{name}</span>
            </td>
            <td onClick={handleRowClick} className="py-3 px-4 text-gray-600">
                {type}
            </td>
            <td onClick={handleRowClick} className="py-3 px-4 text-center">
                {quantity}
            </td>
            <td onClick={handleRowClick} className="py-3 px-4 text-red-600 font-semibold">
                {Number(cost).toLocaleString('vi-VN')}đ
            </td>
            <td className="py-3 px-4 text-center">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click hàng
                        onDelete(id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-2 transition-colors cursor-pointer"
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
}

export default ProductCard;
