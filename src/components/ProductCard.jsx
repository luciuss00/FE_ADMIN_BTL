import { Link } from 'react-router-dom';

function ProductCard({ id, name, description, type, cost, quantity, img }) {
    return (
        <Link
            key={id}
            to={`/detail?name=${encodeURIComponent(name)}`}
            state={{ id, name, description, type, cost, quantity, img }}
            className="w-[200px] h-[300px] mt-2 bg-white border border-gray-400 rounded-lg p-2 hover:border-red-500 transition block"
        >
            <img className="w-[188px] h-[188px] object-cover mb-2" src={img} alt={name} />
            <h1 className="text-[16px] h-[34px] leading-none line-clamp-2 overflow-hidden">{name}</h1>
            <p className="text-xs mt-1 text-gray-500 ">{type}</p>
            <div className="flex">
                <p className="mt-[6px] text-red-500 text-[20px] font-bold">
                    {Number(cost).toLocaleString('vi-VN')}
                    <u className=" text-sm">đ</u>
                </p>
                <p className="ml-auto mt-3 text-red-500 text-[13px] truncate">Xem chi tiết</p>
            </div>
        </Link>
    );
}

export default ProductCard;
