import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { typeList } from '../../constants/categories';

const EditModal = ({ id, handleCloseModal }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ address: '', description: '', category: '', price: '', photos: [] });
  const [newPhotos, setNewPhotos] = useState([]);
  const token = localStorage.getItem('auth_token');
  const categories = typeList.map(item => item.type_description);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`http://localhost:3000/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      })
        .then(res => {
          const fetchedPost = res.data;
          // Ensure photos are parsed from JSON if stored as a string
          if (typeof fetchedPost.photos === 'string') {
            fetchedPost.photos = JSON.parse(fetchedPost.photos);
          }
          // Initialize photos as an empty array if not already an array
          if (!Array.isArray(fetchedPost.photos)) {
            fetchedPost.photos = [];
          }
          setPost(fetchedPost);
        })
        .catch(err => {
          console.error('Error fetching post:', err);
        });
    }
  }, [token, navigate, id]);

  const handlePhotoChange = (e) => {
    setNewPhotos([...newPhotos, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('address', post.address);
    formData.append('description', post.description);
    formData.append('category', post.category);
    formData.append('price', post.price);

    // Append existing photos to maintain them
    if (Array.isArray(post.photos)) {
      post.photos.forEach(photo => formData.append('existingPhotos', photo));
    }

    // Append newly uploaded photos
    newPhotos.forEach(file => formData.append('photos', file));

    try {
      const response = await axios.put(`http://localhost:3000/post/${id}/edit-post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      console.log('Post updated successfully:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <form onSubmit={handleSubmit} className='pt-10 rounded-20 text-16 bg-white'>
        <div>
          <label>주소</label>
          <input type="text" value={post.address} onChange={(e) => setPost({ ...post, address: e.target.value })} className='my-5 border-2 border-gray-200 w-full rounded-5 p-10' />
        </div>

        <div className='mt-5'>
          <label>카테고리</label>
          <div className='my-5 border-2 border-gray-200 w-full rounded-5 p-10'>
            <select value={post.category} onChange={(e) => setPost({ ...post, category: e.target.value })} className='w-full'>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

          </div>
        </div>

        <div className='mt-10'>
          <label>가격</label>
          <div className='relative'>
            <input
              type="text"
              value={post.price}
              onChange={(e) => setPost({ ...post, price: e.target.value })}
              className='my-5 border-2 border-gray-200 w-full rounded-5 p-10 pr-20'
            />
            <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500'>원</span>
          </div>
        </div>

        <div className='mt-5'>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className='w-full h-120 border-2 border-gray-200 p-10 mt-10 rounded-5 '
            placeholder='당신의 숙소를 소개해보세요' />
        </div>

        <div className='my-5'>
          <label>대표 사진</label>
          <input
            className='w-full mt-10'
            type="file"
            multiple
            onChange={handlePhotoChange}
          />

          <div className='flex flex-wrap gap-2 mt-20'>
            {post.photos.map((photo, index) => (
              <img key={index} src={`http://localhost:3000${photo}`} alt={`이미지 ${index + 1}`} className='w-100 h-100 object-cover border-2 rounded-5' />
            ))}
          </div>
        </div>

        <button type="submit"
          className='cursor-pointer mt-10 w-full p-10 bg-sky-200 rounded-8'>
          숙소 정보 수정하기
        </button>
      </form>
    </div>
  );
};

export default EditModal;
