import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { typeList } from '../../constants/categories';

export const PostModal = ({ handleCloseModal }) => {
  const userId = localStorage.getItem('user')
  const token = localStorage.getItem('auth_token')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const categories = typeList.map(item => item.type_description);

  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
  };

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const formData = new FormData();
      formData.append('address', data.address);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('userId', userId);

      // 이미지 파일들을 formData에 추가
      for (let i = 0; i < data.photos.length; i++) {
        formData.append('photos', data.photos[i]);
      }

      console.log(token);
      console.log(formData);

      // 서버로 POST 요청 보내기
      const response = await axios.post('http://localhost:3000/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 필수: 파일 전송 시에는 반드시 설정해야 함
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true // CORS 관련 설정
      });

      console.log(response.data); // 성공 시 응답 데이터 출력
      handleCloseModal(); // 모달 닫기
      alert('숙소 등록이 완료됐습니다!')
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='pt-10 rounded-20 text-16 bg-white'>
        <div>
          <label>주소</label>
          <input {...register('address', { required: '주소를 입력하세요' })} className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'/>
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className='mt-5'>
          <label>카테고리</label>
          <div className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'>
            <select className='w-full' {...register('category', { required: '카테고리를 선택하세요' })}>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className='mt-10'>
          <label>가격</label>
          <div className='relative'>
            <input
              type="text"
              value={price}
              {...register('price', { required: '가격을 입력하세요' })}
              onChange={handleInputChange}
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10 pr-20'
            />
            <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500'>원</span>
          </div>
          {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
        </div>

        <div className='mt-5'>
          <textarea 
            className='w-full h-120 border-2 border-gray-200 p-10 mt-10 rounded-5 '
            placeholder='당신의 숙소를 소개해보세요' {...register('description', { required: '소갯말을 입력하세요' })} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className='my-5'>
          <label>대표 사진</label>
          <input 
            className='w-full mt-10'
            type="file" 
            {...register('photos', { required: '대표 사진을 업로드하세요' })} 
            multiple 
            onChange={handleImageChange} 
          />
          {errors.photos && <p>{errors.photos.message}</p>}

          <div className='flex flex-wrap gap-2 mt-20'>
            {selectedImages.map((image, index) => (
              <img className='w-100 h-100 object-cover border-2 rounded-5' key={index} src={image} alt={`미리보기 ${index + 1}`} />
            ))}
          </div>
        </div>

        <button type="submit" 
          className='mt-10 w-full p-10 bg-sky-200 rounded-8'>
          숙소 등록하기
        </button>
      </form>
    </div>
  );
};

export default PostModal;
