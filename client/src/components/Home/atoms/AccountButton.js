import React from "react";
import styled from "styled-components";
import { NotificationOutlined } from "@ant-design/icons";

const AccountButton = () => {
  return (
    <Wrapper>
      <NotificationOutlined style={{ fontSize: "40px" }} />
      <div>
        <Title>로그인 및 보안</Title>
        <Text>비밀번호를 변경하고 계정을 안전하게 보호하세요</Text>
      </div>
    </Wrapper>
  );
};

export default AccountButton;

const Wrapper = styled.div`
  width: 350px;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 10px;
  margin: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Title = styled.div`
  color: black;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Text = styled.div`
  color: gray;
  font-size: 16px;
  font-weight: 400;
`;
