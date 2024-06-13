import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useRecoilValue } from "recoil";
import { loginAtom } from "../../../recoil/atom";
import LoginModal from "./LoginModal";

const NonMemberModal = () => {
  // 1. 로그인 했을 경우, MemberModal (2023년 여름 .. )
  // 2. 로그인 안했을 경우, 로그인 모달 => 로그인 or 회원가입 눌렀을 때 LoginModal

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isLogin = useRecoilValue(loginAtom);

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
    <div>
      <LoginWrapper>
        <LoginText onClick={handleOpenModal}>로그인</LoginText>
        <LoginText onClick={handleOpenModal}>회원가입</LoginText>
        <Line></Line>
        <LoginText onClick={() => navigate(`../host`)}>
          당신의 공간을 에어비앤비하세요
        </LoginText>
        <LoginText>도움말</LoginText>
      </LoginWrapper>
      {!isLogin && showModal && (
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
    </div>
  );
};

export default NonMemberModal;

const LoginWrapper = styled.div`
  width: 250px;
  height: 200px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 2px 2px 10px 2px gray;
`;

const LoginText = styled.div`
  font-size: 16px;
  color: gray;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid gray;
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
