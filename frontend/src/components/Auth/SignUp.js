import React , { useState }from 'react';
import { useForm } from 'react-hook-form';
import Header from '../Home/blocks/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

export const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', data);
      alert(`${data.name}님 회원가입이 성공적으로 완료되었습니다!`);
      setUser({
        isAuthenticated: true,
        user: response.data.user,
      });
      reset();
      navigate('../login');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 실패');
    }
  };

  // 비밀번호 확인용 값 참조
  const password = watch('password', '');

  return (
    <div className='flex flex-col w-full h-750 justify-between items-center'>
      <Header />
      <div className='flex flex-col w-full justify-center items-center'>
        <div className='text-2xl font-semibold text-center my-10 p-10'>회원가입</div>
        <form onSubmit={handleSubmit(onSubmit)} className='pt-20 rounded-20 text-16 bg-white'>
          <div className='mt-5'>
            <label>이름</label>
            <input
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'
              type='text'
              placeholder='김민희'
              {...register('name', { required: '이름을 입력하세요' })}
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          </div>

          <div className='mt-5'>
            <label>이메일</label>
            <input
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'
              type='email'
              placeholder='mink141416@gmail.com'
              {...register('email', { 
                required: '이메일을 입력하세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일을 입력하세요'
                }
              })}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className='mt-5'>
            <label>비밀번호</label>
            <input
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'
              type='password'
              {...register('password', { 
                required: '비밀번호를 입력하세요',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다'
                }
              })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <div className='mt-5'>
            <label>비밀번호 확인</label>
            <input
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'
              type='password'
              {...register('passwordConfirm', { 
                required: '비밀번호 확인을 입력하세요',
                validate: value => value === password || '비밀번호가 일치하지 않습니다'
              })}
            />
            {errors.passwordConfirm && <p className='text-red-500'>{errors.passwordConfirm.message}</p>}
          </div>

          {error && <p>{error}</p>}
          <button 
            type='submit' 
            className='cursor-pointer flex h-45 justify-center items-center mt-15 w-300 rounded-5 border-2 border-logo-sky'
          >
            <div className='font-bold text-logo-sky'>회원가입</div>
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
