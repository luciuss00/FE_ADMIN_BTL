import Header from '../components/Header';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

function BillManagement() {
    return (
        <div>
            <Header />

            <div className="flex">
                <SidebarAdmin />
                <div></div>
            </div>
        </div>
    );
}

export default BillManagement;
