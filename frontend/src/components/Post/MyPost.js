import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Header from '../Home/blocks/Header';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import styled from "styled-components";
import EditModal from './EditModal';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const modalRef = useRef();
    useOnClickOutside(modalRef, () => {
      setShowModal(false);
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:3000/post/myposts', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            })
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.error('Error fetching my posts:', err);
            });
        }
    }, [navigate, token]);

    const deletePost = (id) => {
        const token = localStorage.getItem('auth_token');
        axios.delete(`http://localhost:3000/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        })
        .then(() => {
            setPosts(posts.filter(post => post.id !== id));
        })
        .catch(err => {
            console.error('Error deleting post:', err);
        });
        
    };

    

    return (
        <div className='bg-white'>
            <Header />
            
            <div className='flex flex-col m-40'>
                <div className='text-40 font-bold'>내가 작성한 여행집 목록</div>
                <div className='w-full flex flex-wrap items-start'>
                    

                {posts && posts.length > 0 ? (
                    posts.map((room) => {
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

                            <div className='flex w-full mt-10 justify-end'>
                                <div className='cursor-pointer h-50 mr-10 w-100 border-logo-sky border-2 text-logo-sky font-semibold rounded-8 p-10 text-center'>
                                <button onClick={handleOpenModal}>수정하기</button>
                                </div>
                                <div className='cursor-pointer h-50 w-100 bg-logo-sky text-white font-semibold rounded-8 p-12 text-center'>
                                    <button onClick={()=>deletePost(id)}>삭제하기</button>
                                </div>
                            </div>

                            { showModal && ( 
                                <ModalOverlay>
                                    <ModalWrapper ref={modalRef}>
                                    <ModalHeader>
                                        <ModalCloseButton onClick={handleCloseModal}>X</ModalCloseButton>
                                    </ModalHeader>
                                    <ModalBody>
                                        <EditModal id={id} handleCloseModal={handleCloseModal} />
                                    </ModalBody>
                                    </ModalWrapper>
                                </ModalOverlay>
                            )}
                            
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

export default MyPosts;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

const ModalBody = styled.div`
  padding: 1rem;
`;