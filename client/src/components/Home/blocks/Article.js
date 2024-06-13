import React, { useState, useEffect, useRef } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { loginAtom } from "../../../recoil/atom";
import { useRecoilValue } from "recoil";
import LoginModal from "../atoms/LoginModal";
import styled from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import axios from "axios";

SwiperCore.use([Navigation, Pagination]);

const Article = ({ typeIndex }) => {
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const isLogin = useRecoilValue(loginAtom);
  const [roomList, setRoomList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLike = async (id) => {
    if (!isLogin) {
      setIsModalOpen(true);
    } else {
      try {
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
        console.log("Like toggled successfully");
      } catch (error) {
        console.log(error);
      }
    }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    setIsModalOpen(false);
  });

  return (
    <article className="room">
      {roomList && roomList.length > 0 ? (
        displayedRooms.map((room) => {
          const { id, like, img, loc, star, plus, when, price, standard } =
            room;

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
      {!isLogin && isModalOpen && (
        <ModalOverlay>
          <ModalWrapper ref={modalRef}>
            <ModalHeader>
              <ModalCloseButton onClick={handleCloseModal}>X</ModalCloseButton>
              <ModalHeaderTitle>로그인 또는 회원가입</ModalHeaderTitle>
            </ModalHeader>
            <ModalBody>
              <LoginModal />
            </ModalBody>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </article>
  );
};

export default Article;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;

const ModalCloseButton = styled.button`
  position: fixed;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const ModalHeaderTitle = styled.div`
  color: black;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;
