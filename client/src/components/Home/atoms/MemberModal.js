import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "../../../recoil/atom";

const MemberModal = () => {
  const setIsLogin = useSetRecoilState(loginAtom);

  const navigate = useNavigate();

  const clickLogOut = () => {
    setIsLogin(false);
    navigate(`../`);

    localStorage.removeItem("loginAtom");
    localStorage.removeItem("nameAtom");
    localStorage.removeItem("emailAtom");
  };

  return (
    <Wrapper>
      <Text black>
        2023년 여름 업그레이드 <New>새소식</New>
      </Text>

      <Line></Line>

      <Text black>메시지</Text>
      <Text black>알림</Text>
      <Text black>여행</Text>
      <Text black>위시리스트</Text>
      <Line></Line>

      <Text>숙소 관리</Text>
      <Text onClick={() => navigate(`../account`)}>계정</Text>
      <Line></Line>

      <Text>도움말</Text>
      <Text onClick={clickLogOut}>로그아웃</Text>
    </Wrapper>
  );
};

export default MemberModal;

const Wrapper = styled.div`
  width: 250px;
  height: 450px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 2px 2px 10px 2px gray;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: ${(props) => (props.black ? "black" : "gray")};
  font-weight: 500;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const New = styled.div`
  font-size: 14px;
  color: white;
  font-weight: 700;
  background-color: rgb(255, 56, 92);
  padding: 0px 3px;
  margin-left: 5px;
`;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid gray;
`;
