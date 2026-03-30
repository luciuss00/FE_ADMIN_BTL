import '@fortawesome/fontawesome-free/css/all.min.css';

const Notification = ({ isOpen, message, onClose, check }) => {
    if (!isOpen) return null;
    let Notice;
    if (check) {
        Notice = (
            <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50">
                <div className="bg-white p-8 rounded-lg shadow-2xl max-w-[400px] w-full relative text-center">
                    <div className="mb-6">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 mb-4">
                            <i className="fa-solid fa-check text-white text-[20px]"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Thông báo</h3>
                        <p className="text-sm text-gray-500 mt-2">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        );
    } else {
        Notice = (
            <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50">
                <div className="bg-white p-8 rounded-lg shadow-2xl max-w-[400px] w-full relative text-center">
                    <div className="mb-6">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 mb-4">
                            <span className="text-white text-3xl">!</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Thông báo</h3>
                        <p className="text-sm text-gray-500 mt-2">{message}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium cursor-pointer"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        );
    }
    return <div>{Notice}</div>;
};

export default Notification;
