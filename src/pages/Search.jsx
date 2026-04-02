import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

function Search() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const searchName = queryParams.get('name') || '';

    return (
        <div>
            <Header />
            <div className="flex">
                <SidebarAdmin activeTab="product" />
                <div className="ml-42">
                    <h1 className="mt-9 mb-1 text-[30px] text-center">
                        Kết quả tìm kiếm cho: <span className="text-red-500">"{searchName}"</span>
                    </h1>
                    <ProductList name={searchName} />
                </div>
            </div>
        </div>
    );
}

export default Search;
