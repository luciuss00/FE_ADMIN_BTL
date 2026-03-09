import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    const [nameSignIn, setNameSignIn] = useState('');
    const [checkName, setCheckName] = useState(true);
    const [pass, setPass] = useState('');
    const [checkPass, setCheckPass] = useState(true);

    const validateName = (nameSignIn) => {
        if (nameSignIn === '') setCheckName(false);
        else setCheckName(true);
        setNameSignIn(nameSignIn);
    };

    const validatePass = (pass) => {
        if (pass === '') setCheckPass(false);
        else setCheckPass(true);
        setPass(pass);
    };

    const checkAll = checkName && checkPass && nameSignIn != '' && pass != '';

    return (
        <>
            <div className="bg-red-500 w-full h-[60px]">
                <h1 className="text-white ml-[150px] text-[26px] pt-2">Shopping Online</h1>
            </div>
            <div className="flex justify-center mt-30">
                <div className="w-[500px] h-[350px] bg-white rounded-[5px] shadow-xl border-t-3 border-gray-100">
                    <div className="flex items-center justify-between px-[30px] w-[500px] h-[90px]">
                        <div className=" text-[22px] mx-auto">
                            <h2>Đăng nhập</h2>
                        </div>
                    </div>

                    {/* Form đăng nhập */}

                    <div className="w-[500px] h-[190px]">
                        <div className=" px-[80px]">
                            <form action="">
                                {/* Tên tài khoản */}
                                <input
                                    type="text"
                                    value={nameSignIn}
                                    onChange={(e) => validateName(e.target.value)}
                                    className={
                                        checkName
                                            ? 'border border-gray-300 w-full h-[40px] pl-[12px]'
                                            : 'border border-red-300 w-full h-[40px] pl-[12px] focus:outline-none bg-[#fff6f7]'
                                    }
                                    placeholder="Tên tài khoản"
                                />
                                {checkName ? (
                                    <p></p>
                                ) : (
                                    <p className="text-[13px] absolute text-red-500">Vui lòng điền vào mục này</p>
                                )}
                                {/* Pass */}
                                <input
                                    type="text"
                                    value={pass}
                                    onChange={(e) => validatePass(e.target.value)}
                                    className={
                                        checkPass
                                            ? 'border border-gray-300 w-full h-[40px] pl-[12px] mt-8'
                                            : 'border border-red-300 w-full h-[40px] pl-[12px] focus:outline-none bg-[#fff6f7] mt-8'
                                    }
                                    placeholder="Mật khẩu"
                                />
                                {checkPass ? (
                                    <p></p>
                                ) : (
                                    <p className="text-[13px] absolute text-red-500">Vui lòng điền vào mục này</p>
                                )}

                                <Link to="/home">
                                    <button
                                        disabled={!checkAll}
                                        className={
                                            checkAll
                                                ? 'mt-12 w-full h-[40px] text-white font-medium transition-colors duration-300 bg-[#e84040] cursor-pointer opacity-100'
                                                : 'mt-12 w-full h-[40px] text-white font-medium transition-colors duration-300 bg-[#e1514e] cursor-not-allowed opacity-70'
                                        }
                                    >
                                        ĐĂNG NHẬP
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
