import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import PostModal from '../../Post/PostModal'

const ChatButton = () => {
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

  return (
    <Chat>
      <Button onClick={handleOpenModal}>숙소 등록하기</Button>
      
      { showModal && ( 
          <ModalOverlay>
            <ModalWrapper ref={modalRef}>
              <ModalHeader>
                <ModalCloseButton onClick={handleCloseModal}>X</ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <PostModal handleCloseModal={handleCloseModal} />
              </ModalBody>
            </ModalWrapper>
          </ModalOverlay>
      )}

    </Chat>
  );
};

export default ChatButton;

const Chat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
`;

const Button = styled.div`
  width: 200px;
  height: 48px;
  background-color: white;
  font-size: 18px;
  font-weight: 600;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  border: 2px solid black;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
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