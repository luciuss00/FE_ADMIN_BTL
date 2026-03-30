import { Link } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import RightMenu from './RightMenu';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
    return (
        <header className="h-[100px] px-[130px] bg-gray-100 border-b border-gray-200 shadow-sm flex items-center">
            <div className="flex w-full items-center justify-between gap-x-8">
                {/* 1. Logo - Bên trái */}
                <Link to="/home" className="text-red-600 font-bold text-[32px] whitespace-nowrap">
                    Shopping Online
                </Link>

                {/* 2. Thanh Tìm Kiếm - Căn giữa và mở rộng */}
                <div className="flex-1 max-w-[600px]">
                    <SearchProduct />
                </div>

                {/* 3. Menu (Thông báo, User) - Bên phải */}
                <div className="flex items-center">
                    <RightMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
