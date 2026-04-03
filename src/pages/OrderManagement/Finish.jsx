import Header from '../../components/Header';
import HeaderOrder from '../../components/HeaderOrder';
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin';

function Finish() {
    return (
        <div>
            <Header />
            <div className="flex bg-gray-100">
                <SidebarAdmin activeTab="order" />
                <HeaderOrder activeTab="finish" />
            </div>
        </div>
    );
}

export default Finish;
