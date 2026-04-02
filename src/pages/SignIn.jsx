import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển trang
import AuthService from '../services/authService'; // Giả sử file AuthService nằm ở đây

function SignIn() {
    const navigate = useNavigate();
    const [nameSignIn, setNameSignIn] = useState('');
    const [checkName, setCheckName] = useState(true);
    const [pass, setPass] = useState('');
    const [checkPass, setCheckPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState(''); // Thêm state báo lỗi từ API

    const validateName = (value) => {
        setCheckName(value !== '');
        setNameSignIn(value);
    };

    const validatePass = (value) => {
        setCheckPass(value !== '');
        setPass(value);
    };

    const checkAll = checkName && checkPass && nameSignIn !== '' && pass !== '';

    // Hàm xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault(); // Chặn load lại trang
        if (!checkAll) return;

        try {
            const credentials = {
                email: nameSignIn, // Hoặc username tùy theo API của bạn
                password: pass,
            };

            const response = await AuthService.login(credentials);

            // Giả sử API trả về data user và token
            if (response.data) {
                // Lưu thông tin vào localStorage để dùng cho trang Profile
                const userData = response.data;

                const user = {
                    email: userData.email,
                    fullName: userData.fullName,
                    status: userData.status,
                    role: userData.role,
                    realName: userData.realName,
                    address: userData.address,
                    numberPhone: userData.numberPhone,
                    birthday: userData.birthDay,
                    sex: userData.sex,
                    image: userData.image,
                };

                const token = {
                    accessToken: userData.token,
                };

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));

                // Chuyển hướng sang trang home
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    };

    return (
        <>
            <div className="bg-red-500 w-full h-[60px]">
                <h1 className="text-white ml-[150px] text-[26px] pt-2">Shopping Online</h1>
            </div>
            <div className="flex justify-center mt-30">
                <div className="w-[500px] min-h-[400px] bg-white rounded-[5px] shadow-xl border-t-3 border-gray-100 pb-8">
                    <div className="flex items-center justify-between px-[30px] w-[500px] h-[90px]">
                        <div className=" text-[22px] mx-auto">
                            <h2>Đăng nhập</h2>
                        </div>
                    </div>

                    <div className="w-[500px]">
                        <div className=" px-[80px]">
                            {/* Chuyển Link thành sự kiện onSubmit của Form */}
                            <form onSubmit={handleLogin}>
                                {/* Thông báo lỗi tổng quát */}

                                <div className="relative mb-8">
                                    <input
                                        type="text"
                                        value={nameSignIn}
                                        onChange={(e) => validateName(e.target.value)}
                                        className={
                                            checkName
                                                ? 'border border-gray-300 w-full h-[40px] pl-[12px]'
                                                : 'border border-red-300 w-full h-[40px] pl-[12px] focus:outline-none bg-[#fff6f7]'
                                        }
                                        placeholder="Email"
                                    />
                                    {!checkName && (
                                        <p className="text-[13px] absolute text-red-500">Vui lòng điền vào mục này</p>
                                    )}
                                </div>

                                <div className="relative mb-16">
                                    <input
                                        type="password" // Đổi thành password để bảo mật
                                        value={pass}
                                        onChange={(e) => validatePass(e.target.value)}
                                        className={
                                            checkPass
                                                ? 'border border-gray-300 w-full h-[40px] pl-[12px]'
                                                : 'border border-red-300 w-full h-[40px] pl-[12px] focus:outline-none bg-[#fff6f7]'
                                        }
                                        placeholder="Mật khẩu"
                                    />
                                </div>
                                <div className="relative">
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm absolute -top-14 left-0">{errorMessage}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={!checkAll}
                                        className={
                                            checkAll
                                                ? 'w-full h-[40px] text-white font-medium bg-[#e84040] cursor-pointer'
                                                : 'w-full h-[40px] text-white font-medium bg-[#e1514e] cursor-not-allowed opacity-70'
                                        }
                                    >
                                        ĐĂNG NHẬP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
