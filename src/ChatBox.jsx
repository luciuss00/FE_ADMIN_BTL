import React, { useState, useEffect, useRef } from 'react';
import { db } from './config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

const ChatBox = ({ senderRole }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Mốc thời gian để "lọc" tin nhắn mới. Khởi tạo là lúc vừa load trang.
    const lastInteractionTime = useRef(Date.now());

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Chỉ tính toán Badge khi người dùng đang đóng khung Chat
            if (!isOpen) {
                let count = 0;
                data.forEach((msg) => {
                    const msgTime = msg.createdAt?.toMillis() || Date.now();
                    // Đếm nếu:
                    // 1. Tin nhắn không phải của mình gửi
                    // 2. Tin nhắn này đến SAU lần cuối mình gửi bài/mở chat
                    if (msg.sender !== senderRole && msgTime > lastInteractionTime.current) {
                        count++;
                    }
                });
                setUnreadCount(count);
            }

            setMessages(data);
        });

        return () => unsubscribe();
    }, [isOpen, senderRole]);

    // Hàm dọn dẹp thông báo và đặt mốc thời gian chặn mới
    const clearNotifications = () => {
        lastInteractionTime.current = Date.now();
        setUnreadCount(0);
    };

    // Khi mở khung chat lên -> Xóa số cũ
    useEffect(() => {
        if (isOpen) {
            clearNotifications();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (newMessage.trim() === '') return;

        // BƯỚC QUAN TRỌNG: Xóa số cũ và đặt mốc chặn ngay khi nhấn Gửi
        clearNotifications();

        await addDoc(collection(db, 'messages'), {
            text: newMessage,
            sender: senderRole,
            createdAt: serverTimestamp(),
        });

        setNewMessage('');
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
            {/* Khung nội dung Chat */}
            {isOpen && (
                <div className="bg-white border rounded-lg shadow-2xl w-80 mb-4 flex flex-col overflow-hidden ring-1 ring-black/5">
                    <div className="bg-red-600 p-3 text-white flex justify-between items-center font-bold">
                        <span>Hỗ trợ Mini Mart</span>
                        <button onClick={() => setIsOpen(false)} className="text-2xl leading-none">
                            ×
                        </button>
                    </div>

                    <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-3 ${msg.sender === senderRole ? 'text-right' : 'text-left'}`}
                            >
                                <div
                                    className={`inline-block p-2 px-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
                                        msg.sender === senderRole
                                            ? 'bg-white text-gray-800 border'
                                            : 'bg-red-500 text-white'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t bg-white flex gap-2">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 border rounded-md px-3 py-1.5 outline-none  text-sm"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button
                            onClick={handleSend}
                            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}

            {/* Icon Chat và Badge */}
            <div className="relative">
                {unreadCount > 0 && !isOpen && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-700 text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce shadow-md">
                        {unreadCount}
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 cursor-pointer rounded-full shadow-xl flex items-center justify-center transition-all transform ${
                        isOpen ? 'bg-gray-500' : 'bg-red-500 hover:scale-110 active:scale-95'
                    } text-white`}
                >
                    {isOpen ? (
                        <span className="text-2xl">✕</span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
