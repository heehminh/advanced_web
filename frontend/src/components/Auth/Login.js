import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import logo from '../../app-logo.svg';
import Header from '../Home/blocks/Header';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', data, { withCredentials: true });
      setUser({
        isAuthenticated: true,
        user: response.data.user,
      });
      console.log(response);
      localStorage.setItem('auth_token', response.data.token);
      reset();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '로그인 실패');
    }
  };

  const onKakaoLogin = () => {
    window.location.href = 'http://localhost:3000/auth/kakao';
  }

  return (
    <div>
      <Header />
      <div className='p-100 flex flex-col w-full items-center'>
        <img src={logo} alt='logo' className='w-200 my-50'/>
        <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className='block'>이메일</label>
            <input 
              type="email"
              {...register('email', { required: '이메일을 입력하세요' })}
              placeholder='mink141416@gmail.com' className='my-5 border-2 border-gray-200 w-300 rounded-5 p-10 pr-20' />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          
          <div className='mt-10'>
            <label className='block'>비밀번호</label>
            <input 
              type="password"
              {...register('password', { required: '비밀번호를 입력하세요' })}
              className='my-5 border-2 border-gray-200 w-300 rounded-5 p-10 pr-20' />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <button 
            className='cursor-pointer flex h-45 justify-center items-center mt-15 w-300 rounded-5 border-2 border-logo-sky'
            type="submit"
            >
            <div className='font-bold text-logo-sky'>로그인</div>
          </button>
          
          <button 
            onClick={onKakaoLogin}
            className='cursor-pointer relative flex h-45 justify-center items-center mt-15 w-300 rounded-5 bg-[#FAE100]'>
            <img className='w-45 absolute top-0 left-0' src='https://i.namu.wiki/i/CVp6_0a4L9qNaw-fVDdXFu2ivx7V0zy2sAP8DSZBMNpOHUrhkwfp88rv6Yty1XUFMxgDo73z-mDIslsuUR9jqvIZQ5ZZ2M7IBM21Zgu0IX7tv5kCK65WLY2nM42uH1KWCmXz_4q-rkEW5GR2-I5g8w.svg' alt='kakao logo' />
            <div className='font-semibold'>카카오로 로그인</div>
          </button>
          <div className='w-full mt-10 text-end' onClick={()=>navigate('../register')}>회원가입 하러가기</div>

          {error && <p>{error}</p>}


        </form>
      </div>
    </div>
  )
}

export default Login;