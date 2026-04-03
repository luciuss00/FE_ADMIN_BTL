import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';
import OrderList from '../../components/OrderList';
import { useOrder } from '../../context/OrderContext';

function All() {
    const { orders } = useOrder();
    return (
        <div>
            <Header />
            <div className="flex bg-gray-100">
                <SidebarAdmin activeTab="order" />
                <div>
                    <HeaderOrder activeTab="all" />
                    <OrderList />
                </div>
            </div>
        </div>
    );
}

export default All;
