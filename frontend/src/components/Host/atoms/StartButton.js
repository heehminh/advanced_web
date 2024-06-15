import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const StartButton = ({ showStartButton }) => {
  const navigate = useNavigate();

  return showStartButton ? (
    <Start onClick={()=>navigate('/')}>
      <Button>
        <Icon>☖</Icon>
        <div>여행집 스타트</div>
      </Button>
    </Start>
  ) : (
    <></>
  );
};

const Start = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Button = styled.div`
  width: 200px;
  height: 48px;
  background-color: #58CCFF;
  font-size: 18px;
  font-weight: 600;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`;

const Icon = styled.div`
  font-size: 24px;
  margin-right: 5px;
`;

export default StartButton;
