import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react'; // Thêm Hook để quản lý đếm ngược

const NotificationRedo = ({ isOpen, message, onClose, check, showUndo, onUndo }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer;
        // Chỉ đếm ngược khi đang mở, có quyền undo và số giây > 0
        if (isOpen && showUndo && countdown > 0) {
            timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
        }

        // Khi hết 5 giây mà chưa nhấn, có thể tự đóng hoặc ẩn nút undo tùy bạn
        // Ở đây ta cứ để nó về 0.

        return () => clearTimeout(timer);
    }, [isOpen, showUndo, countdown]);

    // Reset đếm ngược mỗi khi thông báo được mở lại
    useEffect(() => {
        if (isOpen) {
            setCountdown(5);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleUndoClick = () => {
        if (onUndo) {
            onUndo();
            // Không cần setCountdown ở đây vì onClose/setNotification sẽ làm việc đó
        }
    };

    let Icon;
    if (check) {
        Icon = (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4 border border-green-200">
                <i className="fa-solid fa-check text-green-600 text-[24px]"></i>
            </div>
        );
    } else {
        Icon = (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4 border border-red-200">
                <span className="text-red-600 text-3xl font-bold">!</span>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-[400px] w-full relative text-center">
                <div className="mb-6">
                    {Icon}
                    <h3 className="text-xl font-semibold text-gray-900">Thông báo</h3>
                    <p className="text-sm text-gray-600 mt-2 px-2">{message}</p>
                </div>

                <div className="flex gap-3 mt-8">
                    {/* Nút Hoàn tác: Chỉ hiện khi check=true, showUndo=true và còn thời gian */}
                    {check && showUndo && countdown > 0 && (
                        <button
                            onClick={handleUndoClick}
                            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                        >
                            <i className="fa-solid fa-rotate-left mr-2 text-gray-500"></i>
                            Hoàn tác ({countdown}s)
                        </button>
                    )}

                    <button
                        onClick={onClose} // Khi bấm nút này, hàm closeNotification ở trên sẽ chạy
                        className={`${check && showUndo && countdown > 0 ? 'flex-1' : 'w-full'} rounded-xl hover:bg-red-600 cursor-pointer bg-red-500 text-white ...`}
                    >
                        Đóng & Xóa ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationRedo;
