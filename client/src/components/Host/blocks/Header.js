import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatButton from "../atoms/PostButton";
import StartButton from "../atoms/StartButton";
import logo from '../../../app-logo.svg'

const Header = () => {
  const navigate = useNavigate();
  const [showStartButton, setShowStartButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset >= 700 || window.innerWidth < 1400) {
      setShowStartButton(true);
    } else {
      setShowStartButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Icon
        onClick={() => navigate(`../`)}
        className="header__icon"
        src={logo}
        alt="icon"
      />
      <Buttons>
        {showStartButton && <StartButton showStartButton={showStartButton} />}
        <ChatButton />
      </Buttons>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: white;
  padding: 20px 200px;

  @media screen and (max-width: 1400px) {
    padding: 20px;
  }
`;

const Icon = styled.img`
  width: 120px
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;
