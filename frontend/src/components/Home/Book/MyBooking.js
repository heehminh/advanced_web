import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../blocks/Header';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const response = await axios.get('http://localhost:3000/book', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const { booksPostId } = response.data;

                // 예약 목록에 해당하는 게시물들의 정보를 가져오기 (예시)
                const bookingsDetails = await Promise.all(booksPostId.map(async (postId) => {
                    const response = await axios.get(`http://localhost:3000/post/${postId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });
                    return response.data;
                }));

                setBookings(bookingsDetails);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <Header />

            <div className='flex flex-col m-40'>
                <div className='text-40 font-bold '>내가 예약한 여행집 목록</div>
                <div className='w-full flex flex-wrap items-center'>
                    

                {bookings && bookings.length > 0 ? (
                    bookings.map((room) => {
                    const { id, photos, address, category, price, description } = room;

                    return (
                        <div className="room__item" key={id}>
                        <Swiper
                            className="room__item__imgBox"
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            loop
                        >
                            {Array.isArray(photos) && photos.length > 0 ? (
                            photos.map((src, index) => (
                                <SwiperSlide key={index}>
                                <img 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    key={index} src={`http://localhost:3000${src}`} alt="image"  />
                                </SwiperSlide>
                            ))
                            ) : (
                            <div>No images</div>
                            )}
                        </Swiper>

                        <div className="room__item__textBox">
                            <div className="textBox__1">
                            <div className="textBox__1__loc">{address}</div>
                            <div className="textBox__1__star">★ {category}</div>
                            </div>
                            <div className="textBox__2">{description}</div>
                            <div className="textBox__3">
                            ₩{price?.toLocaleString("ko-KR") ?? "loading..."} /박
                            </div>
                        </div>
                        </div>
                    );
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    </div>
    );
};

export default MyBooking;
