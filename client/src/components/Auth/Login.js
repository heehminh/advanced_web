import React from 'react';
import logo from '../../app-logo.svg';
import Header from '../Home/blocks/Header';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className='p-100 flex flex-col w-full items-center'>
        <img src={logo} alt='logo' className='w-200 my-50'/>
        <div className='flex flex-col items-center'>
          <div>
            <div>이메일</div>
            <input placeholder='email' className='my-5 border-2 border-gray-200 w-300 rounded-5 p-10 pr-20' />
          </div>
          
          <div className='mt-10'>
            <div>비밀번호</div>
            <input placeholder='password' className='my-5 border-2 border-gray-200 w-300 rounded-5 p-10 pr-20' />
          </div>
          
          <div className='cursor-pointer relative flex h-45 justify-center items-center mt-15 w-300 rounded-5 bg-[#FAE100]'>
            <img className='w-45 absolute top-0 left-0' src='https://i.namu.wiki/i/CVp6_0a4L9qNaw-fVDdXFu2ivx7V0zy2sAP8DSZBMNpOHUrhkwfp88rv6Yty1XUFMxgDo73z-mDIslsuUR9jqvIZQ5ZZ2M7IBM21Zgu0IX7tv5kCK65WLY2nM42uH1KWCmXz_4q-rkEW5GR2-I5g8w.svg' alt='kakao logo' />
            <div className='font-semibold'>카카오톡으로 로그인</div>
          </div>

          <div 
            className='cursor-pointer flex h-45 justify-center items-center mt-15 w-300 rounded-5 border-2 border-logo-sky'
            onClick={()=>navigate('../sign')}
            >
            <div className='font-bold text-logo-sky'>회원가입</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;