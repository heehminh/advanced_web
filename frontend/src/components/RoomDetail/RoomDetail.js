import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export const RoomDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        address: '',
        category: '',
        price: '',
        description: '',
        photos: []
    });

    const [user, setUser] = useState({
        name: '',
        email: '',
    })

    const token = localStorage.getItem('auth_token');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/post/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const postData = response.data;

                // Handle stringified photos
                if (typeof postData.photos === 'string') {
                    postData.photos = JSON.parse(postData.photos);
                }

                setPost(postData);
                setUser(postData.User);
            } catch (err) {
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();
    }, [id, token]);

    const handleInquiry = () => {
        const subject = encodeURIComponent(`[여행집] ${post.address}`);
        window.open(`mailto:${user.email}?subject=${subject}`);
    };

    // 예약하기 클릭 시
    const handleBooking = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/book/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            console.log('Booking successful:', response.data);
            alert('예약이 완료되었습니다!');

        } catch (error) {
            console.error('Error booking post:', error);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='w-full flex flex-col p-20'>
                <div className='flex w-full justify-between'>
                    <div className='mb-20 w-full items-center justify-center text-40 font-bold text-gray-700 text-left'>{post.address}</div>
                    <div className='flex'>
                        <div className='cursor-pointer h-50 mr-10 w-100 border-logo-sky border-2 text-logo-sky font-semibold rounded-8 p-10 text-center'>
                            <button onClick={handleInquiry}>문의하기</button>
                        </div>
                        <div className='cursor-pointer h-50 w-100 bg-logo-sky text-white font-semibold rounded-8 p-10 text-center'>
                            <button onClick={handleBooking}>예약하기</button>
                        </div>
                    </div>
                </div>
                <div className='text-24'>{post.category}</div>
                <div className='flex justify-between mb-10'>
                    <div>{post.description}</div>
                    <div>{post.price}원 /박</div>
                </div>
                <div>호스트: {user.name}</div>
                
                <div className="swiper-container">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop
                    >
                        {post.photos && post.photos.length > 0 ? (
                            post.photos.map((src, index) => (
                                <SwiperSlide key={index}>
                                    <img src={`http://localhost:3000${src}`} alt={`imgBox-${index}`} className='w-full ' />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>No images</SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
