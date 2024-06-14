import React from "react";
import styled from "styled-components";
import Chatting from "../components/Host/blocks/Chatting";
import FAQ from "../components/Host/blocks/FAQ";
import Header from "../components/Host/blocks/Header";
import Intro from "../components/Host/blocks/Intro";
import Start from "../components/Host/blocks/Start";
import "./Host.css";

export const Host = () => {
  return (
    <Wrapper>
      <HostWrapper>
        <Header />
        <Intro />
        <Start />
        <Chatting />
      </HostWrapper>
      <FAQ />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HostWrapper = styled.div`
  width: 1400px;
`;
