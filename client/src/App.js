import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Host } from "./pages/Host";
import { Wrapper } from "./pages/Wrapper";
import { Account } from "./pages/Account";
import LoginModal from "./components/Home/atoms/LoginModal";
import styled from "styled-components";
import { Detail } from "./pages/Detail";

const App = () => {

  return (
    <Routes>
      <Route index element={<HomeWrapper />} />
      <Route path="/room/:id" element={<Detail />} />
      <Route path="account" element={<HomeAccount />} />
      <Route path="host" element={<Host />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Routes>
  );
};

export default App;

const HomeWrapper = () => {
  return (
    <div>
      <Home />
      <Wrapper />
    </div>
  );
};

const HomeAccount = ({ login }) => {
  return login ? (
    <div>
      <Home />
      <Account LoginWrapper={LoginWrapper} />
    </div>
  ) : (
    <div>
      <Home />
      <LoginWrapper>
        <LoginModal />
      </LoginWrapper>
    </div>
  );
};

const LoginWrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 600px;
  margin-top: 100px;
  position: fixed;
  left: 35%;
  top: 15%;
`;
