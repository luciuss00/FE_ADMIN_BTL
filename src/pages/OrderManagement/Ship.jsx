import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';

function Ship() {
    return (
        <div>
            <Header />
            <div className="flex bg-gray-100">
                <SidebarAdmin activeTab="order" />
                <HeaderOrder activeTab="ship" />
            </div>
        </div>
    );
}

export default Ship;
