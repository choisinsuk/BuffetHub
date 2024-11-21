import React, { useState } from 'react';
import { findPassword } from '../../api/userApi'; // userApi에서 findPassword 함수 가져오기

const SearchPwComponent = () => {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // 비밀번호 찾기 요청을 서버에 보냄
            const response = await findPassword(userId, email);

            // 서버에서 임시 비밀번호를 반환하면 성공 처리
            if (response) {
                setSuccessMessage('임시 비밀번호가 발송되었습니다: ' + response);
            } else {
                setErrorMessage('아이디 또는 이메일이 잘못되었습니다.');
            }
        } catch (error) {
            // 서버 오류 처리
            if (error.response) {
                // 서버에서 반환한 에러 메시지 사용
                setErrorMessage(error.response.data || '서버 오류가 발생했습니다. 다시 시도해 주세요.');
            } else {
                setErrorMessage('서버 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }
    };

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
                    비밀번호 찾기
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                            placeholder="아이디"
                            name="userId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                            placeholder="이메일"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full justify-center">
                        <div className="w-4/5 p-6 flex justify-center font-bold">
                            <button
                                className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                                type="submit"
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {successMessage && (
                <div className="text-center text-green-600">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="text-center text-red-600">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default SearchPwComponent;
