import React from "react";
import Header from "../components/Home/blocks/Header";
import "./Home.css";
import styled from "styled-components";
import Wrapper from "./Wrapper";

const Home = () => {
  return (
    <div>
      <div className="App">
        <WrapperHeader>
          <Header />
          <div className="line"></div>
        </WrapperHeader>
      </div>
      <Wrapper />
    </div>
    
  );
};

export default Home;

const WrapperHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 999;
`;
