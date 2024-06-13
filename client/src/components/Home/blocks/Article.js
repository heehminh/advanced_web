import React, { useState, useEffect, useRef } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { loginAtom } from "../../../recoil/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination]);

const Article = ({ typeIndex }) => {
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const isLogin = useRecoilValue(loginAtom);
  const [roomList, setRoomList] = useState([]);

  const toggleLike = async (id) => {
    const updatedRoomList = roomList.map((room) => {
      if (room.id === id) {
        return { ...room, like: !room.like };
      }
      return room;
    });

    await axios.patch(`/roomList/${id}`, {
      like: !roomList[id].like,
    });
    setRoomList(updatedRoomList);
  };

  useEffect(() => {
    axios
      .get("/roomList")
      .then((res) => setRoomList(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const filteredRooms =
      typeIndex === 0
        ? roomList
        : roomList.filter((room) => room.typeIndex === typeIndex);

    setDisplayedRooms(filteredRooms);
  }, [typeIndex, roomList]);

  const navigate = useNavigate();

  return (
    <article className="room">
      {roomList && roomList.length > 0 ? (
        displayedRooms.map((room) => {
          const { id, like, img, loc, star, plus, when, price, standard } =
            room;

          return (
            <div className="room__item" key={id} onClick={()=>navigate(`/room/${id}`)}>
              <Swiper
                className="room__item__imgBox"
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop
              >
                {img && img.length > 0 ? (
                  img.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img className="imgBox" src={src} alt="imgBox" />
                    </SwiperSlide>
                  ))
                ) : (
                  <div>No images</div>
                )}
              </Swiper>

              {!like || !isLogin ? (
                <HeartOutlined
                  className="room__unlike"
                  onClick={() => toggleLike(id)}
                />
              ) : (
                <HeartFilled
                  className="room__like"
                  onClick={() => toggleLike(id)}
                />
              )}

              <div className="room__item__textBox">
                <div className="textBox__1">
                  <div className="textBox__1__loc">{loc}</div>
                  <div className="textBox__1__star">★ {star}</div>
                </div>
                <div className="textBox__2">{plus}</div>
                <div className="textBox__2">{when}</div>
                <div className="textBox__3">
                  ₩{price?.toLocaleString("ko-KR") ?? "loading..."} / {standard}
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