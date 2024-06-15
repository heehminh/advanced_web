import React from "react";
import styled from "styled-components";
import ChatButton from "../atoms/PostButton";

const Chatting = () => {
  return (
    <Wrapper>
      <Img
        src="https://a0.muscache.com/im/pictures/c891fdac-0e29-440d-912b-30f11625c500.jpg?im_w=1200&im_q=highq"
        alt="슈퍼호스트"
      />
      <Chat>
        <ChatTitle>
          가까운 곳에 있는 슈퍼호스트의 도움을 <br />
          받아 당신의 공간을 여행집하세요.
        </ChatTitle>
        <ChatButton />
      </Chat>
    </Wrapper>
  );
};

export default Chatting;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1190px;
  margin: 64px 110px;
  background-color: rgb(247, 247, 247);
  border-radius: 20px;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 550px;
`;

const Chat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0px 30px;
`;

const ChatTitle = styled.div`
  color: rgb(34, 34, 34);
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
  padding: 10px;
`;
