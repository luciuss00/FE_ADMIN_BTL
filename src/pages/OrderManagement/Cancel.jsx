import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';

function Cancel() {
    return (
        <div>
            <Header />
            <div className="flex bg-gray-100">
                <SidebarAdmin activeTab="order" />
                <HeaderOrder activeTab="cancel" />
            </div>
        </div>
    );
}

export default Cancel;
