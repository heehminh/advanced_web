import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../../../app-logo.svg'

const Header = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Logo>
        <img
          alt="header-logo"
          id="header__logo-image"
          src={logo}
          width="120px"
          onClick={() => navigate(`../`)}
        />
      </Logo>
      <SearchBar>
        <SearchBarButton id="button-where">어디든지</SearchBarButton>
        <span> | </span>
        <SearchBarButton id="button-week">언제든 일주일</SearchBarButton>
        <span> | </span>
        <SearchBarButton id="button-guest">게스트 추가</SearchBarButton>
        <img
          alt="search-bar"
          id="search-bar-icon"
          src="../assets/home-search.png"
        />
      </SearchBar>
      <Setting>
        <SettingDescription onClick={() => navigate(`../host`)}>
          당신의 공간을 여행집하세요
        </SettingDescription>
        <SettingIcon>
          <div className="cursor-pointer flex mr-10" onClick={()=>navigate('../book')}>
            예약
          </div>
        </SettingIcon>
        <SettingProfile onClick={() => {
          const token = localStorage.getItem('auth_token');
          if (token) {
            navigate('/my-posts');
          } else {
            navigate('/login');
          }
        }}>
          <div>
            <img
              alt="profile list"
              src="../assets/home-list.png"
              id="profile-list-img"
            />
          </div>
          <div>
            <img
              alt="profile icon"
              src="../assets/home-my.png"
              id="profile-icon-img"
            />
          </div>
        </SettingProfile>
      </Setting>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 40px 10px 40px;
`;

const Logo = styled.div`
  width: 118px;
`;

const SearchBar = styled.div`
  width: 382px;
  height: 52px;
  margin: 0 24px;
  text-align: center;
  border-radius: 40px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SearchBarButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const SettingDescription = styled.div`
  padding: 15px;
  font-size: 16px;
  color: black;

  &:hover {
    border-radius: 35px;
    background-color: #ececec;
  }
`;

const SettingIcon = styled.div`
  width: 46px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 65px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid lightgray;
  padding: 0px 10px;
  position: relative;

  &:hover {
    border-radius: 35px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;