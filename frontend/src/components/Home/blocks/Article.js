import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination]);

const Article = ({ typeIndex }) => {
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      .then((res) => {
        setRoomList(res.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    const filteredRooms =
      typeIndex === 0
        ? roomList
        : roomList.filter((room) => room.typeIndex === typeIndex);

    setDisplayedRooms(filteredRooms);
  }, [typeIndex, roomList]);

  return (
    <article className="room">
      {displayedRooms && displayedRooms.length > 0 ? (
        displayedRooms.map((room) => {
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
                        key={index} src={`http://localhost:3000${src}`} alt="image" onClick={() => navigate(`/stay/${id}`)} />
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
    </article>
  );
};

export default Article;
