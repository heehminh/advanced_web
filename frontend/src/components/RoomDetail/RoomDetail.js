import React from 'react';
import { useParams } from 'react-router-dom';
import { extractCity } from '../../constants/extractCity';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RoomDetail = () => {
    const { id } = useParams();
    // TODO 
    const address = '서울특별시 서대문구 거북골로 34 명지대학교';
    const title = extractCity(address);

    const category = '최고의 전망';
    const price = '54000';
    const description = '명지대학교 정문에서 5분 거리인 최고의 전망을 보유한 숙소입니다. 말로 5분이지 뛰면 3분입니다.';
    const img = [
        "https://a0.muscache.com/im/pictures/miso/Hosting-50876204/original/9df41105-3c80-40c3-829a-d7fae852c15b.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-432044/original/f2d20695-680c-4637-b72c-80238c0dd384.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-432044/original/4c803418-7de5-41d4-877e-2a99388e9047.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-432044/original/697ff0dd-c155-444f-808c-5b431d47b8e9.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-432044/original/47b67284-96d8-46bc-bea0-50e56e8447aa.jpeg?im_w=720"
      ];

    return (
        <div className='flex flex-col'>
            <div className='w-full flex flex-col p-20'>
                <div className='mb-20 w-full items-center justify-center text-32 font-semibold text-gray-700 text-left'>{title}</div>
                <Swiper 
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                >
                    {img && img.length > 0 ? (
                        img.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt="imgBox" className='w-auto '/>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div>No images</div>
                    )}
                </Swiper>
                <div>{category}</div>
                <div>{price}/박</div>
                <div>{description}</div>
            </div>
            
            
        </div>
    );
};

export default RoomDetail;