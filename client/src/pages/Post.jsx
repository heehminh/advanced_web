import React from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '../constants/categories'

export const Post = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>지역:</label>
        <input {...register('region', { required: '지역을 입력하세요' })} />
        {errors.region && <p>{errors.region.message}</p>}
      </div>

      <div>
        <label>나라:</label>
        <input {...register('country', { required: '나라를 입력하세요' })} />
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div>
        <label>한줄 설명:</label>
        <input {...register('description', { required: '한줄 설명을 입력하세요' })} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>요금:</label>
        <input type="number" {...register('price', { required: '요금을 입력하세요' })} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div>
        <label>대표 사진:</label>
        <input 
          type="file" 
          {...register('photos', { required: '대표 사진을 업로드하세요' })} 
          multiple 
        />
        {errors.photos && <p>{errors.photos.message}</p>}
      </div>

      <div>
        <label>카테고리:</label>
        <select {...register('category', { required: '카테고리를 선택하세요' })}>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

export default Post;
