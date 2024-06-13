import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '../../constants/categories'

export const Post = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(imageUrls);
  };

  const onSubmit = data => {
    console.log(data);
    
    if (data.photos.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < data.photos.length; i++) {
        formData.append('photos', data.photos[i]);
      }
    }
  };

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-30 pt-10 rounded-20 text-16 bg-white'>
        <div>
          <label>주소</label>
          <input {...register('address', { required: '주소를 입력하세요' })} className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'/>
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className='mt-5'>
          <label>카테고리</label>
          <div className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'>
          <select className='w-full '{...register('category', { required: '카테고리를 선택하세요' })}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className='mt-5'>
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

        <button type="submit" className='mt-10 w-full p-10 bg-sky-200 rounded-8'>숙소 등록하기</button>
      </form>
    </div>
    
  );
};

export default Post;

